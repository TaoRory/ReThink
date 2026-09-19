import type { Metadata } from "next";
import { GamePage } from "@/components/pages/GamePage";
import { dict } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dict.vi.game.meta.title,
  description: dict.vi.game.meta.description,
  alternates: {
    canonical: "/game",
    languages: { vi: "/game", en: "/en/game" },
  },
};

export default function Page() {
  return <GamePage locale="vi" />;
}
