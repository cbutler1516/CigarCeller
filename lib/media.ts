/**
 * Media asset URL paths (served from /public).
 *
 * Source files (sync with `node scripts/sync-media.js`):
 *   C:\Users\Public\Videos\cigar-hero-video.mp4
 *   C:\Users\Public\Videos\cigar-collage.png
 *
 * App-served copies:
 *   public/videos/cigar-hero-video.mp4
 *   public/images/cigar-collage.png
 */
export const MEDIA_SOURCE_DIR = "C:\\Users\\Public\\Videos";

export const MEDIA = {
  heroVideo: "/videos/cigar-hero-video.mp4",
  collage: "/images/cigar-collage.png",
} as const;

export const MEDIA_FILES = {
  heroVideo: "videos/cigar-hero-video.mp4",
  collage: "images/cigar-collage.png",
} as const;

export const MEDIA_SOURCE_FILES = {
  heroVideo: "cigar-hero-video.mp4",
  collage: "cigar-collage.png",
} as const;
