'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function login(email: string, password: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function logout() {
  const supabase = await createAdminClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

// ── Blog ──────────────────────────────────────────────────────────────────────

export async function createPost(data: FormData) {
  const supabase = await createAdminClient();
  const payload = {
    title:      data.get('title') as string,
    excerpt:    data.get('excerpt') as string,
    content:    data.get('content') as string,
    category:   data.get('category') as string,
    locale:     data.get('locale') as string,
    date:       data.get('date') as string,
    read_time:  Number(data.get('read_time')),
    slug:       slugify(data.get('title') as string),
    published:  data.get('published') === 'true',
  };
  const { error } = await supabase.from('blog_posts').insert([payload]);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/blog');
  return { ok: true };
}

export async function updatePost(id: string, data: FormData) {
  const supabase = await createAdminClient();
  const payload = {
    title:      data.get('title') as string,
    excerpt:    data.get('excerpt') as string,
    content:    data.get('content') as string,
    category:   data.get('category') as string,
    locale:     data.get('locale') as string,
    date:       data.get('date') as string,
    read_time:  Number(data.get('read_time')),
    published:  data.get('published') === 'true',
  };
  const { error } = await supabase.from('blog_posts').update(payload).eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/blog');
  return { ok: true };
}

export async function deletePost(id: string) {
  const supabase = await createAdminClient();
  await supabase.from('blog_posts').delete().eq('id', id);
  revalidatePath('/admin/blog');
}

export async function togglePublished(id: string, current: boolean) {
  const supabase = await createAdminClient();
  await supabase.from('blog_posts').update({ published: !current }).eq('id', id);
  revalidatePath('/admin/blog');
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function createProject(data: FormData) {
  const supabase = await createAdminClient();
  const payload = {
    name:             data.get('name') as string,
    description:      data.get('description') as string,
    full_description: data.get('full_description') as string,
    category:         data.get('category') as string,
    technologies:     (data.get('technologies') as string).split(',').map((t) => t.trim()).filter(Boolean),
    url:              data.get('url') as string || null,
    featured:         data.get('featured') === 'true',
    slug:             slugify(data.get('name') as string),
  };
  const { error } = await supabase.from('projects').insert([payload]);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/projects');
  return { ok: true };
}

export async function updateProject(id: string, data: FormData) {
  const supabase = await createAdminClient();
  const payload = {
    name:             data.get('name') as string,
    description:      data.get('description') as string,
    full_description: data.get('full_description') as string,
    category:         data.get('category') as string,
    technologies:     (data.get('technologies') as string).split(',').map((t) => t.trim()).filter(Boolean),
    url:              data.get('url') as string || null,
    featured:         data.get('featured') === 'true',
  };
  const { error } = await supabase.from('projects').update(payload).eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/projects');
  return { ok: true };
}

export async function deleteProject(id: string) {
  const supabase = await createAdminClient();
  await supabase.from('projects').delete().eq('id', id);
  revalidatePath('/admin/projects');
}

// ── Messages ──────────────────────────────────────────────────────────────────

export async function markRead(id: string) {
  const supabase = await createAdminClient();
  await supabase.from('contact_messages').update({ read: true }).eq('id', id);
  revalidatePath('/admin/messages');
}

export async function deleteMessage(id: string) {
  const supabase = await createAdminClient();
  await supabase.from('contact_messages').delete().eq('id', id);
  revalidatePath('/admin/messages');
}

// ── Utils ─────────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
