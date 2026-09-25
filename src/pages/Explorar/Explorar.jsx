import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterPills } from "../../components/FilterPills/FilterPills.jsx";
import { ExperienciaCard } from "../../components/ExperienciaCard/ExperienciaCard.jsx";
import { useExperiencias } from "../../context/ExperienciasContext.jsx";

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
      <div className="page-container">
        <span className="eyebrow">Catálogo</span>
        <h1 className="my-3 mb-4 text-[clamp(2rem,4vw,2.8rem)]">Conoce cada experiencia</h1>
        <p className="text-text-muted border-border mb-6 max-w-[60ch] border-b pb-6">
          Filtra por universo o busca por palabra. Cada tarjeta abre una historia que puedes leer
          con calma y guardar entre tus favoritas.
        </p>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <FilterPills options={universos} active={universoActivo} onChange={setUniversoActivo} />
          <input
            type="search"
            className="bg-surface border-border text-text font-body focus:border-accent-pink min-w-[220px] rounded-pill border px-[1.1rem] py-[0.6rem] focus:outline-none"
            placeholder="Buscar por palabra..."
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            aria-label="Buscar experiencias"
          />
        </div>

        <p className="text-accent-pink mb-5 text-[0.85rem] font-semibold">
          {resultados.length} {resultados.length === 1 ? "experiencia" : "experiencias"}
        </p>

        {resultados.length === 0 ? (
          <p className="text-text-muted py-7 text-center">
            No encontramos experiencias con ese filtro. Prueba con otro universo o palabra.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
            {resultados.map((experiencia) => (
              <ExperienciaCard key={experiencia.id} experiencia={experiencia} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
