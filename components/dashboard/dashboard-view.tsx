"use client";

import { HeroVideo } from "@/components/media/hero-video";
import { CigarImagePanel } from "@/components/media/cigar-image-panel";
import { MediaCard } from "@/components/media/media-card";
import { RecentCarousel } from "@/components/ui/recent-carousel";
import { StatCard } from "@/components/ui/stat-card";
import { SectionHeader } from "@/components/ui/section-header";
import { DashboardSkeleton } from "@/components/ui/skeleton";
import {
  computeHumidorStats,
  computeTasteProfile,
  computeCigarDNA,
  formatCurrency,
  getTopRatedCigars,
} from "@/lib/analytics";
import { useStore } from "@/lib/store-context";

export function DashboardView() {
  const { cigars, journal, isLoading } = useStore();

  if (isLoading) return <DashboardSkeleton />;

  const stats = computeHumidorStats(cigars);
  const tasteProfile = computeTasteProfile(cigars, journal);
  const dna = computeCigarDNA(cigars, journal);
  const topRated = getTopRatedCigars(cigars, 4);
  const topTags = stats.topFlavorNotes.length > 0 ? stats.topFlavorNotes : ["Cocoa", "Cedar", "Cream"];

  return (
    <div className="animate-fade-up">
      <HeroVideo />

      <div className="space-y-6 px-5 pb-6 pt-6">
        <MediaCard
          glow
          media={
            <CigarImagePanel
              aspect="banner"
              overlay="amber"
              rounded={false}
              alt="Premium cigar collection representing your personal Cigar DNA"
            />
          }
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold/60">Your Cigar DNA</p>
          <p className="mt-2 text-sm leading-relaxed text-cream/75">{tasteProfile}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: "Body", value: dna.body },
              { label: "Strength", value: dna.strength },
              { label: "Complexity", value: dna.complexity },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/5 bg-charcoal/50 p-2 text-center">
                <p className="font-serif text-lg font-semibold text-gold">{item.value}%</p>
                <p className="text-[9px] uppercase tracking-wide text-cream/35">{item.label}</p>
              </div>
            ))}
          </div>
        </MediaCard>

        <section className="grid grid-cols-2 gap-3">
          <StatCard label="Total Cigars" value={String(stats.totalCigars)} detail="In your cellar" accent="gold" />
          <StatCard label="Est. Value" value={formatCurrency(stats.humidorValue)} detail="Collection worth" />
          <StatCard label="Avg Rating" value={String(stats.averageRating || "—")} detail="Your palate" />
          <StatCard label="Top Wrapper" value={stats.topWrapper} detail="Most logged" accent="gold" />
        </section>

        <MediaCard glow>
          <SectionHeader eyebrow="Cellar Status" title="Humidor Health" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/5 bg-charcoal/40 p-3">
              <p className="font-serif text-2xl font-semibold text-cream">{stats.cigarsInStock}</p>
              <p className="text-[10px] uppercase text-cream/35">Lines in stock</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-charcoal/40 p-3">
              <p className="font-serif text-2xl font-semibold text-gold">{stats.lowQuantityFavorites.length}</p>
              <p className="text-[10px] uppercase text-cream/35">Low qty favorites</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-charcoal/40 p-3">
              <p className="font-serif text-2xl font-semibold text-cream">{stats.averageRating || "—"}</p>
              <p className="text-[10px] uppercase text-cream/35">Avg rating</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-charcoal/40 p-3">
              <p className="text-xs font-medium leading-snug text-cream/60">{topTags.slice(0, 2).join(" · ")}</p>
              <p className="mt-1 text-[10px] uppercase text-cream/35">Top flavors</p>
            </div>
          </div>
        </MediaCard>

        <section>
          <SectionHeader
            eyebrow="Collection"
            title="Top Rated"
            subtitle="Swipe to browse"
            action={<span className="text-xs text-cream/35">→</span>}
          />
          <RecentCarousel cigars={topRated} />
        </section>
      </div>
    </div>
  );
}
