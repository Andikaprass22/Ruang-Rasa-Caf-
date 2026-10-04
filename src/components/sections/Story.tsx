import { restaurant } from "../../lib/data";
import { SectionHeading } from "../ui/SectionHeading";

export function Story() {
  return (
    <section id="cerita" className="scroll-mt-20 border-y border-sand bg-ivory">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="rounded-sm border border-sand bg-cream p-2">
          <img
            src={restaurant.story.image}
            alt={restaurant.story.title}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-sm bg-sand/40 object-cover"
          />
        </div>
        <div>
          <SectionHeading eyebrow="Cerita Kami" title={restaurant.story.title} />
          <div className="mt-6 max-w-prose space-y-4 text-[0.95rem] leading-relaxed text-mocha">
            {restaurant.story.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
