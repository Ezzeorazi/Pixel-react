import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Clock } from 'lucide-react';
import { Section, Container, SectionHeader } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import type { BlogPost } from '@/lib/types';

interface Props {
  posts: BlogPost[];
}

export function BlogPreviewServer({ posts }: Props) {
  return <BlogPreview posts={posts} />;
}

function BlogPreview({ posts }: Props) {
  const t = useTranslations('home.blog');
  const tBlog = useTranslations('blog');
  const locale = useLocale();

  return (
    <Section className="bg-gray-50/50 dark:bg-[#0d0d10]">
      <Container>
        <SectionHeader heading={t('heading')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${locale}/blog/${post.slug}`}
              className="group bg-white dark:bg-[#18181c] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-44 bg-gradient-to-br from-purple-900/20 to-pink-900/20 dark:from-purple-900/30 dark:to-pink-900/30" />
              <div className="p-6">
                <Badge variant="gray">{post.category}</Badge>
                <h3 className="mt-3 font-bold text-gray-900 dark:text-white text-base leading-snug group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.read_time} {tBlog('minRead')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-400 font-semibold transition-colors"
          >
            {t('cta')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
