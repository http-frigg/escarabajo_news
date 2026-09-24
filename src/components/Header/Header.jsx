import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/explorar", label: "Explorar" },
  { to: "/favoritos", label: "Favoritos" },
  { to: "/crear", label: "Crear" },
  { to: "/contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon} aria-hidden="true">
            🪲
          </span>
          <span>
            Escarabajo<em>News</em>
          </span>
        </NavLink>

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <span className={styles.avatar} aria-hidden="true">
          👤
        </span>
      </div>
    </header>
  );
}
