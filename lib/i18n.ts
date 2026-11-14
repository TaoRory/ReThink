/**
 * Site copy in both languages.
 *
 * Vietnamese is the source of truth and keeps the bare URLs (`/`, `/about`,
 * …); English lives under `/en`. Brand phrases stay verbatim in both — the
 * core values, the culture names, "Rethink & Let Rethink" and so on are set
 * pieces, not strings to translate.
 *
 * Each page keeps its strings in `lib/i18n/<page>.ts` ({ vi, en }); this file
 * only assembles them. Client components that need just the header/footer
 * strings import `lib/i18n/chrome` + `lib/i18n/locale` directly so the page
 * dictionaries stay out of the browser bundle.
 */

import { about } from "./i18n/about";
import { chrome } from "./i18n/chrome";
import { game } from "./i18n/game";
import { halloween } from "./i18n/halloween";
import { home } from "./i18n/home";
import { join } from "./i18n/join";
import { tedx } from "./i18n/tedx";

export * from "./i18n/locale";

export const dict = {
  vi: {
    nav: chrome.vi.nav,
    footer: chrome.vi.footer,
    home: home.vi,
    about: about.vi,
    tedx: tedx.vi,
    join: join.vi,
    game: game.vi,
    halloween: halloween.vi,
  },
  en: {
    nav: chrome.en.nav,
    footer: chrome.en.footer,
    home: home.en,
    about: about.en,
    tedx: tedx.en,
    join: join.en,
    game: game.en,
    halloween: halloween.en,
  },
} as const;

export type Dict = (typeof dict)["vi"];
