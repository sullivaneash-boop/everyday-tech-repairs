import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";
import { categoryOptions, photoField } from "./shared";

export const project = defineType({
  name: "project",
  title: "Completed Work",
  type: "document",
  icon: ImagesIcon,
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "photos", title: "Photos" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Project title",
      description: "e.g. \"Laptop screen replacement\"",
      type: "string",
      group: "details",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "category",
      title: "Device type",
      type: "string",
      group: "details",
      options: { list: categoryOptions },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "brand", title: "Brand", type: "string", group: "details" }),
    defineField({ name: "model", title: "Model", type: "string", group: "details" }),
    defineField({
      name: "description",
      title: "Description of the work",
      description: "What was wrong and what you did. Never include customer names or personal details.",
      type: "text",
      rows: 4,
      group: "details",
      validation: (rule) => rule.max(600),
    }),
    defineField({
      name: "completedDate",
      title: "Date completed (optional)",
      type: "date",
      group: "details",
    }),
    defineField({
      name: "featured",
      title: "Feature this project",
      description: "Featured projects can appear on the homepage.",
      type: "boolean",
      group: "details",
      initialValue: false,
    }),
    photoField(
      "featuredImage",
      "Main photo",
      "The photo shown in the gallery. Make sure no personal information (lock screens, names, addresses) is visible.",
      { group: "photos", required: true },
    ),
    photoField("beforeImage", "Before photo (optional)", undefined, { group: "photos" }),
    photoField("afterImage", "After photo (optional)", undefined, { group: "photos" }),
    defineField({
      name: "gallery",
      title: "Additional photos",
      type: "array",
      group: "photos",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Photo description", type: "string" })],
        }),
      ],
      options: { layout: "grid" },
      validation: (rule) => rule.max(8),
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [
        { field: "completedDate", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", brand: "brand", model: "model", featured: "featured", media: "featuredImage" },
    prepare: ({ title, brand, model, featured, media }) => ({
      title,
      subtitle: [featured ? "★ Featured" : null, brand, model].filter(Boolean).join(" · "),
      media,
    }),
  },
});
