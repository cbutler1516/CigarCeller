export type Strength = "Mild" | "Mild-Medium" | "Medium" | "Medium-Full" | "Full";

export type CigarImages = {
  photoUrl: string | null;
  userUploadedPhotoUrl: string | null;
  externalImageUrl: string | null;
};

export type Cigar = CigarImages & {
  id: string;
  brand: string;
  name: string;
  vitola: string;
  quantity: number;
  rating: number;
  strength: Strength;
  wrapper: string;
  pricePaid: number;
  humidor: string;
  flavorTags: string[];
  isFavorite: boolean;
  wouldBuyAgain: boolean;
  smokeDurationMinutes: number;
  /** Visual placeholder gradient key — used until a real photo is uploaded */
  placeholderStyle: "maduro" | "rosado" | "connecticut" | "oscuro" | "sumatra" | "natural";
};

export type JournalEntry = {
  id: string;
  cigarId?: string;
  cigarName: string;
  brand: string;
  dateSmoked: string;
  rating: number;
  draw: number;
  burn: number;
  construction: number;
  flavorNotes: string[];
  tastingWheelTags: string[];
  strength: Strength;
  smoothness: number;
  notes: string;
  wouldBuyAgain: boolean;
  smokeDurationMinutes: number;
  pairing: string;
  occasion: string;
};

export const TASTING_WHEEL_TAGS = [
  "Cedar",
  "Cocoa",
  "Pepper",
  "Cream",
  "Leather",
  "Earth",
  "Coffee",
  "Sweet",
  "Spice",
] as const;

export const dashboardStats = {
  totalCigars: 47,
  humidorValue: 1248,
  averageRating: 89,
  topWrapper: "Maduro",
  tasteProfile:
    "You're trending toward smooth medium-bodied cigars with cocoa, cedar, and cream notes.",
  favorites: [
    { name: "Padron 1964 Anniversary", brand: "Padron", rating: 96 },
    { name: "Opus X PerfecXion No. 2", brand: "Arturo Fuente", rating: 94 },
    { name: "Liga Privada No. 9", brand: "Drew Estate", rating: 92 },
  ],
};

export const sampleCigars: Cigar[] = [
  {
    id: "1",
    brand: "Padron",
    name: "1964 Anniversary Maduro",
    vitola: "Torpedo",
    quantity: 8,
    rating: 96,
    strength: "Full",
    wrapper: "Maduro",
    pricePaid: 18,
    humidor: "Main Humidor",
    flavorTags: ["Cocoa", "Espresso", "Earth"],
    isFavorite: true,
    wouldBuyAgain: true,
    smokeDurationMinutes: 75,
    placeholderStyle: "maduro",
    photoUrl: null,
    userUploadedPhotoUrl: null,
    externalImageUrl: null,
  },
  {
    id: "2",
    brand: "Arturo Fuente",
    name: "Opus X PerfecXion No. 2",
    vitola: "Churchill",
    quantity: 3,
    rating: 94,
    strength: "Full",
    wrapper: "Rosado",
    pricePaid: 32,
    humidor: "Special Reserve",
    flavorTags: ["Spice", "Leather", "Cedar"],
    isFavorite: true,
    wouldBuyAgain: true,
    smokeDurationMinutes: 90,
    placeholderStyle: "rosado",
    photoUrl: null,
    userUploadedPhotoUrl: null,
    externalImageUrl: null,
  },
  {
    id: "3",
    brand: "Drew Estate",
    name: "Liga Privada No. 9",
    vitola: "Belicoso",
    quantity: 12,
    rating: 92,
    strength: "Full",
    wrapper: "Connecticut Broadleaf",
    pricePaid: 14,
    humidor: "Main Humidor",
    flavorTags: ["Dark Chocolate", "Coffee", "Cream"],
    isFavorite: true,
    wouldBuyAgain: true,
    smokeDurationMinutes: 65,
    placeholderStyle: "connecticut",
    photoUrl: null,
    userUploadedPhotoUrl: null,
    externalImageUrl: null,
  },
  {
    id: "4",
    brand: "My Father",
    name: "Le Bijou 1922",
    vitola: "Torpedo Box Press",
    quantity: 6,
    rating: 91,
    strength: "Full",
    wrapper: "Oscuro",
    pricePaid: 12,
    humidor: "Main Humidor",
    flavorTags: ["Pepper", "Cocoa", "Charred Oak"],
    isFavorite: false,
    wouldBuyAgain: true,
    smokeDurationMinutes: 70,
    placeholderStyle: "oscuro",
    photoUrl: null,
    userUploadedPhotoUrl: null,
    externalImageUrl: null,
  },
  {
    id: "5",
    brand: "Oliva",
    name: "Serie V Melanio",
    vitola: "Figurado",
    quantity: 10,
    rating: 90,
    strength: "Medium-Full",
    wrapper: "Sumatra",
    pricePaid: 11,
    humidor: "Travel Case",
    flavorTags: ["Cedar", "Leather", "Honey"],
    isFavorite: false,
    wouldBuyAgain: true,
    smokeDurationMinutes: 55,
    placeholderStyle: "sumatra",
    photoUrl: null,
    userUploadedPhotoUrl: null,
    externalImageUrl: null,
  },
  {
    id: "6",
    brand: "Rocky Patel",
    name: "Decade",
    vitola: "Robusto",
    quantity: 8,
    rating: 88,
    strength: "Medium",
    wrapper: "Sumatra",
    pricePaid: 9,
    humidor: "Main Humidor",
    flavorTags: ["Cream", "Nuts", "Cedar"],
    isFavorite: false,
    wouldBuyAgain: false,
    smokeDurationMinutes: 45,
    placeholderStyle: "natural",
    photoUrl: null,
    userUploadedPhotoUrl: null,
    externalImageUrl: null,
  },
];

