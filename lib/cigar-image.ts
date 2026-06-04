import { Cigar } from "@/lib/mock-data";

/** Resolves the best available image URL once photos are wired up. */
export function resolveCigarImage(cigar: Cigar): string | null {
  return cigar.userUploadedPhotoUrl ?? cigar.photoUrl ?? cigar.externalImageUrl;
}

export function hasCigarPhoto(cigar: Cigar): boolean {
  return resolveCigarImage(cigar) !== null;
}
