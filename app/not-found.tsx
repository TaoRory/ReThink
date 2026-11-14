import type { Metadata } from "next";
import { NotFoundView } from "@/components/NotFoundView";
import { system } from "@/lib/i18n/system";

/**
 * The root not-found handles every unmatched URL in both languages. It is one
 * document, so the title carries both; the view picks its language from the
 * URL on the client (see NotFoundView).
 */
export const metadata: Metadata = {
  title: `${system.vi.notFound.metaTitle} · ${system.en.notFound.metaTitle}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundView />;
}
