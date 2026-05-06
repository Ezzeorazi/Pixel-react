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

// ── Services ──────────────────────────────────────────────────────────────────

export async function createService(data: FormData) {
  const supabase = await createAdminClient();
  const priceRaw = data.get('price') as string;
  const payload = {
    name:        data.get('name') as string,
    description: data.get('description') as string,
    icon:        data.get('icon') as string,
    color:       data.get('color') as string,
    price:       priceRaw ? parseFloat(priceRaw) : null,
    price_label: (data.get('price_label') as string) || null,
    features:    (data.get('features') as string).split('\n').map((f) => f.trim()).filter(Boolean),
    featured:    data.get('featured') === 'true',
    active:      data.get('active') === 'true',
    sort_order:  Number(data.get('sort_order') ?? 0),
    slug:        slugify(data.get('name') as string),
  };
  const { error } = await supabase.from('services').insert([payload]);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/services');
  return { ok: true };
}

export async function updateService(id: string, data: FormData) {
  const supabase = await createAdminClient();
  const priceRaw = data.get('price') as string;
  const payload = {
    name:        data.get('name') as string,
    description: data.get('description') as string,
    icon:        data.get('icon') as string,
    color:       data.get('color') as string,
    price:       priceRaw ? parseFloat(priceRaw) : null,
    price_label: (data.get('price_label') as string) || null,
    features:    (data.get('features') as string).split('\n').map((f) => f.trim()).filter(Boolean),
    featured:    data.get('featured') === 'true',
    active:      data.get('active') === 'true',
    sort_order:  Number(data.get('sort_order') ?? 0),
  };
  const { error } = await supabase.from('services').update(payload).eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/services');
  return { ok: true };
}

export async function deleteService(id: string) {
  const supabase = await createAdminClient();
  await supabase.from('services').delete().eq('id', id);
  revalidatePath('/admin/services');
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

// ── Site Settings ─────────────────────────────────────────────────────────────

export async function getSettings() {
  const supabase = await createAdminClient();
  const { data } = await supabase.from('site_settings').select('*').limit(1).single();
  return data ?? null;
}

export async function upsertSettings(formData: FormData) {
  const supabase = await createAdminClient();
  const payload = {
    whatsapp1: (formData.get('whatsapp1') as string) || null,
    whatsapp2: (formData.get('whatsapp2') as string) || null,
    facebook:  (formData.get('facebook') as string) || null,
    instagram: (formData.get('instagram') as string) || null,
    email:     (formData.get('email') as string) || null,
    updated_at: new Date().toISOString(),
  };
  const { data: existing } = await supabase.from('site_settings').select('id').limit(1).single();
  if (existing?.id) {
    await supabase.from('site_settings').update(payload).eq('id', existing.id);
  } else {
    await supabase.from('site_settings').insert([payload]);
  }
  revalidatePath('/admin/settings');
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
