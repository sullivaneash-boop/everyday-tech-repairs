import type { ReactNode } from "react";
import { containerClass } from "@/components/ui/Section";

type Props = { eyebrow?: string; title: string; text?: string | null; children?: ReactNode };

/** Navy title band used at the top of every inner page. */
export function PageHero({ eyebrow, title, text, children }: Props) {
  return (
    <div className="relative overflow-hidden bg-navy text-white">
      <Swoosh className="pointer-events-none absolute -right-24 -top-10 h-72 w-[34rem] text-cyan/15" />
      <div className={`${containerClass} relative py-14 sm:py-20`}>
        {eyebrow ? <p className="eyebrow mb-3 text-cyan">{eyebrow}</p> : null}
        <h1 className="max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {text ? <p className="mt-5 max-w-2xl text-lg text-muted-on-navy">{text}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </div>
  );
}

/** Decorative orbit shape echoing the swoosh around the logo's monitor. */
export function Swoosh({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 220" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="200" cy="110" rx="185" ry="70" transform="rotate(-18 200 110)" stroke="currentColor" strokeWidth="26" />
    </svg>
  );
}
