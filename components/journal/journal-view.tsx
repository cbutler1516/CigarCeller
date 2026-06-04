"use client";

import { JournalEntryCard } from "@/components/ui/journal-entry-card";
import { GlassCard } from "@/components/ui/glass-card";
import { EmptyState } from "@/components/ui/empty-state";
import { useStore } from "@/lib/store-context";

export function JournalView() {
  const { journal, isLoading } = useStore();

  if (isLoading) {
    return <div className="px-5 py-10 text-center text-cream/40">Loading journal…</div>;
  }

  const avgRating =
    journal.length > 0
      ? Math.round(journal.reduce((sum, e) => sum + e.rating, 0) / journal.length)
      : 0;
  const buyAgainCount = journal.filter((e) => e.wouldBuyAgain).length;

  return (
    <div className="animate-fade-up">
      <header className="px-5 pb-4 pt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/60">Tasting Notes</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-cream">Journal</h1>
        <p className="mt-1 text-sm text-cream/45">{journal.length} entries logged</p>
      </header>

      <div className="space-y-5 px-5 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <GlassCard className="collectible-card p-3 text-center">
            <p className="font-serif text-2xl font-semibold text-gold">{avgRating || "—"}</p>
            <p className="text-[10px] uppercase tracking-wide text-cream/35">Avg Score</p>
          </GlassCard>
          <GlassCard className="collectible-card p-3 text-center">
            <p className="font-serif text-2xl font-semibold text-emerald-400">
              {journal.length > 0 ? `${buyAgainCount}/${journal.length}` : "—"}
            </p>
            <p className="text-[10px] uppercase tracking-wide text-cream/35">Buy Again</p>
          </GlassCard>
        </div>

        {journal.length === 0 ? (
          <EmptyState
            title="No tastings yet"
            description="Log your first smoke to build a flavor history and preference profile."
          />
        ) : (
          journal.map((entry) => <JournalEntryCard key={entry.id} entry={entry} />)
        )}
      </div>
    </div>
  );
}
