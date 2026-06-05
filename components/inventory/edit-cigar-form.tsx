"use client";

import type { Cigar, Strength } from "@/lib/mock-data";
import { inferPlaceholderStyle, STRENGTH_OPTIONS } from "@/lib/storage";
import { useStore } from "@/lib/store-context";
import { useCigarPhoto } from "@/lib/use-cigar-photo";
import { resolveCigarImage } from "@/lib/cigar-image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { CigarPhotoCapture } from "@/components/ui/cigar-photo-capture";

type EditCigarFormProps = {
  cigar: Cigar;
};

export function EditCigarForm({ cigar }: EditCigarFormProps) {
  const { updateCigar } = useStore();
  const router = useRouter();
  const initialPhoto = resolveCigarImage(cigar);
  const { photo, error, isProcessing, handleFile, clearPhoto } = useCigarPhoto(initialPhoto);

  const [brand, setBrand] = useState(cigar.brand);
  const [name, setName] = useState(cigar.name);
  const [vitola, setVitola] = useState(cigar.vitola);
  const [wrapper, setWrapper] = useState(cigar.wrapper);
  const [strength, setStrength] = useState<Strength>(cigar.strength);
  const [quantity, setQuantity] = useState(String(cigar.quantity));
  const [pricePaid, setPricePaid] = useState(String(cigar.pricePaid || ""));
  const [humidor, setHumidor] = useState(cigar.humidor);

  useEffect(() => {
    setBrand(cigar.brand);
    setName(cigar.name);
    setVitola(cigar.vitola);
    setWrapper(cigar.wrapper);
    setStrength(cigar.strength);
    setQuantity(String(cigar.quantity));
    setPricePaid(String(cigar.pricePaid || ""));
    setHumidor(cigar.humidor);
  }, [cigar]);

  function handleSave() {
    if (!brand.trim() || !name.trim()) {
      alert("Brand and cigar name are required.");
      return;
    }

    if (isProcessing) {
      alert("Please wait for the photo to finish compressing.");
      return;
    }

    const savedPhoto = photo && !photo.startsWith("blob:") ? photo : null;

    updateCigar(cigar.id, {
      brand: brand.trim(),
      name: name.trim(),
      vitola: vitola.trim() || "Robusto",
      quantity: Math.max(0, parseInt(quantity, 10) || 0),
      strength,
      wrapper: wrapper.trim() || "Natural",
      pricePaid: parseFloat(pricePaid) || 0,
      humidor: humidor.trim() || "Main Humidor",
      placeholderStyle: inferPlaceholderStyle(wrapper || "Natural"),
      userUploadedPhotoUrl: savedPhoto,
    });

    router.push("/inventory");
  }

  return (
    <div className="animate-fade-up">
      <header className="px-5 pb-4 pt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/60">Edit Cellar Item</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-cream">{cigar.name}</h1>
        <p className="mt-1 text-sm text-cream/45">{cigar.brand}</p>
      </header>

      <div className="space-y-6 px-5 pb-6">
        <CigarPhotoCapture
          photoPreview={photo}
          error={error}
          isProcessing={isProcessing}
          onFileSelected={handleFile}
          onClearPhoto={clearPhoto}
        />

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
              <input type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full rounded-xl border border-white/8 bg-charcoal/60 px-4 py-3 text-sm text-cream" />
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

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => router.push("/inventory")}
            className="tap-scale rounded-2xl border border-white/10 py-4 text-sm font-semibold text-cream/60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isProcessing}
            className="tap-scale rounded-2xl bg-gradient-to-r from-gold to-brass py-4 text-sm font-bold text-charcoal shadow-gold-glow disabled:opacity-50"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
