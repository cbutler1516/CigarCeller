import { MEDIA } from "@/lib/media";

type CigarImagePanelProps = {
  alt?: string;
  className?: string;
  aspect?: "video" | "wide" | "square" | "banner";
  overlay?: "dark" | "amber" | "none";
  rounded?: boolean;
  priority?: boolean;
};

const aspectClasses = {
  video: "aspect-[16/10]",
  wide: "aspect-[21/9]",
  square: "aspect-square",
  banner: "aspect-[3/1]",
};

export function CigarImagePanel({
  alt = "Assorted premium cigars in a humidor collage",
  className = "",
  aspect = "video",
  overlay = "dark",
  rounded = true,
}: CigarImagePanelProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-wood-dark via-charcoal to-charcoal ${aspectClasses[aspect]} ${rounded ? "rounded-2xl" : ""} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MEDIA.collage}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      {overlay === "dark" && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20"
          aria-hidden
        />
      )}
      {overlay === "amber" && (
        <>
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,169,98,0.15),transparent_60%)]"
            aria-hidden
          />
        </>
      )}
      <div className="media-smoke-glow absolute inset-0 opacity-60" aria-hidden />
    </div>
  );
}
