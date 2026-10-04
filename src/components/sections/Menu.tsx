import { useState } from "react";
import { categories, menuItems as allMenuItems } from "../../lib/data";
import type { CategoryId, MenuItem } from "../../lib/types";
import { filterMenuByCategory } from "../../lib/utils";
import { CategoryFilter } from "../ui/CategoryFilter";
import { MenuCard } from "../ui/MenuCard";
import { SectionHeading } from "../ui/SectionHeading";

interface MenuProps {
  items?: MenuItem[];
}

export function Menu({ items = allMenuItems }: MenuProps) {
  const [active, setActive] = useState<CategoryId | "semua">("semua");
  const filtered = filterMenuByCategory(items, active);

  return (
    <section id="menu" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <SectionHeading
          eyebrow="Menu Unggulan"
          title="Yang kami masak hari ini"
          description="Pilih kategori untuk melihat pilihan makanan, minuman, dan dessert."
        />

        <div className="mt-10">
          <CategoryFilter categories={categories} active={active} onChange={setActive} />
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-sm border border-dashed border-sand px-6 py-14 text-center">
            <p className="font-display text-lg text-espresso">
              Belum ada menu pada kategori ini
            </p>
            <p className="mt-2 text-sm text-mocha">
              Coba pilih kategori lain untuk melihat pilihan kami.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
