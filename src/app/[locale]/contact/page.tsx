'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Mail, MapPin, Clock, Send } from 'lucide-react';
import { Section, Container } from '@/components/ui/Section';
import { GradientText } from '@/components/ui/GradientText';
import { SERVICES } from '@/lib/data';
import { submitContact } from '@/app/actions/contact';

export default function ContactPage() {
  const t = useTranslations('contact');
  const tServices = useTranslations('services.items');
  const locale = useLocale();

  const [formData, setFormData] = useState({
    name: '', email: '', company: '', service: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const result = await submitContact(formData);
    setStatus(result.ok ? 'success' : 'error');
    if (result.ok) setFormData({ name: '', email: '', company: '', service: '', message: '' });
  };

  const infoItems = [
    { icon: Mail,    label: t('info.email') },
    { icon: MapPin,  label: t('info.location') },
    { icon: Clock,   label: t('info.response') },
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
              {infoItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gray-100 dark:bg-[#18181c] border border-gray-200 dark:border-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-purple-500" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm pt-2">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-gray-50 dark:bg-[#18181c] rounded-2xl border border-gray-100 dark:border-white/5 p-8">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-white" />
                </div>
                <p className="text-gray-900 dark:text-white font-semibold text-lg">{t('form.success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={`${t('form.name')} *`}>
                    <input
                      name="name" value={formData.name} onChange={handleChange} required
                      className={inputClass}
                    />
                  </Field>
                  <Field label={`${t('form.email')} *`}>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange} required
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={t('form.company')}>
                    <input
                      name="company" value={formData.company} onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>
                  <Field label={t('form.service')}>
                    <select
                      name="service" value={formData.service} onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">—</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {tServices(`${s.slug}.name`)}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label={`${t('form.message')} *`}>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange} required rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">{t('form.error')}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    t('form.submitting')
                  ) : (
                    <><Send className="w-4 h-4" /> {t('form.submit')}</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-white dark:bg-[#0a0a0c] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors text-sm';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
