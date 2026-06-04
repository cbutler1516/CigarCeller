type RatingRingProps = {
  rating: number;
  size?: number;
  className?: string;
};

export function RatingRing({ rating, size = 48, className = "" }: RatingRingProps) {
  const r = (size - 8) / 2;
  const cx = size / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.min(rating, 100) / 100);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={cx} cy={cx} r={r} fill="rgba(15,14,13,0.7)" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="#c9a962"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <span className="absolute font-serif text-sm font-bold text-gold">{rating}</span>
    </div>
  );
}
