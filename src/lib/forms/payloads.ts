import type { z } from "zod";
import { deviceCategoryLabel } from "@/config/business";
import type { repairSchema, sellSchema } from "./schemas";

type RepairValues = z.output<typeof repairSchema>;
type SellValues = z.output<typeof sellSchema>;
type CommonValues = Pick<RepairValues, keyof RepairValues & keyof SellValues>;
export type InquiryPayload = { subject: string; fields: [label: string, value: string][] };

const deviceType = (v: CommonValues) =>
  v.deviceType === "other" ? `Other: ${v.deviceTypeOther}` : deviceCategoryLabel(v.deviceType);

// Keep subjects short and single-line; braces must not become Formspree variables.
const subjectPart = (value: string, limit: number) =>
  value.replace(/[{}]/g, "").replace(/\s+/g, " ").trim().slice(0, limit);

function subject(kind: string, v: CommonValues) {
  const device = [v.brand, v.model].filter(Boolean).join(" ") || deviceType(v);
  const first = subjectPart(v.firstName, 30);
  const initial = subjectPart(v.lastName, 1);
  return `New ${kind} request: ${subjectPart(device, 60)}, ${first} ${initial}.`;
}

function contact(v: CommonValues): InquiryPayload["fields"] {
  return [
    ["First Name", v.firstName],
    ["Last Name", v.lastName],
    ["Phone", v.phone],
    // Formspree needs this exact special field for the notification Reply-To.
    ["email", v.email],
  ];
}

function address(v: CommonValues): InquiryPayload["fields"] {
  return [["Street Address", v.street], ["City", v.city], ["State", v.state], ["ZIP Code", v.zip]];
}

export function buildRepairPayload(v: RepairValues): InquiryPayload {
  return {
    subject: subject("repair", v),
    fields: [
      ...contact(v),
      ["Device Type", deviceType(v)],
      ["Device Brand", v.brand],
      ["Device Model", v.model],
      ["Description of Issue", v.issue],
      ["Powers On", v.powersOn],
      ...address(v),
      ["Additional Information", v.details],
      ["Inquiry Type", "Repair Request"],
    ],
  };
}

export function buildSellPayload(v: SellValues): InquiryPayload {
  return {
    subject: subject("sell", v),
    fields: [
      ...contact(v),
      ["Device Type", deviceType(v)],
      ["Device Brand", v.brand],
      ["Device Model", v.model],
      ["Condition / Issues", v.condition],
      ["Functional Condition", v.functionalCondition],
      ["Cosmetic Condition", v.cosmeticCondition],
      ["Powers On", v.powersOn],
      ["Asking Price", v.askingPrice],
      ...address(v),
      ["Storage Capacity", v.storage],
      ["Damage", v.damage],
      ["Missing Parts", v.missingParts],
      ["Included Accessories", v.accessories],
      ["Additional Information", v.details],
      ["Ownership Confirmed", "Yes, seller confirmed they own or are authorized to sell this device"],
      ["Inquiry Type", "Sell Your Device"],
    ],
  };
}

/** Browser-only payload assembly. Files go directly to Formspree, never our server. */
export function buildFormData(payload: InquiryPayload, files: File[], honeypot: string): FormData {
  const outgoing = new FormData();
  for (const [label, value] of payload.fields) {
    if (value) outgoing.append(label, value);
  }
  outgoing.append("Photos Included", String(files.length));
  files.forEach((file, i) => outgoing.append(`Photo ${i + 1}`, file, file.name));
  outgoing.append("subject", payload.subject);
  outgoing.append("_gotcha", honeypot);
  return outgoing;
}
