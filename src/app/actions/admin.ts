'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAdminClient, getSession } from '@/lib/supabase/admin';
import { createServiceClient } from '@/lib/supabase/service';
import { BlogPostSchema, ProjectSchema, ServiceSchema, SiteSettingsSchema, ChatSecretsSchema } from '@/lib/schemas';

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
  const result = BlogPostSchema.safeParse({
    title:     data.get('title'),
    excerpt:   data.get('excerpt'),
    content:   data.get('content'),
    category:  data.get('category'),
    locale:    data.get('locale'),
    date:      data.get('date'),
    read_time: data.get('read_time'),
    image_url: data.get('image_url') || null,
    published: data.get('published') === 'true',
    keywords:  data.get('keywords') || null,
  });

  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.from('blog_posts').insert([{
    ...result.data,
    slug: slugify(result.data.title),
  }]);

  if (error) return { ok: false, errors: { _: [error.message] } };
  revalidatePath('/admin/blog');
  revalidatePath('/es/blog');
  revalidatePath('/en/blog');
  return { ok: true };
}

export async function updatePost(id: string, data: FormData) {
  const result = BlogPostSchema.safeParse({
    title:     data.get('title'),
    excerpt:   data.get('excerpt'),
    content:   data.get('content'),
    category:  data.get('category'),
    locale:    data.get('locale'),
    date:      data.get('date'),
    read_time: data.get('read_time'),
    image_url: data.get('image_url') || null,
    published: data.get('published') === 'true',
    keywords:  data.get('keywords') || null,
  });

  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.from('blog_posts').update({
    ...result.data,
    updated_at: new Date().toISOString(),
  }).eq('id', id);
  if (error) return { ok: false, errors: { _: [error.message] } };
  revalidatePath('/admin/blog');
  revalidatePath('/es/blog');
  revalidatePath('/en/blog');
  return { ok: true };
}

export async function deletePost(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/blog');
  revalidatePath('/es/blog');
  revalidatePath('/en/blog');
  return { ok: true };
}

