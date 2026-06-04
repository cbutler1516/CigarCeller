"use client";

import { Cigar, strengthColor } from "@/lib/mock-data";
import { useStore } from "@/lib/store-context";
import { CigarImagePlaceholder } from "./cigar-image-placeholder";
import { RatingRing } from "./rating-ring";

type CigarCardProps = {
  cigar: Cigar;
  variant?: "grid" | "carousel";
  stagger?: number;
  interactive?: boolean;
};

export function CigarCard({ cigar, variant = "grid", stagger, interactive = true }: CigarCardProps) {
  const { toggleFavorite, toggleWouldBuyAgain, smokeOne } = useStore();
  const staggerClass = stagger ? `stagger-${Math.min(stagger, 6)}` : "";

  return (
    <article className={`collectible-card card-hover overflow-hidden rounded-3xl ${staggerClass}`}>
      <div className="relative">
        <CigarImagePlaceholder cigar={cigar} size={variant === "carousel" ? "md" : "lg"} />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <RatingRing rating={cigar.rating} size={52} />
          <div className="flex flex-col items-end gap-1.5">
            <span className="rounded-full border border-white/12 bg-charcoal/75 px-2.5 py-1 text-xs font-bold text-cream backdrop-blur-md">
              ×{cigar.quantity}
            </span>
            {cigar.wouldBuyAgain && (
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-300 backdrop-blur-md">
                Buy again
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gold/8 p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold/70">{cigar.brand}</p>
            <h3 className="mt-1 font-serif text-xl font-semibold leading-snug text-cream">{cigar.name}</h3>
          </div>
          {interactive && (
            <button
              type="button"
              onClick={() => toggleFavorite(cigar.id)}
              className="tap-scale flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/8 text-gold"
              aria-label={cigar.isFavorite ? "Remove favorite" : "Add favorite"}
            >
              {cigar.isFavorite ? "★" : "☆"}
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${strengthColor(cigar.strength)}`}>
            {cigar.strength}
          </span>
          <span className="rounded-full border border-gold/15 bg-gold/6 px-2.5 py-0.5 text-[10px] text-gold/75">
            {cigar.wrapper}
          </span>
          <span className="text-xs text-cream/40">{cigar.vitola}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {cigar.flavorTags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/8 bg-white/4 px-2 py-0.5 text-[10px] text-cream/55">
              {tag}
            </span>
          ))}
        </div>

        {interactive && variant === "grid" && (
          <div className="mt-4 flex gap-2 border-t border-white/5 pt-4">
            <button
              type="button"
              onClick={() => smokeOne(cigar.id)}
              disabled={cigar.quantity <= 0}
              className="tap-scale flex-1 rounded-xl bg-gradient-to-r from-gold/20 to-brass/10 px-3 py-2.5 text-xs font-semibold text-gold disabled:opacity-40"
            >
              Smoke one
            </button>
            <button
              type="button"
              onClick={() => toggleWouldBuyAgain(cigar.id)}
              className="tap-scale rounded-xl border border-white/10 px-3 py-2.5 text-xs font-medium text-cream/55"
            >
              {cigar.wouldBuyAgain ? "✓ Again" : "Again?"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
