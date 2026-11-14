import type { MetadataRoute } from "next";
import { LOCALES, localePath } from "@/lib/i18n/locale";

const SITE = "https://rethinkorg.com";

/** every page has an /en twin; add a path here when a page is added */
const PAGES = ["/", "/about", "/tedx", "/join", "/game", "/halloween"];

const abs = (path: string) => (path === "/" ? SITE : SITE + path);

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) => {
    // the same hreflang pair on both twins, matching each page's `alternates`
    const languages = Object.fromEntries(LOCALES.map((locale) => [locale, abs(localePath(locale, page))]));
    return LOCALES.map((locale) => ({
      url: abs(localePath(locale, page)),
      alternates: { languages },
    }));
  });
}
