import { getPublicSettings } from '@/lib/supabase/queries';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pixelmaker.com.ar';

const descriptions: Record<string, string> = {
  es: 'Agencia digital especializada en desarrollo web, software a medida, e-commerce y marketing estratégico para empresas en Latinoamérica.',
  en: 'Digital agency specialized in web development, custom software, e-commerce and strategic marketing for businesses in Latin America.',
};

/**
 * Site-wide structured data (schema.org JSON-LD).
 * Emits an Organization + WebSite graph so search engines and AI answers
 * can build Rich Snippets. Rendered once per page from the locale layout.
 */
export async function OrganizationJsonLd({ locale }: { locale: string }) {
  const settings = await getPublicSettings();

  const sameAs = [settings?.facebook, settings?.instagram].filter(
    (url): url is string => Boolean(url),
  );

  const contactPoint = [
    settings?.whatsapp1 && {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${settings.whatsapp1.replace(/\D/g, '')}`,
      areaServed: 'AR',
      availableLanguage: ['Spanish', 'English'],
    },
    settings?.whatsapp2 && {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${settings.whatsapp2.replace(/\D/g, '')}`,
      areaServed: 'MX',
      availableLanguage: ['Spanish', 'English'],
    },
  ].filter(Boolean);

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Pixel Maker',
        url: siteUrl,
        logo: `${siteUrl}/img/pixel-maker-logo.png`,
        image: `${siteUrl}/img/pixel-maker-logo.png`,
        description: descriptions[locale] ?? descriptions.es,
        ...(settings?.email ? { email: settings.email } : {}),
        ...(sameAs.length ? { sameAs } : {}),
        ...(contactPoint.length ? { contactPoint } : {}),
        areaServed: ['AR', 'MX', 'Latin America'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Pixel Maker',
        inLanguage: locale,
        publisher: { '@id': `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
