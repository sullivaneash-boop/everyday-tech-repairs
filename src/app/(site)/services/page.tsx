import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getServices } from "@/lib/sanity/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Electronics Repair Services",
  description:
    "Repair for phones, tablets, laptops, desktop computers, game consoles, controllers, and other electronics. We also buy used and damaged devices.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Repair for the devices you use every day"
        text="Pick the closest match below. If you're not sure where your device fits, send a request anyway and describe it in your own words."
      >
        <ButtonLink href="/request-service" size="lg" cta="services_hero_request_repair">
          Request a Repair
        </ButtonLink>
      </PageHero>

      <Section>
        <h2 className="sr-only">What we work on</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} detailed />
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-muted">
          Every device and every problem is a little different, so we don&apos;t list one-size-fits-all prices.
          Send a request with the details and we&apos;ll follow up about your specific situation.
        </p>
      </Section>

      <CtaBand
        heading="Not sure what's wrong? That's okay."
        text="Describe what you're seeing as best you can. We'll take it from there."
        location="services"
      />
    </>
  );
}
