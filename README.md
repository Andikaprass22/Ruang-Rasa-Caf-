# Ruang Rasa Café — Landing Page Template

Landing page (satu halaman) untuk restoran atau kafe, dibangun dengan **Vite + React + TypeScript + Tailwind CSS**. Ditujukan sebagai template yang mudah disesuaikan untuk berbagai usaha kuliner.

Seluruh konten — nama bisnis, menu, harga, promo, foto, lokasi, dan kontak — terpusat di satu file: **`src/lib/data.ts`**. Mengganti isi situs cukup dengan mengedit file itu (dan mengganti foto).

## Menjalankan

```bash
npm install
npm run dev        # server pengembangan
npm run build      # build produksi ke dist/ (sekaligus typecheck)
npm run preview    # pratinjau hasil build
npm run test       # jalankan unit & UI test
npm run typecheck  # cek tipe saja
```

## Mengganti Konten untuk Klien

1. **Identitas & kontak** — `restaurant` di `src/lib/data.ts`: nama, tagline, deskripsi, alamat, `mapsUrl`, `mapsEmbedUrl`, telepon, `whatsapp` (digit saja, contoh `6281234567890`), email, jam operasional, media sosial, dan info bisnis.
2. **Menu & harga** — array `menuItems` (harga sebagai angka Rupiah, tanpa titik) dan `categories`.
3. **Promo** — array `promos`. Ubah `startDate`/`endDate` (format `YYYY-MM-DD`); status Berlangsung/Segera/Berakhir dihitung otomatis dari tanggal hari ini.
4. **Foto** — ganti URL di `data.ts` dengan file di `public/images/` bila sudah tersedia.
5. **Ulasan & FAQ** — array `reviews` dan `faqs`. Ganti ulasan demo dengan ulasan asli.
6. **Warna & font** — `tailwind.config.js` (`theme.extend.colors` dan `fontFamily`).

## Struktur

```
src/
  lib/
    types.ts     # tipe data
    data.ts      # SELURUH konten (ganti di sini)
    utils.ts     # formatRupiah, buildWhatsAppUrl, status promo, dll
  components/
    layout/      # Navbar, Footer
    sections/    # Hero, Story, Menu, Promo, Gallery, Reviews, Location, Reservation, Faq
    ui/          # Button, SectionHeading, WhatsAppButton, CategoryFilter, MenuCard, PromoCard, ReviewCard, FaqItem
```

## Catatan

- Tombol WhatsApp membuka `wa.me` dengan pesan otomatis yang menyebut nama hidangan, promo, atau detail reservasi.
- Proyek ini **frontend saja** (tanpa backend/database). Perubahan konten dilakukan dengan mengedit `src/lib/data.ts`.
