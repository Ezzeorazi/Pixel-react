'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Layers } from 'lucide-react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import type { Project } from '@/lib/types';

const CATEGORIES = ['all', 'web', 'software', 'ecommerce', 'marketing'] as const;

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const t = useTranslations('projects');
  const [active, setActive] = useState<string>('all');

  const filtered = active === 'all'
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              active === cat
                ? 'bg-purple-600 border-purple-600 text-white'
                : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-purple-500/50 hover:text-purple-500'
            }`}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Layers className="w-10 h-10 text-gray-300 dark:text-white/10 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">{t('noProjects')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  );
}
