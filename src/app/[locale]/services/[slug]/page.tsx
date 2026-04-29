import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, Check, Code, Layers, ShoppingBag, BarChart2, Megaphone, Search, Wrench, Lightbulb, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { GradientText } from '@/components/ui/GradientText';
import { CTASection } from '@/components/home/CTASection';
import { SERVICES } from '@/lib/data';

const ICONS: Record<string, React.ElementType> = {
  Code, Layers, ShoppingBag, BarChart2, Megaphone, Search, Wrench, Lightbulb,
};

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  return <ServiceDetailContent service={service} />;
}

function ServiceDetailContent({ service }: { service: (typeof SERVICES)[0] }) {
  const t = useTranslations(`services.items.${service.slug}`);
  const locale = useLocale();
  const Icon = ICONS[service.icon] ?? Code;
  const features = (t.raw('features') as string[]) ?? [];

  return (
    <>
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full filter blur-[100px] pointer-events-none" />
        <Container>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to services
          </Link>

          <div className="max-w-3xl">
            <div className="w-16 h-16 bg-gray-100 dark:bg-[#18181c] border border-gray-200 dark:border-white/10 rounded-2xl flex items-center justify-center mb-6">
              <Icon className="w-8 h-8 text-purple-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
              <GradientText>{t('name')}</GradientText>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
              {t('description')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition-all hover:-translate-y-0.5"
            >
              Get started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                What&apos;s included
              </h2>
              <ul className="space-y-4">
                {features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-[#18181c] rounded-2xl border border-gray-100 dark:border-white/5 p-8">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Ready to start?</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                Let&apos;s talk about your project. We&apos;ll get back to you within 24 hours.
              </p>
              <Link
                href={`/${locale}/contact`}
                className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg text-center hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all"
              >
                Contact us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
