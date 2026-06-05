"use client";

import { useRef } from "react";
import { GlassCard } from "./glass-card";

type CigarPhotoCaptureProps = {
  photoPreview: string | null;
  error: string | null;
  isProcessing: boolean;
  onFileSelected: (file: File | undefined) => void;
  onClearPhoto?: () => void;
};

export function CigarPhotoCapture({
  photoPreview,
  error,
  isProcessing,
  onFileSelected,
  onClearPhoto,
}: CigarPhotoCaptureProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function pickFile(file: File | undefined, input: HTMLInputElement | null) {
    onFileSelected(file);
    if (input) input.value = "";
  }

  return (
    <GlassCard strong className="collectible-card relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,169,98,0.12),transparent_60%)]" />
      <div className="relative p-5">
        <div
          className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
            photoPreview ? "border-gold/40" : "border-gold/25 hover:border-gold/45"
          }`}
        >
          {photoPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoPreview} alt="Cigar preview" className="aspect-[4/3] w-full object-cover" />
          ) : (
            <div className="flex aspect-[4/3] flex-col items-center justify-center bg-gradient-to-br from-wood-mid/30 to-charcoal px-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-gold/25 bg-gold/10">
                <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-gold" aria-hidden>
                  <rect x="8" y="14" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="24" cy="26" r="7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h2 className="mt-4 font-serif text-xl font-semibold text-cream">Cigar Photo</h2>
              <p className="mt-2 text-sm text-cream/45">Take a photo or upload from your library.</p>
            </div>
          )}

          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/60 backdrop-blur-sm">
              <p className="rounded-full border border-gold/25 bg-charcoal/80 px-4 py-2 text-sm font-medium text-gold">
                Compressing…
              </p>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-3 rounded-xl border border-red-400/25 bg-red-400/10 px-3 py-2 text-sm text-red-200" role="alert">
            {error}
          </p>
        )}

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0], e.target)}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0], e.target)}
        />

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            disabled={isProcessing}
            className="tap-scale rounded-xl bg-gradient-to-r from-gold to-brass py-3 text-sm font-semibold text-charcoal shadow-gold-glow disabled:opacity-50"
          >
            Take Photo
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="tap-scale rounded-xl border border-white/10 bg-charcoal/60 py-3 text-sm font-medium text-cream/70 disabled:opacity-50"
          >
            Upload
          </button>
        </div>

        {photoPreview && onClearPhoto && (
          <button
            type="button"
            onClick={onClearPhoto}
            disabled={isProcessing}
            className="tap-scale mt-2 w-full rounded-xl border border-white/10 py-2.5 text-xs font-medium text-cream/50 disabled:opacity-50"
          >
            Remove photo
          </button>
        )}
      </div>
    </GlassCard>
  );
}
