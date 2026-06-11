import { z } from 'zod';

export const BlogPostSchema = z.object({
  title:     z.string().min(3, 'El título es muy corto').max(200, 'El título es muy largo'),
  excerpt:   z.string().max(500, 'El resumen es muy largo').default(''),
  content:   z.string().min(10, 'El contenido es muy corto'),
  category:  z.string().min(1, 'La categoría es requerida'),
  locale:    z.enum(['es', 'en'], { error: 'Idioma inválido' }),
  date:      z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida (usar YYYY-MM-DD)'),
  read_time: z.coerce.number().int().min(1, 'Mínimo 1 minuto').max(60, 'Máximo 60 minutos'),
  image_url: z.string().url('URL de imagen inválida').optional().nullable(),
  published: z.boolean().default(false),
  keywords:  z.string().max(500).optional().nullable().transform(v => v?.trim() || null),
});

export const ProjectSchema = z.object({
  name:             z.string().min(2, 'El nombre es muy corto').max(100),
  description:      z.string().min(5, 'La descripción es muy corta').max(300),
  full_description: z.string().min(10, 'La descripción completa es muy corta'),
  category:         z.string().min(1, 'La categoría es requerida'),
  technologies:     z.string().transform((val) =>
    val.split(',').map((t) => t.trim()).filter(Boolean)
  ),
  url:       z.string().url('URL inválida').optional().nullable(),
  image_url: z.string().url('URL de imagen inválida').optional().nullable(),
  featured:  z.boolean().default(false),
  name_en:             z.string().max(100).optional().nullable().transform(v => v || null),
  description_en:      z.string().max(300).optional().nullable().transform(v => v || null),
  full_description_en: z.string().optional().nullable().transform(v => v || null),
});

export const ServiceSchema = z.object({
  name:        z.string().min(2, 'El nombre es muy corto').max(100),
  description: z.string().min(5, 'La descripción es muy corta').max(300),
  icon:        z.string().min(1, 'El icono es requerido'),
  color:       z.enum(['purple', 'pink', 'fuchsia'], { error: 'Color inválido' }),
  price:       z.coerce.number().positive('El precio debe ser positivo').optional().nullable(),
  price_label: z.string().max(50).optional().nullable(),
  features:    z.string().transform((val) =>
    val.split('\n').map((f) => f.trim()).filter(Boolean)
  ),
  featured:   z.boolean().default(false),
  active:     z.boolean().default(true),
  sort_order: z.coerce.number().int().min(0).default(0),
  name_en:        z.string().max(100).optional().nullable().transform(v => v || null),
  description_en: z.string().max(300).optional().nullable().transform(v => v || null),
  features_en:    z.string().optional().nullable().transform(v =>
    v ? v.split('\n').map((f) => f.trim()).filter(Boolean) : null
  ),
});

export const ContactSchema = z.object({
  name:     z.string().min(2, 'El nombre es muy corto').max(100),
  email:    z.string().email('Email inválido').max(200),
  company:  z.string().max(100).optional(),
  phone:    z.string().max(30).optional(),
  service:  z.string().max(100).optional(),
  budget:   z.string().max(50).optional(),
  timeline: z.string().max(50).optional(),
  message:  z.string().min(10, 'El mensaje es muy corto').max(5000, 'El mensaje es muy largo'),
});

export const SiteSettingsSchema = z.object({
  whatsapp1: z.string().max(20).optional().nullable(),
  whatsapp2: z.string().max(20).optional().nullable(),
  facebook:  z.string().url('URL de Facebook inválida').optional().nullable(),
  instagram: z.string().url('URL de Instagram inválida').optional().nullable(),
  email:     z.string().email('Email inválido').optional().nullable(),
});
