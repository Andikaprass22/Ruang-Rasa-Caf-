import type { CategoryId, MenuCategory } from "../../lib/types";
import { cn } from "../../lib/utils";

interface CategoryFilterProps {
  categories: MenuCategory[];
  active: CategoryId | "semua";
  onChange: (id: CategoryId | "semua") => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const all: { id: CategoryId | "semua"; label: string }[] = [
    { id: "semua", label: "Semua" },
    ...categories.map((category) => ({ id: category.id, label: category.label })),
  ];

  return (
    <div
      className="flex flex-wrap gap-x-7 gap-y-1 border-b border-sand"
      role="group"
      aria-label="Filter kategori menu"
    >
      {all.map((category) => {
        const isActive = active === category.id;
        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(category.id)}
            className={cn(
              "relative inline-flex min-h-11 items-center text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-4 focus-visible:ring-offset-cream",
              isActive ? "text-espresso" : "text-taupe hover:text-espresso",
            )}
          >
            {category.label}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 -bottom-px h-0.5 origin-left bg-terracotta transition-transform duration-300",
                isActive ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
