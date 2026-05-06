import { getTranslations } from 'next-intl/server';
import { Mail, MapPin, Clock, Phone } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section';
import { GradientText } from '@/components/ui/GradientText';
import { ContactForm } from '@/components/contact/ContactForm';
import { getPublicSettings } from '@/lib/supabase/queries';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const settings = await getPublicSettings();

  const infoItems = [
    {
      icon: Mail,
      label: settings?.email ?? t('info.email'),
      href: `mailto:${settings?.email ?? t('info.email')}`,
    },
    ...(settings?.whatsapp1
      ? [{
          icon: Phone,
          label: settings.whatsapp1,
          href: `https://wa.me/${settings.whatsapp1.replace(/\D/g, '')}`,
        }]
      : []),
    { icon: MapPin,  label: t('info.location'), href: null },
    { icon: Clock,   label: t('info.response'),  href: null },
  ];

  return (
    <Section className="pt-36 md:pt-44">
      <Container>
        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* Info */}
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              <GradientText>{t('heading')}</GradientText>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10">{t('subtitle')}</p>

            <div className="space-y-5">
              {infoItems.map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gray-100 dark:bg-[#18181c] border border-gray-200 dark:border-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-purple-500" />
                  </div>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 text-sm pt-2 hover:text-purple-500 transition-colors">
                      {label}
                    </a>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-300 text-sm pt-2">{label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-gray-50 dark:bg-[#18181c] rounded-2xl border border-gray-100 dark:border-white/5 p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
