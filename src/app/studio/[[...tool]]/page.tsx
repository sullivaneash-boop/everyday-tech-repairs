import { NextStudio } from "next-sanity/studio";
import { isSanityConfigured } from "@/lib/sanity/env";
import config from "../../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

/** The owner's content dashboard (Sanity Studio), embedded at /studio. */
export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24">
        <h1 className="text-3xl">Content dashboard isn&apos;t connected yet</h1>
        <p className="mt-4 text-muted">
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code> in the
          environment, then reload this page. See README.md for setup steps.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
