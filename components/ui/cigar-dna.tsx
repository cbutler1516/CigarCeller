import type { CigarDNAStats } from "@/lib/analytics";
import { GlassCard } from "./glass-card";

const dnaLabels: { key: keyof CigarDNAStats; label: string; color: string }[] = [
  { key: "body", label: "Body", color: "bg-gold" },
  { key: "strength", label: "Strength", color: "bg-brass" },
  { key: "complexity", label: "Complexity", color: "bg-gold-light" },
  { key: "sweetness", label: "Sweetness", color: "bg-amber-500" },
  { key: "spice", label: "Spice", color: "bg-orange-500" },
  { key: "earthiness", label: "Earth", color: "bg-stone-500" },
];

type CigarDNAProps = {
  dna: CigarDNAStats;
  stats: { totalSmoked: number; totalInHumidor: number; averageRating: number };
};

export function CigarDNA({ dna, stats }: CigarDNAProps) {
  return (
    <GlassCard strong className="collectible-card rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gold/60">Your Profile</p>
          <h2 className="font-serif text-xl font-semibold text-cream">Cigar DNA</h2>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-gold" aria-hidden>
            <path d="M12 2C8 2 5 5 5 9c0 4 3 7 7 13 4-6 7-9 7-13 0-4-3-7-7-7Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        {dnaLabels.map(({ key, label, color }) => (
          <div key={key}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-cream/50">{label}</span>
              <span className="text-xs font-semibold text-gold">{dna[key]}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-charcoal/80">
              <div className={`h-full rounded-full ${color} opacity-80 transition-all duration-700`} style={{ width: `${dna[key]}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
        {[
          { label: "Smoked", value: stats.totalSmoked },
          { label: "In Cellar", value: stats.totalInHumidor },
          { label: "Avg Rating", value: stats.averageRating },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-serif text-xl font-semibold text-gold">{item.value}</p>
            <p className="text-[10px] uppercase tracking-wide text-cream/35">{item.label}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
