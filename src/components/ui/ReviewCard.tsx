import { Star } from "lucide-react";
import type { Review } from "../../lib/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full flex-col border-t border-sand pt-6">
      <div className="flex gap-1" aria-label={`Rating ${review.rating} dari 5`}>
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star
            key={starIndex}
            className={
              starIndex < review.rating
                ? "h-3.5 w-3.5 fill-brass text-brass"
                : "h-3.5 w-3.5 text-sand"
            }
            aria-hidden="true"
          />
        ))}
      </div>

      <p className="mt-5 flex-1 font-display text-[1.15rem] italic leading-relaxed text-espresso">
        “{review.text}”
      </p>

      <div className="mt-6 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-espresso text-xs font-semibold text-cream"
        >
          {review.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="text-sm font-medium text-espresso">{review.name}</p>
          <p className="text-[0.68rem] uppercase tracking-[0.16em] text-taupe">
            {review.label}
          </p>
        </div>
      </div>
    </article>
  );
}
