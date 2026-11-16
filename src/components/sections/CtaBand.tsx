import { ButtonLink } from "@/components/ui/Button";
import { containerClass } from "@/components/ui/Section";
import { Swoosh } from "./PageHero";

type Props = { heading: string; text: string; location: string };

/** Closing conversion band with both primary actions. */
export function CtaBand({ heading, text, location }: Props) {
  return (
    <section aria-labelledby="cta-band-heading" className="relative overflow-hidden bg-navy text-white">
      <Swoosh className="pointer-events-none absolute -left-32 -bottom-24 h-80 w-[36rem] text-cyan/15" />
      <div className={`${containerClass} relative py-16 text-center sm:py-20`}>
        <h2 id="cta-band-heading" className="mx-auto max-w-2xl text-3xl sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-on-navy">{text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/request-service" size="lg" cta={`${location}_cta_request_repair`}>
            Request a Repair
          </ButtonLink>
          <ButtonLink href="/sell-your-device" size="lg" variant="onNavy" cta={`${location}_cta_sell_device`}>
            Sell Your Device
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
