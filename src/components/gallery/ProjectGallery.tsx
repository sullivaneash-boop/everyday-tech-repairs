"use client";

/* eslint-disable @next/next/no-img-element -- images come pre-sized from Sanity's CDN */
import { useEffect, useMemo, useRef, useState } from "react";
import { CloseIcon } from "@/components/ui/icons";
import { DEVICE_CATEGORIES, deviceCategoryLabel } from "@/config/business";
import { sanityImageUrl, sanitySrcSet } from "@/lib/sanity/image";
import type { Project, SanityImage } from "@/lib/sanity/types";

type Slide = { image: SanityImage; label: string | null };

function slidesFor(project: Project): Slide[] {
  return [
    { image: project.featuredImage, label: null },
    ...(project.beforeImage ? [{ image: project.beforeImage, label: "Before" }] : []),
    ...(project.afterImage ? [{ image: project.afterImage, label: "After" }] : []),
    ...project.gallery.map((image) => ({ image, label: null })),
  ];
}

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<Project | null>(null);
  const [slide, setSlide] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const categories = useMemo(
    () => DEVICE_CATEGORIES.filter((c) => projects.some((p) => p.category === c.value)),
    [projects],
  );
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const slides = active ? slidesFor(active) : [];
  const current = slides[slide];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  function open(project: Project) {
    setSlide(0);
    setActive(project);
  }

  return (
    <div>
      {categories.length > 1 ? (
        <div role="group" aria-label="Filter by device type" className="mb-8 flex flex-wrap gap-2">
          {[{ value: "all", label: "All work" }, ...categories].map((c) => (
            <button
              key={c.value}
              type="button"
              aria-pressed={filter === c.value}
              onClick={() => setFilter(c.value)}
              className={`min-h-11 rounded-full border-2 px-4 font-heading text-sm font-bold transition-colors ${
                filter === c.value
                  ? "border-navy bg-navy text-white"
                  : "border-line bg-white text-navy hover:border-navy"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      ) : null}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => {
          const device = [project.brand, project.model].filter(Boolean).join(" ");
          const hasBeforeAfter = project.beforeImage && project.afterImage;
          return (
            <li key={project.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)]">
                <button
                  type="button"
                  onClick={() => open(project)}
                  className="group relative block w-full cursor-zoom-in"
                  aria-label={`View photos: ${project.title}`}
                >
                  <img
                    src={sanityImageUrl(project.featuredImage, 640, { aspect: 4 / 3 })}
                    srcSet={sanitySrcSet(project.featuredImage, [320, 480, 640, 960], 4 / 3)}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    width={640}
                    height={480}
                    loading="lazy"
                    decoding="async"
                    alt={project.featuredImage.alt || project.title}
                    className="aspect-[4/3] w-full object-cover transition-opacity group-hover:opacity-90"
                  />
                  {hasBeforeAfter ? (
                    <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">
                      Before &amp; after
                    </span>
                  ) : null}
                </button>
                <div className="flex flex-1 flex-col p-5">
                  <p className="eyebrow text-blue-ink">{deviceCategoryLabel(project.category)}</p>
                  <h2 className="mt-2 text-lg">{project.title}</h2>
                  {device ? <p className="mt-1 text-sm font-medium text-muted">{device}</p> : null}
                  {project.description ? (
                    <p className="mt-3 whitespace-pre-line text-[0.95rem] text-muted">{project.description}</p>
                  ) : null}
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setActive(null);
        }}
        aria-label={active ? `Photos: ${active.title}` : "Photos"}
        className="m-auto w-[min(64rem,calc(100vw-1.5rem))] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[var(--radius-card)] bg-navy p-0 text-white backdrop:bg-navy/80"
      >
        {active && current ? (
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-cyan">{deviceCategoryLabel(active.category)}</p>
                <p className="mt-1 font-heading text-xl font-extrabold">{active.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border-2 border-white/60 hover:bg-white hover:text-navy"
              >
                <span className="sr-only">Close photos</span>
                <CloseIcon className="size-5" />
              </button>
            </div>

            <figure className="mt-4">
              <img
                key={current.image.url}
                src={sanityImageUrl(current.image, 1600)}
                alt={current.image.alt || `${active.title}${current.label ? ` (${current.label.toLowerCase()})` : ""}`}
                className="mx-auto max-h-[65dvh] w-auto max-w-full rounded-lg object-contain"
              />
              {current.label ? (
                <figcaption className="mt-2 text-center font-heading font-bold text-cyan">{current.label}</figcaption>
              ) : null}
            </figure>

            {slides.length > 1 ? (
              <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label="More photos">
                {slides.map((s, i) => (
                  <li key={s.image.url + i}>
                    <button
                      type="button"
                      onClick={() => setSlide(i)}
                      aria-current={i === slide}
                      aria-label={`Photo ${i + 1} of ${slides.length}${s.label ? `: ${s.label}` : ""}`}
                      className={`block overflow-hidden rounded-md border-2 ${i === slide ? "border-cyan" : "border-transparent opacity-70 hover:opacity-100"}`}
                    >
                      <img
                        src={sanityImageUrl(s.image, 160, { aspect: 1 })}
                        alt=""
                        width={64}
                        height={64}
                        className="size-16 object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
