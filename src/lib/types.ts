export type Locale = 'es' | 'en';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  read_time: number;
  locale: Locale;
  image_url?: string;
  published: boolean;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  full_description: string;
  category: string;
  technologies: string[];
  url?: string;
  image_url?: string;
  featured: boolean;
}

export interface ContactMessage {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}

export interface ServiceSlug {
  slug: string;
  icon: string;
  color: 'purple' | 'pink' | 'fuchsia';
  featured: boolean;
}