export async function togglePublished(id: string, current: boolean) {
  const supabase = await createAdminClient();
  await supabase.from('blog_posts').update({ published: !current }).eq('id', id);
  revalidatePath('/admin/blog');
  revalidatePath('/es/blog');
  revalidatePath('/en/blog');
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function createProject(data: FormData) {
  const result = ProjectSchema.safeParse({
    name:                data.get('name'),
    description:         data.get('description'),
    full_description:    data.get('full_description'),
    category:            data.get('category'),
    technologies:        data.get('technologies'),
    url:                 data.get('url') || null,
    image_url:           data.get('image_url') || null,
    featured:            data.get('featured') === 'true',
    name_en:             data.get('name_en') || null,
    description_en:      data.get('description_en') || null,
    full_description_en: data.get('full_description_en') || null,
  });

  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  const slug = slugify(result.data.name);
  const supabase = await createAdminClient();

  const { data: existing } = await supabase
    .from('projects')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (existing) {
    return { ok: false, errors: { name: ['Ya existe un proyecto con ese nombre'] } };
  }

  const { error } = await supabase.from('projects').insert([{ ...result.data, slug }]);

  if (error) return { ok: false, errors: { _: [error.message] } };
  revalidatePath('/admin/projects');
  revalidatePath('/es/projects');
  revalidatePath('/en/projects');
  return { ok: true };
}

export async function updateProject(id: string, data: FormData) {
  const result = ProjectSchema.safeParse({
    name:                data.get('name'),
    description:         data.get('description'),
    full_description:    data.get('full_description'),
    category:            data.get('category'),
    technologies:        data.get('technologies'),
    url:                 data.get('url') || null,
    image_url:           data.get('image_url') || null,
    featured:            data.get('featured') === 'true',
    name_en:             data.get('name_en') || null,
    description_en:      data.get('description_en') || null,
    full_description_en: data.get('full_description_en') || null,
  });

  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.from('projects').update(result.data).eq('id', id);
  if (error) return { ok: false, errors: { _: [error.message] } };
  revalidatePath('/admin/projects');
  revalidatePath('/es/projects');
  revalidatePath('/en/projects');
  return { ok: true };
}

export async function deleteProject(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/projects');
  revalidatePath('/es/projects');
  revalidatePath('/en/projects');
  return { ok: true };
}

// ── Services ──────────────────────────────────────────────────────────────────

export async function createService(data: FormData) {
  const result = ServiceSchema.safeParse({
    name:           data.get('name'),
    description:    data.get('description'),
    icon:           data.get('icon'),
    color:          data.get('color'),
    price:          data.get('price') || null,
    price_label:    data.get('price_label') || null,
    features:       data.get('features'),
    featured:       data.get('featured') === 'true',
    active:         data.get('active') === 'true',
    sort_order:     data.get('sort_order') ?? 0,
    name_en:        data.get('name_en') || null,
    description_en: data.get('description_en') || null,
    features_en:    data.get('features_en') || null,
  });

  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.from('services').insert([{
    ...result.data,
    slug: slugify(result.data.name),
  }]);

  if (error) return { ok: false, errors: { _: [error.message] } };
  revalidatePath('/admin/services');
  return { ok: true };
}

export async function updateService(id: string, data: FormData) {
  const result = ServiceSchema.safeParse({
    name:           data.get('name'),
    description:    data.get('description'),
    icon:           data.get('icon'),
    color:          data.get('color'),
    price:          data.get('price') || null,
    price_label:    data.get('price_label') || null,
    features:       data.get('features'),
    featured:       data.get('featured') === 'true',
    active:         data.get('active') === 'true',
    sort_order:     data.get('sort_order') ?? 0,
    name_en:        data.get('name_en') || null,
    description_en: data.get('description_en') || null,
    features_en:    data.get('features_en') || null,
  });

  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.from('services').update(result.data).eq('id', id);
  if (error) return { ok: false, errors: { _: [error.message] } };
  revalidatePath('/admin/services');
  return { ok: true };
}

export async function deleteService(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/services');
  return { ok: true };
}

// ── Messages ──────────────────────────────────────────────────────────────────

export async function markRead(id: string) {
  const supabase = await createAdminClient();
  await supabase.from('contact_messages').update({ read: true }).eq('id', id);
  revalidatePath('/admin/messages');
}

export async function deleteMessage(id: string) {
  const supabase = await createAdminClient();
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/messages');
  return { ok: true };
}

// ── Site Settings ─────────────────────────────────────────────────────────────

export async function getSettings() {
  const supabase = await createAdminClient();
  const { data } = await supabase.from('site_settings').select('*').limit(1).single();
  return data ?? null;
}

export async function upsertSettings(formData: FormData) {
  const result = SiteSettingsSchema.safeParse({
    whatsapp1: formData.get('whatsapp1') || null,
    whatsapp2: formData.get('whatsapp2') || null,
    facebook:  formData.get('facebook') || null,
    instagram: formData.get('instagram') || null,
    email:     formData.get('email') || null,
    chat_enabled:       formData.get('chat_enabled') === 'true',
    chat_instructions:  formData.get('chat_instructions') || null,
    notification_email: formData.get('notification_email') || null,
  });

  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  const supabase = await createAdminClient();
  const payload = { ...result.data, updated_at: new Date().toISOString() };
  const { data: existing } = await supabase.from('site_settings').select('id').limit(1).single();

  if (existing?.id) {
    await supabase.from('site_settings').update(payload).eq('id', existing.id);
  } else {
    await supabase.from('site_settings').insert([payload]);
  }

  revalidatePath('/admin/settings');
  return { ok: true };
}

// ── Chatbot secrets (API keys) ──────────────────────────────────────────────
// Se guardan en app_secrets, una tabla con RLS bloqueada para anon. El acceso
// pasa por el cliente service-role, por lo que SIEMPRE validamos la sesión admin
// antes de leer o escribir.

/** Devuelve solo si cada key está configurada — nunca el valor en claro. */
export async function getSecretsStatus() {
  const session = await getSession();
  if (!session) return { groqSet: false, resendSet: false };

  const svc = createServiceClient();
  const { data } = await svc
    .from('app_secrets')
    .select('groq_api_key, resend_api_key')
    .limit(1)
    .single();

  return {
    groqSet:   Boolean(data?.groq_api_key),
    resendSet: Boolean(data?.resend_api_key),
  };
}

export async function upsertSecrets(formData: FormData) {
  const session = await getSession();
  if (!session) return { ok: false, error: 'No autorizado' };

  // Campos vacíos => no se tocan (para no borrar una key ya guardada al editar).
  const groqRaw   = (formData.get('groq_api_key') as string | null)?.trim() || null;
  const resendRaw = (formData.get('resend_api_key') as string | null)?.trim() || null;

  const result = ChatSecretsSchema.safeParse({
    groq_api_key:   groqRaw,
    resend_api_key: resendRaw,
  });
  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  const patch: Record<string, string> = { updated_at: new Date().toISOString() };
  if (result.data.groq_api_key)   patch.groq_api_key   = result.data.groq_api_key;
  if (result.data.resend_api_key) patch.resend_api_key = result.data.resend_api_key;

  const svc = createServiceClient();
  const { data: existing } = await svc.from('app_secrets').select('id').limit(1).single();

  if (existing?.id) {
    await svc.from('app_secrets').update(patch).eq('id', existing.id);
  } else {
    await svc.from('app_secrets').insert([patch]);
  }

  revalidatePath('/admin/settings');
  return { ok: true };
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
