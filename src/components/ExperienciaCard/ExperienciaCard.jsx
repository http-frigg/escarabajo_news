import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { useExperiencias } from "../../context/ExperienciasContext.jsx";
import styles from "./ExperienciaCard.module.css";

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
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={experiencia.imagen} alt="" loading="lazy" />
        <span className={styles.tag}>{experiencia.universo}</span>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.iconButton} ${favorito ? styles.favActive : ""}`}
            onClick={() => toggleFavorite(experiencia.id)}
            aria-pressed={favorito}
            aria-label={favorito ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            {favorito ? "♥" : "♡"}
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={handleDelete}
            aria-label="Eliminar experiencia"
            title="Eliminar"
          >
            🗑
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{experiencia.fuente}</span>
          <span>{experiencia.tiempoLectura}</span>
        </div>
        <h3 className={styles.title}>{experiencia.titulo}</h3>
        <p className={styles.summary}>{experiencia.resumen}</p>
        <Link to={`/experiencia/${experiencia.id}`} className={styles.link}>
          Ver más ↗
        </Link>
      </div>
    </article>
  );
}
