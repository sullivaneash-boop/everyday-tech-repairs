"use client";

import Link from "next/link";
import { useState } from "react";
import { buildRepairPayload } from "@/lib/forms/payloads";
import { FORMSPREE } from "@/config/business";
import { repairSchema } from "@/lib/forms/schemas";
import { ContactFields } from "./ContactFields";
import { DeviceTypeFields } from "./DeviceTypeFields";
import { FormSection, RadioGroup, TextAreaField, TextField } from "./fields";
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
  issue: "Description of issue",
};

export function RepairForm({ contact }: { contact: ContactFallback }) {
  const [deviceType, setDeviceType] = useState("");
  const form = useInquiryForm({
    schema: repairSchema,
    formId: FORMSPREE.repair,
    photosRequired: false,
    successEvent: "repair_request_submitted",
    buildPayload: buildRepairPayload,
  });

  if (form.status === "success") {
    return (
      <SuccessPanel title="Your repair request was received">
        <p>Thanks for reaching out. We&apos;ll review the details and contact you by phone or email.</p>
        <p className="text-base">
          This is an inquiry, not a confirmed appointment. Please hold on to your device until we&apos;ve been in touch.
        </p>
      </SuccessPanel>
    );
  }

  const submitting = form.status === "submitting";

  return (
    <form onSubmit={form.onSubmit} onChange={form.onChange} noValidate className="relative grid gap-6" aria-label="Repair request">
      {FORMSPREE.repair ? null : <NotConnectedNotice />}
      <ErrorSummary errors={form.errors} labels={LABELS} />
      <Honeypot />

      <ContactFields errors={form.errors} />

      <FormSection step={3} title="Your device">
        <DeviceTypeFields errors={form.errors} deviceType={deviceType} onDeviceType={setDeviceType} />
        <TextField name="brand" label="Brand" placeholder="e.g. Apple, Samsung, Sony" error={form.errors.brand} />
        <TextField name="model" label="Model" placeholder="e.g. iPhone 13, PS5" hint="A best guess is fine." error={form.errors.model} />
        <RadioGroup name="powersOn" label="Does the device power on?" options={["Yes", "No", "Not sure"]} className="sm:col-span-2" />
        <TextAreaField
          name="issue"
          label="Description of issue"
          required
          rows={5}
          error={form.errors.issue}
          hint="What's happening, and when did it start? Please don't include passwords or passcodes."
          className="sm:col-span-2"
        />
        <div id="photos-section" className="sm:col-span-2">
          <PhotoPicker
            photos={form.photos}
            onChange={form.updatePhotos}
            error={form.errors.photos}
            hint="Photos of the damage or problem help us understand it faster."
          />
        </div>
        <TextAreaField
          name="details"
          label="Anything else we should know?"
          rows={3}
          error={form.errors.details}
          hint="For example, the best time to reach you."
          className="sm:col-span-2"
        />
      </FormSection>

      {form.failure ? <SubmitFailure message={form.failure} contact={contact} /> : null}

      <div className="grid gap-4">
        <SubmitButton submitting={submitting}>Send Repair Request</SubmitButton>
        <p className="text-sm text-muted">
          Sending this form is a request for help, not a booked appointment. We use your information only to
          respond to your request. See our{" "}
          <Link href="/privacy" className="font-semibold text-blue-ink underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
