import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { CTASection } from '@/components/home/CTASection';
import { MarkdownContent } from '@/components/blog/MarkdownContent';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { getBlogPost } from '@/lib/supabase/queries';
import type { Locale } from '@/lib/types';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string; locale: string }> };

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  development: ['desarrollo web argentina', 'software a medida pyme', 'agencia desarrollo web latam'],
  seo:         ['seo argentina', 'posicionamiento web pyme', 'seo para empresas'],
  marketing:   ['marketing digital argentina', 'marketing pyme latam', 'agencia marketing digital'],
  business:    ['negocios digitales argentina', 'transformación digital pyme', 'consultoría digital'],
  general:     ['agencia digital argentina', 'pixel maker', 'desarrollo digital latam'],
};

function resolveKeywords(post: { keywords?: string | null; category: string }): string[] {
  if (post.keywords) return post.keywords.split(',').map((k) => k.trim()).filter(Boolean);
  return CATEGORY_KEYWORDS[post.category] ?? CATEGORY_KEYWORDS.general;
}

function extractFAQ(markdown: string): Array<{ q: string; a: string }> {
  const sectionMatch = markdown.match(
    /##\s+(?:Preguntas\s+frecuentes|FAQ|Frequently\s+Asked\s+Questions)([\s\S]*?)(?=\n##\s|\n---\s*\n|$)/i
  );
  if (!sectionMatch) return [];

  const section = sectionMatch[1];
  const items: Array<{ q: string; a: string }> = [];
  const re = /\*\*([^*\n]+)\*\*\n([\s\S]*?)(?=\n\*\*[^*]|\n##|\n---\s*\n|$)/g;

  let m;
  while ((m = re.exec(section)) !== null) {
    const q = m[1].trim();
    const a = m[2].trim().replace(/\n+/g, ' ');
    if (q && a) items.push({ q, a });
  }
  return items;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getBlogPost(slug, locale as Locale);
  if (!post) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pixelmaker.com.ar';
  const url = `${siteUrl}/${locale}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: resolveKeywords(post),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'Pixel Maker',
      type: 'article',
      publishedTime: post.date,
      authors: ['Pixel Maker'],
      ...(post.image_url ? { images: [{ url: post.image_url, alt: post.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      ...(post.image_url ? { images: [post.image_url] } : {}),
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const post = await getBlogPost(slug, locale as Locale);
  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pixelmaker.com.ar';
  const postUrl = `${siteUrl}/${locale}/blog/${slug}`;
  const faqItems = extractFAQ(post.content ?? '');

  const jsonLd: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Person', name: 'Ezequiel Orazi', url: siteUrl },
      publisher: { '@type': 'Organization', name: 'Pixel Maker', url: siteUrl },
      mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
      ...(post.image_url ? { image: post.image_url } : {}),
    },
  ];

  if (faqItems.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="pt-36 pb-10 md:pt-44">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> {t('backToBlog')}
            </Link>
            <Badge variant="gray">{post.category}</Badge>
            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500">
              <span>{post.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.read_time} {t('minRead')}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
              {post.image_url ? (
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              ) : (
                <div className="h-full bg-linear-to-br from-purple-900/20 to-pink-900/20" />
              )}
            </div>
            <article className="max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{post.excerpt}</p>
              {post.content ? (
                <MarkdownContent content={post.content} locale={locale} />
              ) : (
                <p className="mt-6 text-gray-500 dark:text-gray-400">
                  {locale === 'es' ? 'Contenido completo próximamente.' : 'Full content coming soon.'}
                </p>
              )}
            </article>

            <AuthorBio locale={locale} />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
