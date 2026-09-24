import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../components/FormField/FormField.jsx";
import { Button } from "../../components/Button/Button.jsx";
import { useExperiencias } from "../../context/ExperienciasContext.jsx";
import styles from "./Crear.module.css";

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
      <div className={`container ${styles.container}`}>
        <span className="eyebrow">Comparte</span>
        <h1 className={styles.title}>Crear historia</h1>
        <p className={styles.subtitle}>
          ¿Tienes una experiencia que merece contarse? Cuéntala aquí y compártela con la
          comunidad de Escarabajo News.
        </p>

        <div className={styles.tips}>
          <h2 className={styles.tipsTitle}>Antes de publicar</h2>
          <div className={styles.tipsGrid}>
            {consejos.map((consejo) => (
              <div key={consejo.titulo}>
                <p className={styles.tipLabel}>{consejo.titulo}</p>
                <p>{consejo.texto}</p>
              </div>
            ))}
          </div>
          <div className={styles.dudas}>
            <strong>¿Tienes dudas?</strong>
            <p>Escríbenos a escarabajonews@gmail.com y te ayudamos a armar tu historia.</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <h2 className={styles.formTitle}>Cuéntanos tu historia</h2>

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

          <div className={styles.field}>
            <label htmlFor="universo">Universo</label>
            <select
              id="universo"
              name="universo"
              value={values.universo}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Elige un universo...</option>
              {universos.map((universo) => (
                <option key={universo} value={universo}>
                  {universo}
                </option>
              ))}
            </select>
            {errors.universo && <p className={styles.error}>{errors.universo}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="imagen">Imagen de portada</label>
            <label htmlFor="imagen" className={styles.dropzone}>
              {imagen ? (
                <img src={imagen} alt="Previsualización de la imagen de portada" />
              ) : (
                <>
                  <span aria-hidden="true">+</span>
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
              className={styles.fileInput}
            />
            {errors.imagen && <p className={styles.error}>{errors.imagen}</p>}
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

          <Button as="button" type="submit" variant="primary" className={styles.submit}>
            Publicar historia ➤
          </Button>
        </form>
      </div>
    </section>
  );
}
