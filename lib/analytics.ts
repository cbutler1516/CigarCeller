import type { Cigar, JournalEntry, Strength } from "./mock-data";
import { formatCurrency } from "./mock-data";

export type HumidorStats = {
  totalCigars: number;
  humidorValue: number;
  averageRating: number;
  topWrapper: string;
  topFlavorNotes: string[];
  lowQuantityFavorites: Cigar[];
  cigarsInStock: number;
};

export type CigarDNAStats = {
  body: number;
  strength: number;
  complexity: number;
  sweetness: number;
  spice: number;
  earthiness: number;
};

export type ProfileAnalytics = {
  favoriteWrapper: string;
  favoriteStrength: Strength | "Unknown";
  favoriteBrands: { brand: string; count: number; avgRating: number; percentage: number }[];
  favoriteWrappers: { wrapper: string; count: number; percentage: number }[];
  commonFlavorNotes: { note: string; count: number; percentage: number }[];
  bestRatedVitola: string;
  totalSmoked: number;
  totalInHumidor: number;
  averageRating: number;
  cigarDNA: CigarDNAStats;
  tasteProfile: string;
  preferenceInsights: string[];
  tasteMatches: { label: string; match: number }[];
};

function strengthToNumber(s: Strength): number {
  const map: Record<Strength, number> = {
    Mild: 20,
    "Mild-Medium": 35,
    Medium: 50,
    "Medium-Full": 70,
    Full: 90,
  };
  return map[s];
}

