import { SanityImg } from "@/components/ui/SanityImg";
import { deviceCategoryLabel } from "@/config/business";
import type { Project } from "@/lib/sanity/types";

/** Static project teaser used on the homepage. */
export function ProjectCard({ project }: { project: Project }) {
  const device = [project.brand, project.model].filter(Boolean).join(" ");
  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)]">
      <SanityImg
        image={project.featuredImage}
        alt={project.title}
        aspect={4 / 3}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="p-5">
        <p className="eyebrow text-blue-ink">{deviceCategoryLabel(project.category)}</p>
        <h3 className="mt-2 text-lg">{project.title}</h3>
        {device ? <p className="mt-1 text-sm text-muted">{device}</p> : null}
      </div>
    </article>
  );
}
