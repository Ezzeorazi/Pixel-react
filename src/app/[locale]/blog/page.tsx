import { getTranslations } from 'next-intl/server';
import { Section, Container, SectionHeader } from '@/components/ui/Section';
import { BlogCard } from '@/components/blog/BlogCard';
import { getBlogPosts } from '@/lib/supabase/queries';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: string }> };

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = await getBlogPosts(locale as Locale);

  return (
    <Section className="pt-36 md:pt-40">
      <Container>
        <SectionHeader eyebrow="Blog" heading={t('heading')} subtitle={t('subtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        {posts.length === 0 && (
          <p className="text-center text-gray-400 py-20">
            {locale === 'es' ? 'Próximamente — primeros artículos en camino.' : 'Coming soon — first articles on their way.'}
          </p>
        )}
      </Container>
    </Section>
  );
}
