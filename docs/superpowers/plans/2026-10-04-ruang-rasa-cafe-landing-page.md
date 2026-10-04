# Ruang Rasa Café Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun landing page template kafe (single-page, frontend saja) dengan Vite + React + TypeScript, seluruh konten terpusat di `src/lib/data.ts`.

**Architecture:** SPA statis tanpa backend. Data dan tipe terpisah dari tampilan (`lib/`); komponen presentasional kecil di `components/ui`, rakitan per-bagian di `components/sections`, layout di `components/layout`. State UI lokal (`useState`) untuk filter, accordion, lightbox, dan form.

**Tech Stack:** Vite 5, React 18, TypeScript (strict), Tailwind CSS 3, lucide-react, Vitest + @testing-library/react + jsdom.

**Spec:** `docs/superpowers/specs/2026-10-04-ruang-rasa-cafe-landing-page-design.md`

## Global Constraints

- **Frontend saja.** Dilarang menambah backend, database, API, autentikasi, atau CRUD.
- Bahasa UI: **Indonesia**.
- Semua konten (teks, harga, gambar, kontak, jam, promo) berasal dari `src/lib/data.ts`. Tidak ada teks konten yang di-hardcode di komponen.
- Dilarang menulis klaim absolut tanpa dasar ("terbaik", "nomor satu", "#1").
- Dilarang ada `href="#"` atau tombol yang tidak merespons. Semua `alt` gambar terisi.
- Palet: `cream #F7F1E7`, `espresso #2A211C`, `terracotta #C4703F`, `olive #6B7A4F`, `gold #D9A441`.
- Font: `Fraunces` (display) + `Inter` (body).
- Harga disimpan sebagai integer Rupiah; ditampilkan lewat `formatRupiah`.
- Nomor WhatsApp disimpan sebagai digit saja (mis. `6281234567890`).
- Mobile-first & responsif; breakpoint `sm/md/lg`.

## Review Focus

Input/kondisi yang tidak dijamin oleh test task mana pun tetapi paling mungkin menggigit pengguna, dengan perilaku yang wajar diharapkan:

1. **Nomor WhatsApp kotor** (`+62 812-3456-7890`, awalan `0`, spasi) — `buildWhatsAppUrl` harus membersihkan non-digit agar link `wa.me` valid. (Test di Task 3.)
2. **Kategori tanpa item** — grid menu harus menampilkan pesan kosong, bukan area blank. (Test di Task 8.)
3. **Batas tanggal promo** (hari ini sama dengan `startDate`/`endDate`) — dianggap aktif (inklusif). (Test di Task 3 & 9.)
4. **Teks panjang** (nama hidangan/deskripsi/alamat panjang) — layout tidak boleh jebol; gunakan pembungkusan & batas baris. (Verifikasi manual di Task 14.)
5. **Gambar gagal dimuat** — kartu tetap punya `alt`/latar sehingga tata letak tidak rusak. (Verifikasi manual di Task 14.)

---

### Task 1: Scaffold project, tooling, dan tema

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `postcss.config.js`, `tailwind.config.js`, `vitest.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`, `src/test/setup.ts`, `.gitignore`
- Test: `src/test/smoke.test.ts`

**Interfaces:**
- Consumes: —
- Produces: `App` default component (dipakai `main.tsx`); konfigurasi Tailwind dengan warna `cream/espresso/terracotta/olive/gold` dan `fontFamily.display/sans`; `npm run dev`, `npm run build`, `npm run test` tersedia.

- [ ] **Step 1: Buat scaffold Vite React-TS**

Run: `npm create vite@latest . -- --template react-ts`
Lalu `npm install`.
Expected: `package.json`, `src/`, `index.html`, `tsconfig*.json` terbentuk.

- [ ] **Step 2: Pasang Tailwind, lucide-react, dan Vitest**

Run:
```
npm install -D tailwindcss@3 postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install lucide-react
npx tailwindcss init -p
```
Expected: `tailwind.config.js` dan `postcss.config.js` ada; dependensi masuk `package.json`.

- [ ] **Step 3: Tulis test smoke yang gagal**

