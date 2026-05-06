import { AdminGuard } from '@/components/admin/AdminGuard';
import { ServiceForm } from '@/components/admin/ServiceForm';

export default function NewServicePage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">Nuevo servicio</h1>
        <ServiceForm />
      </div>
    </AdminGuard>
  );
}
