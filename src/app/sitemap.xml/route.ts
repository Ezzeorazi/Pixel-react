import { NextResponse } from 'next/server';
import { getBlogPosts, getProjects, getServices } from '@/lib/supabase/queries';

export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pixelmaker.com.ar';
const LOCALES = ['es', 'en'] as const;
const STATIC_PAGES = ['services', 'blog', 'projects', 'contact'] as const;
const SITE_LAUNCH = '2026-05-01';

type SitemapEntry = {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: number;
};

function urlTag({ url, lastmod, changefreq, priority }: SitemapEntry) {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const [postsEs, postsEn, projects, services] = await Promise.all([
    getBlogPosts('es'),
    getBlogPosts('en'),
    getProjects(),
    getServices(),
  ]);

  const entries: SitemapEntry[] = [
    // Home
    ...LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}`,
      lastmod: SITE_LAUNCH,
      changefreq: 'weekly',
      priority: 1.0,
    })),

    // Static pages
    ...STATIC_PAGES.flatMap((page) =>
      LOCALES.map((locale) => ({
        url: `${BASE_URL}/${locale}/${page}`,
        lastmod: SITE_LAUNCH,
        changefreq: page === 'contact' ? 'yearly' : 'weekly',
        priority: page === 'services' ? 0.9 : 0.8,
      }))
    ),

    // Blog posts
    ...postsEs.map((post) => ({
      url: `${BASE_URL}/es/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: 'monthly',
      priority: 0.7,
    })),
    ...postsEn.map((post) => ({
      url: `${BASE_URL}/en/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: 'monthly',
      priority: 0.7,
    })),

    // Projects
    ...LOCALES.flatMap((locale) =>
      projects.map((project) => ({
        url: `${BASE_URL}/${locale}/projects/${project.slug}`,
        lastmod: SITE_LAUNCH,
        changefreq: 'monthly',
        priority: 0.6,
      }))
    ),

    // Services
    ...LOCALES.flatMap((locale) =>
      services.map((service) => ({
        url: `${BASE_URL}/${locale}/services/${service.slug}`,
        lastmod: SITE_LAUNCH,
        changefreq: 'monthly',
        priority: 0.8,
      }))
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(urlTag).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
