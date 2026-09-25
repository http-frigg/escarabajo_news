# Escarabajo News

Prototipo funcional construido con React + Vite.

## Requisitos

- Node.js 20+

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Build de producción

```bash
npm run build
npm run preview
```

## Funcionalidades

- Renderizado dinámico de experiencias desde `src/data/experiencias.json`.
- Favoritos persistidos en `localStorage`.
- Mini-CRUD: crear historias (con imagen de portada) y eliminar experiencias existentes.
- Filtro por universo + búsqueda en el catálogo (`/explorar`).
- Formularios con validación en `/contacto` y `/crear`.
