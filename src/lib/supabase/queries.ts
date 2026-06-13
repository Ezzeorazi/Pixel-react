import { createClient } from './server';
import { SAMPLE_POSTS, SAMPLE_POSTS_EN, SAMPLE_PROJECTS, FALLBACK_TEAM } from '@/lib/data';
import type { BlogPost, Project, ContactMessage, Locale, Service, SiteSettings, TeamMember } from '@/lib/types';

// ── Helpers ───────────────────────────────────────────────────────────────────

function localizeProject(p: Project, locale: Locale): Project {
  if (locale !== 'en') return p;
  return {
    ...p,
    name:             p.name_en             || p.name,
    description:      p.description_en      || p.description,
    full_description: p.full_description_en || p.full_description,
  };
}

function localizeService(s: Service, locale: Locale): Service {
  if (locale !== 'en') return s;
  return {
    ...s,
    name:        s.name_en        || s.name,
    description: s.description_en || s.description,
    features:    s.features_en    || s.features,
  };
}

function localizeTeamMember(m: TeamMember, locale: Locale): TeamMember {
  if (locale !== 'en') return m;
  return {
    ...m,
    role: m.role_en || m.role,
    bio:  m.bio_en  || m.bio,
  };
}

// ── Blog ──────────────────────────────────────────────────────────────────────

export async function getBlogPosts(locale: Locale): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('locale', locale)
      .eq('published', true)
      .order('date', { ascending: false });

    if (error || !data?.length) {
      return locale === 'es' ? SAMPLE_POSTS : SAMPLE_POSTS_EN;
    }
    return data as BlogPost[];
  } catch {
    return locale === 'es' ? SAMPLE_POSTS : SAMPLE_POSTS_EN;
  }
}

export async function getBlogPost(slug: string, locale: Locale): Promise<BlogPost | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('locale', locale)
      .eq('published', true)
      .single();

    if (error || !data) {
      const fallback = locale === 'es' ? SAMPLE_POSTS : SAMPLE_POSTS_EN;
      return fallback.find((p) => p.slug === slug) ?? null;
    }
    return data as BlogPost;
  } catch {
    const fallback = locale === 'es' ? SAMPLE_POSTS : SAMPLE_POSTS_EN;
    return fallback.find((p) => p.slug === slug) ?? null;
  }
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function getProjects(locale: Locale = 'es'): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data?.length) return SAMPLE_PROJECTS;
    return (data as Project[]).map((p) => localizeProject(p, locale));
  } catch {
    return SAMPLE_PROJECTS;
  }
}

export async function getProject(slug: string, locale: Locale = 'es'): Promise<Project | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return SAMPLE_PROJECTS.find((p) => p.slug === slug) ?? null;
    }
    return localizeProject(data as Project, locale);
  } catch {
    return SAMPLE_PROJECTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getFeaturedProjects(locale: Locale = 'es'): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error || !data?.length) return SAMPLE_PROJECTS.filter((p) => p.featured);
    return (data as Project[]).map((p) => localizeProject(p, locale));
  } catch {
    return SAMPLE_PROJECTS.filter((p) => p.featured);
  }
}

// ── Services ──────────────────────────────────────────────────────────────────

export async function getServices(locale: Locale = 'es'): Promise<Service[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error || !data?.length) return [];
    return (data as Service[]).map((s) => localizeService(s, locale));
  } catch {
    return [];
  }
}

export async function getService(slug: string, locale: Locale = 'es'): Promise<Service | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();

    if (error || !data) return null;
    return localizeService(data as Service, locale);
  } catch {
    return null;
  }
}

export async function getFeaturedServices(locale: Locale = 'es'): Promise<Service[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .eq('featured', true)
      .order('sort_order', { ascending: true })
      .limit(6);

    if (error || !data?.length) return [];
    return (data as Service[]).map((s) => localizeService(s, locale));
  } catch {
    return [];
  }
}

// ── Team ──────────────────────────────────────────────────────────────────────

export async function getTeamMembers(locale: Locale = 'es'): Promise<TeamMember[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error || !data?.length) return FALLBACK_TEAM.map((m) => localizeTeamMember(m, locale));
    return (data as TeamMember[]).map((m) => localizeTeamMember(m, locale));
  } catch {
    return FALLBACK_TEAM.map((m) => localizeTeamMember(m, locale));
  }
}

// ── Site Settings ─────────────────────────────────────────────────────────────

export async function getPublicSettings(): Promise<SiteSettings | null> {
  try {
    const supabase = await createClient();
    // Solo columnas públicas — nunca notification_email ni chat_instructions,
    // que se leen server-side para no exponerlas al navegador.
    const { data } = await supabase
      .from('site_settings')
      .select('whatsapp1, whatsapp2, facebook, instagram, email, chat_enabled')
      .limit(1)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

// ── Contact ───────────────────────────────────────────────────────────────────

export async function sendContactMessage(message: ContactMessage): Promise<{ ok: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('contact_messages').insert([message]);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
