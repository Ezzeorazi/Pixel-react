interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 relative ${className}`}>
      {children}
    </section>
  );
}

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`container mx-auto px-4 md:px-6 max-w-6xl ${className}`}>
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ eyebrow, heading, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={`mb-14 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {eyebrow && (
        <span className="text-purple-600 dark:text-purple-400 font-semibold tracking-wider uppercase text-sm">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4 tracking-tight">
        {heading}
      </h2>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
