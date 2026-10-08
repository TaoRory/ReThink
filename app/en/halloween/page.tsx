import type { Metadata } from "next";
import { HalloweenPage } from "@/components/pages/HalloweenPage";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.en.halloween.meta.title,
  description: dict.en.halloween.meta.description,
  alternates: {
    canonical: "/en/halloween",
    languages: { vi: "/halloween", en: "/en/halloween" },
  },
};

export default function Page() {
  return <HalloweenPage locale="en" />;
}
