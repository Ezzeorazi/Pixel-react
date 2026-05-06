import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { getPublicSettings } from '@/lib/supabase/queries';

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'footer' });
  const year = new Date().getFullYear();
  const settings = await getPublicSettings();

  const socialLinks = [
    settings?.facebook  && { label: 'Facebook',  href: settings.facebook },
    settings?.instagram && { label: 'Instagram', href: settings.instagram },
    settings?.whatsapp1 && { label: 'WhatsApp',  href: `https://wa.me/${settings.whatsapp1.replace(/\D/g, '')}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-black/10 dark:border-white/5 bg-gray-50 dark:bg-[#0a0a0c]">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <Image src="/img/pixel-maker-isologo-text-white.svg" alt="Pixel Maker" width={120} height={36} className="hidden dark:block h-9 w-auto" />
              <Image src="/img/pixel-maker-isologo-text-white.svg" alt="Pixel Maker" width={120} height={36} className="block dark:hidden invert h-9 w-auto" />
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3 mt-5">
                {socialLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Links</p>
            <ul className="space-y-3">
              {[
                { label: t('services'), href: `/${locale}/services` },
                { label: t('blog'),     href: `/${locale}/blog` },
                { label: t('projects'), href: `/${locale}/projects` },
                { label: t('contact'),  href: `/${locale}/contact` },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Contacto</p>
            <ul className="space-y-3">
              {settings?.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.whatsapp1 && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsapp1.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {!settings?.email && !settings?.whatsapp1 && (
                <li className="text-sm text-gray-500 dark:text-gray-400">México · Argentina</li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-black/10 dark:border-white/5 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
            {t('copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
