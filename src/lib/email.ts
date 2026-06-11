// Envío de emails vía Resend REST API (sin SDK). https://resend.com/docs

interface SendLeadEmailArgs {
  apiKey: string;
  to: string;
  fromName?: string;
  lead: {
    nombre: string;
    email?: string;
    telefono?: string;
    interes: string;
    source: 'chatbot' | 'form';
    transcript?: string;
  };
}

export async function sendLeadEmail({ apiKey, to, fromName, lead }: SendLeadEmailArgs): Promise<{ ok: boolean; error?: string }> {
  const origen = lead.source === 'chatbot' ? 'el chatbot' : 'el formulario de contacto';
  const subject = `🟢 Nuevo lead de ${origen}: ${lead.nombre}`;

  const rows: [string, string | undefined][] = [
    ['Nombre', lead.nombre],
    ['Email', lead.email],
    ['Teléfono / WhatsApp', lead.telefono],
    ['Interés', lead.interes],
    ['Origen', origen],
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#111">
      <h2 style="color:#7c3aed;margin-bottom:4px">Nuevo lead 🚀</h2>
      <p style="color:#555;margin-top:0">Alguien consultó a través de ${origen} en Pixel Maker.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;width:160px">${k}</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(v as string)}</td></tr>`
          )
          .join('')}
      </table>
      ${
        lead.transcript
          ? `<h3 style="margin-bottom:6px">Conversación</h3><pre style="white-space:pre-wrap;background:#f5f5f7;padding:12px;border-radius:8px;font-size:13px;font-family:ui-monospace,monospace">${escapeHtml(lead.transcript)}</pre>`
          : ''
      }
    </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `${fromName ?? 'Pixel Maker'} <onboarding@resend.dev>`,
        to: [to],
        reply_to: lead.email,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
