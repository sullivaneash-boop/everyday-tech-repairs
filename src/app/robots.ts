import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/business";

export default function robots(): MetadataRoute.Robots {
  // Only the real production deployment should be indexed (not preview URLs).
  const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
  return {
    rules: isProduction
      ? [{ userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
