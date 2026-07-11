import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

const scriptFont = Great_Vibes({
  weight: "400",
  subsets: ["latin", "vietnamese"],
  variable: "--font-script-var",
  display: "swap",
});

const displayFont = Playfair_Display({
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
  title: {
    default: "ReThink — VinUniversity | Rethink & Let Rethink",
    template: "%s | ReThink VinUniversity",
  },
  description:
    "ReThink — cộng đồng sinh viên VinUniversity quy tụ những ý tưởng đa chiều và biến chúng thành đổi mới xã hội. Đơn vị đứng sau TEDxVinUniversity.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${scriptFont.variable} ${displayFont.variable} ${bodyFont.variable}`}
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
