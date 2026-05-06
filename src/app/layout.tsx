import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pixelmaker.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Pixel Maker — Agencia Digital',
    template: '%s | Pixel Maker',
  },
  description:
    'Agencia digital especializada en desarrollo web, software a medida, e-commerce y marketing estratégico para empresas en Latinoamérica.',
  keywords: [
    'agencia digital',
    'desarrollo web',
    'software a medida',
    'marketing digital',
    'e-commerce',
    'SEO',
    'diseño web',
    'tienda online',
    'Latinoamérica',
    'Argentina',
    'México',
  ],
  authors: [{ name: 'Pixel Maker', url: siteUrl }],
  creator: 'Pixel Maker',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    alternateLocale: 'en_US',
    siteName: 'Pixel Maker',
    title: 'Pixel Maker — Agencia Digital',
    description:
      'Agencia digital especializada en desarrollo web, software a medida, e-commerce y marketing estratégico.',
    images: [
      {
        url: '/img/pixel-maker-logo.png',
        width: 1200,
        height: 630,
        alt: 'Pixel Maker — Agencia Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixel Maker — Agencia Digital',
    description:
      'Agencia digital especializada en desarrollo web, software a medida y marketing estratégico.',
    images: ['/img/pixel-maker-logo.png'],
  },
  icons: {
    icon: [
      { url: '/img/pixel-maker-logo.png', type: 'image/png' },
    ],
    shortcut: '/img/pixel-maker-logo.png',
    apple: '/img/pixel-maker-logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
