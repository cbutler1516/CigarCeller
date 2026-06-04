import { GlassCard } from "@/components/ui/glass-card";

type MediaCardProps = {
  children: React.ReactNode;
  media?: React.ReactNode;
  className?: string;
  glow?: boolean;
};

export function MediaCard({ children, media, className = "", glow = true }: MediaCardProps) {
  return (
    <GlassCard
      strong
      className={`collectible-card media-card-layer overflow-hidden rounded-3xl p-0 ${glow ? "media-card-glow" : ""} ${className}`}
    >
      {media ? <div className="relative border-b border-gold/10">{media}</div> : null}
      <div className="relative p-5">{children}</div>
    </GlassCard>
  );
}
