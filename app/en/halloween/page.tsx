import type { Metadata } from "next";
import { HalloweenPage } from "@/components/pages/HalloweenPage";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.en.halloween.meta.title,
  description: dict.en.halloween.meta.description,
  // the KV cover, cropped to 1200x630 by scripts/optimize-kv.mjs
  openGraph: { images: [{ url: "/halloween/og-h26.jpg", width: 1200, height: 630 }] },
  alternates: {
    canonical: "/en/halloween",
    languages: { vi: "/halloween", en: "/en/halloween" },
  },
};

export default function Page() {
  return <HalloweenPage locale="en" />;
}
