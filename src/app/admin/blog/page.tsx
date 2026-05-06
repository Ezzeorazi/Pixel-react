import Link from 'next/link';
import { Plus, Pencil, Eye, EyeOff } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';
import { deletePost, togglePublished } from '@/app/actions/admin';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { DeleteButton } from '@/components/admin/DeleteButton';

async function getPosts() {
  const supabase = await createAdminClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function AdminBlogPage() {
  const posts = await getPosts();

  return (
    <AdminGuard>
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog</h1>
          <p className="text-gray-400 mt-1">{posts.length} artículos en total</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" /> Nuevo artículo
        </Link>
      </div>

      <div className="bg-[#18181c] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Título</th>
              <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Idioma</th>
              <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Categoría</th>
              <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
              <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Fecha</th>
              <th className="px-4 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No hay artículos todavía.{' '}
                  <Link href="/admin/blog/new" className="text-purple-400 hover:text-purple-300">
                    Crear el primero →
                  </Link>
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-white/2 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-white font-medium text-sm line-clamp-1">{post.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{post.excerpt}</p>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 uppercase font-semibold">
                    {post.locale}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-400">{post.category}</td>
                <td className="px-4 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    post.published
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {post.published ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-400">{post.date}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <form action={togglePublished.bind(null, post.id, post.published)}>
                      <button type="submit" title={post.published ? 'Despublicar' : 'Publicar'}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </form>
                    <Link href={`/admin/blog/${post.id}`}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteButton
                      action={deletePost.bind(null, post.id)}
                      confirm="¿Eliminar este artículo?"
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
