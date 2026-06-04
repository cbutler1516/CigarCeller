"use client";

import { InventoryFilter, inventoryFilters, filterCigars } from "@/lib/mock-data";
import { useStore } from "@/lib/store-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CigarCard } from "./cigar-card";
import { EmptyState } from "./empty-state";
import { CigarCardSkeleton } from "./skeleton";

export function InventoryGrid() {
  const { cigars, isLoading } = useStore();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<InventoryFilter>("All");
  const filtered = filterCigars(cigars, activeFilter);

  if (isLoading) {
    return (
      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <CigarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide">
        {inventoryFilters.map((filter) => {
          const active = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`tap-scale shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                active
                  ? "border-gold/50 bg-gold/15 text-gold shadow-gold-glow"
                  : "glass-card border-white/8 text-cream/45 hover:border-gold/25 hover:text-cream/70"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          showCollage={activeFilter === "All"}
          title="No cigars here"
          description={
            activeFilter === "All"
              ? "Your humidor is empty. Scan a band and add your first cigar."
              : "No cigars match this filter. Try another or add to your collection."
          }
          actionLabel={activeFilter === "All" ? "Add Cigar" : undefined}
          onAction={activeFilter === "All" ? () => router.push("/add") : undefined}
        />
      ) : (
        <div className="grid gap-6">
          {filtered.map((cigar, index) => (
            <CigarCard key={cigar.id} cigar={cigar} stagger={index + 1} />
          ))}
        </div>
      )}
    </>
  );
}
