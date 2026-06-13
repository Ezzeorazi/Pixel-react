import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { TeamMemberForm } from '@/components/admin/TeamMemberForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditTeamMemberPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createAdminClient();
  const { data } = await supabase.from('team_members').select('*').eq('id', id).single();
  if (!data) notFound();

  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">Editar miembro</h1>
        <TeamMemberForm member={data} />
      </div>
    </AdminGuard>
  );
}
