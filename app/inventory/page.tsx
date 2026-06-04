"use client";

import { InventoryGrid } from "@/components/ui/inventory-grid";
import { useStore } from "@/lib/store-context";

export default function InventoryPage() {
  const { cigars, isLoading } = useStore();
  const totalQty = cigars.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <div className="animate-fade-up">
      <header className="px-5 pb-4 pt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/60">Your Collection</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-cream">Cellar</h1>
        <p className="mt-1 text-sm text-cream/45">
          {isLoading ? "Loading…" : `${cigars.length} lines · ${totalQty} cigars total`}
        </p>
      </header>

      <div className="px-5 pb-6">
        <InventoryGrid />
      </div>
    </div>
  );
}
