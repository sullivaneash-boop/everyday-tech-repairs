import Link from "next/link";
import { ArrowRightIcon, CheckIcon, ServiceGlyph } from "@/components/ui/icons";
import { SanityImg } from "@/components/ui/SanityImg";
import { deviceCategoryLabel } from "@/config/business";
import type { Service } from "@/lib/sanity/types";

export function ServiceCard({ service, detailed = false }: { service: Service; detailed?: boolean }) {
  const sell = service.ctaTarget === "sell";
  const href = sell ? "/sell-your-device" : "/request-service";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)]">
      {detailed && service.image ? (
        <SanityImg
          image={service.image}
          alt={service.name}
          aspect={16 / 9}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-video w-full object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-cyan-soft text-blue-ink">
          <ServiceGlyph icon={service.icon} className="size-7" />
        </span>
        <h3 className="mt-4 text-xl">{service.name}</h3>
        <p className="mt-2 text-muted">{service.description}</p>

        {detailed && service.categories.length ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Device types">
            {service.categories.map((c) => (
              <li key={c} className="rounded-full bg-offwhite px-3 py-1 text-sm font-medium text-navy">
                {deviceCategoryLabel(c)}
              </li>
            ))}
          </ul>
        ) : null}

        {detailed && service.commonIssues.length ? (
          <ul className="mt-4 grid gap-1.5" aria-label="Common issues">
            {service.commonIssues.map((issue) => (
              <li key={issue} className="flex items-start gap-2 text-[0.95rem]">
                <CheckIcon className="mt-0.5 size-4.5 shrink-0 text-blue" /> {issue}
              </li>
            ))}
          </ul>
        ) : null}

        <Link
          href={href}
          data-cta={sell ? "service_card_sell" : "service_card_repair"}
          className="mt-auto inline-flex items-center gap-1.5 pt-5 font-heading font-bold text-blue-ink underline-offset-4 hover:underline"
        >
          {sell ? "Sell your device" : "Request a repair"}
          <span className="sr-only"> ({service.name})</span>
          <ArrowRightIcon className="size-4.5" />
        </Link>
      </div>
    </article>
  );
}
