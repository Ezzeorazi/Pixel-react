'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createProject, updateProject } from '@/app/actions/admin';

interface ProjectFormProps {
  project?: {
    id: string;
    name: string;
    description: string;
    full_description: string;
    category: string;
    technologies: string[];
    url?: string | null;
    image_url?: string | null;
    featured: boolean;
  };
}

const CATEGORIES = ['web', 'software', 'marketing', 'ecommerce'];

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [featured, setFeatured] = useState(project?.featured ?? false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set('featured', String(featured));
    setError('');

    startTransition(async () => {
      const result = project
        ? await updateProject(project.id, data)
        : await createProject(data);

      if (result?.ok === false) {
        const msgs = Object.values(result.errors ?? {}).flat();
        setError(msgs.join(' · ') || 'Error al guardar');
      } else {
        router.push('/admin/projects');
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Nombre del proyecto *">
          <input name="name" defaultValue={project?.name} required className={inputClass} />
        </Field>
        <Field label="Categoría *">
          <select name="category" defaultValue={project?.category ?? 'web'} className={selectClass}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Descripción corta *">
        <textarea name="description" defaultValue={project?.description} required rows={2} className={`${inputClass} resize-none`} />
      </Field>

      <Field label="Descripción completa">
        <textarea name="full_description" defaultValue={project?.full_description} rows={6} className={`${inputClass} resize-none`}
          placeholder="Descripción detallada del proyecto..." />
      </Field>

      <Field label="Tecnologías (separadas por coma) *">
        <input name="technologies" defaultValue={project?.technologies?.join(', ')} required className={inputClass}
          placeholder="Next.js, TypeScript, Supabase, Tailwind CSS" />
      </Field>

      <Field label="URL del sitio">
        <input type="url" name="url" defaultValue={project?.url ?? ''} className={inputClass}
          placeholder="https://ejemplo.com" />
      </Field>

      <Field label="Imagen (ej: /img/nombre-proyecto.webp)">
        <input name="image_url" defaultValue={project?.image_url ?? ''} className={inputClass}
          placeholder="/img/nombre-proyecto.webp" />
      </Field>

      <div className="flex items-center gap-3">
        <button type="button" onClick={() => setFeatured(!featured)}
          className={`relative w-11 h-6 rounded-full transition-colors ${featured ? 'bg-purple-600' : 'bg-white/10'}`}>
          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${featured ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        <span className="text-sm text-gray-300">Destacado en Home</span>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isPending}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all disabled:opacity-60">
          {isPending ? 'Guardando...' : project ? 'Actualizar' : 'Crear proyecto'}
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
