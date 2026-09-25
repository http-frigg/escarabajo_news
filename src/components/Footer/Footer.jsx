import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-footer border-border mt-auto border-t">
      <div className="page-container grid grid-cols-[2fr_1fr_1fr] gap-6 pt-7 pb-6 max-[720px]:grid-cols-1">
        <div>
          <Link to="/" className="mb-3 inline-flex items-center gap-2">
            <img src={logo} alt="" aria-hidden="true" className="h-10 w-10 rotate-45 object-contain" />
            <span className="font-heading leading-none">
              <span className="block text-[1.15rem] font-bold">Escarabajo</span>
              <span className="text-accent-pink ml-8 block text-[0.95rem] font-medium italic">News</span>
            </span>
          </Link>
          <p className="text-text-muted max-w-[32ch] text-[0.9rem]">
            No somos un periódico. Somos una revista viva de experiencias para explorar el mundo
            con curiosidad: educación, tecnología, turismo y comercio contados con calma.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-[0.95rem]">Explorar</h3>
          <ul className="text-text-muted grid gap-2 text-[0.9rem]">
            <li>
              <Link to="/explorar" className="hover:text-text">
                Experiencias
              </Link>
            </li>
            <li>
              <Link to="/favoritos" className="hover:text-text">
                Mis favoritos
              </Link>
            </li>
            <li>
              <Link to="/crear" className="hover:text-text">
                Publicar historia
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-text">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-[0.95rem]">Escríbenos</h3>
          <ul className="text-text-muted grid gap-2 text-[0.9rem]">
            <li>escarabajonews@gmail.com (falso)</li>
            <li>+57 314 654 8332 (falso)</li>
            <li>Rionegro, Antioquia</li>
          </ul>
        </div>
      </div>

      <div className="page-container border-border text-text-faint flex flex-wrap justify-between gap-2 border-t py-4 text-[0.8rem]">
        <span>2026 Escarabajo News · Hecho con curiosidad</span>
        <span>Una revista de experiencias, no un sitio de noticias</span>
      </div>
    </footer>
  );
}
