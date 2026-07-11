import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "red" | "light" | "light-ghost";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn-lux btn-lux-primary",
  ghost: "btn-lux btn-lux-ghost",
  red: "btn-lux btn-lux-red",
  light: "btn-lux btn-lux-light",
  "light-ghost": "btn-lux btn-lux-light-ghost",
};

type CommonProps = {
  variant?: Variant;
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

export function Btn(props: BtnLinkProps | BtnButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const cls = `${VARIANT_CLASS[variant]} ${className}`;

  if (props.href !== undefined) {
    const { href, external, variant: _v, className: _c, children: _ch, ...rest } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, href: _h, external: _e, ...rest } = props;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
