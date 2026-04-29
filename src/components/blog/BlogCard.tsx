import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { BlogPost } from '@/lib/types';

export function BlogCard({ post }: { post: BlogPost }) {
  const locale = useLocale();
  const t = useTranslations('blog');

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group bg-white dark:bg-[#18181c] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="h-48 bg-gradient-to-br from-purple-900/20 to-pink-900/20 dark:from-purple-900/30 dark:to-pink-900/30" />
      <div className="p-6">
        <Badge variant="gray">{post.category}</Badge>
        <h3 className="mt-3 font-bold text-gray-900 dark:text-white leading-snug group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          <span>{post.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.read_time} {t('minRead')}
          </span>
        </div>
      </div>
    </Link>
  );
}
