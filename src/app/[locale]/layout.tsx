import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChatWidgetMount } from '@/components/chat/ChatWidgetMount';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';
import '../globals.css';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pixelmaker.com.ar';

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
    icon: [{ url: '/img/pixel-maker-logo.png', type: 'image/png' }],
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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'es' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidgetMount />
          </Providers>
        </NextIntlClientProvider>
        <OrganizationJsonLd locale={locale} />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
