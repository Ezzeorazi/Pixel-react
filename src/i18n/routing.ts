import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  pathnames: {
    '/': '/',
    '/services': '/services',
    '/blog': '/blog',
    '/projects': '/projects',
    '/contact': {
      es: '/contacto',
      en: '/contact',
    },
  },
});
