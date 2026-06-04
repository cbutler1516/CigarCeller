"use client";

import { Cigar } from "@/lib/mock-data";
import { CigarCard } from "./cigar-card";

type RecentCarouselProps = {
  cigars: Cigar[];
};

export function RecentCarousel({ cigars }: RecentCarouselProps) {
  if (cigars.length === 0) return null;

  return (
    <div className="-mx-5">
      <div className="flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-hide snap-x-mandatory">
        {cigars.map((cigar) => (
          <div key={cigar.id} className="w-[260px] shrink-0 snap-start">
            <CigarCard cigar={cigar} variant="carousel" interactive={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
