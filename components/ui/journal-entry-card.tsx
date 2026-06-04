import { JournalEntry, strengthColor, TASTING_WHEEL_TAGS } from "@/lib/mock-data";
import { GlassCard } from "./glass-card";
import { RatingRing } from "./rating-ring";

type JournalEntryCardProps = {
  entry: JournalEntry;
};

export function JournalEntryCard({ entry }: JournalEntryCardProps) {
  return (
    <GlassCard className="collectible-card overflow-hidden rounded-3xl p-0">
      <div className="border-b border-gold/10 bg-gradient-to-r from-gold/8 to-transparent p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gold/65">{entry.brand}</p>
            <h3 className="mt-0.5 font-serif text-xl font-semibold text-cream">{entry.cigarName}</h3>
            <p className="mt-1 text-xs text-cream/40">{entry.dateSmoked}</p>
          </div>
          <RatingRing rating={entry.rating} size={56} />
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Draw", value: entry.draw },
            { label: "Burn", value: entry.burn },
            { label: "Duration", value: `${entry.smokeDurationMinutes}m` },
            { label: "Occasion", value: entry.occasion },
          ].map((metric) => (
            <div key={metric.label} className="rounded-xl border border-white/5 bg-charcoal/50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-cream/35">{metric.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-cream">{metric.value}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gold/50">Tasting Wheel</p>
          <div className="flex flex-wrap gap-1.5">
            {TASTING_WHEEL_TAGS.map((tag) => {
              const active = entry.tastingWheelTags.some((t) => t.toLowerCase() === tag.toLowerCase());
              return (
                <span
                  key={tag}
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] ${
                    active
                      ? "border-gold/30 bg-gold/15 text-gold"
                      : "border-white/8 bg-white/3 text-cream/30"
                  }`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {entry.flavorNotes.map((note) => (
            <span key={note} className="rounded-full border border-gold/15 bg-gold/8 px-2.5 py-0.5 text-[11px] text-gold/80">
              {note}
            </span>
          ))}
          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${strengthColor(entry.strength)}`}>
            {entry.strength}
          </span>
        </div>

        {entry.pairing && (
          <p className="text-xs text-cream/45">
            Pairing · <span className="text-cream/65">{entry.pairing}</span>
          </p>
        )}

        <p className="text-sm leading-relaxed text-cream/55">{entry.notes}</p>

        <div className="border-t border-white/5 pt-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
              entry.wouldBuyAgain
                ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                : "border border-white/10 bg-white/5 text-cream/40"
            }`}
          >
            {entry.wouldBuyAgain ? "✓ Would buy again" : "✗ Wouldn't buy again"}
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
