import { getTranslations } from 'next-intl/server';
import { Section, Container, SectionHeader } from '@/components/ui/Section';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getProjects } from '@/lib/supabase/queries';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pixelmaker.com.ar';
  const isEs = locale === 'es';

  return {
    title: isEs ? 'Portfolio | Pixel Maker' : 'Portfolio | Pixel Maker',
    description: isEs
      ? 'Proyectos de diseño web, e-commerce y aplicaciones que desarrollamos.'
      : 'Web design, e-commerce and app projects we have built.',
    openGraph: {
      url: `${siteUrl}/${locale}/projects`,
      siteName: 'Pixel Maker',
      type: 'website',
    },
    alternates: { canonical: `${siteUrl}/${locale}/projects` },
  };
}

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
