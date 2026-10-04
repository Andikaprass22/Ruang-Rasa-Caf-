import { MapPin, Navigation } from "lucide-react";
import { restaurant } from "../../lib/data";
import { cn, getTodayHours } from "../../lib/utils";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

export function Location() {
  const today = getTodayHours(restaurant.hours);

  return (
    <section id="lokasi" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <SectionHeading eyebrow="Lokasi & Jam" title="Mampir ke Ruang Rasa" />

          <p className="mt-5 flex max-w-sm items-start gap-2 text-[0.95rem] leading-relaxed text-mocha">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
            {restaurant.address}
          </p>

          <dl className="mt-8 max-w-sm">
            {restaurant.hours.map((entry) => {
              const isToday = entry === today;
              return (
                <div
                  key={entry.day}
                  className="flex items-center justify-between gap-4 border-b border-sand py-2.5 text-sm"
                >
                  <dt
                    className={cn(
                      "flex items-center gap-2",
                      isToday ? "font-medium text-espresso" : "text-mocha",
                    )}
                  >
                    {entry.day}
                    {isToday && (
                      <span className="rounded-sm bg-terracotta/10 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-terracotta">
                        Hari ini
                      </span>
                    )}
                  </dt>
                  <dd
                    className={cn(
                      "text-espresso",
                      isToday ? "font-semibold" : "font-medium",
                    )}
                  >
                    {entry.closed ? "Tutup" : `${entry.open} – ${entry.close}`}
                  </dd>
                </div>
              );
            })}
          </dl>

          <Button
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Petunjuk Arah
          </Button>
        </div>

        <div className="overflow-hidden rounded-sm border border-sand bg-ivory p-2">
          <iframe
            src={restaurant.mapsEmbedUrl}
            title={`Peta lokasi ${restaurant.name}`}
            loading="lazy"
            className="h-80 w-full rounded-sm lg:h-full"
          />
        </div>
      </div>
    </section>
  );
}
