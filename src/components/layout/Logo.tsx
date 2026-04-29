import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export function Logo() {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`} className="hover:opacity-80 transition-opacity">
      {/* White logo for dark mode */}
      <Image
        src="/img/pixel-maker-isologo-text-white.svg"
        alt="Pixel Maker"
        width={140}
        height={40}
        className="h-10 w-auto hidden dark:block"
        priority
      />
      {/* Inverted (dark) logo for light mode */}
      <Image
        src="/img/pixel-maker-isologo-text-white.svg"
        alt="Pixel Maker"
        width={140}
        height={40}
        className="h-10 w-auto block dark:hidden invert"
        priority
      />
    </Link>
  );
}
