'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/app/actions/admin';

interface PostFormProps {
  post?: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    locale: string;
    date: string;
    read_time: number;
    image_url?: string | null;
    published: boolean;
  };
}

const CATEGORIES = ['development', 'marketing', 'business', 'seo', 'general'];

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [published, setPublished] = useState(post?.published ?? false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set('published', String(published));
    setError('');

    startTransition(async () => {
      const result = post
        ? await updatePost(post.id, data)
        : await createPost(data);

      if (result?.ok === false) {
        const msgs = Object.values(result.errors ?? {}).flat();
        setError(msgs.join(' · ') || 'Error al guardar');
      } else {
        router.push('/admin/blog');
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Idioma *">
          <select name="locale" defaultValue={post?.locale ?? 'es'} className={selectClass}>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </Field>
        <Field label="Categoría *">
          <select name="category" defaultValue={post?.category ?? 'general'} className={selectClass}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Título *">
        <input name="title" defaultValue={post?.title} required className={inputClass} />
      </Field>

      <Field label="Extracto *">
        <textarea name="excerpt" defaultValue={post?.excerpt} required rows={3} className={`${inputClass} resize-none`} />
      </Field>

      <Field label="URL de imagen (ej: /img/blog/mi-imagen.webp)">
        <input
          name="image_url"
          defaultValue={post?.image_url ?? ''}
          placeholder="/img/blog/nombre-imagen.webp"
          className={inputClass}
        />
      </Field>

      <Field label="Contenido">
        <textarea name="content" defaultValue={post?.content} rows={12} className={`${inputClass} resize-none font-mono text-sm`}
          placeholder="Escribí el contenido del artículo acá..." />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Fecha *">
          <input type="date" name="date" defaultValue={post?.date ?? new Date().toISOString().slice(0, 10)} required className={inputClass} />
        </Field>
        <Field label="Tiempo de lectura (min) *">
          <input type="number" name="read_time" defaultValue={post?.read_time ?? 5} min={1} max={60} required className={inputClass} />
        </Field>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={() => setPublished(!published)}
          className={`relative w-11 h-6 rounded-full transition-colors ${published ? 'bg-purple-600' : 'bg-white/10'}`}>
          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${published ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        <span className="text-sm text-gray-300">{published ? 'Publicado' : 'Borrador'}</span>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isPending}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all disabled:opacity-60">
          {isPending ? 'Guardando...' : post ? 'Actualizar' : 'Crear artículo'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-2.5 text-sm font-semibold text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  );
}

const inputClass = 'w-full px-4 py-2.5 rounded-lg bg-[#0a0a0c] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors text-sm';
const selectClass = `${inputClass} cursor-pointer`;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
