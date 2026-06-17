import crypto from 'node:crypto';

// Verificación anti-bot con Cloudflare Turnstile (gratis, framework-agnóstico).
//
// Flujo:
//  1. El navegador resuelve el challenge y obtiene un token.
//  2. POST /api/chat/verify valida ese token contra Cloudflare y, si pasa, deja
//     una cookie firmada (pase) válida por PASS_TTL_MS.
//  3. /api/chat acepta el mensaje solo si la cookie es válida.
//
// Toda la feature es OPCIONAL: si no hay TURNSTILE_SECRET_KEY configurada, la
// verificación se omite y el chat funciona como antes.

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export const PASS_COOKIE = 'pixi-pass';
export const PASS_TTL_MS = 30 * 60_000; // 30 minutos

export function turnstileEnabled(): boolean {
  return !!process.env.TURNSTILE_SECRET_KEY;
}

function passSecret(): string {
  // Reutiliza el secreto del servidor; no requiere una env var extra.
  return process.env.TURNSTILE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'dev-secret';
}

/** Valida el token del widget contra Cloudflare. */
export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // feature desactivada
  if (!token) return false;

  try {
    const form = new URLSearchParams();
    form.set('secret', secret);
    form.set('response', token);
    if (ip) form.set('remoteip', ip);

    const res = await fetch(SITEVERIFY_URL, { method: 'POST', body: form });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/** Genera el valor de cookie firmado: `<expiraEnMs>.<hmac>`. */
export function issuePass(): { value: string; maxAgeSeconds: number } {
  const exp = Date.now() + PASS_TTL_MS;
  const sig = crypto.createHmac('sha256', passSecret()).update(String(exp)).digest('hex');
  return { value: `${exp}.${sig}`, maxAgeSeconds: Math.floor(PASS_TTL_MS / 1000) };
}

/** Verifica la cookie: firma válida y no expirada. */
export function verifyPass(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  const [expStr, sig] = cookieValue.split('.');
  if (!expStr || !sig) return false;

  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;

  const expected = crypto.createHmac('sha256', passSecret()).update(expStr).digest('hex');
  // Comparación en tiempo constante.
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
