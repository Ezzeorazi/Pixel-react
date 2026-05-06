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

export interface SiteSettings {
  id?: string;
  whatsapp1?: string | null;
  whatsapp2?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  email?: string | null;
}

export interface ServiceSlug {
  slug: string;
  icon: string;
  color: 'purple' | 'pink' | 'fuchsia';
  featured: boolean;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: 'purple' | 'pink' | 'fuchsia';
  price: number | null;
  price_label: string | null;
  features: string[];
  featured: boolean;
  active: boolean;
  sort_order: number;
  created_at?: string;
}
