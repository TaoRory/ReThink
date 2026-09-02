import type { Metadata } from "next";
import { Lexend, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

/** Geometric monoline sans, matching the AY 26-27 neon logotype. */
const displayFont = Lexend({
  weight: ["200", "300", "400", "500", "600"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-display-var",
  display: "swap",
});

const bodyFont = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-body-var",
  display: "swap",
});

export const metadata: Metadata = {
  // makes the per-page canonical + hreflang alternates resolve to absolute URLs
  metadataBase: new URL("https://rethinkorg.com"),
  title: {
    default: "ReThink — VinUniversity | Rethink & Let Rethink",
    template: "%s | ReThink VinUniversity",
  },
  description:
    "ReThink — tổ chức sinh viên của VinUni, hoạt động từ 2022 và là đơn vị tổ chức TEDxVinUniversity thường niên.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="min-h-screen">
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Reveal />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
