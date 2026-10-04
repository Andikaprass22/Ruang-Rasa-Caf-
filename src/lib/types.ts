export type CategoryId = "makanan" | "minuman" | "dessert";

export type PromoStatus = "aktif" | "akan-datang" | "berakhir";

export interface OpeningHour {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: "instagram" | "facebook" | "tiktok";
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  intro: string;
  logoText: string;
  heroImage: {
    landscape: string;
    portrait: string;
  };
  story: {
    title: string;
    paragraphs: string[];
    image: string;
  };
  address: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: OpeningHour[];
  social: SocialLink[];
  legal: { label: string; value: string }[];
}

export interface MenuCategory {
  id: CategoryId;
  label: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: CategoryId;
  featured: boolean;
  tags?: string[];
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  price?: number;
  badge?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface Review {
  id: string;
  name: string;
  label: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ReservationInput {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  note?: string;
}
