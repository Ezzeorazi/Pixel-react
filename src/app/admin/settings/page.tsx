import { AdminGuard } from '@/components/admin/AdminGuard';
import { SettingsForm } from '@/components/admin/SettingsForm';
import { getSettings, getSecretsStatus } from '@/app/actions/admin';

export default async function AdminSettingsPage() {
  const [settings, secrets] = await Promise.all([getSettings(), getSecretsStatus()]);

  return (
    <AdminGuard>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Configuración global</h1>
          <p className="text-gray-400 mt-1">
            Teléfonos, redes sociales y email de contacto del sitio.
          </p>
        </div>
        <div className="bg-[#18181c] rounded-2xl border border-white/5 p-8">
          <SettingsForm settings={settings} secrets={secrets} />
        </div>
      </div>
    </AdminGuard>
  );
}
