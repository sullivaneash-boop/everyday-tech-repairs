import type { ComponentProps, ReactNode } from "react";

/** Accessible form field building blocks shared by both inquiry forms. */

type Common = {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

function describedBy(name: string, error?: string, hint?: string) {
  return [error ? `${name}-error` : null, hint ? `${name}-hint` : null].filter(Boolean).join(" ") || undefined;
}

function Label({ name, label, required }: Pick<Common, "name" | "label" | "required">) {
  return (
    <label htmlFor={name} className="mb-1.5 block font-semibold">
      {label}
      {required ? null : <span className="ml-1.5 text-sm font-normal text-muted">(optional)</span>}
    </label>
  );
}

function Messages({ name, error, hint }: Pick<Common, "name" | "error" | "hint">) {
  return (
    <>
      {hint ? (
        <p id={`${name}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 text-sm font-semibold text-danger">
          {error}
        </p>
      ) : null}
    </>
  );
}

export function TextField({ name, label, error, hint, required, className, ...input }: Common & Omit<ComponentProps<"input">, "name" | "className">) {
  return (
    <div className={className}>
      <Label name={name} label={label} required={required} />
      <input
        id={name}
        name={name}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className="control"
        {...input}
      />
      <Messages name={name} error={error} hint={hint} />
    </div>
  );
}

export function TextAreaField({ name, label, error, hint, required, className, ...input }: Common & Omit<ComponentProps<"textarea">, "name" | "className">) {
  return (
    <div className={className}>
      <Label name={name} label={label} required={required} />
      <textarea
        id={name}
        name={name}
        rows={4}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className="control"
        {...input}
      />
      <Messages name={name} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({ name, label, error, hint, required, className, children, ...input }: Common & Omit<ComponentProps<"select">, "name" | "className">) {
  return (
    <div className={className}>
      <Label name={name} label={label} required={required} />
      <select
        id={name}
        name={name}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className="control"
        defaultValue=""
        {...input}
      >
        {children}
      </select>
      <Messages name={name} error={error} hint={hint} />
    </div>
  );
}

export function RadioGroup({ name, label, options, error, className }: Common & { options: readonly string[] }) {
  return (
    <fieldset className={className} aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-2 font-semibold">
        {label}
        <span className="ml-1.5 text-sm font-normal text-muted">(optional)</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[var(--radius-control)] border border-[#b9c5d4] bg-white px-4 has-[:checked]:border-navy has-[:checked]:bg-navy has-[:checked]:text-white has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue"
          >
            <input type="radio" name={name} value={option} className="sr-only" />
            {option}
          </label>
        ))}
      </div>
      <Messages name={name} error={error} />
    </fieldset>
  );
}

export function FormSection({ step, title, description, children }: { step: number; title: string; description?: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-[var(--shadow-card)] sm:p-7">
      <legend className="float-left mb-5 flex w-full items-center gap-3">
        <span aria-hidden="true" className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-cyan font-heading font-extrabold text-navy">
          {step}
        </span>
        <span className="font-heading text-xl font-extrabold">{title}</span>
      </legend>
      {description ? <p className="clear-both -mt-2 mb-5 text-muted">{description}</p> : null}
      <div className="clear-both grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
