import { RepairForm } from "@/components/forms/RepairForm";
import { PageHero } from "@/components/sections/PageHero";
import { CheckIcon } from "@/components/ui/icons";
import { containerClass } from "@/components/ui/Section";
import { getSettings } from "@/lib/sanity/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Repair",
  description: "Tell Everyday Tech Repair about your phone, tablet, computer, game console, or other device and we'll follow up about how we can help.",
  path: "/request-service",
});

export default async function RequestServicePage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Request a repair"
        title="Tell us what's going on"
        text="Share a few details about your device and the problem. We'll review your request and get back to you."
      />
      <div className={`${containerClass} grid gap-8 py-10 sm:py-14 lg:grid-cols-[1fr_19rem]`}>
        <RepairForm contact={{ phone: settings.phone, email: settings.email }} />
        <aside aria-label="What to expect" className="order-first lg:order-none">
          <div className="rounded-[var(--radius-card)] bg-navy p-6 text-white lg:sticky lg:top-28">
            <h2 className="text-lg">What to expect</h2>
            <ul className="mt-4 grid gap-3 text-[0.95rem] text-white/90">
              {[
                "Takes about two minutes to fill out.",
                "This is an inquiry, not a booked appointment.",
                "We'll contact you by phone or email to talk through your options.",
                "Never share passwords, passcodes, or recovery keys in this form.",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <CheckIcon className="mt-0.5 size-4.5 shrink-0 text-cyan" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
