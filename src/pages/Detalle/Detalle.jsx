import { Link, useParams } from "react-router-dom";
import { useExperiencias } from "../../context/ExperienciasContext.jsx";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { Button } from "../../components/Button/Button.jsx";

export function Detalle() {
  const { id } = useParams();
  const { getById } = useExperiencias();
  const { isFavorite, toggleFavorite } = useFavorites();
  const experiencia = getById(id);

  if (!experiencia) {
    return (
      <section className="section">
        <div className="page-container">
          <p className="text-text-muted mb-4">Esta experiencia ya no está disponible.</p>
          <Button to="/explorar" variant="secondary">
            Volver a explorar
          </Button>
        </div>
      </section>
    );
  }

  const favorito = isFavorite(experiencia.id);

  return (
    <section className="section">
      <div className="page-container max-w-[760px]">
        <Link to="/explorar" className="text-text-muted hover:text-text mb-5 inline-block text-[0.85rem]">
          ← Explorar
        </Link>

        <div className="mb-3 flex items-center justify-between">
          <span className="eyebrow">{experiencia.universo}</span>
          <button
            type="button"
            className={`bg-surface inline-flex h-10 w-10 items-center justify-center rounded-pill border text-[1.2rem] ${
              favorito ? "text-accent-pink border-accent-pink" : "text-text border-border"
            }`}
            onClick={() => toggleFavorite(experiencia.id)}
            aria-pressed={favorito}
            aria-label={favorito ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            {favorito ? "♥" : "♡"}
          </button>
        </div>

        <h1 className="mb-4 text-[clamp(2rem,4vw,2.6rem)]">{experiencia.titulo}</h1>
        <p className="text-text-muted mb-4 text-[1.05rem]">{experiencia.resumen}</p>

        <div className="text-text-faint border-border mb-5 flex gap-5 border-b pb-5 text-[0.8rem]">
          <span>{experiencia.fuente}</span>
          <span>{experiencia.tiempoLectura}</span>
        </div>

        <img
          src={experiencia.imagen}
          alt=""
          className="mb-6 aspect-video w-full rounded-md object-cover"
        />

        <div className="text-text flex flex-col gap-4 text-base">
          {experiencia.contenido.map((parrafo, index) => (
            <p key={index}>{parrafo}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
