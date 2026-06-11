-- Migración: nuevos campos del formulario de contacto
-- Ejecutar en el SQL Editor de Supabase (proyectos existentes).

alter table contact_messages
  add column if not exists phone    text,
  add column if not exists budget   text,
  add column if not exists timeline text;
