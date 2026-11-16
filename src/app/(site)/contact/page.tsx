import Link from "next/link";
import { ContactDetails, hasContactDetails } from "@/components/sections/ContactDetails";
import { JsonLd } from "@/components/sections/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowRightIcon, ExchangeIcon, ToolsIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { getSettings } from "@/lib/sanity/content";
import { localBusinessJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Everyday Tech Repair by phone, email, or online request for electronics repair or to sell a used device.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSettings();
  const hasDetails = hasContactDetails(settings);

  return (
    <>
      <JsonLd data={localBusinessJsonLd(settings)} />
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        text={settings.contactNote ?? "The fastest way to get help is to send a request with a few details about your device."}
      />
      <Section>
        <div className={`grid gap-8 ${hasDetails ? "lg:grid-cols-2" : "max-w-3xl"}`}>
          {hasDetails ? (
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
              <h2 className="mb-6 text-2xl">Reach us directly</h2>
              <ContactDetails settings={settings} />
              {settings.socialLinks.length ? (
                <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6">
                  {settings.socialLinks.map((link) => (
                    <li key={link.url}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-ink underline underline-offset-4">
                        {link.platform}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          <div className="grid content-start gap-5">
            <h2 className="text-2xl">Send a request online</h2>
            {[
              {
                href: "/request-service",
                cta: "contact_request_repair",
                Icon: ToolsIcon,
                title: "Request a Repair",
                text: "Tell us what device you have and what's wrong.",
              },
              {
                href: "/sell-your-device",
                cta: "contact_sell_device",
                Icon: ExchangeIcon,
                title: "Sell Your Device",
                text: "Send details and photos of a device you'd like to sell.",
              },
            ].map(({ href, cta, Icon, title, text }) => (
              <Link
                key={href}
                href={href}
                data-cta={cta}
                className="group flex items-center gap-5 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] hover:border-cyan"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-cyan text-navy">
                  <Icon className="size-7" />
                </span>
                <span className="flex-1">
                  <span className="block font-heading text-xl font-extrabold">{title}</span>
                  <span className="mt-1 block text-muted">{text}</span>
                </span>
                <ArrowRightIcon className="size-5 shrink-0 text-blue-ink" />
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
