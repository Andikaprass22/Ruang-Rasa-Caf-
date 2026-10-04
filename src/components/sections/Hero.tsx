import { menuItems, restaurant } from "../../lib/data";
import { formatRupiah } from "../../lib/utils";
import { Button } from "../ui/Button";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export function Hero() {
  const featured = menuItems.find((item) => item.featured) ?? menuItems[0];

  return (
    <section id="hero" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <p className="rise text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-terracotta">
            {restaurant.name}
          </p>
          <h1 className="rise mt-5 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.02em] text-espresso [animation-delay:80ms] md:text-6xl">
            {restaurant.tagline}
          </h1>
          <p className="rise mt-6 max-w-xl text-[1rem] leading-relaxed text-mocha [animation-delay:160ms]">
            {restaurant.intro}
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3 [animation-delay:240ms]">
            <WhatsAppButton
              phone={restaurant.whatsapp}
              message={`Halo ${restaurant.name}, saya ingin memesan.`}
              label="Pesan Sekarang"
            />
            <Button href="#menu" variant="outline">
              Lihat Menu
            </Button>
          </div>
        </div>

        <figure className="rise [animation-delay:120ms]">
          <div className="rounded-sm border border-sand bg-ivory p-2 shadow-soft">
            <img
              src={featured.image}
              alt={featured.name}
              loading="eager"
              className="aspect-[4/3] w-full rounded-sm bg-sand/40 object-cover"
            />
          </div>
          <figcaption className="mt-3 flex items-center gap-2 text-[0.78rem] text-taupe">
            <span className="h-px w-6 bg-terracotta/60" aria-hidden="true" />
            {featured.name} · {formatRupiah(featured.price)}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
