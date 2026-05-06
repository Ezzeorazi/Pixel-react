import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, Clock } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { CTASection } from '@/components/home/CTASection';
import { getBlogPost } from '@/lib/supabase/queries';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ slug: string; locale: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const post = await getBlogPost(slug, locale as Locale);
  if (!post) notFound();

  return (
    <>
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
            <article className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{post.excerpt}</p>
              {post.content ? (
                <div className="mt-6 text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </div>
              ) : (
                <p className="mt-6 text-gray-500 dark:text-gray-400">
                  {locale === 'es'
                    ? 'Contenido completo próximamente.'
                    : 'Full content coming soon.'}
                </p>
              )}
            </article>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
