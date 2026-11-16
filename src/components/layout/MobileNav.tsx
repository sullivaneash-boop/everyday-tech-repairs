"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { buttonClass } from "@/components/ui/Button";
import { CallIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { telHref } from "@/lib/format";
import type { NavItem } from "./nav";

export function MobileNav({ items, phone }: { items: NavItem[]; phone: string | null }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-md text-navy hover:bg-offwhite"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[var(--shadow-card)]"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <ul className="divide-y divide-line">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className="block py-3.5 font-heading text-lg font-bold text-navy">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3">
            <Link href="/request-service" onClick={close} data-cta="mobile_menu_request_repair" className={buttonClass("primary", "lg")}>
              Request a Repair
            </Link>
            {phone ? (
              <a href={telHref(phone)} className={buttonClass("outline", "lg")}>
                <CallIcon className="size-5" /> Call {phone}
              </a>
            ) : null}
          </div>
        </nav>
      </div>
    </div>
  );
}
