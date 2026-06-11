-- ─────────────────────────────────────────────────────────────────────────────
-- Chatbot asistente/vendedor — migración
-- Ejecutar en el SQL Editor de Supabase (una sola vez).
-- ─────────────────────────────────────────────────────────────────────────────

-- 1) site_settings: campos NO secretos del chatbot.
--    chat_enabled y chat_instructions/notification_email se leen server-side.
alter table public.site_settings
  add column if not exists chat_enabled      boolean default true,
  add column if not exists chat_instructions text,
  add column if not exists notification_email text;

-- 2) contact_messages: distinguir leads del formulario vs. del chatbot.
alter table public.contact_messages
  add column if not exists source text default 'form';

-- 3) app_secrets: tabla de UNA fila con las API keys.
--    RLS habilitado SIN políticas para anon/authenticated => nadie puede leerla
--    con la anon key. Solo el service_role (server-side) la accede, y bypassea RLS.
create table if not exists public.app_secrets (
  id            uuid primary key default gen_random_uuid(),
  groq_api_key  text,
  resend_api_key text,
  updated_at    timestamptz default now()
);

alter table public.app_secrets enable row level security;

-- Sin policies: anon y authenticated NO pueden hacer SELECT/INSERT/UPDATE.
-- (Si más adelante querés permitir lectura a un admin autenticado, agregá una
--  policy explícita; por ahora todo pasa por el service_role.)

-- Fila inicial vacía para poder hacer UPDATE desde el admin.
insert into public.app_secrets (groq_api_key, resend_api_key)
select null, null
where not exists (select 1 from public.app_secrets);
