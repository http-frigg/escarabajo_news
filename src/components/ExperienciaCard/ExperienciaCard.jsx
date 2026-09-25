import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { useExperiencias } from "../../context/ExperienciasContext.jsx";

export function ExperienciaCard({ experiencia }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { deleteExperiencia } = useExperiencias();
  const favorito = isFavorite(experiencia.id);

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar "${experiencia.titulo}" del catálogo?`)) {
      deleteExperiencia(experiencia.id);
    }
  };

  return (
    <article className="flex flex-col transition-transform duration-200 hover:-translate-y-0.75">
      <div className="bg-bg relative aspect-4/3 overflow-hidden rounded-md">
        {/* absolute (not h-full/w-full in flow) so the img's own intrinsic
            ratio can never influence this flex-item wrapper's aspect-4/3 —
            see CLAUDE.md for why that combination silently breaks. */}
        <img
          src={experiencia.imagen}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="text-text absolute top-3 left-3 rounded-pill bg-[#0f0a12]/75 px-[0.7rem] py-[0.35rem] text-[0.7rem] font-bold tracking-[0.08em] uppercase">
          {experiencia.universo}
        </span>
        <div className="absolute top-3 right-3 flex flex-row gap-2">
          <button
            type="button"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-pill bg-[#0f0a12]/75 text-[1.1rem] transition-[background,color] duration-150 hover:bg-[#0f0a12]/92 ${
              favorito ? "text-accent-pink" : "text-text"
            }`}
            onClick={() => toggleFavorite(experiencia.id)}
            aria-pressed={favorito}
            aria-label={favorito ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            {favorito ? "♥" : "♡"}
          </button>
          <button
            type="button"
            className="text-text inline-flex h-9 w-9 items-center justify-center rounded-pill bg-[#0f0a12]/75 text-[1.1rem] transition-[background,color] duration-150 hover:bg-[#0f0a12]/92"
            onClick={handleDelete}
            aria-label="Eliminar experiencia"
            title="Eliminar"
          >
            🗑
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 pt-4">
        <div className="text-text-faint flex justify-between gap-2 text-[0.78rem]">
          <span className="min-w-0 truncate">{experiencia.fuente}</span>
          <span className="shrink-0 whitespace-nowrap">{experiencia.tiempoLectura}</span>
        </div>
        <h3 className="line-clamp-2 min-h-[2.75em] text-[1.15rem] leading-snug">{experiencia.titulo}</h3>
        <p className="text-text-muted line-clamp-3 min-h-[4.9em] flex-1 text-[0.9rem] leading-relaxed">
          {experiencia.resumen}
        </p>
        <Link to={`/experiencia/${experiencia.id}`} className="text-accent-pink mt-2 text-[0.85rem] font-semibold">
          Ver más ↗
        </Link>
      </div>
    </article>
  );
}
