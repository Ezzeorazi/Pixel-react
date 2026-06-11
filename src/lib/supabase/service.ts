import { createClient } from '@supabase/supabase-js';

/**
 * Cliente Supabase con la SERVICE ROLE key. Bypassea RLS, así que SOLO debe
 * usarse en código server-side (route handlers, server actions ya autenticadas).
 * Nunca importar esto desde un Client Component.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      'Falta SUPABASE_SERVICE_ROLE_KEY (o NEXT_PUBLIC_SUPABASE_URL) en las variables de entorno.'
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
