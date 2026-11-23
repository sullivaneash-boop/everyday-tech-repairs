import { cacheLife, cacheTag } from "next/cache";
import { businessDefaults } from "@/config/business";
import { defaultHome, defaultServices } from "@/config/default-content";
import { client } from "./client";
import {
  aboutQuery,
  homeQuery,
  projectsQuery,
  reviewsQuery,
  servicesQuery,
  settingsQuery,
} from "./queries";
import type {
  AboutContent,
  HomeContent,
  Project,
  Review,
  Service,
  SiteSettings,
} from "./types";

/**
 * Content loaders.
 *
 * Every loader is cached by Next.js and tagged "sanity". Publishing in the
 * Studio calls /api/revalidate (Sanity webhook), which clears the tag so the
 * next visitor gets fresh content, with no redeploy. As a safety net the cache
 * also refreshes on its own roughly every hour.
 *
 * Every loader also degrades gracefully: if Sanity isn't connected, a document
 * hasn't been created yet, or the API is unreachable, the site falls back to
 * safe built-in defaults instead of failing.
 */
export const SANITY_TAG = "sanity";

async function load<T>(query: string): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T | null>(query);
  } catch {
    console.error("[sanity] content request failed; using fallback content.");
    return null;
  }
}

/** Use the fallback for missing/blank strings. */
const text = (value: string | null | undefined, fallback: string) =>
  value && value.trim() ? value : fallback;

export async function getSettings(): Promise<SiteSettings> {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife("hours");
  const data = await load<Partial<SiteSettings>>(settingsQuery);
  return {
    name: text(data?.name, businessDefaults.name),
    tagline: businessDefaults.tagline,
    description: businessDefaults.description,
    phone: data?.phone || businessDefaults.phone,
    email: data?.email || businessDefaults.email,
    serviceArea: data?.serviceArea || businessDefaults.serviceArea,
    publicAddress: data?.publicAddress || null,
    hours: data?.hours?.length ? data.hours : businessDefaults.hours,
    contactNote: data?.contactNote || businessDefaults.contactNote,
    googleReviewsUrl: data?.googleReviewsUrl || businessDefaults.googleReviewsUrl,
    socialLinks: data?.socialLinks?.length ? data.socialLinks : businessDefaults.socialLinks,
  };
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife("hours");
  const data = await load<Service[]>(servicesQuery);
  return data?.length ? data : defaultServices;
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife("hours");
  return (await load<Project[]>(projectsQuery)) ?? [];
}

export async function getReviews(): Promise<Review[]> {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife("hours");
  return (await load<Review[]>(reviewsQuery)) ?? [];
}

export async function getHome(): Promise<HomeContent> {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife("hours");
  const data = await load<Partial<HomeContent>>(homeQuery);
  return {
    heroHeadline: text(data?.heroHeadline, defaultHome.heroHeadline),
    heroText: text(data?.heroText, defaultHome.heroText),
    heroImage: data?.heroImage ?? null,
    introHeading: text(data?.introHeading, defaultHome.introHeading),
    introText: text(data?.introText, defaultHome.introText),
    finalCtaHeading: text(data?.finalCtaHeading, defaultHome.finalCtaHeading),
    finalCtaText: text(data?.finalCtaText, defaultHome.finalCtaText),
    featuredServices: data?.featuredServices ?? [],
    featuredProjects: data?.featuredProjects ?? [],
  };
}

export async function getAbout(): Promise<AboutContent> {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife("hours");
  const data = await load<Partial<AboutContent>>(aboutQuery);
  return {
    ownerName: data?.ownerName || null,
    ownerRole: data?.ownerRole || null,
    ownerPhoto: data?.ownerPhoto ?? null,
    bio: data?.bio || null,
    background: data?.background || null,
    values: data?.values ?? [],
    photos: data?.photos ?? [],
  };
}

/** Current year for the footer, cached so rendering stays static. */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
