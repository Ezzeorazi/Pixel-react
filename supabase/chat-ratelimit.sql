-- ─────────────────────────────────────────────────────────────────────────────
-- Rate limit compartido para el chatbot
-- Ejecutar en el SQL Editor de Supabase (una sola vez).
--
-- A diferencia del límite en memoria (por instancia de función), esta tabla es
-- global: cuenta los requests de una IP sin importar qué instancia los atienda.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.chat_rate_limits (
  ip           text primary key,
  count        integer     not null default 0,
  window_start timestamptz not null default now()
);

-- RLS habilitado SIN políticas => solo el service_role (server-side) la accede.
alter table public.chat_rate_limits enable row level security;

-- Incrementa atómicamente el contador de la IP dentro de una ventana deslizante
-- y devuelve TRUE si ya superó el límite. Si la ventana venció, reinicia a 1.
create or replace function public.check_chat_rate_limit(
  p_ip text,
  p_limit integer,
  p_window_seconds integer
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now   timestamptz := now();
  v_count integer;
begin
  insert into public.chat_rate_limits (ip, count, window_start)
  values (p_ip, 1, v_now)
  on conflict (ip) do update
    set count = case
                  when public.chat_rate_limits.window_start
                       < v_now - make_interval(secs => p_window_seconds)
                  then 1
                  else public.chat_rate_limits.count + 1
                end,
        window_start = case
                  when public.chat_rate_limits.window_start
                       < v_now - make_interval(secs => p_window_seconds)
                  then v_now
                  else public.chat_rate_limits.window_start
                end
  returning count into v_count;

  return v_count > p_limit;
end;
$$;

-- Limpieza opcional de filas viejas (correr a mano o con un cron de Supabase):
-- delete from public.chat_rate_limits where window_start < now() - interval '1 day';
