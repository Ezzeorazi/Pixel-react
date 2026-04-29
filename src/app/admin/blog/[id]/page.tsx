import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PostForm } from '@/components/admin/PostForm';
import { createAdminClient } from '@/lib/supabase/admin';
import { AdminGuard } from '@/components/admin/AdminGuard';

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createAdminClient();
  const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single();
  if (!post) notFound();

  return (
    <AdminGuard>
      <div>
        <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al blog
        </Link>
        <h1 className="text-2xl font-bold text-white mb-8">Editar artículo</h1>
        <PostForm post={post} />
      </div>
    </AdminGuard>
  );
}
