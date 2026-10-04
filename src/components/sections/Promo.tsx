import { promos } from "../../lib/data";
import { PromoCard } from "../ui/PromoCard";
import { SectionHeading } from "../ui/SectionHeading";

export function Promo() {
  return (
    <section id="promo" className="scroll-mt-20 border-y border-sand bg-ivory">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <SectionHeading
          eyebrow="Promo"
          title="Penawaran musiman"
          description="Berlaku pada periode tertentu. Tanggal dapat berubah, silakan cek keterangannya."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-[1.25fr_1fr]">
          {promos.map((promo) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>
      </div>
    </section>
  );
}
