

export const NAV_LINKS = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Quiénes Somos', href: '#quienes-somos' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Portafolio', href: '#portafolio' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contacto', href: '#contacto' },
];

import { 
  Code,
  ShoppingBag,
  Server,
  Globe,
  ShieldCheck,
  Search,
  Wrench,
  Zap,
  Layers,
  Share2,
  Megaphone
} from 'lucide-react';

export const SERVICIOS = [
  {
    title: 'Diseño Web',
    description: 'Páginas web responsivas, modernas y orientadas a reflejar una imagen profesional de tu empresa.',
    icon: <Code className="w-8 h-8 text-purple-500" />
  },
  {
    title: 'Tiendas Online',
    description: 'Desarrollo de e-commerce para vender productos o servicios online de forma segura y escalable.',
    icon: <ShoppingBag className="w-8 h-8 text-pink-500" />
  },
  {
    title: 'Hosting',
    description: 'Alojamiento web rápido y seguro para garantizar que tu sitio esté disponible 24/7.',
    icon: <Server className="w-8 h-8 text-fuchsia-500" />
  },
  {
    title: 'Dominios',
    description: 'Registro y gestión de dominios para proteger la identidad digital de tu marca.',
    icon: <Globe className="w-8 h-8 text-purple-400" />
  },
  {
    title: 'Certificado SSL',
    description: 'Protección para tu web mediante certificados de seguridad que encriptan la información.',
    icon: <ShieldCheck className="w-8 h-8 text-pink-400" />
  },
  {
    title: 'SEO',
    description: 'Optimización para buscadores que mejora la visibilidad de tu sitio en Google.',
    icon: <Search className="w-8 h-8 text-fuchsia-400" />
  },
  {
    title: 'Social Media',
    description: 'Gestión de redes sociales, contenido estratégico y crecimiento de comunidad para tu marca.',
    icon: <Share2 className="w-8 h-8 text-purple-400" />
  },
  {
    title: 'Marketing Digital',
    description: 'Campañas publicitarias y estrategias digitales para atraer más clientes a tu negocio.',
    icon: <Megaphone className="w-8 h-8 text-pink-400" />
  },
  {
    title: 'Optimización Web',
    description: 'Mejoramos la velocidad y el rendimiento de tu sitio para una mejor experiencia de usuario.',
    icon: <Zap className="w-8 h-8 text-purple-400" />
  },
  {
    title: 'Mantenimiento',
    description: 'Actualizaciones, monitoreo y soporte técnico para que tu sitio funcione siempre correctamente.',
    icon: <Wrench className="w-8 h-8 text-pink-400" />
  },
  {
    title: 'Desarrollo a Medida',
    description: 'Soluciones web personalizadas según las necesidades específicas de tu negocio.',
    icon: <Layers className="w-8 h-8 text-fuchsia-500" />
  }
];


export const PORTAFOLIO = [
  { 
    name: 'Optilab Chajari', 
    category: 'Diseño Web Corporativo',
    description: 'Página web con el objetivo de reflejar una imagen profesional y formal de la empresa.',
    imageClass: 'bg-purple-900/20 border-purple-500/20'
  },
  { 
    name: 'Golden Horses', 
    category: 'Sitio Web Responsive',
    description: 'Proyecto que captura la esencia de un producto natural. La plataforma ofrece información detallada.',
    imageClass: 'bg-pink-900/20 border-pink-500/20'
  },
  { 
    name: 'Una Vida .Tech', 
    category: 'Desarrollo a Medida',
    description: 'Sitio web dinámico y eficiente, desarrollado con HTML, CSS y JS puro para optimizar rendimiento.',
    imageClass: 'bg-fuchsia-900/20 border-fuchsia-500/20'
  },
];

export const BLOG_POSTS = [
  {
    title: '¿Por qué tu empresa necesita un Certificado SSL este año?',
    excerpt: 'La seguridad online ya no es opcional. Descubre cómo un SSL no solo protege a tus clientes, sino que mejora tu posicionamiento.',
    date: '10 Mar 2026',
    readTime: '4 min'
  },
  {
    title: 'El impacto del diseño web responsivo en tus ventas',
    excerpt: 'Más del 60% del tráfico web proviene de móviles. Si tu sitio no se adapta, estás perdiendo clientes diariamente.',
    date: '28 Feb 2026',
    readTime: '5 min'
  },
  {
    title: 'Tienda Online vs Tienda Física: Costos y Beneficios',
    excerpt: 'Analizamos por qué expandir tu negocio al mundo digital a través de un e-commerce puede multiplicar tus ingresos.',
    date: '15 Feb 2026',
    readTime: '6 min'
  }
];