const fs = require("fs");
const path = require("path");

/** User media source folder (outside the repo). */
const SOURCE_DIR = path.join("C:", "Users", "Public", "Videos");

const publicDir = path.join(__dirname, "..", "public");
const imagesDir = path.join(publicDir, "images");
const videosDir = path.join(publicDir, "videos");

const files = {
  video: {
    source: path.join(SOURCE_DIR, "cigar-hero-video.mp4"),
    dest: path.join(videosDir, "cigar-hero-video.mp4"),
  },
  collage: {
    source: path.join(SOURCE_DIR, "cigar-collage.png"),
    dest: path.join(imagesDir, "cigar-collage.png"),
  },
};

function copyIfExists({ source, dest }, label) {
  if (!fs.existsSync(source)) {
    console.warn(`SKIP ${label}: not found at ${source}`);
    return false;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(source, dest);
  const size = fs.statSync(dest).size;
  console.log(`OK ${label}: ${dest} (${size} bytes)`);
  return true;
}

console.log(`Syncing media from ${SOURCE_DIR}...\n`);
copyIfExists(files.video, "hero video");
copyIfExists(files.collage, "collage image");