`src/test/smoke.test.ts`:
```ts
import { describe, it, expect } from "vitest";
describe("tooling", () => {
  it("menjalankan test", () => {
    expect(1 + 1).toBe(2);
  });
});
```
`src/test/setup.ts`: `import "@testing-library/jest-dom";`

Tambahkan ke `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`, `"typecheck": "tsc --noEmit"`.

- [ ] **Step 4: Konfigurasi Vitest & Tailwind**

`vitest.config.ts`: environment `jsdom`, `setupFiles: ["src/test/setup.ts"]`, `globals: true`.
`tailwind.config.js`: `content: ["./index.html", "./src/**/*.{ts,tsx}"]`, extend `colors` (cream/espresso/terracotta/olive/gold) dan `fontFamily` (`display: ["Fraunces", "serif"]`, `sans: ["Inter", "sans-serif"]`).
`src/index.css`: `@tailwind base/components/utilities;` + `@import` Google Fonts Fraunces & Inter + variabel `:root`.

- [ ] **Step 5: Jalankan test & build**

Run: `npm run test` → Expected: 1 passed.
Run: `npm run build` → Expected: build sukses, folder `dist/`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold vite react ts with tailwind and vitest"
```

---

### Task 2: Tipe data (`src/lib/types.ts`)

**Files:**
- Create: `src/lib/types.ts`

**Interfaces:**
- Consumes: —
- Produces: `CategoryId`, `RestaurantInfo`, `OpeningHour`, `SocialLink`, `MenuCategory`, `MenuItem`, `Promo`, `PromoStatus`, `GalleryImage`, `Review`, `FaqItem`, `ReservationInput` — persis seperti spec §4. Dipakai oleh Task 3, 4, dan seluruh komponen.

- [ ] **Step 1: Tulis `src/lib/types.ts`**

Salin tipe dari spec §4, tambah `export type PromoStatus = "aktif" | "akan-datang" | "berakhir";` dan:
```ts
export interface ReservationInput {
  name: string;
  phone: string;
  date: string;   // "YYYY-MM-DD"
  time: string;   // "HH:mm"
  guests: number;
  note?: string;
}
```

- [ ] **Step 2: Verifikasi tipe ter-compile**

Run: `npm run typecheck`
Expected: PASS (tanpa error).

- [ ] **Step 3: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: add data types"
```

---

### Task 3: Utility murni + unit test (`src/lib/utils.ts`)

**Files:**
- Create: `src/lib/utils.ts`
- Test: `src/lib/utils.test.ts`

**Interfaces:**
- Consumes: `Promo`, `MenuItem`, `CategoryId`, `PromoStatus`, `ReservationInput` dari `types.ts`.
- Produces:
  - `formatRupiah(value: number): string`
  - `buildWhatsAppUrl(number: string, message: string): string`
  - `isPromoActive(promo: Promo, now?: Date): boolean`
  - `getPromoStatus(promo: Promo, now?: Date): PromoStatus`
  - `filterMenuByCategory(items: MenuItem[], categoryId: CategoryId | "semua"): MenuItem[]`
  - `buildReservationMessage(restaurantName: string, input: ReservationInput): string`
  - `cn(...classes: Array<string | false | null | undefined>): string`

- [ ] **Step 1: Tulis test yang gagal (`src/lib/utils.test.ts`)**

