import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { containerClass } from "@/components/ui/Section";
import { getSettings } from "@/lib/sanity/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Everyday Tech Repair collects, uses, and protects the information you share through this website.",
  path: "/privacy",
});

/*
 * DRAFT POLICY: must be reviewed and approved by the business owner (and
 * ideally their attorney) before launch. See LAUNCH_CHECKLIST.md.
 * It describes how the site actually works; keep it in sync with the code.
 */
export default async function PrivacyPage() {
  const settings = await getSettings();
  const h2 = "mt-10 text-2xl";
  const link = "font-semibold text-blue-ink underline underline-offset-2";

  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy Policy" text="Plain-language details about what we collect and why." />
      <div className={`${containerClass} max-w-3xl py-12 text-lg leading-relaxed [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6`}>
        <p>
          {settings.name} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what information we collect
          through this website and how we use it.
        </p>

        <h2 className={h2}>Information you give us</h2>
        <p>When you send a repair request or ask us to evaluate a device you want to sell, we collect:</p>
        <ul>
          <li>Your name, phone number, email address, and street address.</li>
          <li>Details about your device, such as its type, brand, model, and condition.</li>
          <li>Any photos and notes you choose to include.</li>
        </ul>
        <p>
          We never ask for device passwords, passcodes, account logins, recovery keys, government ID, or payment
          information through this website. Please don&apos;t include them.
        </p>

        <h2 className={h2}>How we use it</h2>
        <ul>
          <li>To respond to your request and communicate with you about it.</li>
          <li>To evaluate the repair or the device you&apos;d like to sell.</li>
          <li>To keep basic business records.</li>
        </ul>
        <p>We do not sell your personal information, and we do not use it for advertising.</p>

        <h2 className={h2}>Service providers</h2>
        <p>We rely on a small number of companies to run this website. They process information on our behalf:</p>
        <ul>
          <li>
            <strong>Formspree</strong> receives and stores the forms and photos you submit, and emails them to us.
          </li>
          <li>
            <strong>Vercel</strong> hosts this website and keeps standard technical logs.
          </li>
          <li>
            <strong>Sanity</strong> stores the public content of this website (it does not receive your form submissions).
          </li>
          <li>
            <strong>Google Analytics</strong>, when enabled, gives us anonymous statistics about how the site is
            used. We never send your name, contact details, or form answers to Google Analytics, and it is not
            loaded if your browser sends a Global Privacy Control or Do Not Track signal.
          </li>
        </ul>

        <h2 className={h2}>How long we keep it</h2>
        <p>
          We keep inquiries only as long as needed to respond to you and maintain reasonable business records,
          and we periodically delete older submissions and photos we no longer need.
        </p>

        <h2 className={h2}>Your choices</h2>
        <p>
          You can ask us to show you, correct, or delete the information you&apos;ve sent us. Contact us
          {settings.email ? (
            <>
              {" "}at{" "}
              <a href={`mailto:${settings.email}`} className={link}>
                {settings.email}
              </a>
            </>
          ) : (
            <>
              {" "}through our{" "}
              <Link href="/contact" className={link}>
                contact page
              </Link>
            </>
          )}{" "}
          and we&apos;ll take care of it.
        </p>

        <h2 className={h2}>Children</h2>
        <p>This website is intended for adults. We do not knowingly collect information from children under 13.</p>

        <h2 className={h2}>Changes</h2>
        <p>If we change this policy, we&apos;ll post the updated version on this page.</p>
      </div>
    </>
  );
}
