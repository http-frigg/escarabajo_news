import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button.jsx";
import { ExperienciaCard } from "../../components/ExperienciaCard/ExperienciaCard.jsx";
import { useExperiencias } from "../../context/ExperienciasContext.jsx";
import sumapaz from "../../assets/sumapaz.png";
import beetleFigure from "../../assets/beetle-figure-2.png";

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
      <section className="section pt-8">
        <div className="page-container grid grid-cols-[1.1fr_0.9fr] items-center gap-7 max-[900px]:grid-cols-1">
          <div>
            <span className="eyebrow">Colección de experiencias</span>
            <h1 className="my-4 mb-5 text-[clamp(2.4rem,5vw,3.4rem)]">
              Historias para <em className="text-accent-pink italic">vivir</em>, no solo para leer.
            </h1>
            <p className="text-text-muted mb-5 max-w-[46ch]">
              Escarabajo News es tu rincón para descubrir planes, ideas tech, viajes y negocios
              locales contados sin afán. Pásate por las historias, guarda las que te enganchen y
              arma tu propia colección.
            </p>
            <div className="mb-6 flex flex-wrap gap-3">
              <Button to="/explorar" variant="secondary">
                Explorar experiencias
              </Button>
              <Button to="/crear" variant="primary">
                Publica la tuya
              </Button>
            </div>

            <div className="flex flex-nowrap gap-4 sm:gap-6">
              <div className="flex min-w-0 flex-col gap-1">
                <strong className="font-heading text-[clamp(1.4rem,6vw,2.8rem)]">5</strong>
                <span className="text-text-faint text-[clamp(0.6rem,2.2vw,0.75rem)] tracking-[0.06em] whitespace-nowrap uppercase">
                  Universos
                </span>
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <strong className="font-heading text-[clamp(1.4rem,6vw,2.8rem)]">100%</strong>
                <span className="text-text-faint text-[clamp(0.6rem,2.2vw,0.75rem)] tracking-[0.06em] whitespace-nowrap uppercase">
                  Sin titulares de alarma
                </span>
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <strong className="font-heading text-[clamp(1.4rem,6vw,2.8rem)]">∞</strong>
                <span className="text-text-faint text-[clamp(0.6rem,2.2vw,0.75rem)] tracking-[0.06em] whitespace-nowrap uppercase">
                  Favoritos por guardar
                </span>
              </div>
            </div>
          </div>

          <div className="shadow-card relative overflow-hidden rounded-lg">
            <img src={sumapaz} alt="Páramo de Sumapaz" className="aspect-4/5 h-full w-full object-cover" />
            <span className="absolute bottom-4 left-4 rounded-pill bg-[#0f0a12]/75 px-[0.9rem] py-[0.4rem] text-xs tracking-[0.06em] uppercase">
              Páramo de Sumapaz
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-container">
          <div className="mb-6 flex flex-nowrap items-end justify-between gap-4">
            <div className="min-w-0 flex-1">
              <span className="eyebrow">Destacadas</span>
              <h2 className="my-3 mb-6 text-[clamp(1.6rem,3vw,2.1rem)]">Lo que vale la pena leer despacio</h2>
            </div>
            <Link
              to="/explorar"
              className="text-accent-pink shrink-0 text-[0.9rem] font-semibold whitespace-nowrap"
            >
              Ver todas →
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
            {destacadas.map((experiencia) => (
              <ExperienciaCard key={experiencia.id} experiencia={experiencia} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="page-container">
          <span className="eyebrow">Cinco universos</span>
          <h2 className="my-3 mb-6 text-[clamp(1.6rem,3vw,2.1rem)]">Elige por dónde empezar a explorar</h2>

          <div className="grid grid-cols-5 gap-4 max-[900px]:grid-cols-3 max-sm:grid-cols-2">
            {universos.map((universo) => (
              <Link
                key={universo.nombre}
                to={`/explorar?universo=${encodeURIComponent(universo.nombre)}`}
                className="bg-surface border-border hover:border-accent-lilac flex flex-col gap-2 rounded-md border p-5 transition-[border-color,transform] duration-150 hover:-translate-y-0.5"
              >
                <span className="font-heading text-[1.1rem]">{universo.nombre}</span>
                <span className="text-text-muted text-[0.85rem]">{universo.descripcion}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-container">
          <span className="eyebrow">Voces</span>
          <h2 className="my-3 mb-6 text-[clamp(1.6rem,3vw,2.1rem)]">Quienes ya cambiaron su forma de leer</h2>

          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
            {testimonios.map((testimonio) => (
              <blockquote
                key={testimonio.autor}
                className="bg-surface border-border m-0 flex flex-col gap-3 rounded-md border p-5"
              >
                <p className="font-heading text-accent-pink text-[2rem] leading-none" aria-hidden="true">
                  “”
                </p>
                <p>{testimonio.cita}</p>
                <footer className="text-text-faint flex flex-col text-[0.85rem]">
                  <strong className="text-text">{testimonio.autor}</strong>
                  <span>{testimonio.rol}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-container">
          <div className="bg-surface relative overflow-hidden rounded-lg p-7">
            <img
              src={beetleFigure}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 h-[85%] max-w-none translate-x-[15%] translate-y-[-20%] opacity-20"
            />
            <div className="relative">
              <h2 className="mb-3 text-[clamp(1.6rem,3vw,2.2rem)]">¿Tienes una experiencia que merece contarse?</h2>
              <p className="text-text-muted mb-5 max-w-[52ch]">
                Comparte tu historia, guárdala entre tus favoritas o escríbenos. Escarabajo News se
                construye con la curiosidad de todos.
              </p>
              <Button to="/crear" variant="ghost">
                Crear una historia
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
