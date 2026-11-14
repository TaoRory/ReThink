"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { chrome } from "@/lib/i18n/chrome";
import { localeFromPathname, stripLocale } from "@/lib/i18n/locale";

/**
 * VI / EN switch. Both halves are real links to the same page in the other
 * language, so the choice is shareable and crawlable — nothing is stored and
 * nobody gets redirected behind their back.
 */
export function LangToggle({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const bare = stripLocale(pathname);
  const t = chrome[locale].nav;

  // the root layout can't know the segment; an inline script fixes <html lang>
  // before first paint and this keeps it honest across client navigation
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // 40px-tall halves: a thumb can hit either one
  const base =
    "inline-flex min-h-10 min-w-11 items-center justify-center rounded-full px-2.5 text-[13px] font-semibold tracking-[0.1em] transition-colors";
  // `!`: the Halloween chrome recolours every header link, which left the
  // active language bone-on-pearl (unreadable) on the event page
  const on = "bg-pearl-100/90 !text-ink-950";
  const off = "text-pearl-200 hover:text-pearl-50";

  return (
    <div
      role="group"
      className={`inline-flex items-center gap-0.5 rounded-full border border-white/12 bg-ink-900/60 p-0.5 ${className}`}
      aria-label={t.langLabel}
    >
      <Link
        href={bare}
        hrefLang="vi"
        lang="vi"
        aria-label="Tiếng Việt"
        aria-current={locale === "vi" ? "true" : undefined}
        className={`${base} ${locale === "vi" ? on : off}`}
      >
        VI
      </Link>
      <Link
        href={bare === "/" ? "/en" : `/en${bare}`}
        hrefLang="en"
        lang="en"
        aria-label="English"
        aria-current={locale === "en" ? "true" : undefined}
        className={`${base} ${locale === "en" ? on : off}`}
      >
        EN
      </Link>
    </div>
  );
}
