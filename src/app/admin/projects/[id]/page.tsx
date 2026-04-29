import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { createAdminClient } from '@/lib/supabase/admin';
import { AdminGuard } from '@/components/admin/AdminGuard';

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createAdminClient();
  const { data: project } = await supabase.from('projects').select('*').eq('id', id).single();
  if (!project) notFound();

  return (
    <AdminGuard>
      <div>
        <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver a proyectos
        </Link>
        <h1 className="text-2xl font-bold text-white mb-8">Editar proyecto</h1>
        <ProjectForm project={project} />
      </div>
    </AdminGuard>
  );
}
