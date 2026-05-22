import type { MetadataRoute } from 'next';
import { getBlogPosts, getProjects, getServices } from '@/lib/supabase/queries';

export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pixelmaker.com.ar';
const LOCALES = ['es', 'en'] as const;
const STATIC_PAGES = ['services', 'blog', 'projects', 'contact'] as const;
const SITE_LAUNCH = '2026-05-01';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postsEs, postsEn, projects, services] = await Promise.all([
    getBlogPosts('es'),
    getBlogPosts('en'),
    getProjects(),
    getServices(),
  ]);

  const homeRoutes: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: SITE_LAUNCH,
    changeFrequency: 'weekly',
    priority: 1,
    alternates: { languages: { es: `${BASE_URL}/es`, en: `${BASE_URL}/en` } },
  }));

  const staticRoutes: MetadataRoute.Sitemap = STATIC_PAGES.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/${page}`,
      lastModified: SITE_LAUNCH,
      changeFrequency: page === 'contact' ? ('yearly' as const) : ('weekly' as const),
      priority: page === 'services' ? 0.9 : 0.8,
      alternates: {
        languages: { es: `${BASE_URL}/es/${page}`, en: `${BASE_URL}/en/${page}` },
      },
    }))
  );

  const blogRoutes: MetadataRoute.Sitemap = [
    ...postsEs.map((post) => ({
      url: `${BASE_URL}/es/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...postsEn.map((post) => ({
      url: `${BASE_URL}/en/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  const projectRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    projects.map((project) => ({
      url: `${BASE_URL}/${locale}/projects/${project.slug}`,
      lastModified: SITE_LAUNCH,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  const serviceRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    services.map((service) => ({
      url: `${BASE_URL}/${locale}/services/${service.slug}`,
      lastModified: SITE_LAUNCH,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...homeRoutes, ...staticRoutes, ...blogRoutes, ...projectRoutes, ...serviceRoutes];
}
