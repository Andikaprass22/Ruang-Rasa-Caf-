import { useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { restaurant } from "../../lib/data";
import { WhatsAppButton } from "../ui/WhatsAppButton";

const links = [
  { href: "#cerita", label: "Cerita" },
  { href: "#menu", label: "Menu" },
  { href: "#promo", label: "Promo" },
  { href: "#galeri", label: "Galeri" },
  { href: "#ulasan", label: "Ulasan" },
  { href: "#lokasi", label: "Lokasi" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-cream/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <a
          href="#hero"
          className="inline-flex min-h-11 items-center rounded-sm font-display text-[1.3rem] font-semibold tracking-tight text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          {restaurant.logoText}
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative inline-flex min-h-11 items-center rounded-sm text-[0.78rem] font-medium uppercase tracking-[0.16em] text-mocha transition-colors duration-300 hover:text-espresso focus-visible:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-2.5 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <WhatsAppButton
            phone={restaurant.whatsapp}
            message={`Halo ${restaurant.name}, saya ingin memesan.`}
            label="Pesan Sekarang"
          />
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-sand text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream lg:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <MenuIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-sand bg-cream lg:hidden">
          <ul className="mx-auto max-w-6xl px-6 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-sand/70 py-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-mocha focus-visible:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-5">
              <WhatsAppButton
                phone={restaurant.whatsapp}
                message={`Halo ${restaurant.name}, saya ingin memesan.`}
                label="Pesan Sekarang"
              />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
