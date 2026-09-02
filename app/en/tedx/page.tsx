import type { Metadata } from "next";
import { TedxPage } from "@/components/pages/TedxPage";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.en.tedx.meta.title,
  description: dict.en.tedx.meta.description,
  alternates: {
    canonical: "/en/tedx",
    languages: { vi: "/tedx", en: "/en/tedx" },
  },
};

export default function Page() {
  return <TedxPage locale="en" />;
}
