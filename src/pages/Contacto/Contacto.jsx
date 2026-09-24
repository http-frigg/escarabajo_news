import { useState } from "react";
import { FormField } from "../../components/FormField/FormField.jsx";
import { Button } from "../../components/Button/Button.jsx";
import styles from "./Contacto.module.css";

const initialValues = { nombre: "", correo: "", mensaje: "" };

const canales = [
  { icono: "✉", etiqueta: "Correo electrónico", valor: "escarabajonews@gmail.com" },
  { icono: "☎", etiqueta: "Teléfono", valor: "+57 314 654 8332" },
  { icono: "📍", etiqueta: "Estudio", valor: "Rionegro, Antioquia" },
];

function validar(values) {
  const errors = {};

  if (!values.nombre.trim()) {
    errors.nombre = "Cuéntanos cómo te llamas.";
  }

  if (!values.correo.trim()) {
    errors.correo = "El correo electrónico es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo)) {
    errors.correo = "Ingresa un correo electrónico válido.";
  }

  if (!values.mensaje.trim()) {
    errors.mensaje = "Escríbenos tu idea, pregunta o experiencia.";
  }

  return errors;
}

export function Contacto() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validar(values);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      setEnviado(true);
      setValues(initialValues);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Hablemos</span>
        <h1 className={styles.title}>Contacto</h1>
        <p className={styles.subtitle}>
          ¿Tienes una idea, una historia o una pregunta? Escríbenos y te respondemos con la misma
          calma con la que hacemos la revista.
        </p>

        <div className={styles.grid}>
          <div>
            <h2 className={styles.asideTitle}>Otras formas de encontrarnos</h2>
            <ul className={styles.channelList}>
              {canales.map((canal) => (
                <li key={canal.etiqueta}>
                  <span aria-hidden="true">{canal.icono}</span>
                  <div>
                    <p className={styles.channelLabel}>{canal.etiqueta}</p>
                    <p>{canal.valor}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.note}>
              <strong>Hecho con curiosidad</strong>
              <p>Nos tomamos el tiempo de leer cada mensaje de forma individual. Sin respuestas automáticas.</p>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h2 className={styles.formTitle}>Envíanos un mensaje</h2>

            <FormField
              label="Nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              error={errors.nombre}
              placeholder="¿Cómo te llamas?"
            />
            <FormField
              label="Correo electrónico"
              name="correo"
              type="email"
              value={values.correo}
              onChange={handleChange}
              error={errors.correo}
              placeholder="correo@ejemplo.com"
            />
            <FormField
              label="Mensaje"
              name="mensaje"
              as="textarea"
              rows={5}
              value={values.mensaje}
              onChange={handleChange}
              error={errors.mensaje}
              placeholder="Escríbenos tu idea, pregunta o experiencia..."
            />

            <Button as="button" type="submit" variant="primary" className={styles.submit}>
              Enviar mensaje ➤
            </Button>

            {enviado && (
              <p className={styles.confirmation} role="status">
                ¡Gracias! Tu mensaje fue recibido, te responderemos pronto.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
