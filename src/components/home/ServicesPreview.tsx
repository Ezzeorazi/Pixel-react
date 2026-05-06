import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Code, Layers, ShoppingBag, BarChart2, Megaphone, Search, Wrench, Lightbulb, Globe, Zap, Shield, Star } from 'lucide-react';
import { Section, Container, SectionHeader } from '@/components/ui/Section';
import { getFeaturedServices } from '@/lib/supabase/queries';

const ICONS: Record<string, React.ElementType> = {
  Code, Layers, ShoppingBag, BarChart2, Megaphone, Search, Wrench, Lightbulb, Globe, Zap, Shield, Star,
};

const COLOR_CLASSES: Record<string, { icon: string; glow: string; border: string }> = {
  purple: {
    icon: 'text-purple-500',
    glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:border-purple-500/30',
    border: 'group-hover:bg-purple-900/20',
  },
  pink: {
    icon: 'text-pink-500',
    glow: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] hover:border-pink-500/30',
    border: 'group-hover:bg-pink-900/20',
  },
  fuchsia: {
    icon: 'text-fuchsia-500',
    glow: 'hover:shadow-[0_0_30px_rgba(217,70,239,0.1)] hover:border-fuchsia-500/30',
    border: 'group-hover:bg-fuchsia-900/20',
  },
};

export async function ServicesPreview() {
  const services = await getFeaturedServices();

  return (
    <Section>
      <Container>
        <ServicesPreviewContent services={services} />
      </Container>
    </Section>
  );
}

function ServicesPreviewContent({ services }: { services: Awaited<ReturnType<typeof getFeaturedServices>> }) {
  const t = useTranslations('home.services');
  const locale = useLocale();

  return (
    <>
      <SectionHeader heading={t('heading')} subtitle={t('subtitle')} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {services.map((service) => {
          const Icon = ICONS[service.icon] ?? Code;
          const colors = COLOR_CLASSES[service.color] ?? COLOR_CLASSES.purple;

          return (
            <Link
              key={service.slug}
              href={`/${locale}/services/${service.slug}`}
              className={`group bg-gray-50 dark:bg-[#18181c] p-7 rounded-2xl border border-gray-100 dark:border-white/5 ${colors.glow} hover:-translate-y-1 transition-all duration-300`}
            >
              <div
                className={`w-14 h-14 bg-white dark:bg-[#0a0a0c] border border-gray-100 dark:border-white/5 rounded-xl flex items-center justify-center mb-5 ${colors.border} transition-colors`}
              >
                <Icon className={`w-7 h-7 ${colors.icon}`} />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>
              {service.price_label && (
                <p className="text-xs font-semibold text-green-500 dark:text-green-400 mt-3">{service.price_label}</p>
              )}
            </Link>
          );
        })}
      </div>

      <div className="text-center">
        <Link
          href={`/${locale}/services`}
          className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-400 font-semibold transition-colors"
        >
          {t('cta')} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
