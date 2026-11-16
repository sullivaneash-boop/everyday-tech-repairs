import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getReviews, getSettings } from "@/lib/sanity/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const reviews = await getReviews();
  return pageMetadata({
    title: "Customer Reviews",
    description: "Read what customers have said about their experience with Everyday Tech Repair.",
    path: "/reviews",
    noindex: reviews.length === 0,
  });
}

export default async function ReviewsPage() {
  const [reviews, settings] = await Promise.all([getReviews(), getSettings()]);
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What customers say"
        text="Every review here comes from a real customer, in their own words."
      >
        {settings.googleReviewsUrl ? (
          <a
            href={settings.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="reviews_google_link"
            className="inline-flex min-h-13 items-center rounded-[var(--radius-control)] border-2 border-white/70 px-6 font-heading font-bold text-white hover:bg-white hover:text-navy"
          >
            Read our Google reviews
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : null}
      </PageHero>
      <Section>
        {reviews.length ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto max-w-xl rounded-[var(--radius-card)] border border-line bg-white p-8 text-center shadow-[var(--shadow-card)]">
            <h2 className="text-2xl">Reviews are coming soon</h2>
            <p className="mt-3 text-muted">
              We only publish reviews from real customers, so this page will grow over time.
            </p>
            <ButtonLink href="/request-service" className="mt-6" cta="reviews_empty_request_repair">
              Request a Repair
            </ButtonLink>
          </div>
        )}
      </Section>
      <CtaBand
        heading="See for yourself"
        text="Tell us about your device and find out how we can help."
        location="reviews"
      />
    </>
  );
}
