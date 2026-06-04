type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export function SectionHeader({ eyebrow, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        {eyebrow ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold/55">{eyebrow}</p>
        ) : null}
        <h2 className={`font-serif text-lg font-semibold text-cream ${eyebrow ? "mt-1" : ""}`}>{title}</h2>
        {subtitle ? <p className="mt-0.5 text-xs text-cream/40">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
