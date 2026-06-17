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
  keywords?: string | null;
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
  // bilingual fields (admin only — queries normalize these into name/description/full_description)
  name_en?: string | null;
  description_en?: string | null;
  full_description_en?: string | null;
}

export interface ContactMessage {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  source?: 'form' | 'chatbot';
}

export interface SiteSettings {
  id?: string;
  whatsapp1?: string | null;
  whatsapp2?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  email?: string | null;
  chat_enabled?: boolean | null;
  chat_instructions?: string | null;
  notification_email?: string | null;
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
  // bilingual fields (admin only)
  name_en?: string | null;
  description_en?: string | null;
  features_en?: string[] | null;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  github_url: string | null;
  linkedin_url: string | null;
  photo_url: string | null;
  active: boolean;
  sort_order: number;
  created_at?: string;
  // bilingual fields (admin only — queries normalize these into role/bio)
  role_en?: string | null;
  bio_en?: string | null;
}
