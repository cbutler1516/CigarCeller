import type { Cigar, JournalEntry, Strength } from "./mock-data";
import { journalEntries as seedJournal, sampleCigars as seedCigars } from "./mock-data";

const CIGARS_KEY = "cigarvault_cigars";
const JOURNAL_KEY = "cigarvault_journal";
const INIT_KEY = "cigarvault_initialized";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadCigars(): Cigar[] {
  if (!isBrowser()) return seedCigars;
  try {
    const raw = localStorage.getItem(CIGARS_KEY);
    if (!raw) return seedCigars;
    return JSON.parse(raw) as Cigar[];
  } catch {
    return seedCigars;
  }
}

export function saveCigars(cigars: Cigar[]) {
  if (!isBrowser()) return;
  localStorage.setItem(CIGARS_KEY, JSON.stringify(cigars));
}

export function loadJournal(): JournalEntry[] {
  if (!isBrowser()) return seedJournal;
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    if (!raw) return seedJournal;
    const parsed = JSON.parse(raw) as Partial<JournalEntry>[];
    return parsed.map((entry) => ({
      id: entry.id ?? generateId(),
      cigarName: entry.cigarName ?? "",
      brand: entry.brand ?? "",
      dateSmoked: entry.dateSmoked ?? "",
      rating: entry.rating ?? 0,
      draw: entry.draw ?? 0,
      burn: entry.burn ?? 0,
      construction: entry.construction ?? 0,
      flavorNotes: entry.flavorNotes ?? [],
      strength: entry.strength ?? "Medium",
      smoothness: entry.smoothness ?? 0,
      notes: entry.notes ?? "",
      wouldBuyAgain: entry.wouldBuyAgain ?? false,
      tastingWheelTags: entry.tastingWheelTags ?? entry.flavorNotes?.slice(0, 3) ?? [],
      smokeDurationMinutes: entry.smokeDurationMinutes ?? 60,
      pairing: entry.pairing ?? "",
      occasion: entry.occasion ?? "",
    }));
  } catch {
    return seedJournal;
  }
}

export function saveJournal(entries: JournalEntry[]) {
  if (!isBrowser()) return;
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
}

export function initializeStorage() {
  if (!isBrowser()) return;
  if (localStorage.getItem(INIT_KEY)) return;
  saveCigars(seedCigars);
  saveJournal(seedJournal);
  localStorage.setItem(INIT_KEY, "1");
}

export function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function inferPlaceholderStyle(wrapper: string): Cigar["placeholderStyle"] {
  const w = wrapper.toLowerCase();
  if (w.includes("maduro")) return "maduro";
  if (w.includes("rosado")) return "rosado";
  if (w.includes("connecticut")) return "connecticut";
  if (w.includes("oscuro")) return "oscuro";
  if (w.includes("sumatra")) return "sumatra";
  return "natural";
}

export type NewCigarInput = Omit<Cigar, "id">;

export type NewJournalInput = Omit<JournalEntry, "id">;

export const STRENGTH_OPTIONS: Strength[] = ["Mild", "Mild-Medium", "Medium", "Medium-Full", "Full"];
