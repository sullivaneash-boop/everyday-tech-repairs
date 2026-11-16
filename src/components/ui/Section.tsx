import type { ReactNode } from "react";

export const containerClass = "mx-auto w-full max-w-6xl px-5 sm:px-8";

type SectionProps = {
  children: ReactNode;
  tone?: "light" | "white" | "navy";
  className?: string;
  id?: string;
  labelledBy?: string;
};

const tones = {
  light: "",
  white: "bg-white",
  navy: "bg-navy text-white",
};

export function Section({ children, tone = "light", className = "", id, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-16 sm:py-20 ${tones[tone]} ${className}`}>
      <div className={containerClass}>{children}</div>
    </section>
  );
}

type HeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  text?: string | null;
  onNavy?: boolean;
  center?: boolean;
};

export function SectionHeading({ id, eyebrow, title, text, onNavy, center }: HeadingProps) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className={`eyebrow mb-3 ${onNavy ? "text-cyan" : "text-blue-ink"}`}>{eyebrow}</p>
      ) : null}
      <h2 id={id} className="text-3xl sm:text-4xl">
        {title}
      </h2>
      {text ? (
        <p className={`mt-4 text-lg ${onNavy ? "text-muted-on-navy" : "text-muted"}`}>{text}</p>
      ) : null}
    </div>
  );
}