```ts
import { describe, it, expect } from "vitest";
import {
  formatRupiah, buildWhatsAppUrl, isPromoActive, getPromoStatus,
  filterMenuByCategory, buildReservationMessage, cn,
} from "./utils";
import type { Promo, MenuItem } from "./types";

describe("formatRupiah", () => {
  it("memformat ribuan", () => expect(formatRupiah(45000)).toBe("Rp45.000"));
  it("memformat jutaan", () => expect(formatRupiah(1250000)).toBe("Rp1.250.000"));
  it("nol", () => expect(formatRupiah(0)).toBe("Rp0"));
});

describe("buildWhatsAppUrl", () => {
  it("membersihkan non-digit", () => {
    expect(buildWhatsAppUrl("+62 812-3456-7890", "Halo"))
      .toBe("https://wa.me/6281234567890?text=Halo");
  });
  it("meng-encode pesan", () => {
    expect(buildWhatsAppUrl("628123", "Nasi Goreng Rempah (Rp45.000)"))
      .toContain("text=Nasi%20Goreng%20Rempah%20(Rp45.000)");
  });
});

const promo: Promo = {
  id: "p1", title: "T", description: "d", image: "i",
  startDate: "2026-10-01", endDate: "2026-10-31",
};

describe("isPromoActive / getPromoStatus", () => {
  it("aktif di tengah periode", () => {
    expect(isPromoActive(promo, new Date("2026-10-15"))).toBe(true);
    expect(getPromoStatus(promo, new Date("2026-10-15"))).toBe("aktif");
  });
  it("inklusif di batas awal & akhir", () => {
    expect(isPromoActive(promo, new Date("2026-10-01"))).toBe(true);
    expect(isPromoActive(promo, new Date("2026-10-31"))).toBe(true);
  });
  it("akan datang", () => expect(getPromoStatus(promo, new Date("2026-09-20"))).toBe("akan-datang"));
  it("berakhir", () => expect(getPromoStatus(promo, new Date("2026-11-05"))).toBe("berakhir"));
});

const items: MenuItem[] = [
  { id: "m1", name: "A", description: "", price: 1, image: "", categoryId: "makanan", featured: true },
  { id: "m2", name: "B", description: "", price: 2, image: "", categoryId: "minuman", featured: false },
];

describe("filterMenuByCategory", () => {
  it("semua mengembalikan seluruh item", () => expect(filterMenuByCategory(items, "semua")).toHaveLength(2));
  it("menyaring per kategori", () => {
    const r = filterMenuByCategory(items, "minuman");
    expect(r).toHaveLength(1);
    expect(r[0].id).toBe("m2");
  });
  it("kategori tanpa item -> array kosong", () => expect(filterMenuByCategory(items, "dessert")).toEqual([]));
});

describe("buildReservationMessage", () => {
  it("memuat detail reservasi", () => {
    const msg = buildReservationMessage("Ruang Rasa Café", {
      name: "Budi", phone: "0812", date: "2026-10-20", time: "19:00", guests: 4, note: "Dekat jendela",
    });
    expect(msg).toContain("Ruang Rasa Café");
    expect(msg).toContain("Budi");
    expect(msg).toContain("4");
    expect(msg).toContain("19:00");
    expect(msg).toContain("Dekat jendela");
  });
});

describe("cn", () => {
  it("menggabungkan & membuang falsy", () => expect(cn("a", false, "b", null, undefined)).toBe("a b"));
});
```

- [ ] **Step 2: Jalankan test, pastikan gagal**

Run: `npm run test -- src/lib/utils.test.ts`
Expected: FAIL — modul `./utils` belum ada.

- [ ] **Step 3: Implementasi `src/lib/utils.ts`**

