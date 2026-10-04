import { restaurant } from "../../lib/data";
import type { MenuItem } from "../../lib/types";
import { formatRupiah } from "../../lib/utils";
import { WhatsAppButton } from "./WhatsAppButton";

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-sand bg-ivory transition duration-500 hover:border-espresso/25 hover:shadow-lift">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full bg-sand/40 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {item.tags && item.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-cream/95 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-terracotta shadow-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <h3 className="min-w-0 font-display text-lg font-semibold leading-snug text-espresso">
            {item.name}
          </h3>
          <span className="h-px flex-1 bg-sand" aria-hidden="true" />
          <span className="shrink-0 font-display text-base font-semibold text-espresso">
            {formatRupiah(item.price)}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-mocha">
          {item.description}
        </p>

        <div className="mt-5 border-t border-sand pt-3">
          <WhatsAppButton
            phone={restaurant.whatsapp}
            message={`Halo ${restaurant.name}, saya ingin memesan *${item.name}* (${formatRupiah(item.price)}).`}
            label="Pesan"
            variant="link"
            className="py-1"
          />
        </div>
      </div>
    </article>
  );
}
