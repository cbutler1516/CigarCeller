import { CigarImagePanel } from "@/components/media/cigar-image-panel";
import { MediaCard } from "@/components/media/media-card";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  showCollage?: boolean;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  showCollage = false,
}: EmptyStateProps) {
  if (showCollage) {
    return (
      <MediaCard
        glow
        media={
          <CigarImagePanel
            aspect="video"
            overlay="amber"
            rounded={false}
            alt="Empty humidor — premium cigars waiting to be added to your collection"
          />
        }
      >
        <div className="text-center">
          {icon ? (
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/8">
              {icon}
            </div>
          ) : null}
          <h3 className="font-serif text-xl font-semibold text-cream">{title}</h3>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-cream/45">{description}</p>
          {actionLabel && onAction ? (
            <button
              type="button"
              onClick={onAction}
              className="tap-scale mt-5 rounded-xl bg-gradient-to-r from-gold to-brass px-5 py-2.5 text-sm font-semibold text-charcoal shadow-gold-glow"
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      </MediaCard>
    );
  }

  return (
    <div className="collectible-card glass-card-strong rounded-3xl px-6 py-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/20 bg-gold/8">
        {icon ?? (
          <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-gold/70" aria-hidden>
            <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 10h16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </div>
      <h3 className="mt-4 font-serif text-xl font-semibold text-cream">{title}</h3>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-cream/45">{description}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="tap-scale mt-5 rounded-xl bg-gradient-to-r from-gold to-brass px-5 py-2.5 text-sm font-semibold text-charcoal shadow-gold-glow"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
