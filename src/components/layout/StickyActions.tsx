"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CallIcon } from "@/components/ui/icons";
import { telHref } from "@/lib/format";

const HIDDEN_ON = ["/request-service", "/sell-your-device"];

/**
 * Slim action bar pinned to the bottom of phone screens so the two primary
 * actions are always one tap away. Hidden on the form pages themselves.
 */
export function StickyActions({ phone }: { phone: string | null }) {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <>
      <div className="h-16 md:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-navy px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          {phone ? (
            <a
              href={telHref(phone)}
              aria-label={`Call ${phone}`}
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-control)] border-2 border-white/60 text-white"
            >
              <CallIcon className="size-5" />
            </a>
          ) : null}
          <Link
            href="/request-service"
            data-cta="sticky_request_repair"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-[var(--radius-control)] bg-cyan px-3 font-heading text-[0.95rem] font-bold text-navy"
          >
            Request a Repair
          </Link>
          <Link
            href="/sell-your-device"
            data-cta="sticky_sell_device"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-[var(--radius-control)] border-2 border-white/60 px-3 font-heading text-[0.95rem] font-bold text-white"
          >
            Sell a Device
          </Link>
        </div>
      </div>
    </>
  );
}
