import type { Metadata } from "next";
import { Tedx2026Page } from "@/components/pages/Tedx2026Page";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.en.tedx2026.meta.title,
  description: dict.en.tedx2026.meta.description,
  alternates: {
    canonical: "/en/tedx/2026",
    languages: { vi: "/tedx/2026", en: "/en/tedx/2026" },
  },
};

export default function Page() {
  return <Tedx2026Page locale="en" />;
}
