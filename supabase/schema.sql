-- Pixel Maker Agency — Supabase Schema
-- Run this in the Supabase SQL editor

-- Blog posts
create table if not exists blog_posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null,
  locale      text not null check (locale in ('es', 'en')),
  title       text not null,
  excerpt     text not null,
  content     text not null default '',
  category    text not null default 'general',
  date        date not null default now(),
  read_time   integer not null default 5,
  image_url   text,
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (slug, locale)
);

-- Projects
create table if not exists projects (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  name             text not null,
  description      text not null,
  full_description text not null default '',
  category         text not null default 'web',
  technologies     text[] not null default '{}',
  url              text,
  image_url        text,
  featured         boolean not null default false,
  created_at       timestamptz not null default now()
);

-- Services
create table if not exists services (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  description text not null,
  icon        text not null default 'Code',
  color       text not null default 'purple' check (color in ('purple', 'pink', 'fuchsia')),
  price       numeric(10,2),
  price_label text,
  features    text[] not null default '{}',
  featured    boolean not null default false,
  active      boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- Contact messages
create table if not exists contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  company    text,
  service    text,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table blog_posts enable row level security;
alter table projects enable row level security;
alter table contact_messages enable row level security;

-- Public can read published blog posts and projects
create policy "Public can read published posts"
  on blog_posts for select
  using (published = true);

create policy "Public can read projects"
  on projects for select
  using (true);

alter table services enable row level security;

create policy "Public can read active services"
  on services for select
  using (active = true);

-- Anyone can insert contact messages
create policy "Anyone can insert contact messages"
  on contact_messages for insert
  with check (true);

-- updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function update_updated_at();

-- Sample data
insert into blog_posts (slug, locale, title, excerpt, content, category, date, read_time, published) values
  ('why-your-business-needs-ssl', 'es', '¿Por qué tu empresa necesita un Certificado SSL?', 'La seguridad online ya no es opcional. Descubrí cómo un SSL no solo protege a tus clientes, sino que mejora tu posicionamiento en Google.', '# ¿Por qué tu empresa necesita un Certificado SSL?\n\nContenido completo próximamente...', 'seo', '2026-03-10', 4, true),
  ('responsive-design-impact-on-sales', 'es', 'El impacto del diseño web responsivo en tus ventas', 'Más del 60% del tráfico web viene de dispositivos móviles.', 'Contenido completo próximamente...', 'development', '2026-02-28', 5, true),
  ('ecommerce-vs-physical-store', 'es', 'Tienda Online vs Tienda Física: costos y beneficios', 'Analizamos por qué expandir tu negocio al mundo digital puede multiplicar tus ingresos.', 'Contenido completo próximamente...', 'business', '2026-02-15', 6, true),
  ('why-your-business-needs-ssl', 'en', 'Why Your Business Needs an SSL Certificate', 'Online security is no longer optional. Discover how SSL protects your customers and improves your rankings.', 'Full content coming soon...', 'seo', '2026-03-10', 4, true);

insert into services (slug, name, description, icon, color, price, price_label, features, featured, active, sort_order) values
  ('web-development', 'Desarrollo Web', 'Diseñamos y desarrollamos sitios web modernos, rápidos y optimizados para convertir visitantes en clientes.', 'Code', 'purple', 500, 'desde $500 USD', ARRAY['Diseño personalizado', 'Responsive (mobile-first)', 'SEO básico incluido', 'Formulario de contacto', 'Integración con redes sociales', 'Dominio y hosting asesorado'], true, true, 0),
  ('custom-software', 'Software a Medida', 'Desarrollamos aplicaciones y sistemas personalizados adaptados exactamente a los procesos de tu empresa.', 'Layers', 'fuchsia', 1500, 'desde $1.500 USD', ARRAY['Análisis de requerimientos', 'Arquitectura escalable', 'Panel de administración', 'Integraciones con APIs', 'Soporte y mantenimiento', 'Documentación técnica'], true, true, 1),
  ('ecommerce', 'Tienda Online', 'Creamos tu tienda online con todo lo necesario para empezar a vender: catálogo, pagos y gestión de pedidos.', 'ShoppingBag', 'pink', 800, 'desde $800 USD', ARRAY['Catálogo de productos', 'Pasarela de pagos', 'Gestión de pedidos', 'Carrito de compras', 'Panel de administración', 'Integración con MercadoPago/Stripe'], true, true, 2),
  ('digital-marketing', 'Marketing Digital', 'Estrategias de marketing online para atraer más clientes y hacer crecer tu negocio en el mundo digital.', 'Megaphone', 'purple', 300, 'desde $300 USD/mes', ARRAY['Estrategia de contenidos', 'Gestión de redes sociales', 'Campañas pagadas (Google/Meta)', 'Email marketing', 'Reportes mensuales', 'Optimización continua'], false, true, 3),
  ('seo', 'Posicionamiento SEO', 'Mejoramos tu posicionamiento en Google para que tus clientes te encuentren antes que a tu competencia.', 'Search', 'pink', 250, 'desde $250 USD/mes', ARRAY['Auditoría SEO inicial', 'Optimización on-page', 'Link building', 'Contenido optimizado', 'Seguimiento de keywords', 'Reportes de posicionamiento'], false, true, 4),
  ('marketing-reports', 'Reportes de Marketing', 'Dashboards y reportes detallados para medir el rendimiento de tus campañas y tomar decisiones basadas en datos.', 'BarChart2', 'fuchsia', 150, 'desde $150 USD/mes', ARRAY['Dashboard personalizado', 'Métricas de redes sociales', 'Análisis de campañas', 'ROI y conversiones', 'Reportes PDF automáticos', 'Reunión mensual de revisión'], true, true, 5),
  ('maintenance', 'Mantenimiento Web', 'Mantenemos tu sitio actualizado, seguro y funcionando correctamente para que no pierdas ventas ni clientes.', 'Wrench', 'purple', 100, 'desde $100 USD/mes', ARRAY['Actualizaciones de seguridad', 'Backups automáticos', 'Monitoreo 24/7', 'Correcciones y ajustes', 'Optimización de velocidad', 'Soporte prioritario'], false, true, 6),
  ('consulting', 'Consultoría Digital', 'Asesoramiento estratégico para digitalizar tu negocio, elegir las herramientas correctas y acelerar tu crecimiento.', 'Lightbulb', 'pink', 80, 'desde $80 USD/hora', ARRAY['Diagnóstico digital', 'Hoja de ruta tecnológica', 'Selección de herramientas', 'Capacitación del equipo', 'Plan de implementación', 'Seguimiento de resultados'], false, true, 7);

insert into projects (slug, name, description, full_description, category, technologies, url, featured) values
  ('optilab-chajari', 'Optilab Chajarí', 'Sitio web corporativo para óptica profesional.', 'Desarrollo de página web corporativa para Optilab Chajarí con imagen profesional y formal.', 'web', ARRAY['React', 'Tailwind CSS', 'Vercel'], 'https://optilab.com', true),
  ('golden-horses', 'Golden Horses', 'Sitio web responsivo para producto natural premium.', 'Proyecto que captura la esencia de un producto natural de alta calidad.', 'web', ARRAY['Next.js', 'TypeScript', 'Supabase'], 'https://goldenhorses.com', true),
  ('una-vida-tech', 'Una Vida .Tech', 'Portal de tecnología y lifestyle con blog y comunidad.', 'Sitio web dinámico y eficiente para comunidad de tecnología y lifestyle.', 'software', ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'], 'https://unavida.tech', true);
