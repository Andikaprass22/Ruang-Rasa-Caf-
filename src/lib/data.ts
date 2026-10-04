import type {
  FaqItem,
  GalleryImage,
  MenuCategory,
  MenuItem,
  Promo,
  RestaurantInfo,
  Review,
} from "./types";

// Helper foto demo. GANTI dengan foto klien di public/images/ bila sudah ada.
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

// GANTI: identitas, alamat, kontak, jam, dan media sosial bisnis.
export const restaurant: RestaurantInfo = {
  name: "Ruang Rasa Café",
  tagline: "Hidangan rumahan, kopi pilihan, ruang untuk berlama-lama.",
  intro:
    "Kami memasak dengan bumbu yang ditumbuk harian dan memanggang kopi dalam batch kecil. Tempatnya sederhana, cocok untuk makan siang, bekerja sebentar, atau bertemu teman.",
  logoText: "Ruang Rasa",
  story: {
    title: "Berawal dari dapur keluarga",
    paragraphs: [
      "Ruang Rasa dimulai dari kebiasaan makan bersama di rumah: satu meja, beberapa lauk, dan percakapan yang tidak buru-buru. Kebiasaan itu kami bawa ke sebuah ruko kecil di Sukajadi.",
      "Kami memilih bahan dari pasar terdekat, menumis bumbu setiap pagi, dan menyeduh kopi satu per satu. Menunya tidak panjang karena kami lebih suka mengerjakan sedikit hal dengan rapi.",
      "Hari ini Ruang Rasa menjadi tempat singgah warga sekitar dan pekerja yang butuh sudut tenang untuk menyelesaikan pekerjaannya.",
    ],
    image: img("photo-1414235077428-338989a2e8c0"),
  },
  address: "Jl. Sukajadi No. 45, Bandung, Jawa Barat 40162",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jl.+Sukajadi+No.+45+Bandung",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Jl.%20Sukajadi%20No.%2045%20Bandung&output=embed",
  phone: "+62 812-3456-7890",
  whatsapp: "6281234567890",
  email: "halo@ruangrasa.example",
  hours: [
    { day: "Senin", open: "08.00", close: "21.00" },
    { day: "Selasa", open: "08.00", close: "21.00" },
    { day: "Rabu", open: "08.00", close: "21.00" },
    { day: "Kamis", open: "08.00", close: "21.00" },
    { day: "Jumat", open: "08.00", close: "22.00" },
    { day: "Sabtu", open: "09.00", close: "22.00" },
    { day: "Minggu", open: "-", close: "-", closed: true },
  ],
  social: [
    { label: "Instagram", url: "https://instagram.com/ruangrasacafe", icon: "instagram" },
    { label: "Facebook", url: "https://facebook.com/ruangrasacafe", icon: "facebook" },
    { label: "TikTok", url: "https://tiktok.com/@ruangrasacafe", icon: "tiktok" },
  ],
  legal: [
    { label: "Nama Usaha", value: "PT Ruang Rasa Nusantara" },
    { label: "Berdiri", value: "2019" },
    { label: "NPWP", value: "00.000.000.0-000.000" },
  ],
};

// GANTI: kategori menu. Urutan array menentukan urutan tampil.
export const categories: MenuCategory[] = [
  { id: "makanan", label: "Makanan" },
  { id: "minuman", label: "Minuman" },
  { id: "dessert", label: "Dessert" },
];

// GANTI: daftar menu, deskripsi, dan harga (Rupiah, tanpa titik).
export const menuItems: MenuItem[] = [
  {
    id: "makanan-nasi-goreng-rempah",
    name: "Nasi Goreng Rempah",
    description: "Nasi goreng bumbu rempah, telur mata sapi, kerupuk, dan acar timun.",
    price: 45000,
    image: img("photo-1512058564366-18510be2db19"),
    categoryId: "makanan",
    featured: true,
    tags: ["Pedas"],
  },
  {
    id: "makanan-mie-goreng-jawa",
    name: "Mie Goreng Jawa",
    description: "Mie telur dengan sayur, ayam suwir, dan bawang goreng.",
    price: 42000,
    image: img("photo-1559925393-8be0ec4767c8"),
    categoryId: "makanan",
    featured: false,
  },
  {
    id: "makanan-ayam-bakar-madu",
    name: "Ayam Bakar Madu",
    description: "Ayam kampung dibakar dengan olesan madu dan sambal terasi.",
    price: 58000,
    image: img("photo-1504674900247-0877df9cc836"),
    categoryId: "makanan",
    featured: true,
  },
  {
    id: "makanan-gado-gado",
    name: "Gado-Gado Segar",
    description: "Sayur rebus, tahu, tempe, dan bumbu kacang yang ditumbuk harian.",
    price: 38000,
    image: img("photo-1546069901-ba9599a7e63c"),
    categoryId: "makanan",
    featured: false,
    tags: ["Vegan"],
  },
  {
    id: "minuman-kopi-susu",
    name: "Kopi Susu Ruang Rasa",
    description: "Espresso, susu segar, dan gula aren cair. Disajikan dingin.",
    price: 28000,
    image: img("photo-1495474472287-4d71bcdd2085"),
    categoryId: "minuman",
    featured: true,
  },
  {
    id: "minuman-espresso-tubruk",
    name: "Espresso Tubruk",
    description: "Kopi robusta lokal diseduh tubruk, disajikan panas tanpa gula.",
    price: 22000,
    image: img("photo-1445116572660-236099ec97a0"),
    categoryId: "minuman",
    featured: false,
  },
  {
    id: "minuman-teh-serai",
    name: "Teh Serai Madu",
    description: "Teh hitam dengan serai dan sedikit madu. Bisa panas atau dingin.",
    price: 24000,
    image: img("photo-1470337458703-46ad1756a187"),
    categoryId: "minuman",
    featured: false,
  },
  {
    id: "minuman-cokelat-panas",
    name: "Cokelat Panas Klasik",
    description: "Cokelat pekat dengan susu, ditaburi bubuk kakao.",
    price: 30000,
    image: img("photo-1509042239860-f550ce710b93"),
    categoryId: "minuman",
    featured: false,
  },
  {
    id: "dessert-puding-gula-aren",
    name: "Puding Gula Aren",
    description: "Puding lembut dengan siraman gula aren dan krim kelapa.",
    price: 26000,
    image: img("photo-1551024506-0bccd828d307"),
    categoryId: "dessert",
    featured: true,
  },
  {
    id: "dessert-pisang-karamel",
    name: "Pisang Goreng Karamel",
    description: "Pisang goreng hangat dengan saus karamel dan taburan kacang.",
    price: 27000,
    image: img("photo-1567620905732-2d1ec7ab7445"),
    categoryId: "dessert",
    featured: false,
  },
  {
    id: "dessert-kue-lumpur",
    name: "Kue Lumpur Kentang",
    description: "Kue lembut kentang dengan kismis, dipanggang setiap sore.",
    price: 23000,
    image: img("photo-1497636577773-f1231844b336"),
    categoryId: "dessert",
    featured: false,
  },
];

