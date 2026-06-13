import { useTranslations } from 'next-intl';
import { SiGithub } from 'react-icons/si';
import { Section, Container, SectionHeader } from '@/components/ui/Section';

type Member = {
  key: 'ezequiel' | 'gonzalo';
  name: string;
  initials: string;
  github: string;
  gradient: string;
};

// Update `github` with the real profile URLs. Photos can be added later by
// dropping a `photo` field and rendering it instead of the initials avatar.
const MEMBERS: Member[] = [
  {
    key: 'ezequiel',
    name: 'Ezequiel Orazi',
    initials: 'EO',
    github: 'https://github.com/Ezzeorazi',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    key: 'gonzalo',
    name: 'Gonzalo',
    initials: 'G',
    github: 'https://github.com/gonzalo',
    gradient: 'from-fuchsia-500 to-purple-600',
  },
];

export function Team() {
  const t = useTranslations('home.team');

  return (
    <Section className="overflow-hidden">
      {/* Glow blob to match the site aesthetic */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/10 rounded-full filter blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeader heading={t('heading')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {MEMBERS.map((member) => (
            <article
              key={member.key}
              className="group flex flex-col items-center text-center bg-gray-50 dark:bg-[#18181c] p-8 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-3xl font-extrabold shadow-[0_0_25px_rgba(168,85,247,0.3)] mb-5`}
              >
                {member.initials}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-1 mb-4">
                {t(`members.${member.key}.role`)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {t(`members.${member.key}.bio`)}
              </p>

              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-[#0a0a0c] text-gray-900 dark:text-white font-semibold text-sm border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/5 hover:-translate-y-0.5 transition-all"
                aria-label={`${t('githubLabel')} — ${member.name}`}
              >
                <SiGithub className="w-4 h-4" />
                {t('githubLabel')}
              </a>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
