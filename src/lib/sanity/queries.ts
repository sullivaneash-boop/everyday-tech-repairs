import { defineQuery } from "next-sanity";

const image = /* groq */ `{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  alt,
  hotspot
}`;

const serviceFields = /* groq */ `
  "id": _id, name, description,
  "categories": coalesce(categories, []),
  "commonIssues": coalesce(commonIssues, []),
  "icon": coalesce(icon, "tools"),
  "image": select(defined(image.asset->url) => image${image}),
  "ctaTarget": coalesce(ctaTarget, "repair")
`;

const projectFields = /* groq */ `
  "id": _id, title, category, brand, model, description,
  "featured": coalesce(featured, false),
  "featuredImage": featuredImage${image},
  "beforeImage": select(defined(beforeImage.asset->url) => beforeImage${image}),
  "afterImage": select(defined(afterImage.asset->url) => afterImage${image}),
  "gallery": coalesce(gallery[defined(asset->url)]${image}, [])
`;

export const settingsQuery = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  name, phone, email, serviceArea, publicAddress, contactNote, googleReviewsUrl,
  "hours": coalesce(hours[]{days, hours}, []),
  "socialLinks": coalesce(socialLinks[]{platform, url}, [])
}`);

export const servicesQuery = defineQuery(
  `*[_type == "service" && visible != false] | order(coalesce(order, 999) asc, name asc){${serviceFields}}`,
);

export const projectsQuery = defineQuery(
  `*[_type == "project" && defined(featuredImage.asset->url)] | order(coalesce(completedDate, _createdAt) desc){${projectFields}}`,
);

export const reviewsQuery = defineQuery(
  `*[_type == "review" && visible != false] | order(coalesce(date, _createdAt) desc){
    "id": _id, customerName, text, rating, source, date, "featured": coalesce(featured, false)
  }`,
);

export const homeQuery = defineQuery(`*[_type == "homePage" && _id == "homePage"][0]{
  heroHeadline, heroText, introHeading, introText, finalCtaHeading, finalCtaText,
  "heroImage": select(defined(heroImage.asset->url) => heroImage${image}),
  "featuredServices": coalesce((featuredServices[]->)[_type == "service" && visible != false]{${serviceFields}}, []),
  "featuredProjects": coalesce((featuredProjects[]->)[_type == "project" && defined(featuredImage.asset->url)]{${projectFields}}, [])
}`);

export const aboutQuery = defineQuery(`*[_type == "aboutPage" && _id == "aboutPage"][0]{
  ownerName, ownerRole, bio, background,
  "ownerPhoto": select(defined(ownerPhoto.asset->url) => ownerPhoto${image}),
  "values": coalesce(values[]{title, description}, []),
  "photos": coalesce(photos[defined(asset->url)]${image}, [])
}`);
