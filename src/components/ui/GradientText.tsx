interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span
      className={`text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 ${className}`}
    >
      {children}
    </span>
  );
}
