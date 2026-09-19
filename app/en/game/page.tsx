import type { Metadata } from "next";
import { GamePage } from "@/components/pages/GamePage";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.en.game.meta.title,
  description: dict.en.game.meta.description,
  alternates: {
    canonical: "/en/game",
    languages: { vi: "/game", en: "/en/game" },
  },
};

export default function Page() {
  return <GamePage locale="en" />;
}
