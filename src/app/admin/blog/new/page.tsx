import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PostForm } from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <div>
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver al blog
      </Link>
      <h1 className="text-2xl font-bold text-white mb-8">Nuevo artículo</h1>
      <PostForm />
    </div>
  );
}
