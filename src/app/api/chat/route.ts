import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { getServices, getProjects, getTeamMembers } from '@/lib/supabase/queries';
import { buildSystemPrompt } from '@/lib/chat/system-prompt';
import { groqChat, CAPTURE_LEAD_TOOL, type ChatMessage } from '@/lib/chat/groq';
import { ChatLeadSchema } from '@/lib/schemas';
import { verifyPass, turnstileEnabled, PASS_COOKIE } from '@/lib/chat/turnstile';
import { sendLeadEmail } from '@/lib/email';
import type { Locale, SiteSettings } from '@/lib/types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Límites anti-abuso.
const MAX_MESSAGES = 24;
const MAX_CHARS = 2000;
const RATE_LIMIT = 20; // requests
const RATE_WINDOW = 60; // segundos

// Capa 1: rate limit en memoria (por instancia). Cheap, frena ráfagas locales.
const RATE = new Map<string, { count: number; resetAt: number }>();

function localRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = RATE.get(ip);
  if (!entry || now > entry.resetAt) {
    RATE.set(ip, { count: 1, resetAt: now + RATE_WINDOW * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

// Capa 2: rate limit compartido en Supabase (global a todas las instancias).
// Fail-open: si la RPC falla, no bloqueamos (la capa local sigue activa).
async function sharedRateLimited(svc: SupabaseClient, ip: string): Promise<boolean> {
  try {
    const { data, error } = await svc.rpc('check_chat_rate_limit', {
      p_ip: ip,
      p_limit: RATE_LIMIT,
      p_window_seconds: RATE_WINDOW,
    });
    if (error) return false;
    return data === true;
  } catch {
    return false;
  }
}

interface ClientMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (localRateLimited(ip)) {
    return NextResponse.json({ error: 'Demasiadas solicitudes, esperá un momento.' }, { status: 429 });
  }

  // Anti-bot: exigir un pase válido de Turnstile (si la feature está activada).
  if (turnstileEnabled() && !verifyPass(req.cookies.get(PASS_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Verificación requerida.', needVerification: true }, { status: 401 });
  }

  let body: { messages?: ClientMessage[]; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const locale: Locale = body.locale === 'en' ? 'en' : 'es';
  const incoming = Array.isArray(body.messages) ? body.messages : [];

  // Validación de entrada.
  if (incoming.length === 0 || incoming.length > MAX_MESSAGES) {
    return NextResponse.json({ error: 'Cantidad de mensajes inválida.' }, { status: 400 });
  }
  const clean = incoming
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  // Leer settings + secrets server-side (service role; nunca llega al browser).
  let settings: SiteSettings | null = null;
  let groqKey: string | null = null;
  let resendKey: string | null = null;
  try {
    const svc = createServiceClient();

    // Rate limit compartido (global). Si lo supera, cortamos antes de gastar tokens.
    if (await sharedRateLimited(svc, ip)) {
      return NextResponse.json({ error: 'Demasiadas solicitudes, esperá un momento.' }, { status: 429 });
    }

    const [settingsRes, secretsRes] = await Promise.all([
      svc.from('site_settings').select('*').limit(1).single(),
      svc.from('app_secrets').select('groq_api_key, resend_api_key').limit(1).single(),
    ]);
    settings = (settingsRes.data as SiteSettings) ?? null;
    groqKey = secretsRes.data?.groq_api_key ?? null;
    resendKey = secretsRes.data?.resend_api_key ?? null;
  } catch {
    return NextResponse.json({ error: 'El chat no está disponible en este momento.' }, { status: 503 });
  }

  if (settings?.chat_enabled === false || !groqKey) {
    return NextResponse.json({ error: 'El chat no está configurado.' }, { status: 503 });
  }

  // Contexto fresco en cada request: refleja altas/bajas en /admin sin caché.
  const [services, projects, team] = await Promise.all([
    getServices(locale),
    getProjects(locale),
    getTeamMembers(locale),
  ]);
  const systemPrompt = buildSystemPrompt({ locale, services, projects, team, settings });

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...clean,
  ];

  try {
    // Primera llamada: el modelo puede responder o pedir capturar el lead.
    const first = await groqChat({
      apiKey: groqKey,
      messages,
      tools: [CAPTURE_LEAD_TOOL],
      temperature: 0.4,
    });

    const toolCalls = first.tool_calls ?? [];
    if (toolCalls.length === 0) {
      return NextResponse.json({ message: first.content ?? '' });
    }

    // Ejecutar la(s) tool call(s).
    messages.push(first);
    let leadCaptured = false;

    for (const call of toolCalls) {
      if (call.function.name !== 'capturar_lead') {
        messages.push({ role: 'tool', tool_call_id: call.id, name: call.function.name, content: 'ok' });
        continue;
      }
      let args: { nombre?: string; email?: string; telefono?: string; interes?: string } = {};
      try {
        args = JSON.parse(call.function.arguments || '{}');
      } catch {
        /* ignore */
      }
      const ok = await saveLead({
        args,
        clean,
        settings,
        resendKey,
        locale,
      });
      leadCaptured = leadCaptured || ok;
      messages.push({
        role: 'tool',
        tool_call_id: call.id,
        name: 'capturar_lead',
        content: ok ? 'Lead registrado correctamente.' : 'No se pudo registrar, pedir el dato de nuevo.',
      });
    }

    // Segunda llamada: respuesta final al visitante.
    const second = await groqChat({ apiKey: groqKey, messages, temperature: 0.4 });
    return NextResponse.json({ message: second.content ?? '', leadCaptured });
  } catch (e) {
    console.error('[chat] error:', e);
    return NextResponse.json(
      { error: 'No pude procesar tu mensaje. Probá de nuevo en un momento.' },
      { status: 502 }
    );
  }
}

async function saveLead({
  args,
  clean,
  settings,
  resendKey,
  locale,
}: {
  args: { nombre?: string; email?: string; telefono?: string; interes?: string };
  clean: { role: string; content: string }[];
  settings: SiteSettings | null;
  resendKey: string | null;
  locale: Locale;
}): Promise<boolean> {
  // Validar/sanitizar lo que extrajo el modelo antes de persistir.
  const parsed = ChatLeadSchema.safeParse(args);
  if (!parsed.success) {
    console.warn('[chat] lead inválido, no se guarda:', parsed.error.issues.map((i) => i.message).join('; '));
    return false;
  }
  const nombre = parsed.data.nombre;
  const email = parsed.data.email ?? undefined;
  const telefono = parsed.data.telefono ?? undefined;

  const transcript = clean
    .map((m) => `${m.role === 'user' ? 'Visitante' : 'Pixi'}: ${m.content}`)
    .join('\n');

  const interes = parsed.data.interes || 'Consulta desde el chatbot';

  // Guardar en contact_messages.
  try {
    const svc = createServiceClient();
    await svc.from('contact_messages').insert([
      {
        name: nombre,
        email: email || 'sin-email@chatbot.local',
        phone: telefono || null,
        message: `[Chatbot · ${locale}] ${interes}\n\n--- Conversación ---\n${transcript}`.slice(0, 5000),
        source: 'chatbot',
      },
    ]);
  } catch (e) {
    console.error('[chat] no se pudo guardar el lead:', e);
    return false;
  }

  // Avisar por email (si está configurado). No bloquea el éxito del guardado.
  const to = settings?.notification_email || settings?.email;
  if (resendKey && to) {
    const sent = await sendLeadEmail({
      apiKey: resendKey,
      to,
      lead: { nombre, email, telefono, interes, source: 'chatbot', transcript },
    });
    if (!sent.ok) console.error('[chat] email no enviado:', sent.error);
  }

  return true;
}
