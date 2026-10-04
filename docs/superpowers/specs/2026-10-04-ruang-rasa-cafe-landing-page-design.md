# Ruang Rasa Café — Design Spec (Landing Page Template)

**Tanggal:** 2026-10-04
**Status:** Menunggu review
**Jenis:** Architectural (proyek baru dari nol)

---

## 1. Tujuan & Konteks

Membangun **landing page profesional untuk restoran/kafe** yang berfungsi ganda sebagai **template** yang bisa ditawarkan ulang ke berbagai usaha kuliner. Nama contoh: **Ruang Rasa Café**.

**Hasil yang diinginkan:** satu halaman pemasaran (single-page) yang terasa "dirancang khusus untuk bisnis kuliner", bukan template generik. Foto makanan berkualitas menjadi fokus visual. Konten demo mudah diganti.

**Kriteria sukses:**

- Semua bagian yang diminta ada dan berfungsi (lihat §5).
- Mengganti nama bisnis, menu, harga, foto, lokasi, dan kontak cukup dengan mengedit **satu file** (`src/lib/data.ts`).
- Tidak ada tautan kosong (`href="#"`) atau tombol yang tidak merespons.
- Tidak ada klaim tanpa dasar seperti "terbaik" atau "nomor satu".
- Nyaman dipakai di desktop dan mobile.
- `npm run build` berhasil tanpa error tipe.

**Keputusan lingkup yang disepakati dengan pemilik proyek:**

- **Frontend saja.** Ini murni landing page statis (SPA) tanpa backend — tidak ada database, API, autentikasi, maupun operasi CRUD dalam scope.
- Seluruh konten (nama bisnis, menu, harga, promo, foto, lokasi, kontak) terpusat di `src/lib/data.ts` sehingga bisa diganti dengan mengedit satu file.

### 1.1 Yang secara eksplisit BUKAN bagian dari spec ini

- Database (Supabase/Postgres/Firebase/SQLite), API server, autentikasi.
- Panel admin / operasi Create-Read-Update-Delete.
- CMS, multi-bahasa, keranjang belanja, pembayaran online.
- Backend reservasi (form reservasi hanya meneruskan pesan ke WhatsApp).

Alasan: pemilik hanya menginginkan frontend. Perubahan konten dilakukan dengan mengedit `src/lib/data.ts`.

---

## 2. Tech Stack

| Bagian | Pilihan | Alasan |
|---|---|---|
| Build tool | **Vite 5** | Cepat, standar, output statis |
| UI | **React 18 + TypeScript** (strict) | Diminta; tipe kuat untuk data layer |
| Styling | **Tailwind CSS 3** | Konsisten, responsif, mudah dikustom tema |
| Ikon | **lucide-react** | Ringan, konsisten, tree-shakeable |
| Font | Google Fonts: **Fraunces** (display serif) + **Inter** (body) | Karakter hangat, mudah dibaca |

Tidak ada state library eksternal. State lokal (`useState`) cukup untuk filter kategori, accordion FAQ, dan form reservasi. Tidak ada router — satu halaman dengan navigasi anchor + smooth scroll.

---

## 3. Arsitektur & Struktur File

Prinsip: **pemisahan data dari tampilan**. Komponen tidak pernah menulis konten secara hardcoded; semua teks/gambar/harga berasal dari `src/lib/data.ts`.

```
ruang-rasa-cafe/
├─ index.html
├─ package.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ public/
│  └─ images/                # foto makanan & suasana (placeholder berkualitas)
├─ src/
│  ├─ main.tsx               # entry
│  ├─ App.tsx                # susun urutan section
│  ├─ index.css              # Tailwind + font + variabel tema
│  ├─ lib/
│  │  ├─ types.ts            # SELURUH tipe data
│  │  ├─ data.ts             # SELURUH konten & data demo (sumber tunggal)
│  │  └─ utils.ts            # formatRupiah, buildWhatsAppUrl, isPromoActive, dll
│  └─ components/
│     ├─ layout/
│     │  ├─ Navbar.tsx
│     │  └─ Footer.tsx
│     ├─ sections/
│     │  ├─ Hero.tsx
│     │  ├─ Story.tsx
│     │  ├─ Menu.tsx
│     │  ├─ Promo.tsx
│     │  ├─ Gallery.tsx
│     │  ├─ Reviews.tsx
│     │  ├─ Location.tsx
│     │  ├─ Reservation.tsx
│     │  └─ Faq.tsx
│     └─ ui/
│        ├─ Button.tsx
│        ├─ SectionHeading.tsx
│        ├─ MenuCard.tsx
│        ├─ CategoryFilter.tsx
│        ├─ PromoCard.tsx
│        ├─ ReviewCard.tsx
│        ├─ FaqItem.tsx
│        └─ WhatsAppButton.tsx
```

