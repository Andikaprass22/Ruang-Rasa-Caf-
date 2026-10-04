import { Clock } from "lucide-react";
import { restaurant } from "../../lib/data";
import type { Promo as PromoData, PromoStatus } from "../../lib/types";
import { cn, formatRupiah, getPromoStatus } from "../../lib/utils";
import { WhatsAppButton } from "./WhatsAppButton";

const statusLabel: Record<PromoStatus, string> = {
  aktif: "Berlangsung",
  "akan-datang": "Segera",
  berakhir: "Berakhir",
};

const statusDot: Record<PromoStatus, string> = {
  aktif: "bg-sage",
  "akan-datang": "bg-brass",
  berakhir: "bg-taupe",
};

function formatTanggal(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function PromoCard({ promo }: { promo: PromoData }) {
  const status = getPromoStatus(promo);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-sm border border-sand bg-ivory transition duration-500 hover:border-espresso/25 hover:shadow-lift",
        status === "berakhir" && "opacity-60",
      )}
    >
      <div className="relative overflow-hidden">
        <img
          src={promo.image}
          alt={promo.title}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full bg-sand/40 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-cream/95 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-espresso shadow-soft">
            <span
              className={cn("h-1.5 w-1.5 rounded-full", statusDot[status])}
              aria-hidden="true"
            />
            {statusLabel[status]}
          </span>
          {promo.badge && (
            <span className="rounded-sm bg-espresso/85 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-cream">
              {promo.badge}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold leading-snug text-espresso">
          {promo.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mocha">{promo.description}</p>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-sand pt-4">
          <div>
            <p className="flex items-center gap-2 text-[0.8rem] text-taupe">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {formatTanggal(promo.startDate)} – {formatTanggal(promo.endDate)}
            </p>
            {promo.price && (
              <p className="mt-1.5 font-display text-base font-semibold text-espresso">
                {formatRupiah(promo.price)}
              </p>
            )}
          </div>
          <WhatsAppButton
            phone={restaurant.whatsapp}
            message={`Halo ${restaurant.name}, saya ingin memesan promo *${promo.title}*.`}
            label="Ambil Promo"
            variant="outline"
            size="sm"
          />
        </div>
      </div>
    </article>
  );
}
