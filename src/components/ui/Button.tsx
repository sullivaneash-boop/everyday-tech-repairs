import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] px-5 font-heading font-bold tracking-tight transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  /** Electric Cyan with navy text (7.6:1): the main action everywhere. */
  primary: "bg-cyan text-navy hover:bg-cyan-bright",
  navy: "bg-navy text-white hover:bg-navy-soft",
  outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  onNavy: "border-2 border-white/70 text-white hover:bg-white hover:text-navy",
} as const;

const sizes = {
  md: "min-h-11 text-[0.95rem]",
  lg: "min-h-13 px-6 text-base",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClass(variant: ButtonVariant = "primary", size: keyof typeof sizes = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  className?: string;
  /** Analytics label. Clicks are reported as a "cta_click" event (no personal data). */
  cta?: string;
  children: ReactNode;
};

export function ButtonLink({ variant, size, className, cta, children, ...props }: ButtonLinkProps) {
  return (
    <Link {...props} data-cta={cta} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}
