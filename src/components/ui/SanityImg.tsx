/* eslint-disable @next/next/no-img-element -- Sanity's image CDN resizes and
   converts formats itself; a plain <img> with srcset avoids paying for a second
   optimization pass and ships no client JavaScript. */
import { sanityImageUrl, sanitySrcSet } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

const WIDTHS = [320, 480, 640, 960, 1280, 1600];

type Props = {
  image: SanityImage;
  /** Fallback description if the owner left the photo description empty. */
  alt: string;
  sizes: string;
  /** width / height. When set, the image is cropped around the hotspot. */
  aspect?: number;
  priority?: boolean;
  className?: string;
};

export function SanityImg({ image, alt, sizes, aspect, priority, className }: Props) {
  const ratio = aspect ?? image.width / image.height;
  const widths = WIDTHS.filter((w) => w <= Math.max(image.width, 320));
  return (
    <img
      src={sanityImageUrl(image, 960, { aspect })}
      srcSet={sanitySrcSet(image, widths.length ? widths : [320], aspect)}
      sizes={sizes}
      width={1000}
      height={Math.round(1000 / ratio)}
      alt={image.alt || alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      style={image.lqip ? { backgroundImage: `url(${image.lqip})`, backgroundSize: "cover" } : undefined}
    />
  );
}
