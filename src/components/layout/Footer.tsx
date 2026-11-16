import Image from "next/image";
import Link from "next/link";
import { CallIcon, ClockIcon, MailIcon, PinIcon } from "@/components/ui/icons";
import { containerClass } from "@/components/ui/Section";
import { telHref } from "@/lib/format";
import { getCurrentYear, getSettings } from "@/lib/sanity/content";
import { getNavItems } from "./nav";

export async function Footer() {
  const [settings, nav, year] = await Promise.all([getSettings(), getNavItems(), getCurrentYear()]);

  return (
    <footer className="bg-navy text-white">
      <div className={`${containerClass} grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1.2fr]`}>
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${settings.name} home`}>
            <Image src="/brand/icon.svg" alt="" width={64} height={50} unoptimized />
            {/* Reversed lockup for dark backgrounds, per the brand sheet's navy header. */}
            <span className="font-heading leading-none">
              <span className="block text-xl font-extrabold italic tracking-tight">
                EVERYDAY <span className="text-cyan">TECH</span>
              </span>
              <span className="mt-1 block text-[0.7rem] font-semibold italic tracking-[0.5em] text-white">
                REPAIR
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-muted-on-navy">{settings.description}</p>
          <p className="eyebrow mt-6 text-cyan">Repair · Buy · Sell</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow text-muted-on-navy">Explore</h2>
          <ul className="mt-4 grid gap-2.5">
            {[{ href: "/request-service", label: "Request a Repair" }, ...nav, { href: "/privacy", label: "Privacy Policy" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/90 underline-offset-4 hover:text-cyan hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-muted-on-navy">Get in touch</h2>
          <ul className="mt-4 grid gap-3 text-white/90">
            {settings.phone ? (
              <li>
                <a href={telHref(settings.phone)} className="inline-flex items-center gap-3 hover:text-cyan">
                  <CallIcon className="size-5 text-cyan" /> {settings.phone}
                </a>
              </li>
            ) : null}
            {settings.email ? (
              <li>
                <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-3 break-all hover:text-cyan">
                  <MailIcon className="size-5 shrink-0 text-cyan" /> {settings.email}
                </a>
              </li>
            ) : null}
            {settings.serviceArea ? (
              <li className="flex items-start gap-3">
                <PinIcon className="mt-0.5 size-5 shrink-0 text-cyan" /> {settings.serviceArea}
              </li>
            ) : null}
            {settings.hours.length ? (
              <li className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 size-5 shrink-0 text-cyan" />
                <dl className="grid gap-1">
                  {settings.hours.map((row) => (
                    <div key={row.days} className="flex flex-wrap gap-x-2">
                      <dt className="font-semibold">{row.days}:</dt>
                      <dd>{row.hours}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ) : null}
            <li>
              <Link href="/contact" className="font-semibold text-cyan underline-offset-4 hover:underline">
                Contact page
              </Link>
            </li>
          </ul>
          {settings.socialLinks.length ? (
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {settings.socialLinks.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-white/90 underline underline-offset-4 hover:text-cyan">
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className={`${containerClass} py-5 text-sm text-muted-on-navy`}>
          © {year} {settings.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
