import { NextRequest, NextResponse } from 'next/server';
import { verifyTurnstileToken, issuePass, PASS_COOKIE } from '@/lib/chat/turnstile';

export const dynamic = 'force-dynamic';

// Recibe el token de Turnstile, lo valida contra Cloudflare y, si pasa, deja una
// cookie de pase firmada para que /api/chat acepte los próximos mensajes.
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined;

  let token = '';
  try {
    const body = (await req.json()) as { token?: string };
    token = typeof body.token === 'string' ? body.token : '';
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const ok = await verifyTurnstileToken(token, ip);
  if (!ok) {
    return NextResponse.json({ error: 'Verificación fallida.' }, { status: 403 });
  }

  const pass = issuePass();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(PASS_COOKIE, pass.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: pass.maxAgeSeconds,
  });
  return res;
}
