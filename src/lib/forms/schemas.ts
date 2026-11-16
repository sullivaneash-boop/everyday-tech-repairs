import { z } from "zod";
import { DEVICE_CATEGORIES } from "@/config/business";

/**
 * Validation rules for both inquiry forms. These run in the browser before
 * anything is sent; Formspree applies its own checks on receipt.
 */
// `error` also covers a field that is missing entirely (e.g. an unselected dropdown).
const required = (message: string) => z.string({ error: message }).trim().min(1, message);
const optional = z.string().trim().max(2000, "Please shorten this to 2,000 characters or fewer.").optional().default("");

const deviceTypes = DEVICE_CATEGORIES.map((c) => c.value) as [string, ...string[]];

const contactShape = {
  firstName: required("Enter your first name.").max(60),
  lastName: required("Enter your last name.").max(60),
  phone: required("Enter your phone number.").refine(
    (v) => {
      const digits = v.replace(/\D/g, "");
      return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
    },
    "Enter a 10-digit phone number, like (555) 123-4567.",
  ),
  email: required("Enter your email address.").pipe(z.email("Enter a valid email address, like name@example.com.")),
  street: required("Enter your street address.").max(120),
  city: required("Enter your city.").max(80),
  state: required("Choose your state.").regex(/^[A-Z]{2}$/, "Choose your state."),
  zip: required("Enter your ZIP code.").regex(/^\d{5}(-\d{4})?$/, "Enter a 5-digit ZIP code."),
};

const deviceShape = {
  deviceType: required("Choose a device type.").refine((v) => deviceTypes.includes(v), "Choose a device type."),
  deviceTypeOther: optional,
  powersOn: z.enum(["Yes", "No", "Not sure", ""]).optional().default(""),
};

function requireOtherDescription(
  data: { deviceType: string; deviceTypeOther: string },
  ctx: z.RefinementCtx,
) {
  if (data.deviceType === "other" && !data.deviceTypeOther) {
    ctx.addIssue({ code: "custom", path: ["deviceTypeOther"], message: "Tell us what kind of device it is." });
  }
}

export const repairSchema = z
  .object({
    ...contactShape,
    ...deviceShape,
    brand: optional,
    model: optional,
    issue: required("Describe the problem you're having.").min(10, "Add a little more detail so we can help (at least 10 characters).").max(3000),
    details: optional,
  })
  .superRefine(requireOtherDescription);

export const FUNCTIONAL_CONDITIONS = ["Fully working", "Mostly working, minor issues", "Major problems", "Doesn't work"] as const;
export const COSMETIC_CONDITIONS = ["Like new", "Light wear", "Noticeable wear", "Heavy wear or damage"] as const;

export const sellSchema = z
  .object({
    ...contactShape,
    ...deviceShape,
    brand: required("Enter the device brand, like Apple or Samsung.").max(80),
    model: required("Enter the device model.").max(120),
    functionalCondition: z.enum([...FUNCTIONAL_CONDITIONS, ""]).optional().default(""),
    cosmeticCondition: z.enum([...COSMETIC_CONDITIONS, ""]).optional().default(""),
    condition: required("Describe the device's condition and any issues.").min(10, "Add a little more detail (at least 10 characters).").max(3000),
    damage: optional,
    missingParts: optional,
    accessories: optional,
    storage: optional,
    askingPrice: optional,
    details: optional,
    // An unchecked checkbox is absent from the form data, so anything but "on" fails.
    ownership: z.literal("on", { error: "Please confirm you own this device or are authorized to sell it." }),
  })
  .superRefine(requireOtherDescription);

export type FieldErrors = Record<string, string>;

/** Validate a submitted form. Returns cleaned values or a field -> message map. */
export function validate<S extends z.ZodType>(schema: S, formData: FormData):
  | { ok: true; values: z.output<S> }
  | { ok: false; errors: FieldErrors } {
  const raw: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === "string") raw[key] = value;
  });
  const result = schema.safeParse(raw);
  if (result.success) return { ok: true, values: result.data };
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  return { ok: false, errors };
}
