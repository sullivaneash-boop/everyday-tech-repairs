import Image from "next/image";
import Link from "next/link";
import { ContactDetails, hasContactDetails } from "@/components/sections/ContactDetails";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/sections/JsonLd";
import { Swoosh } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, CallIcon, CheckIcon, ExchangeIcon, ToolsIcon } from "@/components/ui/icons";
import { SanityImg } from "@/components/ui/SanityImg";
import { containerClass, Section, SectionHeading } from "@/components/ui/Section";
import { businessDefaults } from "@/config/business";
import { paragraphs, telHref } from "@/lib/format";
import { getAbout, getHome, getProjects, getReviews, getServices, getSettings } from "@/lib/sanity/content";
import { localBusinessJsonLd } from "@/lib/seo";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/", type: "website", siteName: businessDefaults.name, locale: "en_US" },
};

const textLink = "inline-flex items-center gap-1.5 font-heading font-bold text-blue-ink underline-offset-4 hover:underline";

export default async function HomePage() {
  const [settings, home, allServices, allProjects, allReviews, about] = await Promise.all([
    getSettings(),
    getHome(),
    getServices(),
    getProjects(),
    getReviews(),
    getAbout(),
  ]);

  const services = home.featuredServices.length ? home.featuredServices : allServices;
  const projects = (home.featuredProjects.length ? home.featuredProjects : allProjects.filter((p) => p.featured)).slice(0, 6);
  const featuredReviews = allReviews.filter((r) => r.featured);
  const reviews = (featuredReviews.length ? featuredReviews : allReviews).slice(0, 3);
  const bio = paragraphs(about.bio);

  return (
    <>
      <JsonLd data={localBusinessJsonLd(settings)} />

      {/* 1. Hero */}
      <div className="relative overflow-hidden bg-navy text-white">
        <Swoosh className="pointer-events-none absolute -right-40 top-6 hidden h-[26rem] w-[48rem] text-cyan/15 lg:block" />
        <div className={`${containerClass} relative grid items-center gap-10 pb-28 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-32`}>
          <div>
            <p className="eyebrow mb-4 text-cyan">Repair · Buy · Sell</p>
            <h1 className="text-[2.5rem] leading-[1.08] sm:text-6xl">{home.heroHeadline}</h1>
            <p className="mt-5 max-w-xl text-lg text-muted-on-navy sm:text-xl">{home.heroText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/request-service" size="lg" cta="hero_request_repair">
                Request a Repair
              </ButtonLink>
              <ButtonLink href="/sell-your-device" size="lg" variant="onNavy" cta="hero_sell_device">
                Sell Your Device
              </ButtonLink>
            </div>
            {settings.phone ? (
              <p className="mt-5 text-muted-on-navy">
                Prefer to talk?{" "}
                <a href={telHref(settings.phone)} className="inline-flex items-center gap-1.5 font-bold text-white underline underline-offset-4 hover:text-cyan">
                  <CallIcon className="size-4.5" /> Call {settings.phone}
                </a>
              </p>
            ) : null}
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-white/90">
              {["Independently owned and operated", "Phones, computers, consoles & more", "No obligation to send a request"].map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <CheckIcon className="size-4.5 text-cyan" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block">
            {home.heroImage ? (
              <SanityImg
                image={home.heroImage}
                alt="Everyday Tech Repair at work"
                aspect={4 / 3}
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
                className="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover ring-4 ring-cyan"
              />
            ) : (
              <div className="mx-auto flex aspect-square max-w-sm items-center justify-center rounded-[2rem] bg-offwhite p-12">
                <Image src="/brand/icon.svg" alt="" width={385} height={298} priority unoptimized className="h-auto w-full" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. The two primary actions */}
      <div className={`${containerClass} relative z-10 -mt-16 grid gap-5 md:grid-cols-2`}>
        {[
          {
            href: "/request-service",
            cta: "action_card_request_repair",
            Icon: ToolsIcon,
            title: "Request a Repair",
            text: "Something broken or acting up? Tell us about it and we'll follow up to talk through your options.",
            link: "Start a repair request",
          },
          {
            href: "/sell-your-device",
            cta: "action_card_sell_device",
            Icon: ExchangeIcon,
            title: "Sell Your Device",
            text: "Have used, unwanted, or damaged electronics? Send the details and a photo and we'll review it.",
            link: "Submit your device",
          },
        ].map(({ href, cta, Icon, title, text, link }) => (
          <Link
            key={href}
            href={href}
            data-cta={cta}
            className="group flex gap-5 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] transition-colors hover:border-cyan sm:p-7"
          >
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-cyan text-navy">
              <Icon className="size-8" />
            </span>
            <span>
              <span className="block font-heading text-2xl font-extrabold">{title}</span>
              <span className="mt-1.5 block text-muted">{text}</span>
              <span className={`${textLink} mt-3 group-hover:underline`}>
                {link} <ArrowRightIcon className="size-4.5" />
              </span>
            </span>
          </Link>
        ))}
      </div>

      {/* 3. Services */}
      <Section labelledBy="services-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="services-heading" eyebrow="Services" title={home.introHeading} text={home.introText} />
          <Link href="/services" className={textLink}>
            All services <ArrowRightIcon className="size-4.5" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. Process */}
      <Section tone="navy" labelledBy="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="How it works"
          title="Getting help is simple"
          text="A repair request is an inquiry, not an appointment. Here's what happens after you send one."
          onNavy
        />
        <ProcessSteps />
      </Section>

      {/* 5. Featured work (only when real projects exist) */}
      {projects.length ? (
        <Section tone="white" labelledBy="work-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="work-heading" eyebrow="Our work" title="Recent repairs" />
            <Link href="/our-work" className={textLink}>
              See more of our work <ArrowRightIcon className="size-4.5" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 6. Reviews (only when real reviews exist) */}
      {reviews.length ? (
        <Section labelledBy="reviews-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="reviews-heading" eyebrow="Reviews" title="What customers say" />
            <Link href="/reviews" className={textLink}>
              Read all reviews <ArrowRightIcon className="size-4.5" />
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 7. Owner introduction (only when the owner has written a bio) */}
      {bio.length ? (
        <Section tone="white" labelledBy="owner-heading">
          <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
            {about.ownerPhoto ? (
              <SanityImg
                image={about.ownerPhoto}
                alt={about.ownerName ?? "The owner of Everyday Tech Repair"}
                aspect={4 / 5}
                sizes="(min-width: 768px) 35vw, 100vw"
                className="aspect-[4/5] w-full max-w-sm rounded-[var(--radius-card)] object-cover"
              />
            ) : null}
            <div className={about.ownerPhoto ? "" : "md:col-span-2 md:max-w-3xl"}>
              <p className="eyebrow mb-3 text-blue-ink">Who you&apos;ll work with</p>
              <h2 id="owner-heading" className="text-3xl sm:text-4xl">
                {about.ownerName ? `Meet ${about.ownerName}` : "A real person, not a call center"}
              </h2>
              <p className="mt-4 text-lg text-muted">{bio[0]}</p>
              <Link href="/about" className={`${textLink} mt-5`}>
                More about us <ArrowRightIcon className="size-4.5" />
              </Link>
            </div>
          </div>
        </Section>
      ) : null}

      {/* 8. Service area & contact */}
      {hasContactDetails(settings) ? (
        <Section labelledBy="contact-heading">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <SectionHeading
                id="contact-heading"
                eyebrow="Contact"
                title={settings.serviceArea ? `Serving ${settings.serviceArea}` : "Get in touch"}
                text={settings.contactNote ?? "Questions before you send a request? Reach out directly."}
              />
              <Link href="/contact" className={`${textLink} mt-6`}>
                All contact options <ArrowRightIcon className="size-4.5" />
              </Link>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
              <ContactDetails settings={settings} />
            </div>
          </div>
        </Section>
      ) : null}

      {/* 9. Final conversion */}
      <CtaBand heading={home.finalCtaHeading} text={home.finalCtaText} location="home" />
    </>
  );
}
