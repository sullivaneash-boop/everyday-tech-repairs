import type { Metadata } from "next";
import { businessDefaults, SITE_URL } from "@/config/business";
import type { SiteSettings } from "@/lib/sanity/types";

type PageSeo = { title: string; description: string; path: string; noindex?: boolean };

/** Per-page metadata: unique title + description, canonical URL, Open Graph. */
export function pageMetadata({ title, description, path, noindex }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${businessDefaults.name}`,
      description,
      url: path,
      type: "website",
      siteName: businessDefaults.name,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/**
 * LocalBusiness structured data built ONLY from verified facts the owner has
 * entered. No ratings, no address, and no hours are emitted unless real.
 */
export function localBusinessJsonLd(settings: SiteSettings): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: settings.name,
    url: SITE_URL,
    description: settings.description,
    logo: `${SITE_URL}/brand/logo.png`,
    image: `${SITE_URL}/opengraph-image.png`,
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.serviceArea ? { areaServed: settings.serviceArea } : {}),
    ...(settings.socialLinks.length ? { sameAs: settings.socialLinks.map((l) => l.url) } : {}),
  };
}
