import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { absolute: dict.vi.home.meta.title },
  description: dict.vi.home.meta.description,
  alternates: {
    canonical: "/",
    languages: { vi: "/", en: "/en" },
  },
};

export default function Page() {
  return <HomePage locale="vi" />;
}
