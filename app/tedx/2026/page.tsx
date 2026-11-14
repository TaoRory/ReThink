import type { Metadata } from "next";
import { Tedx2026Page } from "@/components/pages/Tedx2026Page";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.vi.tedx2026.meta.title,
  description: dict.vi.tedx2026.meta.description,
  alternates: {
    canonical: "/tedx/2026",
    languages: { vi: "/tedx/2026", en: "/en/tedx/2026" },
  },
};

export default function Page() {
  return <Tedx2026Page locale="vi" />;
}