```ts
import type { Promo, MenuItem, CategoryId, PromoStatus, ReservationInput } from "./types";

export function formatRupiah(value: number): string {
  return `Rp${Math.round(value).toLocaleString("id-ID")}`;
}

export function buildWhatsAppUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isPromoActive(promo: Promo, now: Date = new Date()): boolean {
  const today = toISODate(now);
  return today >= promo.startDate && today <= promo.endDate;
}

export function getPromoStatus(promo: Promo, now: Date = new Date()): PromoStatus {
  const today = toISODate(now);
  if (today < promo.startDate) return "akan-datang";
  if (today > promo.endDate) return "berakhir";
  return "aktif";
}

export function filterMenuByCategory(
  items: MenuItem[],
  categoryId: CategoryId | "semua",
): MenuItem[] {
  if (categoryId === "semua") return items;
  return items.filter((i) => i.categoryId === categoryId);
}

export function buildReservationMessage(restaurantName: string, input: ReservationInput): string {
  const lines = [
    `Halo ${restaurantName}, saya ingin melakukan reservasi.`,
    "",
    `Nama: ${input.name}`,
    `No. HP: ${input.phone}`,
    `Tanggal: ${input.date}`,
    `Jam: ${input.time}`,
    `Jumlah tamu: ${input.guests} orang`,
  ];
  if (input.note) lines.push(`Catatan: ${input.note}`);
  return lines.join("\n");
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
```

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npm run test -- src/lib/utils.test.ts`
Expected: PASS (semua).

- [ ] **Step 5: Commit**

```bash
git add src/lib/utils.ts src/lib/utils.test.ts
git commit -m "feat: add data utils with unit tests"
```

---

### Task 4: Data demo terpusat (`src/lib/data.ts`)

**Files:**
- Create: `src/lib/data.ts`

**Interfaces:**
- Consumes: tipe dari `types.ts`.
- Produces: `restaurant: RestaurantInfo`, `categories: MenuCategory[]`, `menuItems: MenuItem[]`, `promos: Promo[]`, `gallery: GalleryImage[]`, `reviews: Review[]`, `faqs: FaqItem[]`. Dipakai seluruh komponen.

- [ ] **Step 1: Tulis `src/lib/data.ts`**

Isi dengan data demo Ruang Rasa Café:
- `restaurant`: nama "Ruang Rasa Café", tagline singkat (bukan klaim absolut), `intro`, `logoText`, `story` (judul + 2–3 paragraf), `address` (contoh Bandung), `mapsUrl` (`https://www.google.com/maps/search/?api=1&query=...`), `mapsEmbedUrl` (`https://www.google.com/maps?q=...&output=embed`, tanpa API key), `phone` tampilan, `whatsapp: "6281234567890"`, `email`, `hours` (7 hari), `social` (instagram/facebook/tiktok dengan URL nyata), `legal` (mis. "Nama Usaha", "NPWP", "Tahun Berdiri").
- `categories`: `[{id:"makanan",label:"Makanan"},{id:"minuman",label:"Minuman"},{id:"dessert",label:"Dessert"}]`.
- `menuItems`: ≥ 9 item (3+ per kategori), `featured` untuk 3–4 item, `image` memakai URL Unsplash tetap, `alt` dari nama item.
- `promos`: ≥ 2 promo dengan periode yang mencakup tanggal sekarang (2026-10-04) agar tampil aktif.
- `gallery`: ≥ 6 gambar suasana.
- `reviews`: ≥ 3 ulasan (nama, label, rating 1–5, teks wajar).
- `faqs`: ≥ 5 pasangan pertanyaan/jawaban.

Beri komentar singkat di atas tiap ekspor: `// GANTI: ... untuk klien`.

- [ ] **Step 2: Verifikasi tipe**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat: add centralized demo data"
```

---

### Task 5: Komponen UI dasar

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/WhatsAppButton.tsx`
- Test: `src/components/ui/WhatsAppButton.test.tsx`

**Interfaces:**
- Consumes: `cn` dari `lib/utils`.
- Produces:
  - `Button({ href?, onClick?, variant?: "primary" | "outline" | "ghost", children })` — merender `<a>` bila `href` ada, `<button type="button">` bila `onClick`.
  - `SectionHeading({ eyebrow?, title, description?, align?: "left" | "center" })`.
  - `WhatsAppButton({ phone, message, label, variant? })` — merender tautan `target="_blank" rel="noopener noreferrer"` ke `buildWhatsAppUrl(phone, message)`.

- [ ] **Step 1: Tulis test yang gagal**

`src/components/ui/WhatsAppButton.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WhatsAppButton } from "./WhatsAppButton";

describe("WhatsAppButton", () => {
  it("membuat link wa.me dengan pesan ter-encode", () => {
    render(<WhatsAppButton phone="+62 812-3456-7890" message="Halo Ruang Rasa Café" label="Pesan" />);
    const link = screen.getByRole("link", { name: /pesan/i });
    expect(link).toHaveAttribute("href", "https://wa.me/6281234567890?text=Halo%20Ruang%20Rasa%20Caf%C3%A9");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
```

- [ ] **Step 2: Jalankan, pastikan gagal**

Run: `npm run test -- src/components/ui/WhatsAppButton.test.tsx`
Expected: FAIL — modul belum ada.

- [ ] **Step 3: Implementasi ketiga komponen**

