import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../components/FormField/FormField.jsx";
import { Button } from "../../components/Button/Button.jsx";
import { useExperiencias } from "../../context/ExperienciasContext.jsx";

const initialValues = {
  titulo: "",
  autor: "",
  universo: "",
  resumen: "",
  contenido: "",
};

const universos = ["Educación", "Tecnología", "Arte", "Turismo", "Comercio"];

const consejos = [
  {
    titulo: "Sé auténtico",
    texto: "Cuenta la experiencia con tus propias palabras y detalles reales.",
  },
  {
    titulo: "Usa buenas imágenes",
    texto: "Una foto nítida ayuda a que tu historia enganche desde el inicio.",
  },
  {
    titulo: "Revisamos cada historia",
    texto: "Leemos cada propuesta antes de publicarla, así que cuéntanos bien tu idea.",
  },
];

function validar(values, imagen) {
  const errors = {};
  if (!values.titulo.trim()) errors.titulo = "El título es obligatorio.";
  if (!values.autor.trim()) errors.autor = "Cuéntanos quién firma la historia.";
  if (!values.universo) errors.universo = "Elige un universo.";
  if (!values.resumen.trim()) errors.resumen = "Escribe una línea que resuma tu historia.";
  if (!values.contenido.trim()) errors.contenido = "El contenido completo es obligatorio.";
  if (!imagen) errors.imagen = "Sube una imagen de portada (PNG o JPG).";
  return errors;
}

export function Crear() {
  const navigate = useNavigate();
  const { addExperiencia } = useExperiencias();

  const [values, setValues] = useState(initialValues);
  const [imagen, setImagen] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleImagen = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((current) => ({ ...current, imagen: "La imagen debe pesar máximo 5MB." }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagen(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validar(values, imagen);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      const nuevoId = addExperiencia({ ...values, imagen });
      navigate(`/experiencia/${nuevoId}`);
    }
  };

  return (
    <section className="section">
      <div className="page-container">
        <span className="eyebrow">Comparte</span>
        <h1 className="my-3 mb-4 text-[clamp(2rem,4vw,2.8rem)]">Crear historia</h1>
        <p className="text-text-muted border-border mb-6 max-w-[60ch] border-b pb-6">
          ¿Tienes una experiencia que merece contarse? Cuéntala aquí y compártela con la
          comunidad de Escarabajo News.
        </p>

        <div className="grid grid-cols-[1fr_1.2fr] gap-7 max-[900px]:grid-cols-1">
          <div>
            <h2 className="mb-4 text-[1.2rem]">Antes de publicar</h2>
            <div className="mb-4 flex flex-col gap-3">
              {consejos.map((consejo) => (
                <div key={consejo.titulo}>
                  <p className="text-accent-pink mb-[0.2rem] text-xs font-bold tracking-[0.06em] uppercase">
                    {consejo.titulo}
                  </p>
                  <p className="text-text-muted text-[0.9rem]">{consejo.texto}</p>
                </div>
              ))}
            </div>
            <div className="bg-bg-alt/70 rounded-md p-4">
              <strong>¿Tienes dudas?</strong>
              <p className="mt-[0.2rem] text-[0.85rem] text-white/85">
                Escríbenos a escarabajonews@gmail.com y te ayudamos a armar tu historia.
              </p>
            </div>
          </div>

          <form
            className="bg-surface border-border flex flex-col gap-4 rounded-lg border p-6"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2 className="text-[1.2rem]">Cuéntanos tu historia</h2>

            <FormField
              label="Título de la historia"
              name="titulo"
              value={values.titulo}
              onChange={handleChange}
              error={errors.titulo}
              placeholder="Ej. Un fin de semana en el páramo de Sumapaz"
            />

            <FormField
              label="Autor"
              name="autor"
              value={values.autor}
              onChange={handleChange}
              error={errors.autor}
              placeholder="Tu nombre o seudónimo"
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="universo" className="text-text-muted text-[0.85rem] font-semibold">
                Universo
              </label>
              <select
                id="universo"
                name="universo"
                value={values.universo}
                onChange={handleChange}
                className="bg-bg border-border text-text font-body focus:border-accent-pink rounded-sm border px-4 py-3 text-[0.95rem] focus:outline-none"
              >
                <option value="">Elige un universo...</option>
                {universos.map((universo) => (
                  <option key={universo} value={universo}>
                    {universo}
                  </option>
                ))}
              </select>
              {errors.universo && <p className="text-[0.8rem] text-[#f0a8a8]">{errors.universo}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="imagen" className="text-text-muted text-[0.85rem] font-semibold">
                Imagen de portada
              </label>
              <label
                htmlFor="imagen"
                className="border-border hover:border-accent-pink text-text-faint flex min-h-35 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed p-4 text-center text-[0.85rem] transition-colors duration-150"
              >
                {imagen ? (
                  <img
                    src={imagen}
                    alt="Previsualización de la imagen de portada"
                    className="max-h-40 rounded-sm object-cover"
                  />
                ) : (
                  <>
                    <span className="text-accent-pink text-2xl" aria-hidden="true">
                      +
                    </span>
                    <span>Arrastra una imagen o haz clic para subir (PNG o JPG, máx. 5MB)</span>
                  </>
                )}
              </label>
              <input
                id="imagen"
                name="imagen"
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleImagen}
                className="sr-only"
              />
              {errors.imagen && <p className="text-[0.8rem] text-[#f0a8a8]">{errors.imagen}</p>}
            </div>

            <FormField
              label="Resumen breve"
              name="resumen"
              value={values.resumen}
              onChange={handleChange}
              error={errors.resumen}
              placeholder="Una línea que resuma tu historia"
            />

            <FormField
              label="Contenido completo"
              name="contenido"
              as="textarea"
              rows={6}
              value={values.contenido}
              onChange={handleChange}
              error={errors.contenido}
              placeholder="Escribe aquí el cuerpo de tu historia, con el detalle que quieras compartir."
            />

            <Button as="button" type="submit" variant="primary" className="mt-2 w-full">
              Publicar historia ➤
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
