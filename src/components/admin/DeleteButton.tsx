'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  action: () => Promise<void>;
  confirm?: string;
}

export function DeleteButton({ action, confirm: msg = '¿Eliminar este elemento?' }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(msg)) return;
    startTransition(async () => {
      await action();
    });
  }

  return (
    <button
      type="button"
      title="Eliminar"
      disabled={isPending}
      onClick={handleClick}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors disabled:opacity-40"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
