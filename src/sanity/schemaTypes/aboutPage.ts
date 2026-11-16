import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";
import { photoField } from "./shared";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "ownerName",
      title: "Owner name",
      description: "As you'd like it shown publicly.",
      type: "string",
    }),
    defineField({
      name: "ownerRole",
      title: "Title",
      description: "e.g. \"Owner & Technician\"",
      type: "string",
    }),
    photoField("ownerPhoto", "Owner photo", "A friendly, real photo of you. Square or portrait works best."),
    defineField({
      name: "bio",
      title: "Owner biography",
      description: "Your story in your own words. Leave a blank line between paragraphs. Only include experience and qualifications that are true.",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "background",
      title: "Business background",
      description: "How and why the business started, and who you serve. Leave a blank line between paragraphs.",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "values",
      title: "Business values",
      description: "Three or four short promises about how you work.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "value",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "photos",
      title: "Additional photos",
      description: "Workspace, tools, or you at work.",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Photo description", type: "string" })],
        }),
      ],
      options: { layout: "grid" },
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
