import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button.jsx";
import { ExperienciaCard } from "../../components/ExperienciaCard/ExperienciaCard.jsx";
import { useExperiencias } from "../../context/ExperienciasContext.jsx";
import styles from "./Home.module.css";

const universos = [
  { nombre: "Educación", descripcion: "Ideas que enseñan" },
  { nombre: "Tecnología", descripcion: "Lo que viene" },
  { nombre: "Arte", descripcion: "Por tu bienestar" },
  { nombre: "Turismo", descripcion: "Lugares por sentir" },
  { nombre: "Comercio", descripcion: "Historias de oficio" },
];

const testimonios = [
  {
    cita:
      "Me encanta que las historias no sean titulares de alarma, sino experiencias que dejan tiempo para pensar.",
    autor: "Lucía Gómez",
    rol: "Lectora desde Bogotá",
  },
  {
    cita: "La forma en que organizan los universos me ayuda a encontrar temas que no sabía que quería leer.",
    autor: "Mateo Ríos",
    rol: "Explorador de tecnología",
  },
  {
    cita:
      "Guardo historias para el fin de semana y siempre encuentro una recomendación que vale la pena compartir.",
    autor: "Sofía Pérez",
    rol: "Viajera y lectora local",
  },
];

export function Home() {
  const { experiencias } = useExperiencias();
  const destacadas = experiencias.slice(0, 3);

  return (
    <>
      <section className={`section ${styles.hero}`}>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <span className="eyebrow">Colección de experiencias</span>
            <h1 className={styles.heroTitle}>
              Historias para <em>vivir</em>, no solo para leer.
            </h1>
            <p className={styles.heroText}>
              Escarabajo News es tu rincón para descubrir planes, ideas tech, viajes y negocios
              locales contados sin afán. Pásate por las historias, guarda las que te enganchen y
              arma tu propia colección.
            </p>
            <div className={styles.heroActions}>
              <Button to="/explorar" variant="secondary">
                Explorar experiencias
              </Button>
              <Button to="/crear" variant="primary">
                Publica la tuya
              </Button>
            </div>

            <div className={styles.stats}>
              <div>
                <strong>5</strong>
                <span>Universos</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Sin titulares de alarma</span>
              </div>
              <div>
                <strong>∞</strong>
                <span>Favoritos por guardar</span>
              </div>
            </div>
          </div>

          <div className={styles.heroImageWrap}>
            <img
              src="https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=900&q=80"
              alt="Páramo de Sumapaz"
            />
            <span className={styles.heroImageCaption}>Páramo de Sumapaz</span>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className="eyebrow">Destacadas</span>
              <h2>Lo que vale la pena leer despacio</h2>
            </div>
            <Link to="/explorar" className={styles.viewAll}>
              Ver todas →
            </Link>
          </div>

          <div className={styles.cardGrid}>
            {destacadas.map((experiencia) => (
              <ExperienciaCard key={experiencia.id} experiencia={experiencia} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Cinco universos</span>
          <h2 className={styles.sectionTitle}>Elige por dónde empezar a explorar</h2>

          <div className={styles.universoGrid}>
            {universos.map((universo) => (
              <Link
                key={universo.nombre}
                to={`/explorar?universo=${encodeURIComponent(universo.nombre)}`}
                className={styles.universoTile}
              >
                <span className={styles.universoNombre}>{universo.nombre}</span>
                <span className={styles.universoDescripcion}>{universo.descripcion}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <span className="eyebrow">Voces</span>
          <h2 className={styles.sectionTitle}>Quienes ya cambiaron su forma de leer</h2>

          <div className={styles.testimonioGrid}>
            {testimonios.map((testimonio) => (
              <blockquote key={testimonio.autor} className={styles.testimonio}>
                <p className={styles.testimonioMark} aria-hidden="true">
                  “”
                </p>
                <p>{testimonio.cita}</p>
                <footer>
                  <strong>{testimonio.autor}</strong>
                  <span>{testimonio.rol}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.ctaBanner}`}>
          <div>
            <h2>¿Tienes una experiencia que merece contarse?</h2>
            <p>
              Comparte tu historia, guárdala entre tus favoritas o escríbenos. Escarabajo News se
              construye con la curiosidad de todos.
            </p>
            <Button to="/crear" variant="primary">
              Crear una historia
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
