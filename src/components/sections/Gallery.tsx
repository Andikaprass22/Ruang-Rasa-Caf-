import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { gallery } from "../../lib/data";
import { cn } from "../../lib/utils";
import { SectionHeading } from "../ui/SectionHeading";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const active = index === null ? null : gallery[index];

  function close() {
    setIndex(null);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <section id="galeri" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <SectionHeading
          eyebrow="Galeri"
          title="Suasana tempat"
          description="Sudut-sudut Ruang Rasa yang bisa kamu pilih untuk duduk berlama-lama."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((image, imageIndex) => {
            const feature = imageIndex === 0;
            const trailing = imageIndex === gallery.length - 1;
            return (
              <button
                key={image.id}
                type="button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setIndex(imageIndex);
                }}
                aria-label={`Perbesar: ${image.alt}`}
                className={cn(
                  "group overflow-hidden rounded-sm border border-sand transition duration-500 hover:border-espresso/25 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
                  feature && "col-span-2 md:row-span-2",
                  !feature && trailing && "col-span-2 md:col-span-1",
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    "w-full bg-sand/40 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]",
                    feature
                      ? "aspect-[4/3] md:h-full md:aspect-auto"
                      : trailing
                        ? "aspect-[4/3] md:aspect-square"
                        : "aspect-square",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/90 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]"
        >
          <div
            className="relative max-h-full w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="rounded-sm border border-cream/15 bg-espresso p-2">
              <img
                src={active.src}
                alt={active.alt}
                className="mx-auto max-h-[78vh] w-auto rounded-sm object-contain"
              />
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="absolute -right-2 -top-2 inline-flex min-h-11 items-center gap-1.5 rounded-sm bg-cream px-4 py-2 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-espresso shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
