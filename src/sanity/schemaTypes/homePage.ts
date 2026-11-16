import { HomeIcon } from "@sanity/icons/Home";
import { defineArrayMember, defineField, defineType } from "sanity";
import { photoField } from "./shared";

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Top of page", default: true },
    { name: "intro", title: "Introduction" },
    { name: "featured", title: "Featured content" },
    { name: "cta", title: "Bottom call to action" },
  ],
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Main headline",
      description: "The first thing visitors read. Keep it short and clear.",
      type: "string",
      group: "hero",
      validation: (rule) => rule.max(80).warning("Shorter headlines read better on phones."),
    }),
    defineField({
      name: "heroText",
      title: "Supporting text",
      description: "One or two sentences under the headline.",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (rule) => rule.max(260),
    }),
    photoField(
      "heroImage",
      "Hero photo (optional)",
      "A real photo of your workbench or a repair in progress. If empty, the logo mark is shown instead.",
      { group: "hero" },
    ),
    defineField({
      name: "introHeading",
      title: "Services section heading",
      type: "string",
      group: "intro",
    }),
    defineField({
      name: "introText",
      title: "Services section text",
      type: "text",
      rows: 3,
      group: "intro",
    }),
    defineField({
      name: "featuredServices",
      title: "Featured services",
      description:
        "Pick the services to highlight on the homepage, in the order you want them. If empty, all visible services are shown.",
      type: "array",
      group: "featured",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
      validation: (rule) => rule.unique().max(6),
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured completed work",
      description:
        "Pick up to 6 projects for the homepage. If empty, projects marked \"Feature this project\" are shown.",
      type: "array",
      group: "featured",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
      validation: (rule) => rule.unique().max(6),
    }),
    defineField({
      name: "finalCtaHeading",
      title: "Heading",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "finalCtaText",
      title: "Text",
      type: "text",
      rows: 2,
      group: "cta",
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
