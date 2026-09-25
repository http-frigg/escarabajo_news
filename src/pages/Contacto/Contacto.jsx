import { useState } from "react";
import { FormField } from "../../components/FormField/FormField.jsx";
import { Button } from "../../components/Button/Button.jsx";

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
      <div className="page-container">
        <span className="eyebrow">Hablemos</span>
        <h1 className="my-3 mb-4 text-[clamp(2rem,4vw,2.8rem)]">Contacto</h1>
        <p className="text-text-muted border-border mb-6 max-w-[60ch] border-b pb-6">
          ¿Tienes una idea, una historia o una pregunta? Escríbenos y te respondemos con la misma
          calma con la que hacemos la revista.
        </p>

        <div className="grid grid-cols-[1fr_1.2fr] gap-7 max-[900px]:grid-cols-1">
          <div>
            <h2 className="mb-5 text-[1.3rem]">Otras formas de encontrarnos</h2>
            <ul className="mb-5 flex flex-col gap-4">
              {canales.map((canal) => (
                <li key={canal.etiqueta} className="flex items-start gap-3">
                  <span
                    className="bg-bg-alt inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill"
                    aria-hidden="true"
                  >
                    {canal.icono}
                  </span>
                  <div>
                    <p className="text-text-faint mb-[0.15rem] text-[0.7rem] tracking-[0.08em] uppercase">
                      {canal.etiqueta}
                    </p>
                    <p>{canal.valor}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-bg-alt/70 flex flex-col gap-1 rounded-md p-4">
              <strong>Hecho con curiosidad</strong>
              <p className="text-[0.85rem] text-white/85">
                Nos tomamos el tiempo de leer cada mensaje de forma individual. Sin respuestas automáticas.
              </p>
            </div>
          </div>

          <form
            className="bg-surface border-border flex flex-col gap-4 rounded-lg border p-6"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2 className="mb-1 text-[1.2rem]">Envíanos un mensaje</h2>

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

            <Button as="button" type="submit" variant="primary" className="mt-2 w-full">
              Enviar mensaje ➤
            </Button>

            {enviado && (
              <p
                className="rounded-sm border border-[#9ee0b0]/30 bg-[#9ee0b0]/10 p-3 text-center text-[0.9rem] text-[#9ee0b0]"
                role="status"
              >
                ¡Gracias! Tu mensaje fue recibido, te responderemos pronto.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
