import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost"
  | "link"
  | "inverted"
  | "outline-light";

export type ButtonSize = "md" | "sm";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
}

const sizes: Record<ButtonSize, string> = {
  md: "px-5 py-3",
  sm: "px-4 py-2",
};

const ring = {
  onLight: "focus-visible:ring-terracotta focus-visible:ring-offset-cream",
  onDark: "focus-visible:ring-cream focus-visible:ring-offset-espresso",
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-espresso text-cream hover:bg-espresso/90",
  outline:
    "border border-espresso/25 text-espresso hover:border-espresso/50 hover:bg-espresso/[0.03]",
  ghost: "text-espresso hover:bg-espresso/5",
  link: "text-terracotta hover:text-espresso",
  inverted: "bg-cream text-espresso hover:bg-cream/90",
  "outline-light": "border border-cream/40 text-cream hover:border-cream hover:bg-cream/10",
};

const variantRing: Record<ButtonVariant, string> = {
  primary: ring.onLight,
  outline: ring.onLight,
  ghost: ring.onLight,
  link: ring.onLight,
  inverted: ring.onDark,
  "outline-light": ring.onDark,
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm text-[0.8rem] font-medium uppercase tracking-[0.09em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

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
    variantRing[variant],
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
