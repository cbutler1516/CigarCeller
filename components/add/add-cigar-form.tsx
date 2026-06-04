"use client";

import type { AIIdentificationResult } from "@/lib/ai-simulation";
import { simulatePhotoAnalysis } from "@/lib/ai-simulation";
import { compressImageToBase64 } from "@/lib/image-utils";
import type { Strength } from "@/lib/mock-data";
import { inferPlaceholderStyle, STRENGTH_OPTIONS } from "@/lib/storage";
import { useStore } from "@/lib/store-context";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { CigarImagePanel } from "@/components/media/cigar-image-panel";
import { MediaCard } from "@/components/media/media-card";

export function AddCigarForm() {
  const { addCigar } = useStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<AIIdentificationResult | null>(null);
  const [showAiPanel, setShowAiPanel] = useState(false);

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [vitola, setVitola] = useState("");
  const [wrapper, setWrapper] = useState("");
  const [strength, setStrength] = useState<Strength>("Medium");
  const [quantity, setQuantity] = useState("1");
  const [pricePaid, setPricePaid] = useState("");
  const [humidor, setHumidor] = useState("Main Humidor");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    try {
      const base64 = await compressImageToBase64(file);
      setPhotoPreview(base64);
      setAiResult(null);
      setShowAiPanel(true);
    } catch {
      alert("Could not process image. Try another photo.");
    }
  }

  async function handleAnalyze() {
    if (!photoPreview) return;
    setIsAnalyzing(true);
    try {
      const result = await simulatePhotoAnalysis(photoPreview);
      setAiResult(result);
      setBrand(result.brand);
      setName(result.cigarName);
      setVitola(result.vitola);
      setWrapper(result.wrapper);
      setStrength(result.strength);
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleSave() {
    if (!brand.trim() || !name.trim()) {
      alert("Brand and cigar name are required.");
      return;
    }

    addCigar({
      brand: brand.trim(),
      name: name.trim(),
      vitola: vitola.trim() || "Robusto",
      quantity: Math.max(1, parseInt(quantity, 10) || 1),
      rating: aiResult ? Math.min(99, aiResult.confidence + 8) : 85,
      strength,
      wrapper: wrapper.trim() || "Natural",
      pricePaid: parseFloat(pricePaid) || 0,
      humidor: humidor.trim() || "Main Humidor",
      flavorTags: aiResult?.flavorTags ?? ["Cedar"],
      isFavorite: false,
      wouldBuyAgain: true,
      smokeDurationMinutes: 60,
      placeholderStyle: inferPlaceholderStyle(wrapper || "Natural"),
      photoUrl: null,
      userUploadedPhotoUrl: photoPreview,
      externalImageUrl: null,
    });

    router.push("/inventory");
  }

  return (
    <div className="animate-fade-up">
      <header className="px-5 pb-4 pt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/60">Add to Cellar</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-cream">Scan Cigar Band</h1>
      </header>

      <div className="space-y-6 px-5 pb-6">
        <MediaCard
          glow
          media={
            <CigarImagePanel
              aspect="banner"
              overlay="dark"
              rounded={false}
              alt="Reference collage of premium cigar bands and vitolas"
            />
          }
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold/55">Visual Reference</p>
          <p className="mt-1 text-sm text-cream/55">
            Frame the band clearly — good lighting helps AI identification later.
          </p>
        </MediaCard>

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
                  <h2 className="mt-4 font-serif text-xl font-semibold text-cream">Scan Cigar Band</h2>
                  <p className="mt-2 text-sm text-cream/45">Snap the band. We&apos;ll help identify it later.</p>
                </div>
              )}
            </div>

            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => cameraInputRef.current?.click()} className="tap-scale rounded-xl bg-gradient-to-r from-gold to-brass py-3 text-sm font-semibold text-charcoal shadow-gold-glow">
                Take Photo
              </button>
              <button type="button" onClick={() => fileInputRef.current?.click()} className="tap-scale rounded-xl border border-white/10 bg-charcoal/60 py-3 text-sm font-medium text-cream/70">
                Upload
              </button>
            </div>

            {photoPreview && (
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="tap-scale mt-3 w-full rounded-xl border border-gold/30 bg-gold/10 py-3 text-sm font-semibold text-gold disabled:opacity-50"
              >
                {isAnalyzing ? "Analyzing…" : "Analyze Photo"}
              </button>
            )}
          </div>
        </GlassCard>

        {showAiPanel && (
          <GlassCard className="collectible-card space-y-3 rounded-3xl p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold/60">AI Identification Coming Next</p>
              {aiResult && (
                <span className="rounded-full border border-gold/25 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold text-gold">
                  {aiResult.confidence}% confidence
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl bg-charcoal/50 p-3">
                <p className="text-[10px] uppercase text-cream/35">Detected Brand</p>
                <p className="mt-1 font-medium text-cream">{aiResult?.brand ?? "—"}</p>
              </div>
              <div className="rounded-xl bg-charcoal/50 p-3">
                <p className="text-[10px] uppercase text-cream/35">Detected Name</p>
                <p className="mt-1 font-medium text-cream">{aiResult?.cigarName ?? "—"}</p>
              </div>
              <div className="rounded-xl bg-charcoal/50 p-3">
                <p className="text-[10px] uppercase text-cream/35">Suggested Wrapper</p>
                <p className="mt-1 font-medium text-cream">{aiResult?.wrapper ?? "—"}</p>
              </div>
              <div className="rounded-xl bg-charcoal/50 p-3">
                <p className="text-[10px] uppercase text-cream/35">Suggested Strength</p>
                <p className="mt-1 font-medium text-cream">{aiResult?.strength ?? "—"}</p>
              </div>
            </div>
            {!aiResult && !isAnalyzing && (
              <p className="text-xs text-cream/40">Tap Analyze Photo to simulate AI band recognition.</p>
            )}
          </GlassCard>
        )}

        <GlassCard className="collectible-card space-y-4 rounded-3xl p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold/50">Cigar Details</p>
          {[
            { label: "Brand", value: brand, set: setBrand },
            { label: "Name", value: name, set: setName },
            { label: "Vitola / Size", value: vitola, set: setVitola },
            { label: "Wrapper", value: wrapper, set: setWrapper },
          ].map((field) => (
            <label key={field.label} className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-wider text-cream/40">{field.label}</span>
              <input value={field.value} onChange={(e) => field.set(e.target.value)} className="w-full rounded-xl border border-white/8 bg-charcoal/60 px-4 py-3 text-sm text-cream" />
            </label>
          ))}
          <label className="block">
            <span className="mb-1 block text-[11px] uppercase tracking-wider text-cream/40">Strength</span>
            <select value={strength} onChange={(e) => setStrength(e.target.value as Strength)} className="w-full rounded-xl border border-white/8 bg-charcoal/60 px-4 py-3 text-sm text-cream">
              {STRENGTH_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-wider text-cream/40">Quantity</span>
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full rounded-xl border border-white/8 bg-charcoal/60 px-4 py-3 text-sm text-cream" />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] uppercase tracking-wider text-cream/40">Price ($)</span>
              <input type="number" step="0.01" value={pricePaid} onChange={(e) => setPricePaid(e.target.value)} className="w-full rounded-xl border border-white/8 bg-charcoal/60 px-4 py-3 text-sm text-cream" />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-[11px] uppercase tracking-wider text-cream/40">Humidor Location</span>
            <input value={humidor} onChange={(e) => setHumidor(e.target.value)} className="w-full rounded-xl border border-white/8 bg-charcoal/60 px-4 py-3 text-sm text-cream" />
          </label>
        </GlassCard>

        <button type="button" onClick={handleSave} className="tap-scale w-full rounded-2xl bg-gradient-to-r from-gold to-brass py-4 text-sm font-bold text-charcoal shadow-gold-glow">
          Save to Humidor
        </button>
      </div>
    </div>
  );
}
