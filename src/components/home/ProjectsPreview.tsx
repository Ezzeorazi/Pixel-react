import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ProjectImage } from '@/components/projects/ProjectImage';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Section, Container, SectionHeader } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import type { Project } from '@/lib/types';

interface Props {
  projects: Project[];
}

export function ProjectsPreviewServer({ projects }: Props) {
  return <ProjectsPreview projects={projects} />;
}

function ProjectsPreview({ projects }: Props) {
  const t = useTranslations('home.projects');
  const tProjects = useTranslations('projects');
  const locale = useLocale();

  return (
    <Section>
      <Container>
        <SectionHeader heading={t('heading')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${locale}/projects/${project.slug}`}
              className="group bg-gray-50 dark:bg-[#18181c] rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <ProjectImage
                  imageUrl={project.image_url}
                  name={project.name}
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-white/60" />
                </div>
              </div>
              <div className="p-6">
                <Badge variant="purple">{project.category}</Badge>
                <h3 className="mt-3 font-bold text-gray-900 dark:text-white text-base group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                  {project.name}
                </h3>
                <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-400 font-semibold transition-colors"
          >
            {tProjects('viewProject')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
