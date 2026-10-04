import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "outline" | "ghost" | "link";
type Size = "md" | "sm";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
}

const sizes: Record<Size, string> = {
  md: "px-5 py-3",
  sm: "px-4 py-2",
};

const variants: Record<Variant, string> = {
  primary: "bg-espresso text-cream hover:bg-espresso/90",
  outline:
    "border border-espresso/25 text-espresso hover:border-espresso/50 hover:bg-espresso/[0.03]",
  ghost: "text-espresso hover:bg-espresso/5",
  link: "text-terracotta hover:text-espresso",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm text-[0.8rem] font-medium uppercase tracking-[0.09em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  onClick,
  type = "button",
  target,
  rel,
}: ButtonProps) {
  const classes = cn(
    base,
    variant === "link" ? null : sizes[size],
    variants[variant],
    className,
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
