import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterPills } from "../../components/FilterPills/FilterPills.jsx";
import { ExperienciaCard } from "../../components/ExperienciaCard/ExperienciaCard.jsx";
import { useExperiencias } from "../../context/ExperienciasContext.jsx";
import styles from "./Explorar.module.css";

const universos = ["Todas", "Educación", "Tecnología", "Turismo", "Arte", "Comercio"];

export function Explorar() {
  const { experiencias } = useExperiencias();
  const [searchParams, setSearchParams] = useSearchParams();
  const [busqueda, setBusqueda] = useState("");

  const universoParam = searchParams.get("universo");
  const universoActivo = universos.includes(universoParam) ? universoParam : "Todas";

  const setUniversoActivo = (universo) => {
    if (universo === "Todas") {
      setSearchParams({});
    } else {
      setSearchParams({ universo });
    }
  };

  const resultados = useMemo(() => {
    return experiencias.filter((item) => {
      const coincideUniverso = universoActivo === "Todas" || item.universo === universoActivo;
      const coincideBusqueda =
        busqueda.trim().length === 0 ||
        item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.resumen.toLowerCase().includes(busqueda.toLowerCase());
      return coincideUniverso && coincideBusqueda;
    });
  }, [experiencias, universoActivo, busqueda]);

  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Catálogo</span>
        <h1 className={styles.title}>Conoce cada experiencia</h1>
        <p className={styles.subtitle}>
          Filtra por universo o busca por palabra. Cada tarjeta abre una historia que puedes leer
          con calma y guardar entre tus favoritas.
        </p>

        <div className={styles.controls}>
          <FilterPills options={universos} active={universoActivo} onChange={setUniversoActivo} />
          <input
            type="search"
            className={styles.search}
            placeholder="Buscar por palabra..."
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            aria-label="Buscar experiencias"
          />
        </div>

        <p className={styles.counter}>
          {resultados.length} {resultados.length === 1 ? "experiencia" : "experiencias"}
        </p>

        {resultados.length === 0 ? (
          <p className={styles.empty}>
            No encontramos experiencias con ese filtro. Prueba con otro universo o palabra.
          </p>
        ) : (
          <div className={styles.grid}>
            {resultados.map((experiencia) => (
              <ExperienciaCard key={experiencia.id} experiencia={experiencia} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
