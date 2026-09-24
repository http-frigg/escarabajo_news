import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <Link to="/" className={styles.logo}>
            <span aria-hidden="true">🪲</span>
            <span>
              Escarabajo<em>News</em>
            </span>
          </Link>
          <p className={styles.tagline}>
            No somos un periódico. Somos una revista viva de experiencias para explorar el mundo
            con curiosidad: educación, tecnología, turismo y comercio contados con calma.
          </p>
        </div>

        <div>
          <h3 className={styles.heading}>Explorar</h3>
          <ul className={styles.list}>
            <li>
              <Link to="/explorar">Experiencias</Link>
            </li>
            <li>
              <Link to="/favoritos">Mis favoritos</Link>
            </li>
            <li>
              <Link to="/crear">Publicar historia</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={styles.heading}>Escríbenos</h3>
          <ul className={styles.list}>
            <li>escarabajonews@gmail.com (falso)</li>
            <li>+57 314 654 8332 (falso)</li>
            <li>Rionegro, Antioquia</li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>2026 Escarabajo News · Hecho con curiosidad</span>
        <span>Una revista de experiencias, no un sitio de noticias</span>
      </div>
    </footer>
  );
}
