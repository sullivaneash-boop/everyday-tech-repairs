import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Analytics } from "@/components/analytics/Analytics";
import { businessDefaults, GA_MEASUREMENT_ID, SITE_URL } from "@/config/business";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${businessDefaults.name} | Electronics Repair & Device Buying`,
    template: `%s | ${businessDefaults.name}`,
  },
  description: businessDefaults.description,
  openGraph: {
    type: "website",
    siteName: businessDefaults.name,
    locale: "en_US",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#07182e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics measurementId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
