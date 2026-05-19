import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ExternalLink, Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ProjectImage } from '@/components/projects/ProjectImage';
import type { Project } from '@/lib/types';

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale();
  const t = useTranslations('projects');

  return (
    <div className="group bg-gray-50 dark:bg-[#18181c] rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] hover:-translate-y-1 transition-all duration-300">
      <Link href={`/${locale}/projects/${project.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <ProjectImage
            imageUrl={project.image_url}
            name={project.name}
          />
          {project.featured && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-600/90 text-white backdrop-blur-sm">
                <Star className="w-3 h-3 fill-white" /> {t('featured')}
              </span>
            </div>
          )}
        </div>
        <div className="p-6 pb-4">
          <Badge variant="purple">{project.category}</Badge>
          <h3 className="mt-3 font-bold text-gray-900 dark:text-white group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
            {project.name}
          </h3>
          <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </Link>

      <div className="px-6 pb-6 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-purple-500 hover:text-purple-400 border border-purple-500/30 hover:border-purple-400/50 px-2.5 py-1 rounded-full transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> {t('visitSite')}
          </a>
        )}
      </div>
    </div>
  );
}
