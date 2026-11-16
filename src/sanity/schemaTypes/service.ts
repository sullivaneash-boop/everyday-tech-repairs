import { WrenchIcon } from "@sanity/icons/Wrench";
import { defineArrayMember, defineField, defineType } from "sanity";
import { categoryOptions, photoField } from "./shared";

export const SERVICE_ICONS = [
  { title: "Phone", value: "phone" },
  { title: "Tablet", value: "tablet" },
  { title: "Laptop / Computer", value: "laptop" },
  { title: "Desktop / Monitor", value: "desktop" },
  { title: "Game console / Controller", value: "console" },
  { title: "Tools (general)", value: "tools" },
  { title: "Buy / Sell", value: "exchange" },
];

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({
      name: "name",
      title: "Service name",
      description: "e.g. \"Phone & Tablet Repair\"",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "What you help customers with. Two or three plain sentences. Avoid prices and time guarantees.",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "categories",
      title: "Device types",
      description: "Which kinds of devices this service covers.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { list: categoryOptions },
    }),
    defineField({
      name: "commonIssues",
      title: "Common issues (optional)",
      description: "Short examples of problems you actually fix, e.g. \"Cracked screens\". Only list work you really do.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: SERVICE_ICONS, layout: "radio" },
      initialValue: "tools",
    }),
    photoField("image", "Photo (optional)", "Shown on the Services page instead of only an icon."),
    defineField({
      name: "ctaTarget",
      title: "Button goes to",
      type: "string",
      options: {
        list: [
          { title: "Request a Repair form", value: "repair" },
          { title: "Sell Your Device form", value: "sell" },
        ],
        layout: "radio",
      },
      initialValue: "repair",
    }),
    defineField({
      name: "visible",
      title: "Show on website",
      description: "Turn off to hide this service without deleting it.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first (1, 2, 3…).",
      type: "number",
      initialValue: 10,
    }),
  ],
  orderings: [
    { title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", visible: "visible", order: "order", media: "image" },
    prepare: ({ title, visible, order, media }) => ({
      title,
      subtitle: `${visible === false ? "Hidden" : "Visible"} · order ${order ?? "–"}`,
      media,
    }),
  },
});
