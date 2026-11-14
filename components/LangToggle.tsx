"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { dict, localeFromPathname, stripLocale } from "@/lib/i18n";

/**
 * VI / EN switch. Both halves are real links to the same page in the other
 * language, so the choice is shareable and crawlable — nothing is stored and
 * nobody gets redirected behind their back.
 */
export function LangToggle({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const bare = stripLocale(pathname);
  const t = dict[locale].nav;

  // the root layout can't know the segment, so keep <html lang> honest here
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const base =
    "px-2 py-1 text-[11px] font-semibold tracking-[0.14em] transition-colors rounded-full";
  const on = "bg-pearl-100/90 text-ink-950";
  const off = "text-pearl-100/55 hover:text-pearl-100";

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-white/12 bg-ink-900/60 p-0.5 backdrop-blur ${className}`}
      aria-label={t.langLabel}
    >
      <Link
        href={bare}
        hrefLang="vi"
        aria-current={locale === "vi" ? "true" : undefined}
        className={`${base} ${locale === "vi" ? on : off}`}
      >
        VI
      </Link>
      <Link
        href={bare === "/" ? "/en" : `/en${bare}`}
        hrefLang="en"
        aria-current={locale === "en" ? "true" : undefined}
        className={`${base} ${locale === "en" ? on : off}`}
      >
        EN
      </Link>
    </div>
  );
}
