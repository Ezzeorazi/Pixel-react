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

export const TeamMemberSchema = z.object({
  name:       z.string().min(2, 'El nombre es muy corto').max(100),
  role:       z.string().min(2, 'La ocupación es muy corta').max(120),
  bio:        z.string().min(5, 'La descripción es muy corta').max(600),
  github_url: z.string().url('URL de GitHub inválida').optional().nullable().transform(v => v || null),
  photo_url:  z.string().url('URL de imagen inválida').optional().nullable().transform(v => v || null),
  active:     z.boolean().default(true),
  sort_order: z.coerce.number().int().min(0).default(0),
  role_en:    z.string().max(120).optional().nullable().transform(v => v || null),
  bio_en:     z.string().max(600).optional().nullable().transform(v => v || null),
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
  chat_enabled:       z.boolean().default(true),
  chat_instructions:  z.string().max(4000).optional().nullable(),
  notification_email: z.string().email('Email de notificación inválido').optional().nullable(),
});

export const ChatSecretsSchema = z.object({
  groq_api_key:   z.string().max(300).optional().nullable(),
  resend_api_key: z.string().max(300).optional().nullable(),
});

// Valida los datos que el modelo extrae al llamar a la tool `capturar_lead`,
// antes de persistirlos en contact_messages / enviarlos por email.
export const ChatLeadSchema = z
  .object({
    nombre:   z.string().trim().min(1, 'Falta el nombre').max(120),
    email:    z.string().trim().email('Email inválido').max(200).optional().nullable(),
    telefono: z.string().trim().min(6, 'Teléfono inválido').max(40).optional().nullable(),
    interes:  z.string().trim().max(1000).optional().nullable().transform(v => v || null),
  })
  .refine((d) => !!d.email || !!d.telefono, {
    message: 'Se necesita al menos un medio de contacto (email o teléfono).',
  });
