import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow && (
        <div className={cn("mb-4 flex items-center gap-3", centered && "justify-center")}>
          <span className="h-px w-8 bg-terracotta/60" aria-hidden="true" />
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-terracotta">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-[2rem] font-semibold leading-[1.15] tracking-[-0.01em] text-espresso md:text-[2.6rem]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-xl text-[0.95rem] leading-relaxed text-mocha",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
