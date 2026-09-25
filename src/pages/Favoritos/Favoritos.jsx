import { useFavorites } from "../../context/FavoritesContext.jsx";
import { useExperiencias } from "../../context/ExperienciasContext.jsx";
import { ExperienciaCard } from "../../components/ExperienciaCard/ExperienciaCard.jsx";
import { Button } from "../../components/Button/Button.jsx";

export function Favoritos() {
  const { favoriteIds } = useFavorites();
  const { experiencias } = useExperiencias();

  const guardadas = experiencias.filter((item) => favoriteIds.includes(item.id));

  return (
    <section className="section">
      <div className="page-container">
        <span className="eyebrow">Tu colección</span>
        <h1 className="my-3 mb-4 text-[clamp(2rem,4vw,2.8rem)]">Favoritos</h1>
        <p className="text-text-muted mb-6 max-w-[60ch]">
          Las experiencias que decidiste guardar se conservan en este navegador para que siempre
          las tengas a mano.
        </p>

        {guardadas.length === 0 ? (
          <div className="border-border mx-auto flex max-w-[520px] flex-col items-center gap-3 rounded-lg border px-5 py-8 text-center">
            <span
              className="bg-bg-alt text-accent-pink mb-2 inline-flex h-14 w-14 items-center justify-center rounded-pill"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6">
                <path
                  fill="currentColor"
                  d="M12 21S3 15.28 3 9.5C3 6.42 5.42 4 8.5 4c1.74 0 3.41.86 4.5 2.19C14.09 4.86 15.76 4 17.5 4 20.58 4 23 6.42 23 9.5 23 15.28 12 21 12 21z"
                />
                <path fill="var(--color-bg-alt)" d="m13 6-2.5 4.5 2 2-2 4.5L13 21l-1-5.5 2-3-2-2z" />
              </svg>
            </span>
            <h2>Aún no guardas ninguna experiencia</h2>
            <p className="text-text-muted mb-2">
              Toca el corazón en cualquier historia y aparecerá aquí, lista para volver a ella
              cuando quieras.
            </p>
            <Button to="/explorar" variant="primary">
              Explorar
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
            {guardadas.map((experiencia) => (
              <ExperienciaCard key={experiencia.id} experiencia={experiencia} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
