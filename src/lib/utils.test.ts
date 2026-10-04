import { describe, it, expect } from "vitest";
import {
  formatRupiah,
  buildWhatsAppUrl,
  isPromoActive,
  getPromoStatus,
  filterMenuByCategory,
  buildReservationMessage,
  getTodayHours,
  cn,
} from "./utils";
import type { Promo, MenuItem, OpeningHour } from "./types";

describe("formatRupiah", () => {
  it("memformat ribuan", () => expect(formatRupiah(45000)).toBe("Rp45.000"));
  it("memformat jutaan", () => expect(formatRupiah(1250000)).toBe("Rp1.250.000"));
  it("nol", () => expect(formatRupiah(0)).toBe("Rp0"));
});

describe("buildWhatsAppUrl", () => {
  it("membersihkan non-digit", () => {
    expect(buildWhatsAppUrl("+62 812-3456-7890", "Halo")).toBe(
      "https://wa.me/6281234567890?text=Halo",
    );
  });
  it("meng-encode pesan", () => {
    expect(buildWhatsAppUrl("628123", "Nasi Goreng Rempah (Rp45.000)")).toContain(
      "text=Nasi%20Goreng%20Rempah%20(Rp45.000)",
    );
  });
});

const promo: Promo = {
  id: "p1",
  title: "T",
  description: "d",
  image: "i",
  startDate: "2026-10-01",
  endDate: "2026-10-31",
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
  it("akan datang", () =>
    expect(getPromoStatus(promo, new Date("2026-09-20"))).toBe("akan-datang"));
  it("berakhir", () =>
    expect(getPromoStatus(promo, new Date("2026-11-05"))).toBe("berakhir"));
});

const items: MenuItem[] = [
  {
    id: "m1",
    name: "A",
    description: "",
    price: 1,
    image: "",
    categoryId: "makanan",
    featured: true,
  },
  {
    id: "m2",
    name: "B",
    description: "",
    price: 2,
    image: "",
    categoryId: "minuman",
    featured: false,
  },
];

describe("filterMenuByCategory", () => {
  it("semua mengembalikan seluruh item", () =>
    expect(filterMenuByCategory(items, "semua")).toHaveLength(2));
  it("menyaring per kategori", () => {
    const r = filterMenuByCategory(items, "minuman");
    expect(r).toHaveLength(1);
    expect(r[0].id).toBe("m2");
  });
  it("kategori tanpa item -> array kosong", () =>
    expect(filterMenuByCategory(items, "dessert")).toEqual([]));
});

describe("buildReservationMessage", () => {
  it("memuat detail reservasi", () => {
    const msg = buildReservationMessage("Ruang Rasa Café", {
      name: "Budi",
      phone: "0812",
      date: "2026-10-20",
      time: "19:00",
      guests: 4,
      note: "Dekat jendela",
    });
    expect(msg).toContain("Ruang Rasa Café");
    expect(msg).toContain("Budi");
    expect(msg).toContain("4");
    expect(msg).toContain("19:00");
    expect(msg).toContain("Dekat jendela");
  });
});

const week: OpeningHour[] = [
  { day: "Senin", open: "08.00", close: "21.00" },
  { day: "Selasa", open: "08.00", close: "21.00" },
  { day: "Rabu", open: "08.00", close: "21.00" },
  { day: "Kamis", open: "08.00", close: "21.00" },
  { day: "Jumat", open: "08.00", close: "22.00" },
  { day: "Sabtu", open: "09.00", close: "22.00" },
  { day: "Minggu", open: "-", close: "-", closed: true },
];

describe("getTodayHours", () => {
  it("hari Senin memakai entri pertama", () => {
    expect(getTodayHours(week, new Date("2026-01-05"))).toEqual(week[0]);
  });
  it("hari Minggu memakai entri terakhir", () => {
    expect(getTodayHours(week, new Date("2026-01-04"))).toEqual(week[6]);
  });
  it("aman saat daftar jam kosong", () => {
    expect(getTodayHours([], new Date("2026-01-05"))).toBeUndefined();
  });
});

describe("cn", () => {
  it("menggabungkan & membuang falsy", () =>
    expect(cn("a", false, "b", null, undefined)).toBe("a b"));
});
