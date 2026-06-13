import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { TechSlider } from '@/components/home/TechSlider';
import { BlogPreviewServer } from '@/components/home/BlogPreview';
import { ProjectsPreviewServer } from '@/components/home/ProjectsPreview';
import { Team } from '@/components/home/Team';
import { CTASection } from '@/components/home/CTASection';
import { getBlogPosts, getFeaturedProjects } from '@/lib/supabase/queries';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pixelmaker.com.ar';
  const isEs = locale === 'es';

  return {
    title: isEs ? 'Pixel Maker — Agencia Digital' : 'Pixel Maker — Digital Agency',
    description: isEs
      ? 'Agencia digital especializada en desarrollo web, software a medida, e-commerce y marketing estratégico para empresas en Latinoamérica.'
      : 'Digital agency specialized in web development, custom software, e-commerce and strategic marketing for businesses in Latin America.',
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        es: `${siteUrl}/es`,
        en: `${siteUrl}/en`,
        'x-default': `${siteUrl}/es`,
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const [posts, projects] = await Promise.all([
    getBlogPosts(locale as Locale),
    getFeaturedProjects(locale as Locale),
  ]);

  return (
    <>
      <Hero />
      <ServicesPreview />
      <TechSlider />
      <BlogPreviewServer posts={posts.slice(0, 3)} />
      <ProjectsPreviewServer projects={projects} />
      <Team />
      <CTASection />
    </>
  );
}
