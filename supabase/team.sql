-- Team members — run AFTER schema.sql and admin-policies.sql
-- Run this in the Supabase SQL editor.

create table if not exists team_members (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text not null,
  bio         text not null default '',
  github_url   text,
  linkedin_url text,
  photo_url    text,
  active      boolean not null default true,
  sort_order  integer not null default 0,
  -- bilingual fields (optional — fall back to ES when empty)
  role_en     text,
  bio_en      text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Row Level Security
alter table team_members enable row level security;

-- Public can read active members
create policy "Public can read active team members"
  on team_members for select
  using (active = true);

-- Admins (authenticated) full CRUD
create policy "Admins can manage team members"
  on team_members for all
  to authenticated
  using (true)
  with check (true);

-- keep updated_at fresh (function defined in schema.sql)
create trigger team_members_updated_at
  before update on team_members
  for each row execute function update_updated_at();

-- Seed (Gonza & Ezequiel) — edit later from /admin/team
insert into team_members (name, role, bio, github_url, active, sort_order, role_en, bio_en) values
  (
    'Ezequiel Orazi',
    'Desarrollador Full Stack & Fundador',
    'Construye plataformas web y software a medida de principio a fin, desde la arquitectura hasta el despliegue. Obsesionado con el código limpio y las buenas experiencias de usuario.',
    'https://github.com/Ezzeorazi',
    true, 0,
    'Full Stack Developer & Founder',
    'Builds web platforms and custom software end-to-end, from architecture to deployment. Obsessed with clean code and great user experiences.'
  ),
  (
    'Gonzalo',
    'Desarrollador Full Stack',
    'Enfocado en interfaces frontend e integraciones, convirtiendo diseños en productos rápidos, responsive y accesibles.',
    'https://github.com/gonzalo',
    true, 1,
    'Full Stack Developer',
    'Focused on frontend interfaces and integrations, turning designs into fast, responsive and accessible products.'
  );
