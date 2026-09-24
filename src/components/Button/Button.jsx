import { Link } from "react-router-dom";
import styles from "./Button.module.css";

export function Button({
  variant = "primary",
  as = "button",
  to,
  href,
  className = "",
  children,
  ...rest
}) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");

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
