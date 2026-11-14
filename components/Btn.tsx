import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * The one button of the main site.
 *   solid  — the main action of a screen (pearl on ink)
 *   brand  — something that is open right now (flat fuchsia)
 *   line   — secondary action
 *   ted    — anything TEDx (TED red, never fuchsia)
 * `primary` / `ghost` / `red` are the old names and map onto the new ones.
 *
 * The label rolls on hover (`.kit-roll`): keep `children` to plain text — it
 * is rendered twice, the second copy hidden from assistive tech.
 * `arrow` appends → (internal) or ↗ (external).
 */
type Variant = "solid" | "brand" | "line" | "ted" | "primary" | "ghost" | "red";

const VARIANT_CLASS: Record<Variant, string> = {
  solid: "btn btn-solid",
  brand: "btn btn-brand",
  line: "btn btn-line",
  ted: "btn btn-ted",
  primary: "btn btn-solid",
  ghost: "btn btn-line",
  red: "btn btn-ted",
};

type CommonProps = {
  variant?: Variant;
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type BtnLinkProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type BtnButtonProps = CommonProps & {
  href?: undefined;
  external?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

function Label({ children, arrow }: { children: ReactNode; arrow?: string }) {
  return (
    <>
      <span className="kit-roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {arrow && (
        <span className="btn-arrow" aria-hidden="true">
          {arrow}
        </span>
      )}
    </>
  );
}

export function Btn(props: BtnLinkProps | BtnButtonProps) {
  const { variant = "solid", size = "md", arrow = false, className = "", children } = props;
  const cls = `${VARIANT_CLASS[variant]} ${size === "sm" ? "btn-sm" : ""} ${className}`;

  if (props.href !== undefined) {
    const {
      href,
      external,
      variant: _v,
      size: _s,
      arrow: _a,
      className: _c,
      children: _ch,
      ...rest
    } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
          <Label arrow={arrow ? "↗" : undefined}>{children}</Label>
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        <Label arrow={arrow ? "→" : undefined}>{children}</Label>
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    arrow: _a,
    className: _c,
    children: _ch,
    href: _h,
    external: _e,
    ...rest
  } = props;
  return (
    <button className={cls} {...rest}>
      <Label arrow={arrow ? "→" : undefined}>{children}</Label>
    </button>
  );
}
