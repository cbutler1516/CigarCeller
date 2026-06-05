"use client";

import type { AIIdentificationResult } from "@/lib/ai-simulation";
import { simulatePhotoAnalysis } from "@/lib/ai-simulation";
import type { Strength } from "@/lib/mock-data";
import { inferPlaceholderStyle, STRENGTH_OPTIONS } from "@/lib/storage";
import { useStore } from "@/lib/store-context";
import { useCigarPhoto } from "@/lib/use-cigar-photo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { CigarPhotoCapture } from "@/components/ui/cigar-photo-capture";
import { CigarImagePanel } from "@/components/media/cigar-image-panel";
import { MediaCard } from "@/components/media/media-card";

export function AddCigarForm() {
  const { addCigar } = useStore();
  const router = useRouter();
  const { photo, error, isProcessing, handleFile, clearPhoto } = useCigarPhoto();

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

  async function onPhotoSelected(file: File | undefined) {
    if (!file) return;
    setAiResult(null);
    setShowAiPanel(true);
    await handleFile(file);
  }

  async function handleAnalyze() {
    if (!photo || photo.startsWith("blob:")) return;
    setIsAnalyzing(true);
    try {
      const result = await simulatePhotoAnalysis(photo);
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

    if (isProcessing) {
      alert("Please wait for the photo to finish compressing.");
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
      userUploadedPhotoUrl: photo && !photo.startsWith("blob:") ? photo : null,
      externalImageUrl: null,
    });

    router.push("/inventory");
  }

  const canAnalyze = Boolean(photo && !photo.startsWith("blob:") && !isProcessing);

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

        <CigarPhotoCapture
          photoPreview={photo}
          error={error}
          isProcessing={isProcessing}
          onFileSelected={onPhotoSelected}
          onClearPhoto={clearPhoto}
        />

        {photo && (
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !canAnalyze}
            className="tap-scale w-full rounded-xl border border-gold/30 bg-gold/10 py-3 text-sm font-semibold text-gold disabled:opacity-50"
          >
            {isAnalyzing ? "Analyzing…" : isProcessing ? "Waiting for photo…" : "Analyze Photo"}
          </button>
        )}

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

        <button type="button" onClick={handleSave} disabled={isProcessing} className="tap-scale w-full rounded-2xl bg-gradient-to-r from-gold to-brass py-4 text-sm font-bold text-charcoal shadow-gold-glow disabled:opacity-50">
          Save to Humidor
        </button>
      </div>
    </div>
  );
}
