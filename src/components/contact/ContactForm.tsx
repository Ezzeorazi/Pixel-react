'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, User, Mail, Building2, Phone, FileText } from 'lucide-react';
import { SERVICES } from '@/lib/data';
import { submitContact } from '@/app/actions/contact';
import { trackEvent } from '@/lib/analytics';

const BUDGET_KEYS = ['b1', 'b2', 'b3', 'b4', 'b5'] as const;
const TIMELINE_KEYS = ['t1', 't2', 't3', 't4'] as const;

const EMPTY_FORM = {
  name: '', email: '', company: '', phone: '',
  service: '', budget: '', timeline: '', message: '',
};

export function ContactForm() {
  const t = useTranslations('contact');
  const tServices = useTranslations('services.items');

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const result = await submitContact(formData);
    setStatus(result.ok ? 'success' : 'error');
    if (result.ok) {
      trackEvent('contact_submit', {
        service: formData.service || 'sin_especificar',
        budget: formData.budget || 'sin_especificar',
      });
      setFormData(EMPTY_FORM);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-7 h-7 text-white" />
        </div>
        <p className="text-gray-900 dark:text-white font-semibold text-lg">{t('form.success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={`${t('form.name')} *`}>
          <IconWrap icon={User}>
            <input name="name" value={formData.name} onChange={handleChange} required placeholder={t('form.namePlaceholder')} className={iconInputClass} />
          </IconWrap>
        </Field>
        <Field label={`${t('form.email')} *`}>
          <IconWrap icon={Mail}>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder={t('form.emailPlaceholder')} className={iconInputClass} />
          </IconWrap>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={t('form.company')}>
          <IconWrap icon={Building2}>
            <input name="company" value={formData.company} onChange={handleChange} placeholder={t('form.companyPlaceholder')} className={iconInputClass} />
          </IconWrap>
        </Field>
        <Field label={t('form.phone')}>
          <IconWrap icon={Phone}>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('form.phonePlaceholder')} className={iconInputClass} />
          </IconWrap>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label={t('form.projectType')}>
          <select name="service" value={formData.service} onChange={handleChange} className={inputClass}>
            <option value="">{t('form.select')}</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {tServices(`${s.slug}.name`)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t('form.budget')}>
          <select name="budget" value={formData.budget} onChange={handleChange} className={inputClass}>
            <option value="">{t('form.select')}</option>
            {BUDGET_KEYS.map((k) => (
              <option key={k} value={t(`form.budgetOptions.${k}`)}>
                {t(`form.budgetOptions.${k}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t('form.timeline')}>
        <select name="timeline" value={formData.timeline} onChange={handleChange} className={inputClass}>
          <option value="">{t('form.select')}</option>
          {TIMELINE_KEYS.map((k) => (
            <option key={k} value={t(`form.timelineOptions.${k}`)}>
              {t(`form.timelineOptions.${k}`)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={`${t('form.message')} *`}>
        <div className="relative">
          <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder={t('form.messagePlaceholder')} className={`${iconInputClass} resize-none`} />
        </div>
      </Field>

      {status === 'error' && <p className="text-red-500 text-sm">{t('form.error')}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'loading' ? t('form.submitting') : <>{t('form.submit')} <Send className="w-4 h-4" /></>}
      </button>
    </form>
  );
}

const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-white dark:bg-[#0a0a0c] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors text-sm';

const iconInputClass = `${inputClass} pl-10`;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function IconWrap({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="relative">
      <Icon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      {children}
    </div>
  );
}
