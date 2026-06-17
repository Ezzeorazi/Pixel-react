-- Agrega el enlace de LinkedIn a los miembros del equipo.
-- Ejecutar en el SQL Editor de Supabase (una sola vez) si la tabla ya existe.

alter table public.team_members
  add column if not exists linkedin_url text;