`Button.tsx`: gaya dasar `inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition focus-visible:outline-none focus-visible:ring-2`, varian `primary` (bg terracotta, teks cream), `outline` (border espresso), `ghost`. Gunakan `cn`.
`SectionHeading.tsx`: `eyebrow` kecil (uppercase, terracotta), `title` (`font-display text-3xl md:text-4xl`), `description` (teks espresso/70). `align` mengatur `text-center`/`text-left` dan `mx-auto`.
`WhatsAppButton.tsx`: gunakan `buildWhatsAppUrl` + `Button` dengan `href`; sertakan ikon `MessageCircle` dari lucide-react.

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npm run test -- src/components/ui/WhatsAppButton.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui
git commit -m "feat: add base ui components"
```

---

### Task 6: Navbar & Footer

**Files:**
- Create: `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `restaurant` dari `lib/data`; `Button`, `WhatsAppButton`; ikon lucide (`Menu`, `X`, `Instagram`, `Facebook`, `Music2`, `MapPin`, `Phone`, `Mail`).
- Produces: `Navbar`, `Footer` (default export atau named).

- [ ] **Step 1: Implementasi `Navbar`**

- Logo teks dari `restaurant.logoText` menuju `#hero`.
- Tautan anchor: `#cerita`, `#menu`, `#promo`, `#galeri`, `#ulasan`, `#lokasi`, `#faq` (semua harus punya target section yang ada).
- Tombol **"Pesan Sekarang"** = `WhatsAppButton` dengan pesan `Halo {name}, saya ingin memesan.`
- Mobile: hamburger toggle `useState`; panel nav muncul/sembunyi; klik tautan menutup panel.
- Positif/negatif: `sticky top-0 z-50`, latar cream/95 + backdrop-blur.

- [ ] **Step 2: Implementasi `Footer`**

- Kolom: (1) nama + alamat + `legal`; (2) kontak (`phone` telepon `tel:`, `email` `mailto:`, WhatsApp); (3) media sosial dari `restaurant.social` (ikon sesuai `icon`, `target="_blank" rel="noopener noreferrer"`); (4) jam operasional ringkas.
- Baris bawah: `© {year} {name}`.

- [ ] **Step 3: Verifikasi build & lint visual**

Run: `npm run typecheck`
Expected: PASS. (Rendering penuh dicek di Task 14 setelah dipasang di `App`.)

- [ ] **Step 4: Commit**

```bash
git add src/components/layout
git commit -m "feat: add navbar and footer"
```

---

### Task 7: Hero & Story

**Files:**
- Create: `src/components/sections/Hero.tsx`, `src/components/sections/Story.tsx`

**Interfaces:**
- Consumes: `restaurant`, `menuItems` (foto hidangan andalan: cari `featured` pertama); `Button`, `WhatsAppButton`, `SectionHeading`.
- Produces: `Hero`, `Story`.

- [ ] **Step 1: Implementasi `Hero` (`id="hero"`)**

- Grid 2 kolom di `lg`: kiri teks (`logoText`/`tagline` sebagai headline, `intro` sebagai deskripsi), kanan foto hidangan andalan (`menuItems.find(i => i.featured)`).
- Dua tombol: **"Lihat Menu"** (`<a href="#menu">` boleh lewat `Button href`) dan **"Pesan Sekarang"** (`WhatsAppButton`, pesan umum).
- Foto: `loading="eager"`, ada `alt`.

- [ ] **Step 2: Implementasi `Story` (`id="cerita"`)**

- `SectionHeading` dari `restaurant.story.title`, paragraf dari `restaurant.story.paragraphs`, foto `restaurant.story.image`.
- Tanpa klaim absolut.

