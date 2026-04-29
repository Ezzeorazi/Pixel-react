import Link from 'next/link';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';
import { deleteProject } from '@/app/actions/admin';

async function getProjects() {
  const supabase = await createAdminClient();
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  return data ?? [];
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Proyectos</h1>
          <p className="text-gray-400 mt-1">{projects.length} proyectos en total</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" /> Nuevo proyecto
        </Link>
      </div>

      <div className="bg-[#18181c] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Proyecto</th>
              <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Categoría</th>
              <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tecnologías</th>
              <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Destacado</th>
              <th className="px-4 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No hay proyectos todavía.{' '}
                  <Link href="/admin/projects/new" className="text-purple-400 hover:text-purple-300">
                    Crear el primero →
                  </Link>
                </td>
              </tr>
            )}
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-white/2 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-white font-medium text-sm">{project.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{project.description}</p>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">{project.category}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {(project.technologies ?? []).slice(0, 2).map((t: string) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-purple-600/10 text-purple-400">{t}</span>
                    ))}
                    {(project.technologies ?? []).length > 2 && (
                      <span className="text-xs text-gray-500">+{project.technologies.length - 2}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  {project.featured && <Star className="w-4 h-4 text-yellow-400" />}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/admin/projects/${project.id}`}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <form action={deleteProject.bind(null, project.id)}>
                      <button type="submit" title="Eliminar"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                        onClick={(e) => { if (!confirm('¿Eliminar este proyecto?')) e.preventDefault(); }}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
