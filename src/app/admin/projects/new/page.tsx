import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <div>
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Volver a proyectos
      </Link>
      <h1 className="text-2xl font-bold text-white mb-8">Nuevo proyecto</h1>
      <ProjectForm />
    </div>
  );
}
