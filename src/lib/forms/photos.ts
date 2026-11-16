/**
 * Photo upload rules, set against Formspree's documented limits (25 MB per
 * file, 100 MB per request, 30-second request timeout). We stay far inside
 * them: at most 5 photos, each shrunk in the browser before upload so
 * submissions stay fast and reliable on mobile data.
 */
export const MAX_PHOTOS = 5;
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ACCEPT_ATTR = ACCEPTED_TYPES.join(",");
/** Largest original we'll try to process. */
export const MAX_ORIGINAL_BYTES = 20 * 1024 * 1024;
/** Largest file we'll actually send (after shrinking). */
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_DIMENSION = 2000;
const JPEG_QUALITY = 0.82;

export type Photo = { id: string; file: File; previewUrl: string };

export type PhotoResult = { photo: Photo } | { error: string };

/** Validate one chosen file and shrink it to a web-friendly JPEG. */
export async function preparePhoto(file: File): Promise<PhotoResult> {
  const name = file.name || "That photo";
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return { error: `${name} isn't a supported photo type. Please use a JPG, PNG, or WebP image.` };
  }
  if (file.size > MAX_ORIGINAL_BYTES) {
    return { error: `${name} is too large (over 20 MB). Please choose a smaller photo.` };
  }

  let output = file;
  try {
    output = await shrink(file);
  } catch {
    // If the browser can't process it, fall back to the original when small enough.
  }
  if (output.size > MAX_UPLOAD_BYTES) {
    return { error: `${name} is too large to upload. Please choose a smaller photo.` };
  }
  return { photo: { id: crypto.randomUUID(), file: output, previewUrl: URL.createObjectURL(output) } };
}

async function shrink(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  // Small files that are already within bounds don't need re-encoding.
  if (scale === 1 && file.size <= 1.5 * 1024 * 1024) {
    bitmap.close();
    return file;
  }
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas");
  ctx.fillStyle = "#fff"; // flatten transparency for JPEG
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY));
  if (!blob || blob.size >= file.size) return file;
  const base = file.name.replace(/\.[^.]+$/, "") || "photo";
  return new File([blob], `${base}.jpg`, { type: "image/jpeg" });
}
