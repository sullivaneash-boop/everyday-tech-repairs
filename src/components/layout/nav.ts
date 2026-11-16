import { PRIMARY_NAV } from "@/config/business";
import { getProjects, getReviews } from "@/lib/sanity/content";

export type NavItem = { href: string; label: string };

/** Nav links, minus gallery/reviews pages until they have real content. */
export async function getNavItems(): Promise<NavItem[]> {
  const [projects, reviews] = await Promise.all([getProjects(), getReviews()]);
  return PRIMARY_NAV.filter((item) => {
    if (item.href === "/our-work") return projects.length > 0;
    if (item.href === "/reviews") return reviews.length > 0;
    return true;
  });
}
