import { StarIcon } from "./icons";

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-blue" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={n <= rating} className="size-4.5" />
      ))}
    </div>
  );
}
