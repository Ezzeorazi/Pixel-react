import Link from 'next/link';
import { Plus, Pencil, Star, DollarSign } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';
import { deleteService } from '@/app/actions/admin';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { DeleteButton } from '@/components/admin/DeleteButton';

async function getAllServices() {
  const supabase = await createAdminClient();
  const { data } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });
  return data ?? [];
}

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <AdminGuard>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Servicios</h1>
            <p className="text-gray-400 mt-1">{services.length} servicios en total</p>
          </div>
          <Link
            href="/admin/services/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" /> Nuevo servicio
          </Link>
        </div>

        <div className="bg-[#18181c] rounded-2xl border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Servicio</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Precio</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
                <th className="text-left px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Orden</th>
                <th className="px-4 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No hay servicios todavía.{' '}
                    <Link href="/admin/services/new" className="text-purple-400 hover:text-purple-300">
                      Crear el primero →
                    </Link>
                  </td>
                </tr>
              )}
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {service.featured && <Star className="w-3.5 h-3.5 text-yellow-400 shrink-0" />}
                      <div>
                        <p className="text-white font-medium text-sm">{service.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{service.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {service.price ? (
                      <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                        <DollarSign className="w-3.5 h-3.5" />
                        {Number(service.price).toLocaleString('es')}
                        {service.price_label && (
                          <span className="text-gray-500 font-normal text-xs ml-1">({service.price_label})</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-600 text-xs">Sin precio</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      service.active
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                    }`}>
                      {service.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-gray-500">#{service.sort_order}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/admin/services/${service.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteButton
                        action={deleteService.bind(null, service.id)}
                        confirm="¿Eliminar este servicio?"
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
