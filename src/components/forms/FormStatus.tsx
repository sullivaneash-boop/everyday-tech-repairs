import Link from "next/link";
import type { ReactNode } from "react";
import { buttonClass } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import { telHref } from "@/lib/format";
import type { FieldErrors } from "@/lib/forms/schemas";

export type ContactFallback = { phone: string | null; email: string | null };

/** List of problems shown above the form after a failed validation. */
export function ErrorSummary({ errors, labels }: { errors: FieldErrors; labels: Record<string, string> }) {
  const entries = Object.entries(errors);
  if (!entries.length) return null;
  return (
    <div
      id="form-error-summary"
      tabIndex={-1}
      role="alert"
      className="rounded-[var(--radius-card)] border-2 border-danger bg-danger-soft p-5"
    >
      <h2 className="font-heading text-lg font-extrabold text-danger">
        Please fix {entries.length === 1 ? "this item" : `these ${entries.length} items`} to continue
      </h2>
      <ul className="mt-2 grid list-disc gap-1 pl-5">
        {entries.map(([name, message]) => (
          <li key={name}>
            <a href={`#${name === "photos" ? "photos-section" : name}`} className="font-semibold text-danger underline underline-offset-2">
              {labels[name] ?? "Form"}
            </a>
            : {message}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Shown when Formspree did not confirm the submission. The form stays filled in. */
export function SubmitFailure({ message, contact }: { message: string; contact: ContactFallback }) {
  return (
    <div id="form-failure" tabIndex={-1} role="alert" className="rounded-[var(--radius-card)] border-2 border-danger bg-danger-soft p-5">
      <h2 className="font-heading text-lg font-extrabold text-danger">Your request was not sent</h2>
      <p className="mt-1">{message}</p>
      {contact.phone || contact.email ? (
        <p className="mt-2">
          Still stuck? Reach us directly
          {contact.phone ? (
            <>
              {" "}at{" "}
              <a href={telHref(contact.phone)} className="font-bold underline underline-offset-2">
                {contact.phone}
              </a>
            </>
          ) : null}
          {contact.phone && contact.email ? " or" : ""}
          {contact.email ? (
            <>
              {" "}by email at{" "}
              <a href={`mailto:${contact.email}`} className="font-bold underline underline-offset-2">
                {contact.email}
              </a>
            </>
          ) : null}
          .
        </p>
      ) : null}
    </div>
  );
}

export function SuccessPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      id="form-success"
      tabIndex={-1}
      role="status"
      className="rounded-[var(--radius-card)] border-2 border-success bg-white p-7 text-center shadow-[var(--shadow-card)] sm:p-10"
    >
      <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-success-soft text-success">
        <CheckIcon className="size-8" />
      </span>
      <h2 className="mt-4 text-2xl sm:text-3xl">{title}</h2>
      <div className="mx-auto mt-3 grid max-w-xl gap-3 text-lg text-muted">{children}</div>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className={buttonClass("navy")}>Back to the homepage</Link>
        <Link href="/services" className={buttonClass("outline")}>View our services</Link>
      </div>
    </div>
  );
}

export function SubmitButton({ submitting, children }: { submitting: boolean; children: ReactNode }) {
  return (
    <button type="submit" disabled={submitting} aria-disabled={submitting} className={buttonClass("primary", "lg", "w-full sm:w-auto sm:min-w-64")}>
      {submitting ? (
        <>
          <span aria-hidden="true" className="size-5 animate-spin rounded-full border-[3px] border-navy/30 border-t-navy" />
          Sending… please wait
        </>
      ) : (
        children
      )}
    </button>
  );
}

/** Hidden spam trap. Hidden from people and assistive tech; bots tend to fill it in. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function NotConnectedNotice() {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <p className="rounded-[var(--radius-control)] border-2 border-dashed border-danger bg-danger-soft p-4 text-sm">
      <strong>Developer note:</strong> this form has no Formspree ID yet, so submissions will fail with a clear
      message. Set the matching <code>NEXT_PUBLIC_FORMSPREE_…_ID</code> variable (see README.md).
    </p>
  );
}