**Kenapa struktur ini:** `lib/` adalah satu-satunya tempat data; `components/ui` adalah blok bangunan kecil yang bisa dipakai ulang; `components/sections` adalah rakitan per-bagian. Untuk mengganti klien, edit `lib/data.ts` (+ ganti isi `public/images/`). Tidak ada logika bisnis di dalam JSX bagian.

### 3.1 Batas tanggung jawab modul

- `lib/types.ts` — kontrak data. Tanpa logika. Diekspor untuk dipakai `data.ts` dan komponen.
- `lib/data.ts` — objek/array data demo bertipe. Satu-satunya sumber konten situs; mengedit file ini mengganti isi seluruh halaman tanpa menyentuh komponen.
- `lib/utils.ts` — fungsi murni yang mudah diuji: format mata uang, pembuat URL WhatsApp, pengecekan promo aktif, penggabungan kelas.
- Komponen section — hanya presentasi + state UI lokal.

---

## 4. Model Data (`src/lib/types.ts`)

Semua nilai contoh berada di `data.ts`. Bentuk tipe:

```ts
export type CategoryId = "makanan" | "minuman" | "dessert";

export interface RestaurantInfo {
  name: string;
  tagline: string;          // headline pendek hero
  intro: string;            // deskripsi khas restoran
  logoText: string;         // teks logo (mis. "Ruang Rasa")
  story: { title: string; paragraphs: string[]; image: string; };
  address: string;          // alamat lengkap
  mapsUrl: string;          // tautan "petunjuk arah"
  mapsEmbedUrl: string;     // src iframe peta
  phone: string;            // tampilan, mis. "+62 812-3456-7890"
  whatsapp: string;         // digit saja, mis. "6281234567890"
  email: string;
  hours: OpeningHour[];
  social: SocialLink[];
  legal: { label: string; value: string }[];  // info bisnis footer
}

export interface OpeningHour { day: string; open: string; close: string; closed?: boolean; }

export interface SocialLink { label: string; url: string; icon: "instagram" | "facebook" | "tiktok"; }

export interface MenuCategory { id: CategoryId; label: string; }

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;             // Rupiah, integer
  image: string;
  categoryId: CategoryId;
  featured: boolean;         // tampil di menu unggulan / hero
  tags?: string[];           // mis. "Pedas", "Vegan"
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;         // "YYYY-MM-DD"
  endDate: string;           // "YYYY-MM-DD"
  price?: number;            // harga promo (opsional)
  badge?: string;            // mis. "Terbatas"
}

export interface GalleryImage { id: string; src: string; alt: string; }

export interface Review { id: string; name: string; label: string; rating: 1|2|3|4|5; text: string; }

export interface FaqItem { id: string; question: string; answer: string; }
```

Data yang diekspor dari `data.ts`:

```ts
export const restaurant: RestaurantInfo;
export const categories: MenuCategory[];
export const menuItems: MenuItem[];
export const promos: Promo[];
export const gallery: GalleryImage[];
export const reviews: Review[];
export const faqs: FaqItem[];
```

---

## 5. Bagian Halaman & Perilaku

Urutan render di `App.tsx`:

