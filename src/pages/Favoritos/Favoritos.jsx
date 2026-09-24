import { useFavorites } from "../../context/FavoritesContext.jsx";
import { useExperiencias } from "../../context/ExperienciasContext.jsx";
import { ExperienciaCard } from "../../components/ExperienciaCard/ExperienciaCard.jsx";
import { Button } from "../../components/Button/Button.jsx";
import styles from "./Favoritos.module.css";

export function Favoritos() {
  const { favoriteIds } = useFavorites();
  const { experiencias } = useExperiencias();

  const guardadas = experiencias.filter((item) => favoriteIds.includes(item.id));

  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Tu colección</span>
        <h1 className={styles.title}>Favoritos</h1>
        <p className={styles.subtitle}>
          Las experiencias que decidiste guardar se conservan en este navegador para que siempre
          las tengas a mano.
        </p>

        {guardadas.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon} aria-hidden="true">
              💔
            </span>
            <h2>Aún no guardas ninguna experiencia</h2>
            <p>
              Toca el corazón en cualquier historia y aparecerá aquí, lista para volver a ella
              cuando quieras.
            </p>
            <Button to="/explorar" variant="primary">
              Explorar
            </Button>
          </div>
        ) : (
          <div className={styles.grid}>
            {guardadas.map((experiencia) => (
              <ExperienciaCard key={experiencia.id} experiencia={experiencia} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
