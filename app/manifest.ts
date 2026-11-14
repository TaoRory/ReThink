import type { MetadataRoute } from "next";
import { home } from "@/lib/i18n/home";
import { system } from "@/lib/i18n/system";

/** icons are app/icon.png and app/apple-icon.png (scripts/make-og.mjs --icons) */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: system.vi.share.siteName,
    short_name: "ReThink",
    description: home.vi.meta.description,
    lang: "vi",
    start_url: "/",
    display: "browser",
    background_color: "#04060c",
    theme_color: "#04060c",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
