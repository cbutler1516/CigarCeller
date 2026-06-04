"use client";

import { CigarDNA } from "@/components/ui/cigar-dna";
import { GlassCard } from "@/components/ui/glass-card";
import { CigarImagePanel } from "@/components/media/cigar-image-panel";
import { MediaCard } from "@/components/media/media-card";
import { SectionHeader } from "@/components/ui/section-header";
import { computeProfileAnalytics } from "@/lib/analytics";
import { profileStats } from "@/lib/mock-data";
import { useStore } from "@/lib/store-context";

export function ProfileView() {
  const { cigars, journal, isLoading } = useStore();

  if (isLoading) {
    return <div className="px-5 py-10 text-center text-cream/40">Loading profile…</div>;
  }

  const analytics = computeProfileAnalytics(cigars, journal);

  return (
    <div className="animate-fade-up">
      <header className="px-5 pb-4 pt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/60">Your Palate</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-cream">Profile</h1>
        <p className="mt-1 text-sm text-cream/45">Member since {profileStats.memberSince}</p>
      </header>

      <div className="space-y-6 px-5 pb-6">
        <GlassCard strong className="collectible-card relative overflow-hidden rounded-3xl p-5">
          <div className="relative flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-gold/20 to-charcoal font-serif text-2xl font-bold text-gold">
              AM
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-cream">{profileStats.name}</h2>
              <p className="text-sm text-cream/45">
                {analytics.totalSmoked} smoked · {analytics.totalInHumidor} in cellar · avg {analytics.averageRating}
              </p>
            </div>
          </div>
        </GlassCard>

        <CigarDNA dna={analytics.cigarDNA} stats={{ totalSmoked: analytics.totalSmoked, totalInHumidor: analytics.totalInHumidor, averageRating: analytics.averageRating }} />

        <section>
          <MediaCard
            glow
            media={
              <CigarImagePanel
                aspect="wide"
                overlay="amber"
                rounded={false}
                alt="Cigar collage illustrating taste profile matches"
              />
            }
          >
            <SectionHeader eyebrow="Palate" title="Taste Match" subtitle="Cigars aligned with your preferences" />
            <div className="space-y-2">
              {analytics.tasteMatches.map((match) => (
                <div
                  key={match.label}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-charcoal/45 p-3"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 font-serif text-sm font-bold text-gold">
                    {match.match > 0 ? `${match.match}%` : "—"}
                  </div>
                  <p className="text-sm text-cream/70">{match.label}</p>
                </div>
              ))}
            </div>
          </MediaCard>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-lg font-semibold text-cream">Preference Insights</h2>
          <div className="space-y-2">
            {analytics.preferenceInsights.map((insight) => (
              <GlassCard key={insight} className="collectible-card flex items-start gap-3 p-3.5">
                <span className="mt-0.5 text-gold">✦</span>
                <p className="text-sm leading-relaxed text-cream/60">{insight}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-lg font-semibold text-cream">Analytics</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Favorite Wrapper", value: analytics.favoriteWrapper },
              { label: "Favorite Strength", value: analytics.favoriteStrength },
              { label: "Best Vitola", value: analytics.bestRatedVitola },
              { label: "Top Note", value: analytics.commonFlavorNotes[0]?.note ?? "—" },
            ].map((item) => (
              <GlassCard key={item.label} className="collectible-card p-3">
                <p className="text-[10px] uppercase text-cream/35">{item.label}</p>
                <p className="mt-1 font-serif text-sm font-semibold text-gold">{item.value}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-lg font-semibold text-cream">Favorite Wrappers</h2>
          <div className="space-y-2">
            {analytics.favoriteWrappers.map((item) => (
              <GlassCard key={item.wrapper} className="collectible-card p-3.5">
                <div className="mb-2 flex justify-between">
                  <p className="font-serif text-sm text-cream">{item.wrapper}</p>
                  <span className="text-xs text-gold">{item.count}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-charcoal/80">
                  <div className="h-full rounded-full bg-gradient-to-r from-gold/60 to-brass/80" style={{ width: `${item.percentage}%` }} />
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-lg font-semibold text-cream">Favorite Brands</h2>
          <div className="space-y-2">
            {analytics.favoriteBrands.map((item, index) => (
              <GlassCard key={item.brand} className="collectible-card flex items-center gap-3 p-3.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 font-serif text-sm font-bold text-gold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-serif text-sm text-cream">{item.brand}</p>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-charcoal/80">
                    <div className="h-full rounded-full bg-gold/50" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
                <p className="font-serif font-bold text-gold">{item.avgRating}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {analytics.commonFlavorNotes.length > 0 && (
          <section>
            <h2 className="mb-3 font-serif text-lg font-semibold text-cream">Common Flavor Notes</h2>
            <div className="flex flex-wrap gap-2">
              {analytics.commonFlavorNotes.map((item) => (
                <span key={item.note} className="rounded-full border border-gold/15 bg-gold/8 px-3 py-1 text-xs text-gold/80">
                  {item.note} · {item.count}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
