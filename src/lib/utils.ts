import type {
  Promo,
  MenuItem,
  CategoryId,
  PromoStatus,
  ReservationInput,
  OpeningHour,
} from "./types";

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

export function getTodayHours(
  hours: OpeningHour[],
  now: Date = new Date(),
): OpeningHour | undefined {
  if (hours.length === 0) return undefined;
  const index = (now.getDay() + 6) % 7;
  return hours[index] ?? hours[0];
}

export function filterMenuByCategory(
  items: MenuItem[],
  categoryId: CategoryId | "semua",
): MenuItem[] {
  if (categoryId === "semua") return items;
  return items.filter((i) => i.categoryId === categoryId);
}

export function buildReservationMessage(
  restaurantName: string,
  input: ReservationInput,
): string {
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

export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
