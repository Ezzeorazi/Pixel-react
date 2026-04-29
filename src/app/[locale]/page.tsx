import { Hero } from '@/components/home/Hero';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { BlogPreviewServer } from '@/components/home/BlogPreview';
import { ProjectsPreviewServer } from '@/components/home/ProjectsPreview';
import { CTASection } from '@/components/home/CTASection';
import { getBlogPosts, getFeaturedProjects } from '@/lib/supabase/queries';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const [posts, projects] = await Promise.all([
    getBlogPosts(locale as Locale),
    getFeaturedProjects(),
  ]);

  return (
    <>
      <Hero />
      <ServicesPreview />
      <BlogPreviewServer posts={posts.slice(0, 3)} />
      <ProjectsPreviewServer projects={projects} />
      <CTASection />
    </>
  );
}
