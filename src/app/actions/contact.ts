'use server';

import { sendContactMessage } from '@/lib/supabase/queries';
import { ContactSchema } from '@/lib/schemas';
import { createServiceClient } from '@/lib/supabase/service';
import { sendLeadEmail } from '@/lib/email';

export async function submitContact(data: unknown) {
  const result = ContactSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  // Drop empty optional fields so they're stored as null
  const message = Object.fromEntries(
    Object.entries(result.data).filter(([, v]) => v !== '' && v !== undefined)
  ) as typeof result.data;

  const saved = await sendContactMessage({ ...message, source: 'form' });

  // Aviso por email (best-effort; no afecta el resultado del formulario).
  if (saved.ok) {
    notifyByEmail(message).catch((e) => console.error('[contact] email error:', e));
  }

  return saved;
}

async function notifyByEmail(message: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  try {
    const svc = createServiceClient();
    const [settingsRes, secretsRes] = await Promise.all([
      svc.from('site_settings').select('email, notification_email').limit(1).single(),
      svc.from('app_secrets').select('resend_api_key').limit(1).single(),
    ]);
    const resendKey = secretsRes.data?.resend_api_key;
    const to = settingsRes.data?.notification_email || settingsRes.data?.email;
    if (!resendKey || !to) return;

    await sendLeadEmail({
      apiKey: resendKey,
      to,
      lead: {
        nombre: message.name,
        email: message.email,
        telefono: message.phone,
        interes: `${message.service ? message.service + ' — ' : ''}${message.message}`,
        source: 'form',
      },
    });
  } catch (e) {
    console.error('[contact] notifyByEmail:', e);
  }
}
