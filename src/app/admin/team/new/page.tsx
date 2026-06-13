import { AdminGuard } from '@/components/admin/AdminGuard';
import { TeamMemberForm } from '@/components/admin/TeamMemberForm';

export default function NewTeamMemberPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">Nuevo miembro</h1>
        <TeamMemberForm />
      </div>
    </AdminGuard>
  );
}
