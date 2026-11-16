"use client";

/* eslint-disable @next/next/no-img-element -- local preview of the visitor's own file */
import { useId, useRef, useState } from "react";
import { CameraIcon, CloseIcon } from "@/components/ui/icons";
import { ACCEPT_ATTR, MAX_PHOTOS, type Photo, preparePhoto } from "@/lib/forms/photos";

type Props = {
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
  required?: boolean;
  /** Validation message from the form (e.g. "Add at least one photo."). */
  error?: string;
  hint: string;
};

/**
 * Photo chooser with previews. On phones the browser offers both the camera
 * and the photo library. Photos are shrunk in the browser before upload.
 */
export function PhotoPicker({ photos, onChange, required, error, hint }: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [problems, setProblems] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const remaining = MAX_PHOTOS - photos.length;

  async function addFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    const files = Array.from(fileList);
    const issues: string[] = [];
    if (files.length > remaining) {
      issues.push(`You can add up to ${MAX_PHOTOS} photos. Only the first ${remaining} ${remaining === 1 ? "was" : "were"} added.`);
    }
    setBusy(true);
    const added: Photo[] = [];
    for (const file of files.slice(0, remaining)) {
      const result = await preparePhoto(file);
      if ("photo" in result) added.push(result.photo);
      else issues.push(result.error);
    }
    setBusy(false);
    setProblems(issues);
    onChange([...photos, ...added]);
    if (inputRef.current) inputRef.current.value = ""; // allow re-choosing the same file
  }

  function remove(photo: Photo) {
    URL.revokeObjectURL(photo.previewUrl);
    setProblems([]);
    onChange(photos.filter((p) => p.id !== photo.id));
  }

  const messages = [...(error ? [error] : []), ...problems];

  return (
    <div className="sm:col-span-2">
      <p className="mb-1.5 font-semibold" id={`${inputId}-label`}>
        Photos
        {required ? null : <span className="ml-1.5 text-sm font-normal text-muted">(optional)</span>}
      </p>
      <p id={`${inputId}-hint`} className="mb-3 text-sm text-muted">
        {hint} Up to {MAX_PHOTOS} photos (JPG, PNG, or WebP).
      </p>

      {photos.length ? (
        <ul className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-5" aria-label="Selected photos">
          {photos.map((photo, i) => (
            <li key={photo.id} className="relative">
              <img src={photo.previewUrl} alt={`Selected photo ${i + 1}`} className="aspect-square w-full rounded-lg border border-line object-cover" />
              <button
                type="button"
                onClick={() => remove(photo)}
                className="absolute -right-2 -top-2 inline-flex size-8 items-center justify-center rounded-full border-2 border-white bg-navy text-white hover:bg-danger"
              >
                <span className="sr-only">Remove photo {i + 1}</span>
                <CloseIcon className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {remaining > 0 ? (
        <label
          htmlFor={inputId}
          className={`flex min-h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[var(--radius-control)] border-2 border-dashed bg-offwhite px-4 py-5 text-center hover:border-blue has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue ${
            error ? "border-danger bg-danger-soft" : "border-[#b9c5d4]"
          }`}
        >
          <CameraIcon className="size-7 text-blue-ink" />
          <span className="font-heading font-bold text-navy">
            {busy ? "Preparing photos…" : photos.length ? "Add another photo" : "Take or choose photos"}
          </span>
          <span className="text-sm text-muted">
            {photos.length} of {MAX_PHOTOS} added
          </span>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={ACCEPT_ATTR}
            multiple
            disabled={busy}
            aria-labelledby={`${inputId}-label`}
            aria-describedby={`${inputId}-hint${messages.length ? ` ${inputId}-error` : ""}`}
            aria-required={required || undefined}
            aria-invalid={error ? true : undefined}
            onChange={(e) => addFiles(e.target.files)}
            className="sr-only"
          />
        </label>
      ) : (
        <p className="text-sm text-muted">That&apos;s the maximum of {MAX_PHOTOS} photos. Remove one to swap it for another.</p>
      )}

      <div id={`${inputId}-error`} role="alert">
        {messages.map((message) => (
          <p key={message} className="mt-1.5 text-sm font-semibold text-danger">
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}
