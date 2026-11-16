import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Business Information",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "hours", title: "Hours & Area" },
    { name: "links", title: "Links" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Business name",
      type: "string",
      group: "contact",
      initialValue: "Everyday Tech Repair",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      description: "Shown across the site and used for tap-to-call. Example: (555) 123-4567",
      type: "string",
      group: "contact",
      validation: (rule) =>
        rule.custom((value) =>
          !value || value.replace(/\D/g, "").length >= 10
            ? true
            : "Enter a full 10-digit phone number.",
        ),
    }),
    defineField({
      name: "email",
      title: "Email address",
      description: "The public email customers can write to.",
      type: "string",
      group: "contact",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "contactNote",
      title: "Contact message",
      description:
        "A short friendly note shown on the Contact page, e.g. the best way to reach you or how quickly you usually reply.",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "publicAddress",
      title: "Public address (optional)",
      description:
        "Leave empty unless you want a street address shown publicly on the website.",
      type: "text",
      rows: 2,
      group: "contact",
    }),
    defineField({
      name: "serviceArea",
      title: "Service area",
      description: "Where you serve customers, e.g. \"Springfield and surrounding areas\".",
      type: "string",
      group: "hours",
    }),
    defineField({
      name: "hours",
      title: "Business hours",
      description: "Add one line per group of days.",
      type: "array",
      group: "hours",
      of: [
        defineArrayMember({
          type: "object",
          name: "hoursRow",
          fields: [
            defineField({
              name: "days",
              title: "Days",
              description: "e.g. Monday – Friday",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "hours",
              title: "Hours",
              description: "e.g. 9:00 AM – 6:00 PM, or \"By appointment\" / \"Closed\"",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "days", subtitle: "hours" } },
        }),
      ],
    }),
    defineField({
      name: "googleReviewsUrl",
      title: "Google reviews link",
      description: "Link to your Google Business reviews. Adds a \"Read our Google reviews\" button.",
      type: "url",
      group: "links",
    }),
    defineField({
      name: "socialLinks",
      title: "Social media links",
      type: "array",
      group: "links",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: ["Facebook", "Instagram", "TikTok", "YouTube", "X", "Nextdoor", "Other"],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Link",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Business Information" }) },
});
