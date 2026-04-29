import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';
import { CTASection } from '@/components/home/CTASection';
import { getProject } from '@/lib/supabase/queries';

type Props = { params: Promise<{ slug: string; locale: string }> };

export default async function ProjectDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <>
      <section className="pt-36 pb-10 md:pt-44 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full filter blur-[100px] pointer-events-none" />
        <Container>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t('backToProjects')}
          </Link>
          <div className="max-w-3xl">
            <Badge variant="purple">{project.category}</Badge>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              <GradientText>{project.name}</GradientText>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              {project.description}
            </p>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-400 font-semibold transition-colors"
              >
                {t('visitSite')} <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="h-72 md:h-96 rounded-2xl bg-gradient-to-br from-purple-600/20 via-fuchsia-600/10 to-pink-600/20 mb-12" />
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {project.full_description || project.description}
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                  {t('technologies')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                  Category
                </h3>
                <Badge variant="purple">{project.category}</Badge>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
