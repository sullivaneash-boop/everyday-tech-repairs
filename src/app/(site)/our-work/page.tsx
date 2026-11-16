import { ProjectGallery } from "@/components/gallery/ProjectGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getProjects } from "@/lib/sanity/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const projects = await getProjects();
  return pageMetadata({
    title: "Our Work: Completed Repairs",
    description: "Photos of real repairs completed by Everyday Tech Repair, including phones, computers, game consoles, and more.",
    path: "/our-work",
    noindex: projects.length === 0, // don't ask Google to index an empty gallery
  });
}

export default async function OurWorkPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Real repairs, real photos"
        text="A look at devices we've worked on. Tap any photo for a closer view."
      />
      <Section>
        {projects.length ? (
          <ProjectGallery projects={projects} />
        ) : (
          <div className="mx-auto max-w-xl rounded-[var(--radius-card)] border border-line bg-white p-8 text-center shadow-[var(--shadow-card)]">
            <h2 className="text-2xl">Photos are on the way</h2>
            <p className="mt-3 text-muted">
              We&apos;re gathering photos of completed repairs to share here. In the meantime, tell us about
              your device and we&apos;ll let you know how we can help.
            </p>
            <ButtonLink href="/request-service" className="mt-6" cta="our_work_empty_request_repair">
              Request a Repair
            </ButtonLink>
          </div>
        )}
      </Section>
      <CtaBand
        heading="Have a device that needs attention?"
        text="Send a few details and we'll follow up with you."
        location="our_work"
      />
    </>
  );
}
