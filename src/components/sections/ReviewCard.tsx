import { Stars } from "@/components/ui/Stars";
import { formatDate } from "@/lib/format";
import type { Review } from "@/lib/sanity/types";

export function ReviewCard({ review }: { review: Review }) {
  const meta = [review.source ? `via ${review.source}` : null, formatDate(review.date)].filter(Boolean).join(" · ");
  return (
    <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)]">
      {review.rating ? <Stars rating={review.rating} /> : null}
      <blockquote className={`flex-1 text-[1.05rem] leading-relaxed ${review.rating ? "mt-4" : ""}`}>
        <p className="whitespace-pre-line">“{review.text}”</p>
      </blockquote>
      <figcaption className="mt-5 border-t border-line pt-4">
        <span className="block font-heading font-bold">{review.customerName}</span>
        {meta ? <span className="text-sm text-muted">{meta}</span> : null}
      </figcaption>
    </figure>
  );
}
