import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { CheckIcon } from "@/components/ui/icons";
import { SanityImg } from "@/components/ui/SanityImg";
import { Section, SectionHeading } from "@/components/ui/Section";
import { paragraphs } from "@/lib/format";
import { getAbout, getSettings } from "@/lib/sanity/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description: "Everyday Tech Repair is an independently owned and operated electronics repair and device buying business. Meet the person behind the work.",
  path: "/about",
});

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAbout(), getSettings()]);
  const bio = paragraphs(about.bio);
  const background = paragraphs(about.background);

  return (
    <>
      <PageHero
        eyebrow="About"
        title={about.ownerName ? `Meet ${about.ownerName}` : `About ${settings.name}`}
        text={about.ownerRole ?? "Independently owned and operated."}
      />

      <Section tone="white">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          {about.ownerPhoto ? (
            <SanityImg
              image={about.ownerPhoto}
              alt={about.ownerName ?? "The owner of Everyday Tech Repair"}
              aspect={4 / 5}
              sizes="(min-width: 768px) 35vw, 100vw"
              priority
              className="aspect-[4/5] w-full max-w-sm rounded-[var(--radius-card)] object-cover"
            />
          ) : null}
          <div className={`grid content-start gap-4 text-lg ${about.ownerPhoto ? "" : "md:col-span-2 md:max-w-3xl"}`}>
            {bio.length ? (
              bio.map((p) => <p key={p}>{p}</p>)
            ) : (
              <>
                <p>
                  {settings.name} is an independently owned and operated electronics repair business. We work on
                  phones, tablets, computers, game consoles, controllers, and other everyday electronics, and we
                  also buy used and damaged devices.
                </p>
                <p>
                  When you send a request, you&apos;re talking with the person who will actually look at your
                  device. We&apos;ll be straightforward about what we find and what your options are.
                </p>
              </>
            )}
          </div>
        </div>
      </Section>

      {background.length ? (
        <Section>
          <SectionHeading eyebrow="Our story" title="How we got here" />
          <div className="mt-6 grid max-w-3xl gap-4 text-lg">
            {background.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>
      ) : null}

      {about.values.length ? (
        <Section tone={background.length ? "white" : "light"}>
          <SectionHeading eyebrow="How we work" title="What you can expect" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {about.values.map((value) => (
              <li key={value.title} className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-white p-6">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-cyan text-navy">
                  <CheckIcon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg">{value.title}</h3>
                  {value.description ? <p className="mt-1.5 text-muted">{value.description}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {about.photos.length ? (
        <Section>
          <h2 className="sr-only">Photos</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.photos.map((photo) => (
              <li key={photo.url}>
                <SanityImg
                  image={photo}
                  alt={`${settings.name} workspace`}
                  aspect={4 / 3}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover"
                />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaBand heading="Let's take a look at your device" text="Send a few details and we'll follow up with you." location="about" />
    </>
  );
}
