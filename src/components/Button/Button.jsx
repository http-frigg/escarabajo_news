import { Link } from "react-router-dom";

// Border-color lives entirely inside each variant (never split between base
// and variant) — two same-layer Tailwind utilities on the same property race
// on generation order, not on className string order, so mixing them here
// silently drops one.
const base =
  "inline-flex items-center justify-center gap-2 rounded-pill border px-[1.6rem] py-[0.85rem] font-body text-[0.95rem] font-semibold leading-none transition-[transform,background,border-color] duration-150 ease-out hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-y-0";

const variants = {
  primary: "border-transparent bg-accent-pink text-[#241226] hover:bg-accent-pink-strong",
  secondary: "border-accent-pink bg-transparent text-accent-pink hover:bg-accent-pink/10",
  ghost: "border-border bg-surface text-text hover:bg-surface-hover",
};

export function Button({
  variant = "primary",
  as = "button",
  to,
  href,
  className = "",
  children,
  ...rest
}) {
  const classes = [base, variants[variant], className].filter(Boolean).join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const Tag = as;
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
