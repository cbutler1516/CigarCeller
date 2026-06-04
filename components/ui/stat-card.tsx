import { GlassCard } from "./glass-card";

type StatCardProps = {
  label: string;
  value: string;
  detail?: string;
  accent?: "gold" | "default";
  icon?: React.ReactNode;
};

export function StatCard({ label, value, detail, accent = "default", icon }: StatCardProps) {
  return (
    <GlassCard
      className={`p-4 ${accent === "gold" ? "border-gold/20 bg-gradient-to-br from-gold/8 to-transparent" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cream/40">{label}</p>
        {icon ? <span className="text-gold/60">{icon}</span> : null}
      </div>
      <p className={`mt-2 font-serif text-2xl font-semibold leading-none ${accent === "gold" ? "text-gold" : "text-cream"}`}>
        {value}
      </p>
      {detail ? <p className="mt-1.5 text-[11px] text-cream/35">{detail}</p> : null}
    </GlassCard>
  );
}
