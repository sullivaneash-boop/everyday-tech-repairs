import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-navy px-5 py-24 text-center text-white">
      <p className="eyebrow text-cyan">Error 404</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">We couldn&apos;t find that page</h1>
      <p className="mt-4 max-w-md text-lg text-muted-on-navy">
        The link may be old or mistyped. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonClass("primary", "lg")}>Go to the homepage</Link>
        <Link href="/request-service" className={buttonClass("onNavy", "lg")}>Request a Repair</Link>
      </div>
    </main>
  );
}
