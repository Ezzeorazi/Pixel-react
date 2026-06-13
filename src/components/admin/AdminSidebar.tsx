'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Briefcase, Mail, LogOut, Settings2, SlidersHorizontal, Users } from 'lucide-react';
import { logout } from '@/app/actions/admin';

const links = [
  { href: '/admin',            label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/admin/blog',       label: 'Blog',            icon: FileText },
  { href: '/admin/projects',   label: 'Proyectos',       icon: Briefcase },
  { href: '/admin/services',   label: 'Servicios',       icon: Settings2 },
  { href: '/admin/team',       label: 'Equipo',          icon: Users },
  { href: '/admin/messages',   label: 'Mensajes',        icon: Mail },
  { href: '/admin/settings',   label: 'Configuración',   icon: SlidersHorizontal },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-[#0a0a0c] border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <span className="font-black text-lg tracking-tight text-white">
          PIXEL<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">MAKER</span>
        </span>
        <p className="text-xs text-gray-500 mt-0.5">Panel de administración</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
