import type { SanityImage } from "./types";

/**
 * Build a Sanity CDN URL for a given width. The CDN resizes and serves modern
 * formats (auto=format) itself, so no Next.js image optimization is needed.
 */
export function sanityImageUrl(
  image: SanityImage,
  width: number,
  opts: { aspect?: number } = {},
): string {
  const params = new URLSearchParams({ w: String(width), auto: "format", q: "75", fit: "max" });
  if (opts.aspect) {
    params.set("h", String(Math.round(width / opts.aspect)));
    params.set("fit", "crop");
    if (image.hotspot) {
      params.set("crop", "focalpoint");
      params.set("fp-x", image.hotspot.x.toFixed(3));
      params.set("fp-y", image.hotspot.y.toFixed(3));
    }
  }
  return `${image.url}?${params}`;
}

export function sanitySrcSet(image: SanityImage, widths: number[], aspect?: number): string {
  return widths.map((w) => `${sanityImageUrl(image, w, { aspect })} ${w}w`).join(", ");
}
