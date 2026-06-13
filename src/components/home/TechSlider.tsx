import { useTranslations } from 'next-intl';
import type { IconType } from 'react-icons';
import {
  SiNextdotjs,
  SiReact,
  SiJavascript,
  SiTypescript,
  SiCss,
  SiHtml5,
  SiWordpress,
  SiElementor,
  SiDocker,
  SiClaude,
  SiTailwindcss,
  SiNodedotjs,
  SiSupabase,
  SiFigma,
  SiGit,
  SiPhp,
} from 'react-icons/si';
import { Container } from '@/components/ui/Section';

type Tech = { name: string; Icon: IconType; color?: string };

// `color` uses each brand's hex. When omitted, the icon follows the theme
// text color (used for Next.js, which is black/white by design).
const TECHS: Tech[] = [
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', Icon: SiCss, color: '#663399' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'WordPress', Icon: SiWordpress, color: '#21759B' },
  { name: 'Elementor', Icon: SiElementor, color: '#92003B' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'PHP', Icon: SiPhp, color: '#777BB4' },
  { name: 'Supabase', Icon: SiSupabase, color: '#3FCF8E' },
  { name: 'Claude', Icon: SiClaude, color: '#D97757' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
];

function TechPill({ name, Icon, color }: Tech) {
  return (
    <li className="group flex items-center gap-3 shrink-0 px-6 py-3.5 mx-2.5 rounded-xl bg-gray-50 dark:bg-[#18181c] border border-gray-200 dark:border-white/5 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300">
      <Icon
        className="w-6 h-6 text-gray-700 dark:text-white transition-transform duration-300 group-hover:scale-110"
        style={color ? { color } : undefined}
        aria-hidden
      />
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
        {name}
      </span>
    </li>
  );
}

export function TechSlider() {
  const t = useTranslations('home.tech');

  // The track is rendered twice so the -50% keyframe loops seamlessly.
  const loop = [...TECHS, ...TECHS];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </Container>

      {/* Full-bleed marquee with edge fade masks */}
      <div
        className="marquee-track relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        style={{ ['--marquee-duration' as string]: '45s' }}
      >
        <ul className="animate-marquee flex w-max items-center py-2">
          {loop.map((tech, i) => (
            <TechPill key={`${tech.name}-${i}`} {...tech} />
          ))}
        </ul>
      </div>
    </section>
  );
}
