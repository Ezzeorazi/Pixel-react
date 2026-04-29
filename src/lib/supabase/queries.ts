import { createClient } from './server';
import { SAMPLE_POSTS, SAMPLE_POSTS_EN, SAMPLE_PROJECTS } from '@/lib/data';
import type { BlogPost, Project, ContactMessage, Locale } from '@/lib/types';

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

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data?.length) return SAMPLE_PROJECTS;
    return data as Project[];
  } catch {
    return SAMPLE_PROJECTS;
  }
}

export async function getProject(slug: string): Promise<Project | null> {
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
    return data as Project;
  } catch {
    return SAMPLE_PROJECTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error || !data?.length) return SAMPLE_PROJECTS.filter((p) => p.featured);
    return data as Project[];
  } catch {
    return SAMPLE_PROJECTS.filter((p) => p.featured);
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