- [ ] **Step 3: Verifikasi tipe**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx src/components/sections/Story.tsx
git commit -m "feat: add hero and story sections"
```

---

### Task 8: Menu + filter kategori

**Files:**
- Create: `src/components/ui/CategoryFilter.tsx`, `src/components/ui/MenuCard.tsx`, `src/components/sections/Menu.tsx`
- Test: `src/components/sections/Menu.test.tsx`

**Interfaces:**
- Consumes: `menuItems`, `categories` dari `lib/data`; `filterMenuByCategory`, `formatRupiah`, `cn`.
- Produces:
  - `CategoryFilter({ categories, active, onChange })` dengan `active: CategoryId | "semua"`.
  - `MenuCard({ item })` — foto, nama, deskripsi, harga (`formatRupiah`), tombol pesan (WhatsApp menyebut nama + harga item).
  - `Menu({ items }: { items?: MenuItem[] })` — section (`id="menu"`) dengan state `useState<CategoryId | "semua">("semua")`; `items` default `menuItems` (dapat diinjeksi agar state-kosong bisa diuji).

- [ ] **Step 1: Tulis test yang gagal (`src/components/sections/Menu.test.tsx`)**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Menu } from "./Menu";

describe("Menu", () => {
  it("menampilkan semua item lalu menyaring saat kategori dipilih", async () => {
    render(<Menu />);
    expect(screen.getByText("Nasi Goreng Rempah")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Minuman" }));
    expect(screen.queryByText("Nasi Goreng Rempah")).not.toBeInTheDocument();
  });

  it("menampilkan pesan saat tidak ada item yang cocok", () => {
    render(<Menu items={[]} />);
    expect(screen.getByText(/belum ada menu/i)).toBeInTheDocument();
  });
});
```
> Catatan implementer: pastikan `data.ts` memakai nama hidangan `"Nasi Goreng Rempah"` untuk item kategori `makanan`, dan tombol filter berlabel persis "Makanan"/"Minuman"/"Dessert". Sesuaikan assertion bila nama demo berbeda — jangan biarkan test rapuh.

- [ ] **Step 2: Jalankan, pastikan gagal**

Run: `npm run test -- src/components/sections/Menu.test.tsx`
Expected: FAIL — modul belum ada.

- [ ] **Step 3: Implementasi**

- `CategoryFilter`: deretan tombol; tombol "Semua" + satu tombol per `categories`; `aria-pressed` menandai `active`.
- `MenuCard`: kartu `rounded-2xl` dengan foto (`aspect-[4/3]`, `object-cover`), nama (`font-display`), deskripsi (`line-clamp-2`), harga (`font-semibold text-terracotta`), dan `WhatsAppButton` berpesan `Halo {name}, saya ingin memesan *{itemName}* ({formatRupiah(item.price)}).`
- `Menu` section: props `{ items = menuItems }`; render `SectionHeading` + `CategoryFilter` + grid dari `filterMenuByCategory(items, active)`. Bila hasil kosong, render pesan `"Belum ada menu pada kategori ini."` (Review Focus #2).

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npm run test -- src/components/sections/Menu.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/CategoryFilter.tsx src/components/ui/MenuCard.tsx src/components/sections/Menu.tsx src/components/sections/Menu.test.tsx
git commit -m "feat: add menu section with category filter"
```

---

### Task 9: Promo musiman

**Files:**
- Create: `src/components/ui/PromoCard.tsx`, `src/components/sections/Promo.tsx`

**Interfaces:**
- Consumes: `promos` dari `lib/data`; `getPromoStatus`, `formatRupiah`.
- Produces: `PromoCard({ promo })`, `Promo` (`id="promo"`).

- [ ] **Step 1: Implementasi `PromoCard`**

- Badge status dari `getPromoStatus`: `aktif` → "Berlangsung", `akan-datang` → "Segera", `berakhir` → "Berakhir", dengan warna berbeda.
- Tampilkan periode bertanda `startDate`–`endDate` (readable, mis. `1 Okt – 31 Okt 2026`) + `formatRupiah` bila `price` ada.
- Tombol pesan WhatsApp menyebut `promo.title`.
- Kartu `berakhir` diredupkan (`opacity-60`) dan tombolnya tetap berfungsi.

- [ ] **Step 2: Implementasi `Promo` section**

- `SectionHeading` + grid `PromoCard` dari `promos`.

- [ ] **Step 3: Verifikasi tipe**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Promo.tsx
git commit -m "feat: add promo section with date status"
```

---

### Task 10: Galeri + lightbox

**Files:**
- Create: `src/components/sections/Gallery.tsx`
- Test: `src/components/sections/Gallery.test.tsx`

**Interfaces:**
- Consumes: `gallery` dari `lib/data`.
- Produces: `Gallery` (`id="galeri"`) dengan state indeks lightbox (`number | null`).

- [ ] **Step 1: Tulis test yang gagal**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Gallery } from "./Gallery";

