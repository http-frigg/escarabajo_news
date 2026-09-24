import { Link, useParams } from "react-router-dom";
import { useExperiencias } from "../../context/ExperienciasContext.jsx";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { Button } from "../../components/Button/Button.jsx";
import styles from "./Detalle.module.css";

export function Detalle() {
  const { id } = useParams();
  const { getById } = useExperiencias();
  const { isFavorite, toggleFavorite } = useFavorites();
  const experiencia = getById(id);

  if (!experiencia) {
    return (
      <section className="section">
        <div className="container">
          <p className={styles.notFound}>Esta experiencia ya no está disponible.</p>
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
      <div className={`container ${styles.container}`}>
        <Link to="/explorar" className={styles.back}>
          ← Explorar
        </Link>

        <div className={styles.headerRow}>
          <span className="eyebrow">{experiencia.universo}</span>
          <button
            type="button"
            className={`${styles.favButton} ${favorito ? styles.favActive : ""}`}
            onClick={() => toggleFavorite(experiencia.id)}
            aria-pressed={favorito}
            aria-label={favorito ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            {favorito ? "♥" : "♡"}
          </button>
        </div>

        <h1 className={styles.title}>{experiencia.titulo}</h1>
        <p className={styles.summary}>{experiencia.resumen}</p>

        <div className={styles.meta}>
          <span>{experiencia.fuente}</span>
          <span>{experiencia.tiempoLectura}</span>
        </div>

        <img src={experiencia.imagen} alt="" className={styles.image} />

        <div className={styles.body}>
          {experiencia.contenido.map((parrafo, index) => (
            <p key={index}>{parrafo}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
