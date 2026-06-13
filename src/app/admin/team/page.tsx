import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { createAdminClient } from '@/lib/supabase/admin';
import { deleteTeamMember } from '@/app/actions/admin';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { DeleteButton } from '@/components/admin/DeleteButton';

async function getAllTeamMembers() {
  const supabase = await createAdminClient();
  const { data } = await supabase
    .from('team_members')
    .select('*')
    .order('sort_order', { ascending: true });
  return data ?? [];
}

export default async function AdminTeamPage() {
  const members = await getAllTeamMembers();

  return (
    <AdminGuard>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Equipo</h1>
            <p className="text-gray-400 mt-1">{members.length} miembros en total</p>
          </div>
          <Link
            href="/admin/team/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" /> Nuevo miembro
          </Link>
        </div>

        <div className="bg-[#18181c] rounded-2xl border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Miembro</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">GitHub</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Orden</th>
                <th className="px-4 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {members.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No hay miembros todavía.{' '}
                    <Link href="/admin/team/new" className="text-purple-400 hover:text-purple-300">
                      Crear el primero →
                    </Link>
                  </td>
                </tr>
              )}
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium text-sm">{member.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{member.role}</p>
                  </td>
                  <td className="px-4 py-4">
                    {member.github_url ? (
                      <a href={member.github_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-xs">
                        <SiGithub className="w-3.5 h-3.5" /> Ver perfil
                      </a>
                    ) : (
                      <span className="text-gray-600 text-xs">Sin enlace</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      member.active
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                    }`}>
                      {member.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-gray-500">#{member.sort_order}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/admin/team/${member.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteButton
                        action={deleteTeamMember.bind(null, member.id)}
                        confirm="¿Eliminar este miembro?"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminGuard>
  );
}
