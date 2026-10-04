import { restaurant } from "../../lib/data";
import { Button } from "../ui/Button";
import { WhatsAppButton } from "../ui/WhatsAppButton";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] scroll-mt-20 items-end overflow-hidden bg-espresso"
    >
      <picture>
        <source media="(min-width: 1024px)" srcSet={restaurant.heroImage.landscape} />
        <img
          src={restaurant.heroImage.portrait}
          alt={`Interior ${restaurant.name} dengan pencahayaan hangat`}
          loading="eager"
          fetchPriority="high"
          className="hero-img absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
      </picture>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso/95 from-0% via-espresso/75 via-55% to-espresso/45 lg:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-espresso/95 from-0% via-espresso/60 via-45% to-espresso/15 lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-espresso/80 from-0% via-espresso/25 via-40% to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 -z-10 rounded-sm border border-cream/20 lg:inset-5"
      />

      <div className="mx-auto w-full max-w-6xl px-8 pb-16 pt-28 lg:px-12 lg:pb-20 lg:pt-44">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <p className="rise flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-cream/85">
              <span className="h-px w-8 bg-cream/60" aria-hidden="true" />
              {restaurant.name}
            </p>

            <h1 className="rise mt-6 font-display text-[2.7rem] font-semibold leading-[1.03] tracking-[-0.02em] text-cream [animation-delay:90ms] [text-wrap:balance] md:text-[3.5rem] lg:text-[4rem]">
              {restaurant.tagline}
            </h1>

            <p className="rise mt-6 max-w-xl text-[1rem] leading-relaxed text-cream/90 [animation-delay:180ms]">
              {restaurant.intro}
            </p>

            <div className="rise mt-9 flex flex-wrap gap-3 [animation-delay:270ms]">
              <WhatsAppButton
                phone={restaurant.whatsapp}
                message={`Halo ${restaurant.name}, saya ingin memesan.`}
                label="Pesan Sekarang"
                variant="inverted"
              />
              <Button href="#menu" variant="outline-light">
                Lihat Menu
              </Button>
            </div>
          </div>

          <p className="rise flex shrink-0 items-center gap-3 text-[0.78rem] text-cream/85 [animation-delay:340ms]">
            <span className="h-px w-6 bg-cream/60" aria-hidden="true" />
            {restaurant.address}
          </p>
        </div>
      </div>
    </section>
  );
}