export const journalEntries: JournalEntry[] = [
  {
    id: "1",
    cigarName: "1964 Anniversary Maduro",
    brand: "Padron",
    dateSmoked: "Jun 1, 2026",
    rating: 96,
    draw: 95,
    burn: 92,
    construction: 94,
    flavorNotes: ["Cocoa", "Espresso", "Earth"],
    tastingWheelTags: ["Cocoa", "Earth", "Coffee"],
    strength: "Full",
    smoothness: 90,
    notes: "Perfect evening smoke. Rich and balanced with a long finish.",
    wouldBuyAgain: true,
    smokeDurationMinutes: 75,
    pairing: "Espresso & dark chocolate",
    occasion: "Patio nightcap",
  },
  {
    id: "2",
    cigarName: "Serie V Melanio",
    brand: "Oliva",
    dateSmoked: "May 28, 2026",
    rating: 90,
    draw: 88,
    burn: 91,
    construction: 89,
    flavorNotes: ["Leather", "Pepper", "Cedar"],
    tastingWheelTags: ["Cedar", "Pepper", "Leather"],
    strength: "Medium-Full",
    smoothness: 85,
    notes: "Great construction. Pepper upfront, mellows into leather and cedar.",
    wouldBuyAgain: true,
    smokeDurationMinutes: 55,
    pairing: "Bourbon neat",
    occasion: "Weekend lounge",
  },
  {
    id: "3",
    cigarName: "Liga Privada No. 9",
    brand: "Drew Estate",
    dateSmoked: "May 24, 2026",
    rating: 92,
    draw: 90,
    burn: 88,
    construction: 91,
    flavorNotes: ["Dark Chocolate", "Coffee", "Sweet Spice"],
    tastingWheelTags: ["Coffee", "Cocoa", "Sweet"],
    strength: "Full",
    smoothness: 88,
    notes: "Classic LP9 profile. Creamy smoke with deep sweetness.",
    wouldBuyAgain: true,
    smokeDurationMinutes: 65,
    pairing: "Irish coffee",
    occasion: "After dinner",
  },
  {
    id: "4",
    cigarName: "Decade",
    brand: "Rocky Patel",
    dateSmoked: "May 18, 2026",
    rating: 84,
    draw: 82,
    burn: 85,
    construction: 80,
    flavorNotes: ["Cream", "Nuts"],
    tastingWheelTags: ["Cream", "Sweet"],
    strength: "Medium",
    smoothness: 78,
    notes: "Pleasant but not memorable. Might skip next time.",
    wouldBuyAgain: false,
    smokeDurationMinutes: 45,
    pairing: "Light beer",
    occasion: "Quick smoke break",
  },
];

