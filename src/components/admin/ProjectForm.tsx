'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createProject, updateProject } from '@/app/actions/admin';
import { ImageUpload } from '@/components/admin/ImageUpload';

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
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [featured, setFeatured] = useState(project?.featured ?? false);

  const fe = (key: string) => errors[key]?.[0];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set('featured', String(featured));
    setErrors({});

    startTransition(async () => {
      const result = project
        ? await updateProject(project.id, data)
        : await createProject(data);

      if (result?.ok === false) {
        setErrors(result.errors ?? {});
      } else {
        router.push('/admin/projects');
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Nombre del proyecto *" error={fe('name')}>
          <input name="name" defaultValue={project?.name} required className={inputClass} />
        </Field>
        <Field label="Categoría *" error={fe('category')}>
          <select name="category" defaultValue={project?.category ?? 'web'} className={selectClass}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Descripción corta *" error={fe('description')}>
        <textarea name="description" defaultValue={project?.description} required rows={2} className={`${inputClass} resize-none`} />
      </Field>

      <Field label="Descripción completa" error={fe('full_description')}>
        <textarea name="full_description" defaultValue={project?.full_description} rows={6} className={`${inputClass} resize-none`}
          placeholder="Descripción detallada del proyecto..." />
      </Field>

      <Field label="Tecnologías (separadas por coma) *" error={fe('technologies')}>
        <input name="technologies" defaultValue={project?.technologies?.join(', ')} required className={inputClass}
          placeholder="Next.js, TypeScript, Supabase, Tailwind CSS" />
      </Field>

      <Field label="URL del sitio" error={fe('url')}>
        <input type="url" name="url" defaultValue={project?.url ?? ''} className={inputClass}
          placeholder="https://ejemplo.com" />
      </Field>

      <Field label="Imagen del proyecto" error={fe('image_url')}>
        <ImageUpload name="image_url" defaultValue={project?.image_url} folder="projects" />
      </Field>

      <div className="flex items-center gap-3">
        <button type="button" onClick={() => setFeatured(!featured)}
          className={`relative w-11 h-6 rounded-full transition-colors ${featured ? 'bg-purple-600' : 'bg-white/10'}`}>
          <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${featured ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        <span className="text-sm text-gray-300">Destacado en Home</span>
      </div>

      {errors._ && <p className="text-red-400 text-sm">{errors._[0]}</p>}

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

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
