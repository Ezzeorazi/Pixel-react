import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { ServiceForm } from '@/components/admin/ServiceForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createAdminClient();
  const { data } = await supabase.from('services').select('*').eq('id', id).single();
  if (!data) notFound();

  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">Editar servicio</h1>
        <ServiceForm service={data} />
      </div>
    </AdminGuard>
  );
}
