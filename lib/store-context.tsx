"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Cigar, JournalEntry } from "./mock-data";
import {
  generateId,
  initializeStorage,
  loadCigars,
  loadJournal,
  saveCigars,
  saveJournal,
  type NewCigarInput,
  type NewJournalInput,
} from "./storage";

type StoreContextValue = {
  cigars: Cigar[];
  journal: JournalEntry[];
  isLoading: boolean;
  addCigar: (input: NewCigarInput) => Cigar;
  updateCigar: (id: string, updates: Partial<Cigar>) => void;
  toggleFavorite: (id: string) => void;
  toggleWouldBuyAgain: (id: string) => void;
  smokeOne: (id: string) => void;
  addJournalEntry: (input: NewJournalInput) => JournalEntry;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cigars, setCigars] = useState<Cigar[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    setCigars(loadCigars());
    setJournal(loadJournal());
    setIsLoading(false);
  }, []);

  const persistCigars = useCallback((next: Cigar[]) => {
    setCigars(next);
    saveCigars(next);
  }, []);

  const persistJournal = useCallback((next: JournalEntry[]) => {
    setJournal(next);
    saveJournal(next);
  }, []);

  const addCigar = useCallback(
    (input: NewCigarInput) => {
      const cigar: Cigar = { ...input, id: generateId() };
      const next = [cigar, ...loadCigars().filter((c) => c.id !== cigar.id)];
      persistCigars(next);
      return cigar;
    },
    [persistCigars],
  );

  const updateCigar = useCallback(
    (id: string, updates: Partial<Cigar>) => {
      const next = loadCigars().map((c) => (c.id === id ? { ...c, ...updates } : c));
      persistCigars(next);
    },
    [persistCigars],
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      const next = loadCigars().map((c) =>
        c.id === id ? { ...c, isFavorite: !c.isFavorite } : c,
      );
      persistCigars(next);
    },
    [persistCigars],
  );

  const toggleWouldBuyAgain = useCallback(
    (id: string) => {
      const next = loadCigars().map((c) =>
        c.id === id ? { ...c, wouldBuyAgain: !c.wouldBuyAgain } : c,
      );
      persistCigars(next);
    },
    [persistCigars],
  );

  const smokeOne = useCallback(
    (id: string) => {
      const cigar = loadCigars().find((c) => c.id === id);
      if (!cigar || cigar.quantity <= 0) return;
      updateCigar(id, { quantity: cigar.quantity - 1 });
    },
    [updateCigar],
  );

  const addJournalEntry = useCallback(
    (input: NewJournalInput) => {
      const entry: JournalEntry = { ...input, id: generateId() };
      const next = [entry, ...loadJournal()];
      persistJournal(next);
      return entry;
    },
    [persistJournal],
  );

  const value = useMemo(
    () => ({
      cigars,
      journal,
      isLoading,
      addCigar,
      updateCigar,
      toggleFavorite,
      toggleWouldBuyAgain,
      smokeOne,
      addJournalEntry,
    }),
    [
      cigars,
      journal,
      isLoading,
      addCigar,
      updateCigar,
      toggleFavorite,
      toggleWouldBuyAgain,
      smokeOne,
      addJournalEntry,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
