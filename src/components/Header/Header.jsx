import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import avatar from "../../assets/beetle-figure-pink.png";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/explorar", label: "Explorar" },
  { to: "/favoritos", label: "Favoritos" },
  { to: "/crear", label: "Crear" },
  { to: "/contacto", label: "Contacto" },
];

function navLinkClass({ isActive }) {
  return `border-b-2 py-1 text-[0.95rem] ${
    isActive ? "text-text border-accent-pink" : "text-text-muted hover:text-text border-transparent"
  }`;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-footer border-border sticky top-0 z-20 border-b">
      <div className="page-container flex items-center justify-between gap-4 py-3 md:grid md:grid-cols-[1fr_auto_1fr]">
        <NavLink to="/" className="inline-flex items-center gap-2">
          <img src={logo} alt="" aria-hidden="true" className="h-12 w-12 rotate-45 object-contain" />
          <span className="font-heading leading-none">
            <span className="block text-[1.3rem] font-bold">Escarabajo</span>
            <span className="text-accent-pink ml-20 block text-[0.8rem] font-medium italic">News</span>
          </span>
        </NavLink>

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="font-heading flex items-center gap-5">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"} className={navLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-3">
          <span
            className="border-accent-pink inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border"
            aria-hidden="true"
          >
            <img src={avatar} alt="" className="h-5 w-5 object-contain" />
          </span>

          <button
            type="button"
            className="text-text inline-flex h-9 w-9 shrink-0 items-center justify-center md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav
          id="mobile-nav"
          aria-label="Navegación móvil"
          aria-hidden={!menuOpen}
          className="border-border min-h-0 overflow-hidden border-t"
        >
          <ul className="page-container font-heading flex flex-col gap-1 py-3">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  tabIndex={menuOpen ? undefined : -1}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block border-l-2 py-2 pl-3 text-[0.95rem] transition-colors duration-200 ${
                      isActive
                        ? "text-text border-accent-pink bg-surface/60"
                        : "text-text-muted hover:text-text border-transparent"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
