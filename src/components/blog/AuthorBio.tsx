import { Linkedin } from 'lucide-react';

interface AuthorBioProps {
  locale?: string;
}

const AUTHOR = {
  name: 'Ezequiel Orazi',
  role: {
    es: 'Fullstack Developer · Co-fundador de Pixel Maker',
    en: 'Fullstack Developer · Co-founder of Pixel Maker',
  },
  bio: {
    es: 'Más de 8 años construyendo sistemas y webs para pymes en Argentina y México. Especializado en automatización, CRMs a medida e integraciones para empresas de servicios técnicos.',
    en: 'Over 8 years building systems and websites for SMBs in Argentina and Mexico. Specialized in automation, custom CRMs, and integrations for technical service companies.',
  },
  linkedin: 'https://www.linkedin.com/in/ezequieltorazi/',
  initials: 'EO',
};

export function AuthorBio({ locale = 'es' }: AuthorBioProps) {
  const lang = locale === 'en' ? 'en' : 'es';

  return (
    <div className="mt-14 pt-8 border-t border-gray-200 dark:border-white/10">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {AUTHOR.initials}
        </div>
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
            {lang === 'es' ? 'Escrito por' : 'Written by'}
          </p>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900 dark:text-white">{AUTHOR.name}</span>
            <a
              href={AUTHOR.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mb-2">{AUTHOR.role[lang]}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{AUTHOR.bio[lang]}</p>
        </div>
      </div>
    </div>
  );
}
