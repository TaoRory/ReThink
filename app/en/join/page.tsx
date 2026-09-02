import type { Metadata } from "next";
import { JoinPage } from "@/components/pages/JoinPage";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.en.join.meta.title,
  description: dict.en.join.meta.description,
  alternates: {
    canonical: "/en/join",
    languages: { vi: "/join", en: "/en/join" },
  },
};

export default function Page() {
  return <JoinPage locale="en" />;
}
