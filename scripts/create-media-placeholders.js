const fs = require("fs");
const path = require("path");

const SOURCE_DIR = path.join("C:", "Users", "Public", "Videos");
const publicDir = path.join(__dirname, "..", "public");

// Prefer syncing from the user's Public Videos folder
require("./sync-media");

// Fallback: minimal placeholder if collage still missing after sync
const collageDest = path.join(publicDir, "images", "cigar-collage.png");
if (!fs.existsSync(collageDest) || fs.statSync(collageDest).size === 0) {
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "base64",
  );
  fs.mkdirSync(path.dirname(collageDest), { recursive: true });
  fs.writeFileSync(collageDest, png);
  console.log("Wrote collage placeholder (sync source not found).");
}

// Legacy migration from public/media/
const legacyDir = path.join(publicDir, "media");
const videoDest = path.join(publicDir, "videos", "cigar-hero-video.mp4");
const legacyVideo = path.join(legacyDir, "cigar-hero-video.mp4");

if ((!fs.existsSync(videoDest) || fs.statSync(videoDest).size === 0) && fs.existsSync(legacyVideo)) {
  fs.mkdirSync(path.dirname(videoDest), { recursive: true });
  fs.copyFileSync(legacyVideo, videoDest);
  console.log("Migrated legacy hero video from public/media/");
}
