import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyActions } from "@/components/layout/StickyActions";
import { getSettings } from "@/lib/sanity/content";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <StickyActions phone={settings.phone} />
    </>
  );
}
