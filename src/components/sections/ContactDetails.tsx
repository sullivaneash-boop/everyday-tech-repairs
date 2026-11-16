import { CallIcon, ClockIcon, MailIcon, PinIcon } from "@/components/ui/icons";
import { telHref } from "@/lib/format";
import type { SiteSettings } from "@/lib/sanity/types";

export function hasContactDetails(s: SiteSettings): boolean {
  return Boolean(s.phone || s.email || s.serviceArea || s.hours.length || s.publicAddress);
}

const chip = "inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-soft text-blue-ink";

export function ContactDetails({ settings }: { settings: SiteSettings }) {
  return (
    <dl className="grid gap-6">
      {settings.phone ? (
        <div className="flex gap-4">
          <span className={chip}><CallIcon className="size-5.5" /></span>
          <div>
            <dt className="eyebrow text-muted">Phone</dt>
            <dd className="mt-1">
              <a href={telHref(settings.phone)} className="font-heading text-xl font-bold text-navy underline-offset-4 hover:text-blue-ink hover:underline">
                {settings.phone}
              </a>
            </dd>
          </div>
        </div>
      ) : null}
      {settings.email ? (
        <div className="flex gap-4">
          <span className={chip}><MailIcon className="size-5.5" /></span>
          <div className="min-w-0">
            <dt className="eyebrow text-muted">Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${settings.email}`} className="break-all font-heading text-lg font-bold text-navy underline-offset-4 hover:text-blue-ink hover:underline">
                {settings.email}
              </a>
            </dd>
          </div>
        </div>
      ) : null}
      {settings.serviceArea || settings.publicAddress ? (
        <div className="flex gap-4">
          <span className={chip}><PinIcon className="size-5.5" /></span>
          <div>
            <dt className="eyebrow text-muted">Service area</dt>
            <dd className="mt-1 text-lg">
              {settings.serviceArea}
              {settings.publicAddress ? (
                <address className="mt-1 whitespace-pre-line not-italic text-muted">{settings.publicAddress}</address>
              ) : null}
            </dd>
          </div>
        </div>
      ) : null}
      {settings.hours.length ? (
        <div className="flex gap-4">
          <span className={chip}><ClockIcon className="size-5.5" /></span>
          <div>
            <dt className="eyebrow text-muted">Hours</dt>
            <dd className="mt-1">
              <ul className="grid gap-1 text-lg">
                {settings.hours.map((row) => (
                  <li key={row.days}>
                    <span className="font-semibold">{row.days}:</span> {row.hours}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </div>
      ) : null}
    </dl>
  );
}
