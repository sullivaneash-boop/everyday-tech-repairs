/**
 * Central business configuration.
 *
 * Everything the owner edits day to day lives in Sanity ("Business Information").
 * The values here are only the FALLBACKS used when Sanity is not connected or a
 * field is empty. Unverified facts are deliberately `null` so the site hides
 * them instead of publishing a made-up phone number, address, or hours.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://everydaytechrepair.com"
).replace(/\/$/, "");

export const businessDefaults = {
  name: "Everyday Tech Repair",
  tagline: "Repair. Buy. Sell.",
  description:
    "Independent electronics repair for phones, computers, game consoles, and other everyday devices. We also buy used and damaged electronics.",
  phone: null as string | null,
  email: null as string | null,
  serviceArea: null as string | null,
  hours: [] as { days: string; hours: string }[],
  contactNote: null as string | null,
  googleReviewsUrl: null as string | null,
  socialLinks: [] as { platform: string; url: string }[],
};

export const DEVICE_CATEGORIES = [
  { value: "phone", label: "Phone" },
  { value: "tablet", label: "Tablet" },
  { value: "laptop", label: "Laptop" },
  { value: "desktop", label: "Desktop Computer" },
  { value: "console", label: "Gaming Console" },
  { value: "controller", label: "Gaming Controller" },
  { value: "other", label: "Other Electronics" },
] as const;

export type DeviceCategory = (typeof DEVICE_CATEGORIES)[number]["value"];

export function deviceCategoryLabel(value: string | null | undefined): string {
  return DEVICE_CATEGORIES.find((c) => c.value === value)?.label ?? "Electronics";
}

export const PRIMARY_NAV = [
  { href: "/services", label: "Services" },
  { href: "/sell-your-device", label: "Sell Your Device" },
  { href: "/our-work", label: "Our Work" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const US_STATES = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"],
  ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
] as const;

/** Formspree form IDs (public by design; they only identify where a form posts). */
export const FORMSPREE = {
  repair: process.env.NEXT_PUBLIC_FORMSPREE_REPAIR_ID || null,
  sell: process.env.NEXT_PUBLIC_FORMSPREE_SELL_ID || null,
};

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || null;
