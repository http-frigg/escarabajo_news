import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import semillaExperiencias from "../data/experiencias.json";

const ExperienciasContext = createContext(null);

function generarId(titulo) {
  const base = titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "historia"}-${Date.now()}`;
}

export function ExperienciasProvider({ children }) {
  const [creadas, setCreadas] = useLocalStorage("escarabajo:creadas", []);
  const [eliminadasIds, setEliminadasIds] = useLocalStorage("escarabajo:eliminadas", []);

  const value = useMemo(() => {
    const eliminadasSet = new Set(eliminadasIds);
    const experiencias = [...semillaExperiencias, ...creadas].filter(
      (item) => !eliminadasSet.has(item.id)
    );

    const getById = (id) => experiencias.find((item) => item.id === id);

    const addExperiencia = (datos) => {
      const nueva = {
        id: generarId(datos.titulo),
        universo: datos.universo,
        fuente: datos.autor,
        tiempoLectura: "Recién publicada",
        titulo: datos.titulo,
        resumen: datos.resumen,
        imagen: datos.imagen,
        contenido: [datos.contenido],
        creadaPorUsuario: true,
      };
      setCreadas((current) => [nueva, ...current]);
      return nueva.id;
    };

    const deleteExperiencia = (id) => {
      const esCreada = creadas.some((item) => item.id === id);
      if (esCreada) {
        setCreadas((current) => current.filter((item) => item.id !== id));
      } else {
        setEliminadasIds((current) => (current.includes(id) ? current : [...current, id]));
      }
    };

    return { experiencias, getById, addExperiencia, deleteExperiencia };
  }, [creadas, eliminadasIds, setCreadas, setEliminadasIds]);

  return <ExperienciasContext.Provider value={value}>{children}</ExperienciasContext.Provider>;
}

export function useExperiencias() {
  const context = useContext(ExperienciasContext);
  if (!context) {
    throw new Error("useExperiencias must be used within an ExperienciasProvider");
  }
  return context;
}