function countBy<T>(items: T[], keyFn: (item: T) => string): Map<string, number> {
  const map = new Map<string, number>();
  for (const item of items) {
    const key = keyFn(item);
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return map;
}

function topKey(map: Map<string, number>, fallback = "Unknown"): string {
  let best = fallback;
  let max = 0;
  for (const [k, v] of map) {
    if (v > max) {
      max = v;
      best = k;
    }
  }
  return best;
}

export function computeHumidorStats(cigars: Cigar[]): HumidorStats {
  if (cigars.length === 0) {
    return {
      totalCigars: 0,
      humidorValue: 0,
      averageRating: 0,
      topWrapper: "—",
      topFlavorNotes: [],
      lowQuantityFavorites: [],
      cigarsInStock: 0,
    };
  }

  const totalCigars = cigars.reduce((s, c) => s + c.quantity, 0);
  const humidorValue = cigars.reduce((s, c) => s + c.quantity * c.pricePaid, 0);
  const averageRating = Math.round(cigars.reduce((s, c) => s + c.rating, 0) / cigars.length);

  const wrapperCounts = countBy(cigars, (c) => c.wrapper);
  const flavorMap = new Map<string, number>();
  for (const c of cigars) {
    for (const tag of c.flavorTags) {
      flavorMap.set(tag, (flavorMap.get(tag) ?? 0) + 1);
    }
  }
  const topFlavorNotes = [...flavorMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([note]) => note);

  return {
    totalCigars,
    humidorValue,
    averageRating,
    topWrapper: topKey(wrapperCounts, "—"),
    topFlavorNotes,
    lowQuantityFavorites: cigars.filter((c) => c.isFavorite && c.quantity <= 3),
    cigarsInStock: cigars.filter((c) => c.quantity > 0).length,
  };
}

export function computeTasteProfile(cigars: Cigar[], journal: JournalEntry[]): string {
  if (cigars.length === 0 && journal.length === 0) {
    return "Add cigars and journal entries to build your taste profile.";
  }

  const strengths = countBy(cigars, (c) => c.strength);
  const topStrength = topKey(strengths, "medium-bodied");
  const wrappers = countBy(cigars, (c) => c.wrapper);
  const topWrapper = topKey(wrappers);

  const allNotes = [
    ...cigars.flatMap((c) => c.flavorTags),
    ...journal.flatMap((j) => j.tastingWheelTags),
  ];
  const noteCounts = countBy(allNotes, (n) => n);
  const topNotes = [...noteCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([n]) => n.toLowerCase());

  const notesText = topNotes.length > 0 ? topNotes.join(", ") : "complex";
  return `You're trending toward smooth ${topStrength.toLowerCase()} cigars with ${topWrapper.toLowerCase()} wrappers and ${notesText} notes.`;
}

export function computeCigarDNA(cigars: Cigar[], journal: JournalEntry[]): CigarDNAStats {
  const allNotes = [
    ...cigars.flatMap((c) => c.flavorTags.map((t) => t.toLowerCase())),
    ...journal.flatMap((j) => j.tastingWheelTags.map((t) => t.toLowerCase())),
  ];

  const has = (words: string[]) => allNotes.some((n) => words.some((w) => n.includes(w)));

  const avgStrength =
    cigars.length > 0
      ? cigars.reduce((s, c) => s + strengthToNumber(c.strength), 0) / cigars.length
      : 50;

  const avgRating =
    cigars.length > 0 ? cigars.reduce((s, c) => s + c.rating, 0) / cigars.length : 70;

  return {
    body: Math.round(avgStrength * 0.85),
    strength: Math.round(avgStrength),
    complexity: Math.min(95, Math.round(avgRating * 0.9)),
    sweetness: has(["sweet", "cream", "honey"]) ? 62 : 38,
    spice: has(["pepper", "spice"]) ? 68 : 42,
    earthiness: has(["earth", "leather", "cedar"]) ? 72 : 48,
  };
}

export function computeProfileAnalytics(cigars: Cigar[], journal: JournalEntry[]): ProfileAnalytics {
  const humidor = computeHumidorStats(cigars);
  const dna = computeCigarDNA(cigars, journal);
  const totalSmoked = journal.length;

  const brandMap = new Map<string, { count: number; totalRating: number }>();
  for (const c of cigars) {
    const cur = brandMap.get(c.brand) ?? { count: 0, totalRating: 0 };
    brandMap.set(c.brand, { count: cur.count + 1, totalRating: cur.totalRating + c.rating });
  }
  const maxBrand = Math.max(1, ...[...brandMap.values()].map((v) => v.count));
  const favoriteBrands = [...brandMap.entries()]
    .map(([brand, { count, totalRating }]) => ({
      brand,
      count,
      avgRating: Math.round(totalRating / count),
      percentage: Math.round((count / maxBrand) * 100),
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 4);

  const wrapperCounts = countBy(cigars, (c) => c.wrapper);
  const maxWrapper = Math.max(1, ...wrapperCounts.values());
  const favoriteWrappers = [...wrapperCounts.entries()]
    .map(([wrapper, count]) => ({
      wrapper,
      count,
      percentage: Math.round((count / maxWrapper) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  const flavorMap = new Map<string, number>();
  for (const c of cigars) {
    for (const t of c.flavorTags) flavorMap.set(t, (flavorMap.get(t) ?? 0) + 1);
  }
  for (const j of journal) {
    for (const t of j.tastingWheelTags) flavorMap.set(t, (flavorMap.get(t) ?? 0) + 1);
  }
  const maxFlavor = Math.max(1, ...flavorMap.values());
  const commonFlavorNotes = [...flavorMap.entries()]
    .map(([note, count]) => ({ note, count, percentage: Math.round((count / maxFlavor) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const vitolaMap = new Map<string, { rating: number; count: number }>();
  for (const c of cigars) {
    const cur = vitolaMap.get(c.vitola) ?? { rating: 0, count: 0 };
    vitolaMap.set(c.vitola, { rating: cur.rating + c.rating, count: cur.count + 1 });
  }
  const bestRatedVitola =
    [...vitolaMap.entries()]
      .map(([vitola, { rating, count }]) => ({ vitola, avg: rating / count }))
      .sort((a, b) => b.avg - a.avg)[0]?.vitola ?? "—";

  const strengthCounts = countBy(cigars, (c) => c.strength);
  const insights: string[] = [];
  if (humidor.topWrapper !== "—") {
    insights.push(`${humidor.topWrapper} is your most logged wrapper.`);
  }
  if (commonFlavorNotes[0]) {
    insights.push(`${commonFlavorNotes[0].note} appears most often in your flavor notes.`);
  }
  if (journal.length > 0) {
    const avgDur = Math.round(
      journal.reduce((s, j) => s + j.smokeDurationMinutes, 0) / journal.length,
    );
    insights.push(`Your average smoke session runs about ${avgDur} minutes.`);
  }
  if (favoriteBrands[0]) {
    insights.push(`${favoriteBrands[0].brand} leads your cellar with a ${favoriteBrands[0].avgRating} avg rating.`);
  }

  const tasteMatches = cigars
    .filter((c) => c.rating >= 88)
    .slice(0, 3)
    .map((c) => ({ label: `${c.brand} ${c.name}`, match: Math.min(99, c.rating + 2) }));

  return {
    favoriteWrapper: humidor.topWrapper,
    favoriteStrength: (topKey(strengthCounts) as Strength) || "Unknown",
    favoriteBrands,
    favoriteWrappers,
    commonFlavorNotes,
    bestRatedVitola,
    totalSmoked,
    totalInHumidor: humidor.totalCigars,
    averageRating: humidor.averageRating,
    cigarDNA: dna,
    tasteProfile: computeTasteProfile(cigars, journal),
    preferenceInsights: insights.length > 0 ? insights : ["Keep logging cigars to unlock deeper insights."],
    tasteMatches:
      tasteMatches.length > 0
        ? tasteMatches
        : [{ label: "Add rated cigars to see matches", match: 0 }],
  };
}

export function getTopRatedCigars(cigars: Cigar[], limit = 4): Cigar[] {
  return [...cigars].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export { formatCurrency };
