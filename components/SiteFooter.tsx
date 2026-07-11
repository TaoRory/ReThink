import Link from "next/link";
import { Logo } from "./Logo";
import { Sparkle } from "./Sparkle";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/8 bg-plum-950">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo chrome className="text-xl" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-100/60">
              “If you want a place to gather diverse ideas and take them to
              drive social innovation, you come to ReThink.”
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-lavender-400/70">
              Since 2022 · VinUniversity
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-lavender-300">
              Khám phá
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-100/70">
              <li><Link className="hover:text-cream-100" href="/about">Về ReThink</Link></li>
              <li><Link className="hover:text-cream-100" href="/tedx">TEDxVinUniversity</Link></li>
              <li><Link className="hover:text-cream-100" href="/voices">ReThink Voices</Link></li>
              <li><Link className="hover:text-cream-100" href="/join">Tuyển thành viên Gen 4.0</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-lavender-300">
              Kết nối
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-100/70">
              <li>
                <a
                  className="hover:text-cream-100"
                  href="https://www.facebook.com/rethink.vinuni"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook — ReThink
                </a>
              </li>
              <li>
                <a
                  className="hover:text-cream-100"
                  href="https://v0-tedxvinuni.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website TEDxVinUniversity
                </a>
              </li>
              <li className="text-cream-100/45">VinUniversity, Gia Lâm, Hà Nội</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-white/8 pt-6">
          <p className="text-xs text-cream-100/40">
            © {new Date().getFullYear()} ReThink — VinUniversity. Rethink &amp; Let Rethink.
          </p>
          <Sparkle className="h-5 w-5 text-lavender-400/60" />
        </div>
      </div>
    </footer>
  );
}
