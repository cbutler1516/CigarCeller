type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  hover?: boolean;
};

export function GlassCard({ children, className = "", strong = false, hover = true }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl ${strong ? "glass-card-strong" : "glass-card"} ${hover ? "card-hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
