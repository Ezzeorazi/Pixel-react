'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createTeamMember, updateTeamMember } from '@/app/actions/admin';
import { ImageUpload } from '@/components/admin/ImageUpload';
import type { TeamMember } from '@/lib/types';

interface TeamMemberFormProps {
  member?: TeamMember;
}

export function TeamMemberForm({ member }: TeamMemberFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [active, setActive] = useState(member?.active ?? true);

  const fe = (key: string) => errors[key]?.[0];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set('active', String(active));
    setErrors({});

    startTransition(async () => {
      const result = member
        ? await updateTeamMember(member.id, data)
        : await createTeamMember(data);

      if (result?.ok === false) {
        setErrors(result.errors ?? {});
      } else {
        router.push('/admin/team');
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">

      {/* ── Español ── */}
      <section className="space-y-5">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">
          🇦🇷 Español
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Nombre *" error={fe('name')}>
            <input name="name" defaultValue={member?.name} required className={inputClass} placeholder="Ezequiel Orazi" />
          </Field>
          <Field label="Ocupación *" error={fe('role')}>
            <input name="role" defaultValue={member?.role} required className={inputClass} placeholder="Desarrollador Full Stack" />
          </Field>
        </div>

        <Field label="Descripción *" error={fe('bio')}>
          <textarea name="bio" defaultValue={member?.bio} required rows={3} className={`${inputClass} resize-none`}
            placeholder="Breve descripción de la persona y su rol en el equipo." />
        </Field>
      </section>

      {/* ── English ── */}
      <section className="space-y-5">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">
          🇺🇸 English <span className="text-gray-600 normal-case font-normal">(opcional — si no se completa, se usa el español)</span>
        </h2>

        <Field label="Role" error={fe('role_en')}>
          <input name="role_en" defaultValue={member?.role_en ?? ''} className={inputClass} placeholder="Full Stack Developer" />
        </Field>

        <Field label="Bio" error={fe('bio_en')}>
          <textarea name="bio_en" defaultValue={member?.bio_en ?? ''} rows={3} className={`${inputClass} resize-none`}
            placeholder="Short bio in English..." />
        </Field>
      </section>

      {/* ── Shared fields ── */}
      <section className="space-y-5">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/10 pb-2">
          Datos compartidos
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Enlace a GitHub" error={fe('github_url')}>
            <input name="github_url" defaultValue={member?.github_url ?? ''} className={inputClass}
              placeholder="https://github.com/usuario" />
          </Field>
          <Field label="Enlace a LinkedIn" error={fe('linkedin_url')}>
            <input name="linkedin_url" defaultValue={member?.linkedin_url ?? ''} className={inputClass}
              placeholder="https://www.linkedin.com/in/usuario" />
          </Field>
        </div>

        <Field label="Orden de visualización" error={fe('sort_order')}>
          <input type="number" name="sort_order" defaultValue={member?.sort_order ?? 0} min={0} className={`${inputClass} sm:max-w-48`} />
        </Field>

        <Field label="Foto (opcional — si no se sube, se muestran las iniciales)" error={fe('photo_url')}>
          <ImageUpload name="photo_url" defaultValue={member?.photo_url} folder="team" />
        </Field>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setActive(!active)}
            className={`relative w-11 h-6 rounded-full transition-colors ${active ? 'bg-green-600' : 'bg-white/10'}`}>
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${active ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className="text-sm text-gray-300">Activo (visible en el sitio)</span>
        </div>
      </section>

      {errors._ && <p className="text-red-400 text-sm">{errors._[0]}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isPending}
          className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all disabled:opacity-60">
          {isPending ? 'Guardando...' : member ? 'Actualizar miembro' : 'Crear miembro'}
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

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
