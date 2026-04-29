import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Code, Layers, ShoppingBag, BarChart2, Megaphone, Search, Wrench, Lightbulb } from 'lucide-react';
import type { ServiceSlug } from '@/lib/types';

const ICONS: Record<string, React.ElementType> = {
  Code, Layers, ShoppingBag, BarChart2, Megaphone, Search, Wrench, Lightbulb,
};

const COLOR_CLASSES: Record<string, { icon: string; glow: string; iconBg: string }> = {
  purple: {
    icon: 'text-purple-500',
    glow: 'hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]',
    iconBg: 'group-hover:bg-purple-900/20',
  },
  pink: {
    icon: 'text-pink-500',
    glow: 'hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)]',
    iconBg: 'group-hover:bg-pink-900/20',
  },
  fuchsia: {
    icon: 'text-fuchsia-500',
    glow: 'hover:border-fuchsia-500/30 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)]',
    iconBg: 'group-hover:bg-fuchsia-900/20',
  },
};

export function ServiceCard({ service }: { service: ServiceSlug }) {
  const t = useTranslations(`services.items.${service.slug}`);
  const locale = useLocale();
  const Icon = ICONS[service.icon] ?? Code;
  const colors = COLOR_CLASSES[service.color];

  return (
    <Link
      href={`/${locale}/services/${service.slug}`}
      className={`group bg-gray-50 dark:bg-[#18181c] p-8 rounded-2xl border border-gray-100 dark:border-white/5 ${colors.glow} hover:-translate-y-1 transition-all duration-300`}
    >
      <div
        className={`w-16 h-16 bg-white dark:bg-[#0a0a0c] border border-gray-100 dark:border-white/5 rounded-xl flex items-center justify-center mb-6 ${colors.iconBg} transition-colors`}
      >
        <Icon className={`w-8 h-8 ${colors.icon}`} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {t('name')}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{t('shortDesc')}</p>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-purple-500 group-hover:text-purple-400 transition-colors">
        Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </span>
    </Link>
  );
}
