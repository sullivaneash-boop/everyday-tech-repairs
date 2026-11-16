"use client";

import Link from "next/link";
import { useState } from "react";
import { deviceCategoryLabel, FORMSPREE } from "@/config/business";
import { COSMETIC_CONDITIONS, FUNCTIONAL_CONDITIONS, sellSchema } from "@/lib/forms/schemas";
import { ContactFields } from "./ContactFields";
import { DeviceTypeFields } from "./DeviceTypeFields";
import { FormSection, RadioGroup, SelectField, TextAreaField, TextField } from "./fields";
import { type ContactFallback, ErrorSummary, Honeypot, NotConnectedNotice, SubmitButton, SubmitFailure, SuccessPanel } from "./FormStatus";
import { PhotoPicker } from "./PhotoPicker";
import { useInquiryForm } from "./useInquiryForm";

const LABELS: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  phone: "Phone number",
  email: "Email address",
  street: "Street address",
  city: "City",
  state: "State",
  zip: "ZIP code",
  deviceType: "Device type",
  deviceTypeOther: "Kind of device",
  brand: "Brand",
  model: "Model",
  condition: "Condition and issues",
  photos: "Photos",
  ownership: "Ownership confirmation",
};

/** Storage capacity only makes sense for these device types. */
const HAS_STORAGE = ["phone", "tablet", "laptop", "desktop", "console"];

export function SellForm({ contact }: { contact: ContactFallback }) {
  const [deviceType, setDeviceType] = useState("");
  const form = useInquiryForm({
    schema: sellSchema,
    formId: FORMSPREE.sell,
    photosRequired: true,
    successEvent: "sell_device_submitted",
    buildPayload: (v) => {
      const device = v.deviceType === "other" ? `Other: ${v.deviceTypeOther}` : deviceCategoryLabel(v.deviceType);
      return {
        subject: `Device for sale: ${v.brand} ${v.model} (${v.firstName} ${v.lastName})`,
        fields: [
          ["Inquiry Type", "Sell Your Device"],
          ["First Name", v.firstName],
          ["Last Name", v.lastName],
          ["Phone", v.phone],
          ["email", v.email],
          ["Street Address", v.street],
          ["City", v.city],
          ["State", v.state],
          ["ZIP Code", v.zip],
          ["Device Type", device],
          ["Device Brand", v.brand],
          ["Device Model", v.model],
          ["Storage Capacity", v.storage],
          ["Powers On", v.powersOn],
          ["Functional Condition", v.functionalCondition],
          ["Cosmetic Condition", v.cosmeticCondition],
          ["Condition / Issues", v.condition],
          ["Damage", v.damage],
          ["Missing Parts", v.missingParts],
          ["Included Accessories", v.accessories],
          ["Asking Price", v.askingPrice],
          ["Additional Information", v.details],
          ["Ownership Confirmed", "Yes, seller confirmed they own or are authorized to sell this device"],
        ],
      };
    },
  });

  if (form.status === "success") {
    return (
      <SuccessPanel title="Your device details were received">
        <p>Thanks for sending them over. We&apos;ll review your device and contact you by phone or email.</p>
        <p className="text-base">
          This is a request for evaluation. It isn&apos;t an offer or an agreement to buy, so please keep your
          device until we&apos;ve been in touch.
        </p>
      </SuccessPanel>
    );
  }

  const submitting = form.status === "submitting";

  return (
    <form onSubmit={form.onSubmit} onChange={form.onChange} noValidate className="relative grid gap-6" aria-label="Sell your device">
      {FORMSPREE.sell ? null : <NotConnectedNotice />}
      <ErrorSummary errors={form.errors} labels={LABELS} />
      <Honeypot />

      <ContactFields errors={form.errors} />

      <FormSection step={3} title="Your device">
        <DeviceTypeFields errors={form.errors} deviceType={deviceType} onDeviceType={setDeviceType} />
        <TextField name="brand" label="Brand" required placeholder="e.g. Apple, Samsung, Sony" error={form.errors.brand} />
        <TextField name="model" label="Model" required placeholder="e.g. iPhone 13, PS5" error={form.errors.model} />
        {HAS_STORAGE.includes(deviceType) ? (
          <TextField name="storage" label="Storage capacity" placeholder="e.g. 128 GB" error={form.errors.storage} />
        ) : null}
        <TextField
          name="accessories"
          label="Included accessories"
          placeholder="e.g. Charger, case, original box"
          error={form.errors.accessories}
          className={HAS_STORAGE.includes(deviceType) ? "" : "sm:col-span-2"}
        />
      </FormSection>

      <FormSection step={4} title="Condition" description="Be as accurate as you can. It helps us give you a realistic answer.">
        <RadioGroup name="powersOn" label="Does the device power on?" options={["Yes", "No", "Not sure"]} className="sm:col-span-2" />
        <SelectField name="functionalCondition" label="How well does it work?" error={form.errors.functionalCondition}>
          <option value="">Select</option>
          {FUNCTIONAL_CONDITIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </SelectField>
        <SelectField name="cosmeticCondition" label="How does it look?" error={form.errors.cosmeticCondition}>
          <option value="">Select</option>
          {COSMETIC_CONDITIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </SelectField>
        <TextAreaField
          name="condition"
          label="Describe the condition and any issues"
          required
          rows={4}
          error={form.errors.condition}
          hint="Please don't include passwords, passcodes, or account details."
          className="sm:col-span-2"
        />
        <TextField name="damage" label="Any damage?" placeholder="e.g. Cracked back glass, water exposure" error={form.errors.damage} />
        <TextField name="missingParts" label="Any missing parts?" placeholder="e.g. Battery cover, a key" error={form.errors.missingParts} />
        <div id="photos-section" className="sm:col-span-2">
          <PhotoPicker
            photos={form.photos}
            onChange={form.updatePhotos}
            required
            error={form.errors.photos}
            hint="At least one clear photo is required. Show the front, back, and any damage. Hide anything personal on the screen."
          />
        </div>
      </FormSection>

      <FormSection step={5} title="Final details">
        <TextField
          name="askingPrice"
          label="Asking price"
          inputMode="decimal"
          placeholder="e.g. $150"
          hint="If you have a number in mind. Leave blank if you're not sure."
          error={form.errors.askingPrice}
        />
        <TextAreaField name="details" label="Anything else we should know?" rows={3} error={form.errors.details} className="sm:col-span-2" />
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              id="ownership"
              type="checkbox"
              name="ownership"
              aria-required="true"
              aria-invalid={form.errors.ownership ? true : undefined}
              aria-describedby={form.errors.ownership ? "ownership-error" : undefined}
              className="mt-1 size-5 shrink-0 accent-navy"
            />
            <span>
              I confirm that I own this device or am authorized to sell it, and that the information above is
              accurate to the best of my knowledge.
            </span>
          </label>
          {form.errors.ownership ? (
            <p id="ownership-error" className="mt-1.5 text-sm font-semibold text-danger">
              {form.errors.ownership}
            </p>
          ) : null}
        </div>
      </FormSection>

      {form.failure ? <SubmitFailure message={form.failure} contact={contact} /> : null}

      <div className="grid gap-4">
        <SubmitButton submitting={submitting}>Submit Device for Review</SubmitButton>
        <p className="text-sm text-muted">
          Submitting this form asks us to evaluate your device. It does not guarantee an offer, a purchase, or
          a specific price. We use your information only to respond to your request. See our{" "}
          <Link href="/privacy" className="font-semibold text-blue-ink underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
