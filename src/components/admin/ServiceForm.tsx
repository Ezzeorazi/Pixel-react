'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createService, updateService } from '@/app/actions/admin';
import type { Service } from '@/lib/types';

interface ServiceFormProps {
  service?: Service;
}

const ICONS = ['Code', 'Layers', 'ShoppingBag', 'BarChart2', 'Megaphone', 'Search', 'Wrench', 'Lightbulb', 'Globe', 'Zap', 'Shield', 'Star'];
const COLORS = ['purple', 'pink', 'fuchsia'] as const;

export function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [featured, setFeatured] = useState(service?.featured ?? false);
  const [active, setActive] = useState(service?.active ?? true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set('featured', String(featured));
    data.set('active', String(active));
    setError('');

    startTransition(async () => {
      const result = service
        ? await updateService(service.id, data)
        : await createService(data);

      if (result?.ok === false) {
        setError(result.error ?? 'Error al guardar');
      } else {
        router.push('/admin/services');
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Nombre del servicio *">
          <input name="name" defaultValue={service?.name} required className={inputClass} />
        </Field>
        <Field label="Ícono">
          <select name="icon" defaultValue={service?.icon ?? 'Code'} className={selectClass}>
            {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Color">
          <select name="color" defaultValue={service?.color ?? 'purple'} className={selectClass}>
            {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Orden de visualización">
          <input type="number" name="sort_order" defaultValue={service?.sort_order ?? 0} min={0} className={inputClass} />
        </Field>
      </div>

      <Field label="Descripción corta *">
        <textarea name="description" defaultValue={service?.description} required rows={2} className={`${inputClass} resize-none`} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Precio (número, ej: 500)">
          <input type="number" name="price" defaultValue={service?.price ?? ''} min={0} step={0.01} className={inputClass}
            placeholder="500" />
        </Field>
        <Field label="Etiqueta de precio (ej: desde $500 USD)">
          <input name="price_label" defaultValue={service?.price_label ?? ''} className={inputClass}
            placeholder="desde $500 USD" />
        </Field>
      </div>

      <Field label="Características incluidas (una por línea)">
        <textarea name="features" defaultValue={service?.features?.join('\n')} rows={6} className={`${inputClass} resize-none`}
          placeholder={'Diseño personalizado\nResponsive mobile-first\nSEO básico incluido'} />
      </Field>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setFeatured(!featured)}
            className={`relative w-11 h-6 rounded-full transition-colors ${featured ? 'bg-purple-600' : 'bg-white/10'}`}>
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${featured ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className="text-sm text-gray-300">Destacado en Home</span>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setActive(!active)}
            className={`relative w-11 h-6 rounded-full transition-colors ${active ? 'bg-green-600' : 'bg-white/10'}`}>
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${active ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className="text-sm text-gray-300">Activo (visible en el sitio)</span>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isPending}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all disabled:opacity-60">
          {isPending ? 'Guardando...' : service ? 'Actualizar servicio' : 'Crear servicio'}
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
