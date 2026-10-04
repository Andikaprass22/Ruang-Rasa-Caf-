import { reviews } from "../../lib/data";
import { ReviewCard } from "../ui/ReviewCard";
import { SectionHeading } from "../ui/SectionHeading";

export function Reviews() {
  return (
    <section id="ulasan" className="scroll-mt-20 border-y border-sand bg-ivory">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <SectionHeading
          eyebrow="Ulasan"
          title="Kata pengunjung"
          description="Kesan dari tamu yang singgah untuk makan, bekerja, atau sekadar bertemu teman."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
