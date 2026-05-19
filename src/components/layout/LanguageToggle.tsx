'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    startTransition(() => router.replace(pathname, { locale: nextLocale }));
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className="w-9 h-9 flex items-center justify-center rounded-lg text-xs font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
      aria-label="Toggle language"
    >
      {locale === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
