import { SellForm } from "@/components/forms/SellForm";
import { PageHero } from "@/components/sections/PageHero";
import { CheckIcon } from "@/components/ui/icons";
import { containerClass } from "@/components/ui/Section";
import { getSettings } from "@/lib/sanity/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sell Your Device",
  description: "Sell your used, unwanted, or damaged electronics to Everyday Tech Repair. Send device details and photos for review.",
  path: "/sell-your-device",
});

export default async function SellYourDevicePage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Sell your device"
        title="Have a device you no longer need?"
        text="We buy used, unwanted, and damaged electronics. Send us the details and a few photos, and we'll review your device."
      />
      <div className={`${containerClass} grid gap-8 py-10 sm:py-14 lg:grid-cols-[1fr_19rem]`}>
        <SellForm contact={{ phone: settings.phone, email: settings.email }} />
        <aside aria-label="How selling works" className="order-first lg:order-none">
          <div className="rounded-[var(--radius-card)] bg-navy p-6 text-white lg:sticky lg:top-28">
            <h2 className="text-lg">How it works</h2>
            <ul className="mt-4 grid gap-3 text-[0.95rem] text-white/90">
              {[
                "Have at least one clear photo of the device ready.",
                "You're submitting your device for evaluation only.",
                "Submitting doesn't guarantee an offer, a purchase, or a specific price.",
                "We'll never ask for ID, payment details, or passwords in this form.",
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
