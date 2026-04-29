import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';

export function Hero() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="pt-36 pb-20 md:pt-52 md:pb-32 relative overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/15 dark:bg-purple-600/20 rounded-full filter blur-[120px] transform translate-x-1/3 opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full filter blur-[100px] transform -translate-x-1/3 opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="max-w-4xl">
          <div className="mb-6">
            <Badge variant="purple">
              <Sparkles className="inline-block w-3.5 h-3.5 mr-1.5 -mt-0.5" />
              {t('badge')}
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
            {t('hero.titleLine1')}{' '}
            <GradientText>{t('hero.titleAccent')}</GradientText>
            <br />
            {t('hero.titleLine2')}
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              {t('hero.ctaPrimary')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="px-8 py-4 bg-gray-100 dark:bg-[#18181c] text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/5 transition-all text-center hover:-translate-y-0.5"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
