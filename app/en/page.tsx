import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { absolute: dict.en.home.meta.title },
  description: dict.en.home.meta.description,
  alternates: {
    canonical: "/en",
    languages: { vi: "/", en: "/en" },
  },
};

export default function Page() {
  return <HomePage locale="en" />;
}
