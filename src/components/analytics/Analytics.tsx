"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Google Analytics 4 loader + click tracking.
 *
 * - Loads nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 * - Respects Global Privacy Control / Do Not Track: no analytics for those visitors.
 * - One delegated click listener reports phone clicks, email clicks, and
 *   primary call-to-action clicks. Events never include personal information
 *   (not even the number/address clicked).
 */
export function Analytics({ measurementId }: { measurementId: string | null }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only privacy signal
    setAllowed(!nav.globalPrivacyControl && nav.doNotTrack !== "1");
  }, []);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const el = (event.target as Element | null)?.closest?.("a,button");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      const location = window.location.pathname;
      if (href.startsWith("tel:")) track("phone_click", { location });
      else if (href.startsWith("mailto:")) track("email_click", { location });
      const cta = el.getAttribute("data-cta");
      if (cta) track("cta_click", { cta, location });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!measurementId || !allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}');`}
      </Script>
    </>
  );
}
