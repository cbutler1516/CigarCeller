import { Cigar, getCigarInitials, placeholderGradient } from "@/lib/mock-data";
import { hasCigarPhoto, resolveCigarImage } from "@/lib/cigar-image";

type CigarImagePlaceholderProps = {
  cigar: Pick<Cigar, "brand" | "placeholderStyle" | "wrapper" | "photoUrl" | "userUploadedPhotoUrl" | "externalImageUrl">;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: { container: "h-32", body: "h-16 w-4", band: "h-3.5 w-6", initials: "text-[10px]", ring: "h-20 w-20" },
  md: { container: "h-48", body: "h-20 w-[18px]", band: "h-4 w-7", initials: "text-xs", ring: "h-28 w-28" },
  lg: { container: "h-60", body: "h-28 w-5", band: "h-5 w-8", initials: "text-sm", ring: "h-36 w-36" },
};

export function CigarImagePlaceholder({ cigar, size = "md", className = "" }: CigarImagePlaceholderProps) {
  const s = sizeClasses[size];
  const initials = getCigarInitials(cigar.brand);
  const imageUrl = resolveCigarImage(cigar as Cigar);

  if (imageUrl) {
    return (
      <div className={`relative overflow-hidden ${s.container} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={`${cigar.brand} cigar`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${placeholderGradient(cigar.placeholderStyle)} ${s.container} ${className}`}
    >
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />

      {/* Wood grain */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `repeating-linear-gradient(
            87deg,
            transparent,
            transparent 4px,
            rgba(0,0,0,0.12) 4px,
            rgba(0,0,0,0.12) 6px
          )`,
        }}
      />

      {/* Warm spotlight */}
      <div className="animate-glow-pulse absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(201,169,98,0.22),transparent_60%)]" />

      {/* Humidor shelf */}
      <div className="absolute inset-x-4 bottom-[22%] h-[2px] rounded-full bg-gradient-to-r from-transparent via-gold/30 to-transparent shadow-gold-glow" />
      <div className="absolute inset-x-0 bottom-[22%] h-8 bg-gradient-to-t from-black/30 to-transparent" />

      {/* Smoke wisps */}
      <div className="animate-smoke-1 absolute left-[42%] top-[18%] h-8 w-8 rounded-full bg-white/5 blur-md" />
      <div className="animate-smoke-2 absolute left-[52%] top-[14%] h-6 w-6 rounded-full bg-white/4 blur-md" />

      {/* Pedestal glow */}
      <div className={`absolute left-1/2 top-[52%] ${s.ring} -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-2xl`} />

      {/* Angled cigar */}
      <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rotate-[28deg]">
        <div className="relative">
          {/* Shadow */}
          <div className="absolute -bottom-3 left-1/2 h-3 w-20 -translate-x-1/2 rounded-full bg-black/50 blur-md" />

          {/* Body */}
          <div
            className={`${s.body} relative rounded-full bg-gradient-to-b from-[#6b3a1f] via-[#3d2010] to-[#1a0e08] shadow-[inset_2px_0_8px_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.6)] ring-1 ring-gold/20`}
          >
            {/* Wrapper texture lines */}
            <div className="absolute inset-x-0 top-0 h-full opacity-20">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute inset-x-1 border-t border-black/30" style={{ top: `${i * 18}%` }} />
              ))}
            </div>
          </div>

          {/* Band */}
          <div
            className={`absolute left-1/2 top-[42%] ${s.band} -translate-x-1/2 -translate-y-1/2 rounded-sm border border-gold/50 bg-gradient-to-r from-[#8a7344] via-gold to-[#8a7344] shadow-md`}
          >
            <span className={`flex h-full items-center justify-center font-serif font-bold text-charcoal ${s.initials}`}>
              {initials}
            </span>
          </div>

          {/* Cap */}
          <div className="absolute -right-0.5 top-[8%] h-3 w-4 rounded-full bg-[#2a1508] ring-1 ring-gold/15" />

          {/* Foot / ember */}
          <div className="absolute -left-1 bottom-[12%] h-2.5 w-2.5 rounded-full bg-orange-700/80 blur-[1px] ring-1 ring-orange-500/40" />
        </div>
      </div>

      {/* Wrapper pill */}
      <div className="absolute bottom-3 left-3 rounded-lg border border-white/8 bg-charcoal/60 px-2.5 py-1 text-[10px] font-medium text-cream/50 backdrop-blur-md">
        {cigar.wrapper}
      </div>

      {!hasCigarPhoto(cigar as Cigar) && (
        <div className="absolute bottom-3 right-3 rounded-lg border border-gold/15 bg-gold/8 px-2 py-0.5 text-[9px] uppercase tracking-wider text-gold/60 backdrop-blur-md">
          Placeholder
        </div>
      )}
    </div>
  );
}
