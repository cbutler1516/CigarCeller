import type { Strength } from "./mock-data";

export type AIIdentificationResult = {
  brand: string;
  cigarName: string;
  confidence: number;
  wrapper: string;
  strength: Strength;
  vitola: string;
  flavorTags: string[];
};

const MOCK_RESULTS: AIIdentificationResult[] = [
  {
    brand: "Padron",
    cigarName: "1964 Anniversary Maduro",
    confidence: 87,
    wrapper: "Maduro",
    strength: "Full",
    vitola: "Torpedo",
    flavorTags: ["Cocoa", "Espresso", "Earth"],
  },
  {
    brand: "Arturo Fuente",
    cigarName: "Hemingway Short Story",
    confidence: 79,
    wrapper: "Cameroon",
    strength: "Medium",
    vitola: "Perfecto",
    flavorTags: ["Cedar", "Cream", "Nuts"],
  },
  {
    brand: "Oliva",
    cigarName: "Serie V Melanio",
    confidence: 82,
    wrapper: "Sumatra",
    strength: "Medium-Full",
    vitola: "Figurado",
    flavorTags: ["Leather", "Pepper", "Cedar"],
  },
  {
    brand: "My Father",
    cigarName: "Le Bijou 1922",
    confidence: 74,
    wrapper: "Oscuro",
    strength: "Full",
    vitola: "Torpedo Box Press",
    flavorTags: ["Pepper", "Cocoa", "Charred Oak"],
  },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simulates AI band recognition from a user-uploaded photo.
 *
 * TODO: Replace with OpenAI Vision API integration:
 * ```ts
 * const response = await openai.chat.completions.create({
 *   model: "gpt-4o",
 *   messages: [{
 *     role: "user",
 *     content: [
 *       { type: "text", text: "Identify this cigar from the band photo..." },
 *       { type: "image_url", image_url: { url: imageBase64 } },
 *     ],
 *   }],
 * });
 * ```
 */
export async function simulatePhotoAnalysis(_imageBase64: string): Promise<AIIdentificationResult> {
  await delay(1400);
  const index = Math.floor(Math.random() * MOCK_RESULTS.length);
  return { ...MOCK_RESULTS[index] };
}
