import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/business";
import { getProjects, getReviews } from "@/lib/sanity/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, reviews] = await Promise.all([getProjects(), getReviews()]);
  const paths = [
    "/",
    "/services",
    "/request-service",
    "/sell-your-device",
    ...(projects.length ? ["/our-work"] : []),
    ...(reviews.length ? ["/reviews"] : []),
    "/about",
    "/contact",
    "/privacy",
  ];
  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : ["/request-service", "/sell-your-device", "/services"].includes(path) ? 0.9 : 0.6,
  }));
}
