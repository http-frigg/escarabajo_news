# Escarabajo News

React + Vite prototype for **Entrega 2** of the Politécnico Grancolombiano Frontend module. A "revista de experiencias" (not a news site) organized into 5 "universos": Educación, Tecnología, Arte, Turismo, Comercio.

## Why React (not vanilla HTML/CSS/JS)

The module's official grading brief ("Orientaciones para las entregas") lists HTML/CSS/JS for Entrega 2 and reserves Angular for Entrega 3, but also allows "frameworks o librerías tratadas en el Módulo" — the user confirmed React/Vite were covered and chose to build with them on that basis. Don't "fix" this back to vanilla JS; it's a deliberate, informed choice.

## Commands

```bash
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build
npm run lint      # oxlint
npm run preview  # preview the production build
```

No test suite exists. Verify changes by running the app in a browser and clicking through the affected flow.

## Architecture

- **Routing**: `react-router-dom`, all routes declared in [src/App.jsx](src/App.jsx) — `/`, `/explorar`, `/experiencia/:id`, `/favoritos`, `/contacto`, `/crear`.
- **Styling**: plain CSS, no framework. [src/styles/tokens.css](src/styles/tokens.css) holds design tokens (colors, fonts, spacing) as CSS custom properties; [src/styles/global.css](src/styles/global.css) has resets and shared classes (`.container`, `.section`, `.eyebrow`). Every component/page also has its own CSS Module (`*.module.css`) — keep that pattern for new components rather than global classes or inline styles.
- **State**: two React Context providers wrap the app in `App.jsx`, both backed by the [useLocalStorage](src/hooks/useLocalStorage.js) hook:
  - [FavoritesContext](src/context/FavoritesContext.jsx) — array of favorited experience IDs (`localStorage` key `escarabajo:favoritos`).
  - [ExperienciasContext](src/context/ExperienciasContext.jsx) — merges the seed dataset with user-created stories and applies soft-deletes. See below.
- **Data model**: seed data lives in [src/data/experiencias.json](src/data/experiencias.json) (static, shipped with the app). At runtime, `ExperienciasContext` computes the working list as: `[...seedData, ...creadas].filter(not in eliminadasIds)`.
  - `escarabajo:creadas` (localStorage) — stories added via `/crear`. Deleting one of these removes it outright.
  - `escarabajo:eliminadas` (localStorage) — IDs of **seed** items the user deleted. Since seed data can't be mutated, deletion is a soft-delete: the ID is added to this exclusion list. A seed item's favorite ID can be orphaned this way (stays in `escarabajo:favoritos` but is filtered out of the visible list) — this is expected, not a bug.
- **Images**: seed items hotlink royalty-free Unsplash URLs. User-created stories convert an uploaded file to a base64 data URL via `FileReader` in [src/pages/Crear/Crear.jsx](src/pages/Crear/Crear.jsx) (no backend exists, so this is the only way to persist an uploaded image).

## Conventions

- Spanish for all user-facing text, comments/code in English-as-usual (i.e. normal JS conventions).
- Components are folders under `src/components/<Name>/` with `<Name>.jsx` + `<Name>.module.css`; same pattern for `src/pages/<Name>/`.
- Reuse [ExperienciaCard](src/components/ExperienciaCard/ExperienciaCard.jsx), [Button](src/components/Button/Button.jsx), and [FormField](src/components/FormField/FormField.jsx) rather than hand-rolling cards/buttons/inputs — they're used identically across Home, Explorar, Favoritos, Contacto and Crear.
- Deleting an experience goes through `window.confirm` before calling `deleteExperiencia` (see `ExperienciaCard.jsx`) — keep that guard on any new delete entry point.

## Known quirks (not app bugs)

The Claude Browser pane used during development had an intermittent stale-screenshot issue (a screenshot taken right after a scroll/navigation/click sometimes rendered the *previous* state). Verified via DOM/`getComputedStyle`/`localStorage` inspection each time — the app itself was always correct. If a screenshot ever looks broken (blank section, wrong page), take a second screenshot before assuming there's a real bug.

## Not yet done

- No GitHub remote has been pushed (local git repo only, one commit as of the initial scaffold).
- No automated tests.
