import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { CallIcon } from "@/components/ui/icons";
import { containerClass } from "@/components/ui/Section";
import { telHref } from "@/lib/format";
import { getSettings } from "@/lib/sanity/content";
import logo from "../../../public/brand/logo.png";
import { MobileNav } from "./MobileNav";
import { getNavItems } from "./nav";

export async function Header() {
  const [settings, nav] = await Promise.all([getSettings(), getNavItems()]);

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-cyan bg-white">
      <div className={`${containerClass} flex h-[4.5rem] items-center justify-between gap-4`}>
        <Link href="/" className="shrink-0" aria-label={`${settings.name} home`}>
          <Image src={logo} alt={settings.name} priority className="h-11 w-auto sm:h-12" sizes="200px" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-[0.95rem] font-semibold text-navy hover:bg-offwhite hover:text-blue-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {settings.phone ? (
            <a
              href={telHref(settings.phone)}
              className="hidden items-center gap-2 rounded-md px-3 py-2 font-heading font-bold text-navy hover:text-blue-ink xl:inline-flex"
            >
              <CallIcon className="size-5 text-blue" />
              {settings.phone}
            </a>
          ) : null}
          <div className="hidden sm:block">
            <ButtonLink href="/request-service" cta="header_request_repair">
              Request a Repair
            </ButtonLink>
          </div>
          <MobileNav items={nav} phone={settings.phone} />
        </div>
      </div>
    </header>
  );
}
