import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { dict } from "@/lib/i18n";
import { system } from "@/lib/i18n/system";

export const metadata: Metadata = {
  title: { absolute: dict.vi.home.meta.title },
  description: dict.vi.home.meta.description,
  alternates: {
    canonical: "/",
    languages: { vi: "/", en: "/en" },
  },
  // the evergreen share card (scripts/make-og.mjs); twitter:image follows og:image
  openGraph: {
    type: "website",
    siteName: system.vi.share.siteName,
    title: dict.vi.home.meta.title,
    description: dict.vi.home.meta.description,
    url: "/",
    locale: "vi_VN",
    alternateLocale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: system.vi.share.ogAlt }],
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <HomePage locale="vi" />;
}
