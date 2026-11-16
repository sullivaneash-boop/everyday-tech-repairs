"use client";

import { type FormEvent, useRef, useState } from "react";
import type { z } from "zod";
import { type AnalyticsEvent, track } from "@/lib/analytics";
import type { Photo } from "@/lib/forms/photos";
import { type FieldErrors, validate } from "@/lib/forms/schemas";
import { submitToFormspree } from "@/lib/forms/submit";

type Status = "idle" | "submitting" | "success" | "error";

type Options<S extends z.ZodType> = {
  schema: S;
  /** Formspree form ID, or null when the form isn't connected yet. */
  formId: string | null;
  /** At least one photo required? */
  photosRequired: boolean;
  /** Turns validated values into the labelled fields + subject the owner sees. */
  buildPayload: (values: z.output<S>) => { subject: string; fields: [label: string, value: string][] };
  successEvent: AnalyticsEvent;
};

/** After React paints, bring a status panel into view and focus it for screen readers. */
function focusPanel(id: string) {
  setTimeout(() => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ block: "center" });
    el?.focus({ preventScroll: true });
  }, 60);
}

export function useInquiryForm<S extends z.ZodType>({ schema, formId, photosRequired, buildPayload, successEvent }: Options<S>) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const inFlight = useRef(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return; // duplicate-submission guard

    const formData = new FormData(event.currentTarget);
    const result = validate(schema, formData);
    const nextErrors: FieldErrors = result.ok ? {} : { ...result.errors };
    if (photosRequired && photos.length === 0) {
      nextErrors.photos = "Add at least one photo of the device.";
    }

    if (!result.ok || Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("idle");
      setFailure(null);
      // Move focus to the error summary so keyboard and screen reader users land on it.
      focusPanel("form-error-summary");
      return;
    }

    setErrors({});
    setFailure(null);

    if (!formId) {
      setStatus("error");
      setFailure("Online requests aren't available right now. Please contact us directly instead.");
      return;
    }

    const { subject, fields } = buildPayload(result.values);
    const outgoing = new FormData();
    outgoing.append("_subject", subject);
    for (const [label, value] of fields) {
      if (value) outgoing.append(label, value);
    }
    // Honeypot: real visitors never fill this in; Formspree discards submissions that do.
    outgoing.append("_gotcha", String(formData.get("_gotcha") ?? ""));
    photos.forEach((photo, i) => outgoing.append(`photo_${i + 1}`, photo.file, photo.file.name));

    inFlight.current = true;
    setStatus("submitting");
    const response = await submitToFormspree(formId, outgoing);
    inFlight.current = false;

    if (response.ok) {
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
      setStatus("success");
      track(successEvent, { photo_count: photos.length });
      focusPanel("form-success");
    } else {
      setStatus("error");
      setFailure(response.message);
      focusPanel("form-failure");
    }
  }

  /** Clear a field's error as soon as the visitor starts fixing it. */
  function onChange(event: FormEvent<HTMLFormElement>) {
    const name = (event.target as HTMLInputElement).name;
    if (name && errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  function updatePhotos(next: Photo[]) {
    setPhotos(next);
    if (next.length && errors.photos) {
      setErrors((current) => {
        const rest = { ...current };
        delete rest.photos;
        return rest;
      });
    }
  }

  return { status, errors, failure, photos, updatePhotos, onSubmit, onChange };
}