1. **Navbar** — logo (teks), tautan anchor (`#menu`, `#promo`, `#galeri`, `#ulasan`, `#lokasi`, `#faq`), tombol **"Pesan Sekarang"**. Mobile: menu hamburger (toggle). Tombol memicu pesan WhatsApp umum.
2. **Hero** — foto hidangan andalan, headline singkat (`tagline`), deskripsi (`intro`), dua tombol: **"Lihat Menu"** (scroll ke `#menu`) dan **"Pesan Sekarang"** (WhatsApp).
3. **Cerita restoran** (#cerita) — konsep/keunikan; teks dari `restaurant.story` + foto pendukung.
4. **Menu unggulan** (#menu) — **filter kategori** (Semua / Makanan / Minuman / Dessert) yang berfungsi; grid `MenuCard` (foto, nama, deskripsi, harga). Filter memakai `useState`, menyaring `menuItems` berdasarkan `categoryId`.
5. **Promo musiman** (#promo) — kartu promo dengan **periode yang mudah diubah**; hanya promo ber-status aktif (berdasarkan tanggal hari ini) yang ditonjolkan, atau ditandai "Berakhir" bila `isPromoActive` false. Periode diambil dari `startDate`/`endDate`.
6. **Galeri suasana** (#galeri) — grid foto `gallery`; klik foto membuka **lightbox** (diimplementasikan, bukan opsional) berisi foto besar + tombol tutup yang berfungsi; tekan `Esc` juga menutup.
7. **Ulasan pelanggan** (#ulasan) — kartu `ReviewCard` dengan nama, label, rating bintang, teks.
8. **Lokasi & jam** (#lokasi) — alamat, tabel jam operasional (`hours`), peta (`mapsEmbedUrl`), tombol **"Petunjuk Arah"** → `mapsUrl`.
9. **Reservasi** (#reservasi) — form sederhana (nama, no. HP, tanggal, jam, jumlah tamu, catatan) → tombol **"Pesan via WhatsApp"** yang membangun pesan otomatis berisi ringkasan reservasi, membuka `wa.me` di tab baru.
10. **FAQ** (#faq) — accordion buka/tutup per item (`useState`), aksesibel (tombol dengan `aria-expanded`).
11. **Footer** — alamat, kontak, media sosial, info bisnis (`legal`), copyright.

### 5.1 Tombol WhatsApp (persyaratan inti)

Helper di `utils.ts`:

```ts
buildWhatsAppUrl(number: string, message: string): string
// -> `https://wa.me/${number}?text=${encodeURIComponent(message)}`
```

- Tombol WhatsApp umum (Navbar, Hero): pesan mis. `"Halo Ruang Rasa Café, saya ingin memesan."`
- Tombol pada `MenuCard`: pesan menyebut **nama hidangan**, mis. `"Halo Ruang Rasa Café, saya ingin memesan *Nasi Goreng Rempah* (Rp45.000)."` (harga diformat dengan `formatRupiah`).
- Tombol pada `PromoCard`: pesan menyebut **nama promo**.
- Form reservasi: pesan menyebut jenis pemesanan + detail (tanggal, jam, jumlah tamu, nama).

Semua tombol memakai `rel="noopener noreferrer"` dan `target="_blank"`.

### 5.2 Aturan konten

- Semua konten demo diberi komentar singkat di `data.ts` agar jelas mana yang harus diganti klien.
- Foto: untuk demo, gunakan **URL gambar stok tetap** (Unsplash `images.unsplash.com` dengan ID foto tetap, bukan endpoint acak) agar hasil konsisten dan build tidak bergantung unduhan. Semua `alt` terisi. Di `data.ts` dicatat bahwa klien menggantinya dengan foto sendiri di `public/images/`.
- Dilarang menulis klaim absolut tanpa dasar ("terbaik", "nomor satu", "#1"). Teks ulasan demo harus wajar dan tidak menyesatkan.
- Bahasa UI: **Indonesia**.

---

## 6. Desain Visual

- **Palet (variabel Tailwind + CSS var):**
  - `cream` #F7F1E7 (latar), `espresso` #2A211C (teks utama), `terracotta` #C4703F (aksen/CTA), `olive` #6B7A4F (sekunder), `gold` #D9A441 (aksen promo).
- **Tipografi:** `Fraunces` untuk judul (menggugah, hangat), `Inter` untuk badan teks (netral, mudah dibaca).
- **Prinsip:** foto besar sebagai fokus, whitespace cukup, sudut membulat lembut (`rounded-2xl`), bayangan halus, tanpa ornamen berlebihan.
- **Aksesibilitas:** kontras teks memadai, tombol minimal 44x44px di mobile, `focus-visible` jelas, seluruh elemen interaktif punya label.
- **Responsif:** mobile-first; breakpoint `sm/md/lg`. Grid menu 1→2→3 kolom. Navbar jadi hamburger di bawah `lg`.

---

## 7. Verifikasi

- `npm run build` (tsc + vite build) harus **lulus tanpa error**.
- `npm run dev` dijalankan; cek manual: filter kategori menyaring dengan benar, FAQ buka-tutup, navigasi anchor berpindah, tombol WhatsApp membuka `wa.me` dengan pesan yang benar (diperiksa dari URL yang dihasilkan), tidak ada `href="#"` maupun tombol mati.
- Cek cepat responsif pada lebar mobile (~375px) dan desktop (~1280px).

---

## 8. Risiko & Catatan

- **Gambar:** untuk demo, gunakan URL gambar stok tetap (lihat §5.2). Ukuran/format harus wajar agar halaman tetap ringan; klien menggantinya dengan foto sendiri di `public/images/`.
- **Peta:** `mapsEmbedUrl` menggunakan embed generik (Google Maps) tanpa API key; dipastikan tidak butuh key.
- **Tidak ada klaim tanpa dasar** — ini aturan konten wajib, bukan opsional.

---

## 9. Definisi Selesai (Definition of Done)

- [ ] Semua 12 bagian (§5) ada dan sesuai perilaku yang ditulis.
- [ ] Semua teks/harga/gambar berasal dari `src/lib/data.ts`.
- [ ] `npm run build` lulus; tidak ada error TypeScript.
- [ ] Filter kategori, navigasi, FAQ, dan tombol WhatsApp berfungsi.
- [ ] Tidak ada tautan kosong/tombol mati; semua `alt` terisi.
- [ ] Responsif di mobile & desktop.
- [ ] Tidak ada klaim "terbaik"/"nomor satu".
- [ ] `README` singkat berisi cara menjalankan & cara mengganti konten klien.
