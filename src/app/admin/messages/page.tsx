import { Mail, Check } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';
import { markRead, deleteMessage } from '@/app/actions/admin';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { DeleteButton } from '@/components/admin/DeleteButton';

async function getMessages() {
  const supabase = await createAdminClient();
  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function AdminMessagesPage() {
  const messages = await getMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <AdminGuard>
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Mensajes de contacto</h1>
        <p className="text-gray-400 mt-1">
          {unread > 0 ? (
            <span><span className="text-purple-400 font-semibold">{unread} nuevos</span> · {messages.length} en total</span>
          ) : (
            `${messages.length} mensajes en total`
          )}
        </p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 && (
          <div className="bg-[#18181c] rounded-2xl border border-white/5 p-12 text-center">
            <Mail className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">No hay mensajes todavía.</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id}
            className={`bg-[#18181c] rounded-2xl border p-6 transition-colors ${
              !msg.read ? 'border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.05)]' : 'border-white/5'
            }`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  {!msg.read && (
                    <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                  )}
                  <p className="font-semibold text-white">{msg.name}</p>
                  <span className="text-gray-500 text-sm">·</span>
                  <a href={`mailto:${msg.email}`} className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    {msg.email}
                  </a>
                  {msg.company && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{msg.company}</span>
                  )}
                </div>

                {msg.service && (
                  <p className="text-xs text-gray-500 mb-2">Servicio: <span className="text-gray-400">{msg.service}</span></p>
                )}

                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>

                <p className="text-xs text-gray-600 mt-3">
                  {new Date(msg.created_at).toLocaleDateString('es', {
                    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                {!msg.read && (
                  <form action={markRead.bind(null, msg.id)}>
                    <button type="submit" title="Marcar como leído"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-500/5 transition-colors">
                      <Check className="w-4 h-4" />
                    </button>
                  </form>
                )}
                <DeleteButton
                  action={deleteMessage.bind(null, msg.id)}
                  confirm="¿Eliminar este mensaje?"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </AdminGuard>
  );
}
