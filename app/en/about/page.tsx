import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.en.about.meta.title,
  description: dict.en.about.meta.description,
  alternates: {
    canonical: "/en/about",
    languages: { vi: "/about", en: "/en/about" },
  },
};

export default function Page() {
  return <AboutPage locale="en" />;
}
