import { defineField } from "sanity";
import { DEVICE_CATEGORIES } from "@/config/business";

export const categoryOptions = DEVICE_CATEGORIES.map((c) => ({
  title: c.label,
  value: c.value,
}));

/** Image field with required alt text, used everywhere a photo is shown publicly. */
export function photoField(
  name: string,
  title: string,
  description?: string,
  opts: { group?: string; required?: boolean } = {},
) {
  return defineField({
    name,
    title,
    description,
    group: opts.group,
    validation: opts.required ? (rule) => rule.required() : undefined,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Photo description",
        description:
          "One short sentence describing the photo, e.g. \"Cracked phone screen before repair\". Helps Google and visitors using screen readers.",
        type: "string",
        validation: (rule) =>
          rule.custom((alt, context) => {
            const parent = context.parent as { asset?: unknown } | undefined;
            return parent?.asset && !alt ? "Please describe the photo." : true;
          }),
      }),
    ],
  });
}
