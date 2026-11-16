import { StarIcon } from "@sanity/icons/Star";
import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Customer Review",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "customerName",
      title: "Customer display name",
      description: "How the name appears publicly, e.g. \"Jordan M.\" Use only what the customer is comfortable with.",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "text",
      title: "Review",
      description: "Paste the customer's real words. Do not edit the meaning or write reviews yourself.",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "rating",
      title: "Star rating (optional)",
      description: "Only fill in if the customer gave a star rating.",
      type: "number",
      options: { list: [5, 4, 3, 2, 1] },
      validation: (rule) => rule.min(1).max(5).integer(),
    }),
    defineField({
      name: "source",
      title: "Where the review came from",
      type: "string",
      options: { list: ["Google", "Facebook", "Nextdoor", "Yelp", "Direct message", "In person", "Other"] },
    }),
    defineField({ name: "date", title: "Review date (optional)", type: "date" }),
    defineField({
      name: "visible",
      title: "Show on website",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Feature on homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Newest first", name: "newest", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "customerName", text: "text", visible: "visible", featured: "featured", rating: "rating" },
    prepare: ({ title, text, visible, featured, rating }) => ({
      title: `${title}${rating ? ` · ${rating}★` : ""}`,
      subtitle: `${visible === false ? "Hidden · " : ""}${featured ? "Featured · " : ""}${text ?? ""}`,
    }),
  },
});