export const profileStats = {
  name: "Alex Mercer",
  memberSince: "January 2025",
  totalSmoked: 128,
  totalInHumidor: 47,
  averageRating: 89,
  favoriteBrands: [
    { brand: "Padron", count: 18, avgRating: 93, percentage: 92 },
    { brand: "Arturo Fuente", count: 12, avgRating: 91, percentage: 78 },
    { brand: "Drew Estate", count: 15, avgRating: 88, percentage: 85 },
    { brand: "My Father", count: 9, avgRating: 90, percentage: 70 },
  ],
  favoriteWrappers: [
    { wrapper: "Maduro", count: 22, percentage: 88 },
    { wrapper: "Connecticut Broadleaf", count: 14, percentage: 72 },
    { wrapper: "Sumatra", count: 11, percentage: 65 },
    { wrapper: "Oscuro", count: 8, percentage: 58 },
  ],
  cigarDNA: {
    body: 78,
    strength: 72,
    complexity: 85,
    sweetness: 45,
    spice: 60,
    earthiness: 70,
  },
  preferenceInsights: [
    "You rate maduro-wrapped cigars 12 points higher on average.",
    "Nicaraguan blends dominate your top-rated smokes.",
    "You prefer 60–75 minute sessions over quick smokes.",
    "Cocoa and cedar appear in 80% of your highest-rated notes.",
  ],
  preferenceSummary:
    "You tend to enjoy full-bodied Nicaraguan and Honduran cigars with maduro wrappers, earthy and cocoa-forward profiles.",
};

export const inventoryFilters = [
  "All",
  "Favorites",
  "Medium",
  "Full",
  "Under 60 Min",
  "Would Buy Again",
] as const;

export type InventoryFilter = (typeof inventoryFilters)[number];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function strengthColor(strength: Strength): string {
  switch (strength) {
    case "Mild":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/25";
    case "Mild-Medium":
      return "text-teal-400 bg-teal-400/10 border-teal-400/25";
    case "Medium":
      return "text-amber-400 bg-amber-400/10 border-amber-400/25";
    case "Medium-Full":
      return "text-orange-400 bg-orange-400/10 border-orange-400/25";
    case "Full":
      return "text-red-400 bg-red-400/10 border-red-400/25";
  }
}

export function placeholderGradient(style: Cigar["placeholderStyle"]): string {
  switch (style) {
    case "maduro":
      return "from-[#2a1810] via-[#1a1008] to-[#0f0a06]";
    case "rosado":
      return "from-[#3d1a18] via-[#251010] to-[#120808]";
    case "connecticut":
      return "from-[#3a3428] via-[#252018] to-[#141008]";
    case "oscuro":
      return "from-[#1a1410] via-[#0f0c08] to-[#080604]";
    case "sumatra":
      return "from-[#2e2418] via-[#1c1610] to-[#0e0c08]";
    case "natural":
      return "from-[#3a2e22] via-[#241c14] to-[#12100c]";
  }
}

export function getCigarInitials(brand: string): string {
  return brand
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function filterCigars(cigars: Cigar[], filter: InventoryFilter): Cigar[] {
  switch (filter) {
    case "All":
      return cigars;
    case "Favorites":
      return cigars.filter((c) => c.isFavorite);
    case "Medium":
      return cigars.filter((c) => c.strength === "Medium" || c.strength === "Mild-Medium");
    case "Full":
      return cigars.filter((c) => c.strength === "Full" || c.strength === "Medium-Full");
    case "Under 60 Min":
      return cigars.filter((c) => c.smokeDurationMinutes < 60);
    case "Would Buy Again":
      return cigars.filter((c) => c.wouldBuyAgain);
  }
}

export const recentCigars = sampleCigars.slice(0, 4);
