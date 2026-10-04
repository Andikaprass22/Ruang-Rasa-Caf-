import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu as MenuIcon, X } from "lucide-react";
import { restaurant } from "../../lib/data";
import { cn } from "../../lib/utils";
import { WhatsAppButton } from "../ui/WhatsAppButton";

const primaryLinks = [
  { href: "#cerita", label: "Cerita" },
  { href: "#menu", label: "Menu" },
  { href: "#promo", label: "Promo" },
];

const moreLinks = [
  { href: "#galeri", label: "Galeri" },
  { href: "#ulasan", label: "Ulasan" },
  { href: "#lokasi", label: "Lokasi" },
  { href: "#faq", label: "FAQ" },
];

const orderMessage = `Halo ${restaurant.name}, saya ingin memesan.`;

const linkBase =
  "group relative inline-flex min-h-11 items-center gap-1.5 rounded-sm text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const linkTone = (solid: boolean) =>
  solid
    ? "text-mocha hover:text-espresso focus-visible:text-espresso focus-visible:ring-terracotta focus-visible:ring-offset-cream"
    : "text-cream/80 hover:text-cream focus-visible:text-cream focus-visible:ring-cream focus-visible:ring-offset-espresso";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");

    const update = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 72;
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      setOverHero(heroBottom > headerHeight);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dropdownOpen]);

  const solid = !overHero || mobileOpen || dropdownOpen;

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid ? "border-sand bg-cream/85 backdrop-blur" : "border-transparent bg-transparent",
      )}
    >
      {!solid && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-espresso/60 to-transparent"
        />
      )}

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <a
          href="#hero"
          className={cn(
            "inline-flex min-h-11 items-center rounded-sm font-display text-[1.3rem] font-semibold tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            solid
              ? "text-espresso focus-visible:ring-terracotta focus-visible:ring-offset-cream"
              : "text-cream focus-visible:ring-cream focus-visible:ring-offset-espresso",
          )}
        >
          {restaurant.logoText}
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {primaryLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={cn(linkBase, linkTone(solid))}>
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 bottom-2.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100",
                    solid ? "bg-terracotta" : "bg-cream",
                  )}
                />
              </a>
            </li>
          ))}

          <li ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={dropdownOpen}
              aria-controls="navbar-more"
              onClick={() => setDropdownOpen((value) => !value)}
              className={cn(linkBase, linkTone(solid))}
            >
              Jelajahi
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  dropdownOpen && "rotate-180",
                )}
              />
            </button>

            {dropdownOpen && (
              <div
                id="navbar-more"
                className="absolute left-1/2 top-full z-10 mt-2 w-48 -translate-x-1/2 rounded-sm border border-sand bg-cream p-1.5 shadow-lift"
              >
                <ul>
                  {moreLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block rounded-sm px-3 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-mocha transition-colors duration-200 hover:bg-espresso/[0.05] hover:text-espresso focus-visible:bg-espresso/[0.05] focus-visible:text-espresso focus-visible:outline-none"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        </ul>

        <div className="hidden lg:block">
          <WhatsAppButton
            phone={restaurant.whatsapp}
            message={orderMessage}
            label="Pesan Sekarang"
            variant={solid ? "primary" : "inverted"}
          />
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-sm border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 lg:hidden",
            solid
              ? "border-sand text-espresso focus-visible:ring-terracotta focus-visible:ring-offset-cream"
              : "border-cream/40 text-cream focus-visible:ring-cream focus-visible:ring-offset-espresso",
          )}
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <MenuIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-sand bg-cream lg:hidden">
          <ul className="mx-auto max-w-6xl px-6 py-4">
            {[...primaryLinks, ...moreLinks].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-sand/70 py-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-mocha focus-visible:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-5">
              <WhatsAppButton
                phone={restaurant.whatsapp}
                message={orderMessage}
                label="Pesan Sekarang"
              />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
