export const IMAGE_MAX_WIDTH = 1200;
export const IMAGE_JPEG_QUALITY = 0.8;
/** Max raw file size before compression (12 MB). */
export const IMAGE_MAX_FILE_BYTES = 12 * 1024 * 1024;
/** Max base64 string length after compression (~1.5 MB) for localStorage safety. */
export const IMAGE_MAX_BASE64_CHARS = 1_500_000;

export class ImageProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageProcessingError";
  }
}

export function validateImageFile(file: File): void {
  if (!file.type.startsWith("image/")) {
    throw new ImageProcessingError("Please choose a photo file (JPEG, PNG, or similar).");
  }
  if (file.size > IMAGE_MAX_FILE_BYTES) {
    throw new ImageProcessingError("Photo is too large. Use an image under 12 MB.");
  }
}

/** Compress user photo to base64 JPEG for localStorage. */
export function compressImageToBase64(file: File): Promise<string> {
  validateImageFile(file);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new ImageProcessingError("Could not read the photo. Try again."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new ImageProcessingError("Could not load the photo. Try a different image."));
      img.onload = () => {
        const scale = Math.min(1, IMAGE_MAX_WIDTH / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new ImageProcessingError("Photo processing is unavailable in this browser."));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/jpeg", IMAGE_JPEG_QUALITY);
        if (base64.length > IMAGE_MAX_BASE64_CHARS) {
          reject(
            new ImageProcessingError(
              "Photo is still too large after compression. Try a smaller image or crop closer to the cigar.",
            ),
          );
          return;
        }
        resolve(base64);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function getImageProcessingErrorMessage(error: unknown): string {
  if (error instanceof ImageProcessingError) return error.message;
  return "Could not process the photo. Try another image.";
}
