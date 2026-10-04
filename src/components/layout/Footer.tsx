import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
} from "lucide-react";
import { restaurant } from "../../lib/data";

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Music2,
} as const;

const columnLabel =
  "text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-cream/60";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-cream">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="border-b border-cream/10 pb-10">
          <p className="font-display text-2xl font-semibold tracking-tight">
            {restaurant.name}
          </p>
          <p className="mt-3 flex max-w-sm items-start gap-2 text-sm leading-relaxed text-cream/60">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {restaurant.address}
          </p>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-3">
          <div>
            <p className={columnLabel}>Kontak</p>
            <ul className="mt-4 space-y-1 text-sm text-cream/75">
              <li>
                <a
                  href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-sm transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {restaurant.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${restaurant.email}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-sm transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {restaurant.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${restaurant.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-sm transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className={columnLabel}>Media Sosial</p>
            <ul className="mt-4 space-y-1 text-sm text-cream/75">
              {restaurant.social.map((link) => {
                const Icon = socialIcons[link.icon];
                return (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-sm transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className={columnLabel}>Informasi Bisnis</p>
            <dl className="mt-4 space-y-3 text-sm text-cream/75">
              {restaurant.legal.map((item) => (
                <div key={item.label}>
                  <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-cream/55">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © {year} {restaurant.name}. Semua hak dilindungi.
      </div>
    </footer>
  );
}
