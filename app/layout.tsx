import type { Metadata, Viewport } from "next";
import { Lexend, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { motionBootScript } from "@/lib/motion-boot";

/**
 * One root layout serves both languages, so the static HTML says lang="vi".
 * This runs before first paint and corrects it on /en (LangToggle keeps it in
 * sync on client navigation).
 */
const langBootScript = `(function(){try{var p=location.pathname;if(p==="/en"||p.indexOf("/en/")===0)document.documentElement.lang="en"}catch(e){}})();`;

/** Geometric monoline sans, matching the AY 26-27 neon logotype. */
const displayFont = Lexend({
  // variable font: one file per subset covers every weight
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

export const viewport: Viewport = {
  themeColor: "#04060c",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  // makes the per-page canonical + hreflang alternates resolve to absolute URLs
  metadataBase: new URL("https://rethinkorg.com"),
  title: {
    default: "ReThink — VinUniversity | Rethink & Let Rethink",
    template: "%s | ReThink VinUniversity",
  },
  description:
    "ReThink — tổ chức sinh viên của VinUni, hoạt động từ 2022 và là đơn vị tổ chức TEDx VinUniversity thường niên.",
  // default share card for every page that does not set its own
  // (evergreen artwork from scripts/make-og.mjs; /halloween overrides it)
  openGraph: {
    type: "website",
    siteName: "ReThink — VinUniversity",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${displayFont.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript + langBootScript }} />
      </head>
      <body className="min-h-screen">
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Reveal />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
        <MotionProvider />
      </body>
    </html>
  );
}
