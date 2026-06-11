import { createServiceClient } from '@/lib/supabase/service';
import { ChatWidget } from './ChatWidget';

/**
 * Server component: decide si el chat está listo (activado + API key cargada)
 * antes de montar el widget. Si falta config o el service role, no renderiza nada.
 */
export async function ChatWidgetMount() {
  let enabled = false;
  let hasKey = false;
  let whatsapp: string | null = null;

  try {
    const svc = createServiceClient();
    const [settingsRes, secretsRes] = await Promise.all([
      svc.from('site_settings').select('chat_enabled, whatsapp1').limit(1).single(),
      svc.from('app_secrets').select('groq_api_key').limit(1).single(),
    ]);
    enabled = settingsRes.data?.chat_enabled ?? true;
    hasKey = Boolean(secretsRes.data?.groq_api_key);
    whatsapp = settingsRes.data?.whatsapp1 ?? null;
  } catch {
    return null;
  }

  if (!enabled || !hasKey) return null;
  return <ChatWidget whatsapp={whatsapp} />;
}
