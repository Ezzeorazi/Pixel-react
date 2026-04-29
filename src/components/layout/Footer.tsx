import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 dark:border-white/5 bg-gray-50 dark:bg-[#0a0a0c]">
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
            <div className="flex gap-3 mt-5">
              {[
                { label: 'GitHub', href: 'https://github.com/pixelmaker' },
                { label: 'LinkedIn', href: 'https://linkedin.com/company/pixelmaker' },
                { label: 'IG', href: 'https://instagram.com/pixelmaker' },
              ].map(({ label, href }) => (
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
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Links</p>
            <ul className="space-y-3">
              {[
                { label: t('services'), href: `/${locale}/services` },
                { label: t('blog'), href: `/${locale}/blog` },
                { label: t('projects'), href: `/${locale}/projects` },
                { label: t('contact'), href: `/${locale}/contact` },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Contact</p>
            <ul className="space-y-3">
              <li className="text-sm text-gray-500 dark:text-gray-400">hola@pixelmaker.dev</li>
              <li className="text-sm text-gray-500 dark:text-gray-400">México · Argentina</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/5 dark:border-white/5 pt-6">
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
            {t('copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
