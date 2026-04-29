import { getTranslations } from 'next-intl/server';
import { Section, Container, SectionHeader } from '@/components/ui/Section';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getProjects } from '@/lib/supabase/queries';

type Props = { params: Promise<{ locale: string }> };

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const projects = await getProjects();

  return (
    <Section className="pt-36 md:pt-40">
      <Container>
        <SectionHeader eyebrow="Portfolio" heading={t('heading')} subtitle={t('subtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
