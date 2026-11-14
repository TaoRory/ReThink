import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { dict } from "@/lib/i18n";
import { system } from "@/lib/i18n/system";

export const metadata: Metadata = {
  title: { absolute: dict.en.home.meta.title },
  description: dict.en.home.meta.description,
  alternates: {
    canonical: "/en",
    languages: { vi: "/", en: "/en" },
  },
  // the evergreen share card (scripts/make-og.mjs); twitter:image follows og:image
  openGraph: {
    type: "website",
    siteName: system.en.share.siteName,
    title: dict.en.home.meta.title,
    description: dict.en.home.meta.description,
    url: "/en",
    locale: "en_US",
    alternateLocale: "vi_VN",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: system.en.share.ogAlt }],
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <HomePage locale="en" />;
}
