import type { DeviceCategory } from "@/config/business";

export type SanityImage = {
  url: string;
  width: number;
  height: number;
  lqip: string | null;
  alt: string | null;
  hotspot: { x: number; y: number } | null;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  description: string;
  phone: string | null;
  email: string | null;
  serviceArea: string | null;
  publicAddress: string | null;
  hours: { days: string; hours: string }[];
  contactNote: string | null;
  googleReviewsUrl: string | null;
  socialLinks: { platform: string; url: string }[];
};

export type ServiceIcon = "phone" | "tablet" | "laptop" | "desktop" | "console" | "tools" | "exchange";

export type Service = {
  id: string;
  name: string;
  description: string;
  categories: DeviceCategory[];
  commonIssues: string[];
  icon: ServiceIcon;
  image: SanityImage | null;
  ctaTarget: "repair" | "sell";
};

export type Project = {
  id: string;
  title: string;
  category: DeviceCategory;
  brand: string | null;
  model: string | null;
  description: string | null;
  featured: boolean;
  featuredImage: SanityImage;
  beforeImage: SanityImage | null;
  afterImage: SanityImage | null;
  gallery: SanityImage[];
};

export type Review = {
  id: string;
  customerName: string;
  text: string;
  rating: number | null;
  source: string | null;
  date: string | null;
  featured: boolean;
};

export type HomeContent = {
  heroHeadline: string;
  heroText: string;
  heroImage: SanityImage | null;
  introHeading: string;
  introText: string;
  finalCtaHeading: string;
  finalCtaText: string;
  featuredServices: Service[];
  featuredProjects: Project[];
};

export type AboutContent = {
  ownerName: string | null;
  ownerRole: string | null;
  ownerPhoto: SanityImage | null;
  bio: string | null;
  background: string | null;
  values: { title: string; description: string | null }[];
  photos: SanityImage[];
};
