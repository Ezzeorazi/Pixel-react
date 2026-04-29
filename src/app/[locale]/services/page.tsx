import { useTranslations } from 'next-intl';
import { Section, Container, SectionHeader } from '@/components/ui/Section';
import { ServiceCard } from '@/components/services/ServiceCard';
import { SERVICES } from '@/lib/data';

export default function ServicesPage() {
  const t = useTranslations('services');

  return (
    <Section className="pt-36 md:pt-40">
      <Container>
        <SectionHeader
          eyebrow="Services"
          heading={t('heading')}
          subtitle={t('subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <ProcessSection />
      </Container>
    </Section>
  );
}

function ProcessSection() {
  const t = useTranslations('services.process');

  const steps = [0, 1, 2, 3, 4].map((i) => ({
    number: i + 1,
    title: t(`steps.${i}.title`),
    desc: t(`steps.${i}.desc`),
  }));

  return (
    <div className="mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 tracking-tight">
        {t('heading')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, idx) => (
          <div key={step.number} className="relative flex flex-col items-center text-center group">
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-5 left-1/2 w-full h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
            )}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm mb-3 relative z-10 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              {step.number}
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{step.title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
