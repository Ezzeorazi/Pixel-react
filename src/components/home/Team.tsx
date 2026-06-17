import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { Section, Container, SectionHeader } from '@/components/ui/Section';
import { getTeamMembers } from '@/lib/supabase/queries';
import type { Locale, TeamMember } from '@/lib/types';

// Gradient palette cycled per card so avatars stay on-brand without a DB column.
const GRADIENTS = [
  'from-purple-500 to-pink-500',
  'from-fuchsia-500 to-purple-600',
  'from-pink-500 to-rose-500',
  'from-violet-500 to-fuchsia-500',
];

function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export async function Team() {
  const locale = (await getLocale()) as Locale;
  const [members, t] = await Promise.all([
    getTeamMembers(locale),
    getTranslations('home.team'),
  ]);

  if (members.length === 0) return null;

  return (
    <Section className="overflow-hidden">
      {/* Glow blob to match the site aesthetic */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/10 rounded-full filter blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeader heading={t('heading')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {members.map((member, i) => (
            <MemberCard
              key={member.id}
              member={member}
              gradient={GRADIENTS[i % GRADIENTS.length]}
              githubLabel={t('githubLabel')}
              linkedinLabel={t('linkedinLabel')}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function MemberCard({
  member,
  gradient,
  githubLabel,
  linkedinLabel,
}: {
  member: TeamMember;
  gradient: string;
  githubLabel: string;
  linkedinLabel: string;
}) {
  const linkClass =
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-[#0a0a0c] text-gray-900 dark:text-white font-semibold text-sm border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/5 hover:-translate-y-0.5 transition-all';
  return (
    <article className="group flex flex-col items-center text-center bg-gray-50 dark:bg-[#18181c] p-8 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:-translate-y-1 transition-all duration-300">
      {member.photo_url ? (
        <div className="w-24 h-24 rounded-full overflow-hidden mb-5 ring-2 ring-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.25)]">
          <Image
            src={member.photo_url}
            alt={member.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`w-24 h-24 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-3xl font-extrabold shadow-[0_0_25px_rgba(168,85,247,0.3)] mb-5`}
        >
          {initialsOf(member.name)}
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
      <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-1 mb-4">
        {member.role}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
        {member.bio}
      </p>

      {(member.github_url || member.linkedin_url) && (
        <div className="mt-auto flex flex-wrap justify-center gap-2.5">
          {member.github_url && (
            <a
              href={member.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              aria-label={`${githubLabel} — ${member.name}`}
            >
              <SiGithub className="w-4 h-4" />
              {githubLabel}
            </a>
          )}
          {member.linkedin_url && (
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              aria-label={`${linkedinLabel} — ${member.name}`}
            >
              <FaLinkedin className="w-4 h-4" />
              {linkedinLabel}
            </a>
          )}
        </div>
      )}
    </article>
  );
}
