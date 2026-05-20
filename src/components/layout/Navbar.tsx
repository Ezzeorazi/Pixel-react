'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactSlug = locale === 'es' ? 'contacto' : 'contact';
  const links = [
    { label: t('services'), href: `/${locale}/services` },
    { label: t('blog'), href: `/${locale}/blog` },
    { label: t('projects'), href: `/${locale}/projects` },
    { label: t('contact'), href: `/${locale}/${contactSlug}` },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#0a0a0c]/80 backdrop-blur-lg border-b border-black/10 dark:border-white/5 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl flex justify-between items-center">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Link
            href={`/${locale}/${contactSlug}`}
            className="ml-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            {t('getQuote')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#121215] border-t border-black/10 dark:border-white/5 py-4 px-4 flex flex-col gap-1 shadow-xl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-purple-400 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/${contactSlug}`}
            onClick={() => setIsOpen(false)}
            className="mt-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg text-center"
          >
            {t('getQuote')}
          </Link>
        </div>
      )}
    </header>
  );
}
