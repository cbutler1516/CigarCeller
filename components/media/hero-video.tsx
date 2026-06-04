"use client";

import Link from "next/link";
import { MEDIA } from "@/lib/media";

export function HeroVideo() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[min(48vh,380px)] min-h-[220px] max-h-[380px] w-full">
        {/* Fallback / poster background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${MEDIA.collage})` }}
          aria-hidden
        />

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={MEDIA.collage}
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={MEDIA.heroVideo} type="video/mp4" />
        </video>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/30" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-transparent to-charcoal/50" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(201,169,98,0.12),transparent_55%)]" aria-hidden />
        <div className="media-smoke-glow absolute inset-0" aria-hidden />

        {/* Hero copy */}
        <div className="relative flex h-full flex-col justify-end px-5 pb-8 pt-10">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/25 bg-charcoal/50 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-gold-glow" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/85">CigarVault</p>
          </div>

          <h1 className="mt-4 max-w-[320px] font-serif text-[2rem] font-semibold leading-[1.08] text-cream sm:text-[2.35rem]">
            Your Humidor, Now Smarter
          </h1>
          <p className="mt-3 max-w-[300px] text-sm leading-relaxed text-cream/65">
            Snap, track, rate, and discover the cigars you actually love.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href="/add"
              className="tap-scale rounded-xl bg-gradient-to-r from-gold to-brass px-5 py-3 text-sm font-semibold text-charcoal shadow-gold-glow"
            >
              Scan a Cigar
            </Link>
            <Link
              href="/inventory"
              className="tap-scale rounded-xl border border-white/15 bg-charcoal/55 px-5 py-3 text-sm font-semibold text-cream backdrop-blur-sm"
            >
              View Inventory
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