describe("Gallery", () => {
  it("membuka dan menutup lightbox", async () => {
    render(<Gallery />);
    const first = screen.getAllByRole("button")[0];
    await userEvent.click(first);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /tutup/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Jalankan, pastikan gagal**

Run: `npm run test -- src/components/sections/Gallery.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implementasi `Gallery`**

- Grid foto; tiap foto adalah `<button>` (buka lightbox, `aria-label` dari `alt`).
- Lightbox: `role="dialog"` `aria-modal`, foto besar + tombol "Tutup"; `Esc` menutup (listener `keydown` di `useEffect`); klik latar menutup.
- Semua `alt` terisi.

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npm run test -- src/components/sections/Gallery.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Gallery.tsx src/components/sections/Gallery.test.tsx
git commit -m "feat: add gallery with lightbox"
```

---

### Task 11: Ulasan & Lokasi

**Files:**
- Create: `src/components/ui/ReviewCard.tsx`, `src/components/sections/Reviews.tsx`, `src/components/sections/Location.tsx`

**Interfaces:**
- Consumes: `reviews`, `restaurant` dari `lib/data`; ikon `Star`, `MapPin`, `Clock`, `Navigation`.
- Produces: `ReviewCard({ review })`, `Reviews` (`id="ulasan"`), `Location` (`id="lokasi"`).

- [ ] **Step 1: Implementasi `Reviews`**

- Grid `ReviewCard`: inisial nama dalam lingkaran, nama, label, rating bintang (render `rating` ikon `Star` terisi), teks. Teks wajar, tanpa klaim berlebihan.

- [ ] **Step 2: Implementasi `Location`**

- Kiri: alamat, tabel jam operasional dari `restaurant.hours` (hari `closed` → "Tutup"), tombol **"Petunjuk Arah"** `<a href={restaurant.mapsUrl} target="_blank" rel="noopener noreferrer">`.
- Kanan: `<iframe src={restaurant.mapsEmbedUrl} title="Peta lokasi {name}" loading="lazy">`.

- [ ] **Step 3: Verifikasi tipe**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ReviewCard.tsx src/components/sections/Reviews.tsx src/components/sections/Location.tsx
git commit -m "feat: add reviews and location sections"
```

---

### Task 12: Reservasi (form → WhatsApp)

**Files:**
- Create: `src/components/sections/Reservation.tsx`
- Test: `src/components/sections/Reservation.test.tsx`

**Interfaces:**
- Consumes: `restaurant` dari `lib/data`; `buildReservationMessage`, `buildWhatsAppUrl`; tipe `ReservationInput`.
- Produces: `Reservation` (`id="reservasi"`) — form terkendali, tombol submit membuka `wa.me` dengan pesan ringkasan.

- [ ] **Step 1: Tulis test yang gagal**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Reservation } from "./Reservation";

describe("Reservation", () => {
  it("menolak submit kosong dan menerima submit valid", async () => {
    render(<Reservation />);
    await userEvent.click(screen.getByRole("button", { name: /pesan via whatsapp/i }));
    expect(screen.getByText(/wajib/i)).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/nama/i), "Budi");
    await userEvent.type(screen.getByLabelText(/no\. hp/i), "08123456789");
    await userEvent.type(screen.getByLabelText(/tanggal/i), "2026-10-20");
    await userEvent.type(screen.getByLabelText(/jam/i), "19:00");
    await userEvent.type(screen.getByLabelText(/jumlah tamu/i), "4");
    expect(screen.getByRole("button", { name: /pesan via whatsapp/i })).toBeEnabled();
  });
});
```

- [ ] **Step 2: Jalankan, pastikan gagal**

Run: `npm run test -- src/components/sections/Reservation.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implementasi `Reservation`**

- Field: nama, no. HP, tanggal (`type="date"`), jam (`type="time"`), jumlah tamu (`type="number"` min 1), catatan (`textarea`, opsional). Setiap field punya `<label htmlFor>` yang cocok.
- Validasi sederhana: field wajib; bila kosong, tampilkan pesan "wajib diisi" dan jangan buka WhatsApp.
- Saat valid: `window.open(buildWhatsAppUrl(restaurant.whatsapp, buildReservationMessage(restaurant.name, form)), "_blank", "noopener,noreferrer")`.
- Sertakan tombol alternatif langsung WhatsApp (pesan umum) sebagai fallback yang selalu berfungsi.

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npm run test -- src/components/sections/Reservation.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Reservation.tsx src/components/sections/Reservation.test.tsx
git commit -m "feat: add reservation form with whatsapp handoff"
```

---

### Task 13: FAQ accordion

**Files:**
- Create: `src/components/ui/FaqItem.tsx`, `src/components/sections/Faq.tsx`
- Test: `src/components/sections/Faq.test.tsx`

**Interfaces:**
- Consumes: `faqs` dari `lib/data`; ikon `Plus`/`Minus` atau `ChevronDown`.
- Produces: `FaqItem({ item, open, onToggle })`, `Faq` (`id="faq"`) dengan state `openId: string | null`.

- [ ] **Step 1: Tulis test yang gagal**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Faq } from "./Faq";

describe("Faq", () => {
  it("membuka dan menutup jawaban", async () => {
    render(<Faq />);
    const firstQ = screen.getAllByRole("button")[0];
    expect(firstQ).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(firstQ);
    expect(firstQ).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(firstQ);
    expect(firstQ).toHaveAttribute("aria-expanded", "false");
  });
});
```

- [ ] **Step 2: Jalankan, pastikan gagal**

Run: `npm run test -- src/components/sections/Faq.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implementasi**

- `FaqItem`: `<button aria-expanded={open} aria-controls={panelId}>` pertanyaan; panel jawaban `id={panelId}` dirender bila `open`.
- `Faq` section: memetakan `faqs`; hanya satu terbuka (`openId`).

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npm run test -- src/components/sections/Faq.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/FaqItem.tsx src/components/sections/Faq.tsx src/components/sections/Faq.test.tsx
git commit -m "feat: add faq accordion"
```

---

### Task 14: Rakit App, README, verifikasi akhir

**Files:**
- Modify: `src/App.tsx`, `src/index.css`
- Create: `README.md`

**Interfaces:**
- Consumes: seluruh section dari Task 5–13.
- Produces: halaman lengkap; README berisi cara jalan & cara ganti konten.

- [ ] **Step 1: Susun `App.tsx`**

Urutan: `Navbar` → `main`(`Hero`, `Story`, `Menu`, `Promo`, `Gallery`, `Reviews`, `Location`, `Reservation`, `Faq`) → `Footer`. Tambah `scroll-behavior: smooth` di `html` dan `scroll-mt-20` pada tiap section ber-id agar tidak tertutup navbar sticky.

- [ ] **Step 2: Jalankan seluruh test & typecheck**

Run: `npm run test`
Expected: semua test PASS.
Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Jalankan build**

Run: `npm run build`
Expected: sukses tanpa error; `dist/` terbentuk.

- [ ] **Step 4: Verifikasi manual di browser**

Run: `npm run dev`, buka di browser. Cek (Review Focus #4 & #5 serta perilaku inti):
- Filter kategori menyaring daftar menu; kategori kosong menampilkan pesan.
- Navbar (desktop + hamburger mobile) menggulir ke section; tidak ada anchor rusak.
- FAQ buka/tutup; galeri lightbox buka/tutup (Esc & tombol).
- Semua tombol WhatsApp membuka `wa.me` dengan pesan yang menyebut nama hidangan/promo/jenis pemesanan.
- "Petunjuk Arah" & media sosial membuka URL valid di tab baru.
- Tidak ada `href="#"`/tombol mati (cari di kode).
- Teks panjang tidak merusak layout; gambar gagal muat masih punya `alt`/latar.
- Tampilan responsif di ~375px dan ~1280px.

- [ ] **Step 5: Tulis `README.md`**

Cara install/run/build, dan panduan "Mengganti konten klien": edit `src/lib/data.ts` (nama, menu, harga, promo, jam, kontak, maps), ganti foto di `public/images/` atau URL di `data.ts`, ganti palet di `tailwind.config.js`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: assemble landing page, add readme, final polish"
```

---

## Catatan untuk eksekutor

- Setelah semua task, jalankan `npm run test` + `npm run build` sekali lagi sebagai gerbang akhir.
- Jangan tambahkan backend/DB/CRUD dalam bentuk apa pun (Global Constraints).
- Perbarui spec bila ada keputusan baru yang menyimpang dari rencana ini.
