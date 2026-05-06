interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'pink' | 'fuchsia' | 'gray';
}

const variants = {
  purple: 'border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300',
  pink: 'border-pink-500/30 bg-pink-500/10 text-pink-700 dark:text-pink-300',
  fuchsia: 'border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300',
  gray: 'border-gray-300/50 bg-gray-100 text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-400',
};

export function Badge({ children, variant = 'purple' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-4 py-1.5 rounded-full border text-sm font-medium backdrop-blur-sm ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
