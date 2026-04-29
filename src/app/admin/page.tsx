import Link from 'next/link';
import { FileText, Briefcase, Mail, Plus } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';
import { AdminGuard } from '@/components/admin/AdminGuard';

async function getStats() {
  const supabase = await createAdminClient();
  const [posts, projects, messages] = await Promise.all([
    supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('read', false),
  ]);
  return {
    posts: posts.count ?? 0,
    projects: projects.count ?? 0,
    unreadMessages: messages.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: 'Artículos de blog', value: stats.posts,          icon: FileText,  href: '/admin/blog',     color: 'purple' },
    { label: 'Proyectos',         value: stats.projects,       icon: Briefcase, href: '/admin/projects', color: 'pink' },
    { label: 'Mensajes nuevos',   value: stats.unreadMessages, icon: Mail,      href: '/admin/messages', color: 'fuchsia' },
  ];

  const quickLinks = [
    { label: 'Nuevo artículo', href: '/admin/blog/new',        icon: Plus },
    { label: 'Nuevo proyecto', href: '/admin/projects/new',    icon: Plus },
  ];

  return (
    <AdminGuard>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Bienvenido al panel de Pixel Maker</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {cards.map(({ label, value, icon: Icon, href, color }) => (
            <Link
              key={href}
              href={href}
              className="bg-[#18181c] rounded-2xl border border-white/5 p-6 hover:border-purple-500/30 hover:shadow-[0_0_25px_rgba(168,85,247,0.08)] transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  color === 'purple' ? 'bg-purple-600/20' :
                  color === 'pink'   ? 'bg-pink-600/20'   : 'bg-fuchsia-600/20'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    color === 'purple' ? 'text-purple-400' :
                    color === 'pink'   ? 'text-pink-400'   : 'text-fuchsia-400'
                  }`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="text-sm text-gray-400 mt-1">{label}</p>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Acciones rápidas</h2>
          <div className="flex gap-3">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
              >
                <Icon className="w-4 h-4" /> {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