// GANTI: promo musiman. Ubah startDate/endDate (format YYYY-MM-DD) untuk periode.
export const promos: Promo[] = [
  {
    id: "promo-kopi-sore",
    title: "Paket Kopi Sore",
    description: "Satu kopi susu plus pisang goreng karamel, setiap hari pukul 15.00–18.00.",
    image: img("photo-1495474472287-4d71bcdd2085"),
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    price: 40000,
    badge: "Musiman",
  },
  {
    id: "promo-keluarga-akhir-pekan",
    title: "Menu Keluarga Akhir Pekan",
    description: "Empat porsi makan malam, dua minuman, dan satu dessert untuk berbagi.",
    image: img("photo-1504674900247-0877df9cc836"),
    startDate: "2026-09-15",
    endDate: "2026-12-31",
    price: 185000,
    badge: "Berbagi",
  },
];

// GANTI: foto suasana tempat.
export const gallery: GalleryImage[] = [
  { id: "g1", src: img("photo-1517248135467-4c7edcad34c4"), alt: "Ruang makan utama dengan meja kayu" },
  { id: "g2", src: img("photo-1554118811-1e0d58224f24"), alt: "Sudut kafe dengan pencahayaan hangat" },
  { id: "g3", src: img("photo-1414235077428-338989a2e8c0"), alt: "Interior restoran yang lapang" },
  { id: "g4", src: img("photo-1514933651103-005eec06c04b"), alt: "Meja bar menghadap dapur terbuka" },
  { id: "g5", src: img("photo-1521017432531-fbd92d768814"), alt: "Pelanggan duduk di dekat jendela" },
  { id: "g6", src: img("photo-1467003909585-2f8a72700288"), alt: "Hidangan di atas meja makan bersama" },
];

// GANTI: ulasan pelanggan. Demo, bukan klaim resmi.
export const reviews: Review[] = [
  {
    id: "r1",
    name: "Rina",
    label: "Pengunjung tetap",
    rating: 5,
    text: "Kopi susunya konsisten dan tempatnya tenang. Saya sering mampir sebelum kerja.",
  },
  {
    id: "r2",
    name: "Bayu",
    label: "Pekerja remote",
    rating: 4,
    text: "Nyaman untuk bekerja sebentar. Colokan ada di beberapa meja, sinyal cukup.",
  },
  {
    id: "r3",
    name: "Sarah",
    label: "Warga sekitar",
    rating: 5,
    text: "Gado-gadonya segar dan porsinya pas. Bumbu kacangnya terasa baru ditumbuk.",
  },
];

// GANTI: pertanyaan yang sering diajukan.
export const faqs: FaqItem[] = [
  {
    id: "f1",
    question: "Apakah bisa reservasi untuk kelompok besar?",
    answer:
      "Bisa. Untuk lebih dari 8 orang, silakan hubungi kami lewat WhatsApp agar meja bisa disiapkan.",
  },
  {
    id: "f2",
    question: "Apakah tersedia pilihan vegetarian?",
    answer: "Ada beberapa menu vegetarian, seperti Gado-Gado Segar. Silakan tanyakan saat memesan.",
  },
  {
    id: "f3",
    question: "Apakah ada area parkir?",
    answer: "Tersedia parkir motor di depan dan parkir mobil terbatas di seberang kafe.",
  },
  {
    id: "f4",
    question: "Apakah menerima pembayaran non-tunai?",
    answer: "Ya, kami menerima kartu debit/kredit dan pembayaran melalui QRIS.",
  },
  {
    id: "f5",
    question: "Apakah bisa memesan untuk dibawa pulang?",
    answer: "Sebagian besar menu bisa dipesan untuk dibawa pulang. Sebutkan saat memesan via WhatsApp.",
  },
];
