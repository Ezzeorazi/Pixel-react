'use client';

import { useTransition, useState } from 'react';
import { upsertSettings, upsertSecrets } from '@/app/actions/admin';

interface SettingsFormProps {
  settings: {
    whatsapp1?: string | null;
    whatsapp2?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    email?: string | null;
    chat_enabled?: boolean | null;
    chat_instructions?: string | null;
    notification_email?: string | null;
  } | null;
  secrets: { groqSet: boolean; resendSet: boolean };
}

export function SettingsForm({ settings, secrets }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(settings?.chat_enabled ?? true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set('chat_enabled', chatEnabled ? 'true' : 'false');
    setSaved(false);
    startTransition(async () => {
      await Promise.all([upsertSettings(data), upsertSecrets(data)]);
      setSaved(true);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3 block">
          WhatsApp
        </legend>
        <Field label="WhatsApp principal (con código de país, ej: +5491112345678)">
          <input
            name="whatsapp1"
            defaultValue={settings?.whatsapp1 ?? ''}
            placeholder="+5491112345678"
            className={inputClass}
          />
        </Field>
        <Field label="WhatsApp secundario">
          <input
            name="whatsapp2"
            defaultValue={settings?.whatsapp2 ?? ''}
            placeholder="+5491187654321"
            className={inputClass}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3 block">
          Redes sociales
        </legend>
        <Field label="Facebook (URL completa)">
          <input
            name="facebook"
            type="url"
            defaultValue={settings?.facebook ?? ''}
            placeholder="https://facebook.com/pixelmaker"
            className={inputClass}
          />
        </Field>
        <Field label="Instagram (URL completa)">
          <input
            name="instagram"
            type="url"
            defaultValue={settings?.instagram ?? ''}
            placeholder="https://instagram.com/pixelmaker"
            className={inputClass}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3 block">
          Contacto
        </legend>
        <Field label="Email de contacto">
          <input
            name="email"
            type="email"
            defaultValue={settings?.email ?? ''}
            placeholder="hola@pixelmaker.dev"
            className={inputClass}
          />
        </Field>
      </fieldset>

      {/* ── Chatbot IA ─────────────────────────────────────────────────────── */}
      <fieldset className="space-y-4 border-t border-white/5 pt-8">
        <legend className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3 block">
          Chatbot IA (asistente / vendedor)
        </legend>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <button
            type="button"
            role="switch"
            aria-checked={chatEnabled}
            onClick={() => setChatEnabled((v) => !v)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              chatEnabled ? 'bg-purple-600' : 'bg-white/10'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                chatEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'
              }`}
            />
          </button>
          <span className="text-sm text-gray-300">
            Mostrar el chatbot en el sitio
          </span>
        </label>

        <Field label={`API Key de Groq ${secrets.groqSet ? '— ya configurada (dejá vacío para mantenerla)' : '— requerida para activar el chat'}`}>
          <input
            name="groq_api_key"
            type="password"
            autoComplete="off"
            placeholder={secrets.groqSet ? '•••••••••••• (sin cambios)' : 'gsk_...'}
            className={inputClass}
          />
          <p className="text-xs text-gray-500 mt-1">
            Gratis en console.groq.com → API Keys. Se guarda cifrada del lado del servidor; nunca se expone al navegador.
          </p>
        </Field>

        <Field label="Instrucciones extra para el bot (tono, promociones, qué resaltar...)">
          <textarea
            name="chat_instructions"
            rows={4}
            defaultValue={settings?.chat_instructions ?? ''}
            placeholder="Ej: Resaltá que damos soporte post-lanzamiento. Ofrecé una reunión gratis de 15 min. Sé cercano y tuteá al visitante."
            className={inputClass}
          />
        </Field>
      </fieldset>

      {/* ── Notificaciones por email ───────────────────────────────────────── */}
      <fieldset className="space-y-4 border-t border-white/5 pt-8">
        <legend className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3 block">
          Avisos por email (nuevos leads)
        </legend>

        <Field label="Email donde recibir los avisos de nuevas consultas">
          <input
            name="notification_email"
            type="email"
            defaultValue={settings?.notification_email ?? ''}
            placeholder="ventas@pixelmaker.com.ar"
            className={inputClass}
          />
        </Field>

        <Field label={`API Key de Resend ${secrets.resendSet ? '— ya configurada (dejá vacío para mantenerla)' : '— requerida para enviar los avisos'}`}>
          <input
            name="resend_api_key"
            type="password"
            autoComplete="off"
            placeholder={secrets.resendSet ? '•••••••••••• (sin cambios)' : 're_...'}
            className={inputClass}
          />
          <p className="text-xs text-gray-500 mt-1">
            Gratis en resend.com (100 emails/día). Sin verificar dominio podés enviarte avisos a vos mismo.
          </p>
        </Field>
      </fieldset>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all disabled:opacity-60"
        >
          {isPending ? 'Guardando...' : 'Guardar configuración'}
        </button>
        {saved && (
          <span className="text-green-400 text-sm font-medium">¡Guardado correctamente!</span>
        )}
      </div>
    </form>
  );
}

const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-[#0a0a0c] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors text-sm';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
