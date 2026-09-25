# Escarabajo News

React + Vite prototype for the Politécnico Grancolombiano Frontend module. A "revista de experiencias" organized into 5 "universos": Educación, Tecnología, Arte, Turismo, Comercio.

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
- **Styling**: Tailwind v4, via `@tailwindcss/vite` (no PostCSS config, no `tailwind.config.js` — v4 is CSS-first). [src/styles/tokens.css](src/styles/tokens.css) is a Tailwind `@theme` block that defines the design tokens (colors, fonts, a spacing-scale override, radii, shadow) as theme variables, which is what makes utilities like `bg-bg`, `text-accent-pink`, `font-heading`, and `rounded-pill` exist. [src/styles/global.css](src/styles/global.css) does `@import "tailwindcss"` + `@import "./tokens.css"`, true resets (`body`, `#root`), and three shared classes — `.page-container`, `.section`, `.eyebrow` — wrapped in `@layer components`. Components/pages style everything with inline Tailwind `className` utilities; there are no more `*.module.css` files. Two gotchas worth knowing before touching this again:
  - The shared class is `.page-container`, not `.container` — Tailwind v4 ships its own built-in `.container` utility, and naming ours the same silently loses to it (it lives in the later `utilities` layer). `.page-container`/`.section`/`.eyebrow` are deliberately inside `@layer components` specifically so a page-specific override utility (e.g. `max-w-[760px]` added next to `page-container` on Detalle/Crear) still wins.
  - Never split one CSS property across a base string and a conditional override, e.g. `` `${base} ${active ? "border-accent-pink" : ""}` `` where `base` already contains `border-transparent`. Two same-layer Tailwind utilities on the same property race on generation order, not on className string order — this bit `Button`, `ExperienciaCard`'s favorite toggle, `Detalle`'s favorite toggle, and `FormField`'s error state during the CSS Modules → Tailwind migration. Always make the ternary return the *entire* variant string (all of that property's classes), never mix a static class with a conditional one for the same property. Variant-prefixed utilities (`hover:`, `focus:`) are exempt — Tailwind guarantees those always win over the unprefixed utility regardless of order.
  - Any bare/unlayered CSS rule (not inside `@theme`/`@layer base`/`@layer components`/`@layer utilities`) always beats a Tailwind utility class in the cascade, regardless of source order — this is the same "unlayered beats layered" gotcha as above but for `global.css`'s own resets: a plain `p { margin: 0 }` was silently cancelling every `mb-*`/`mt-*` on every `<p>` in the app until it got moved into `@layer base`. Every reset in `global.css` now lives inside `@layer base` for exactly this reason — don't add a new bare rule there.
  - `ExperienciaCard`'s image wrapper (`<div className="... aspect-[4/3]">`) needs its `<img>` positioned `absolute inset-0` (not `h-full w-full` while still in normal flow). The wrapper is a flex item (`article` is `flex flex-col`) with `flex-basis: auto`; if the `<img>` stays in-flow and its natural intrinsic ratio differs from the wrapper's specified `aspect-[4/3]` (e.g. a square 900×900 source image vs. the rest of the seed data's ~4:3/16:9 images), the browser can let that descendant's intrinsic ratio influence the flex item's auto sizing and silently override the wrapper's own aspect-ratio — one card would render as a square instead of 4:3. Taking the `<img>` out of flow with `absolute inset-0` removes it from that sizing calculation entirely. If you add a new aspect-ratio'd image wrapper anywhere, use this same pattern (`relative` wrapper + `aspect-[…]`, `absolute inset-0 object-cover` image), not `h-full w-full` in flow.
  - `ExperienciaCard` also reserves fixed vertical space for the title (`line-clamp-2 min-h-[2.75em] leading-snug`) and the summary (`line-clamp-3 min-h-[4.9em] leading-relaxed`), and truncates `fuente` (`min-w-0 truncate` on a `flex-1` span, with `tiempoLectura` as `shrink-0 whitespace-nowrap`) — otherwise cards with shorter titles/summaries/source names end up visibly shorter than their neighbors in the same grid row. If you touch this card's markup, keep all three (image, title, summary) at a fixed reserved size; `line-clamp-*` alone only caps the *maximum*, it doesn't reserve a minimum.
- **State**: two React Context providers wrap the app in `App.jsx`, both backed by the [useLocalStorage](src/hooks/useLocalStorage.js) hook:
  - [FavoritesContext](src/context/FavoritesContext.jsx) — array of favorited experience IDs (`localStorage` key `escarabajo:favoritos`).
  - [ExperienciasContext](src/context/ExperienciasContext.jsx) — merges the seed dataset with user-created stories and applies soft-deletes. See below.
- **Data model**: seed data lives in [src/data/experiencias.json](src/data/experiencias.json) (static, shipped with the app). At runtime, `ExperienciasContext` computes the working list as: `[...seedData, ...creadas].filter(not in eliminadasIds)`.
  - `escarabajo:creadas` (localStorage) — stories added via `/crear`. Deleting one of these removes it outright.
  - `escarabajo:eliminadas` (localStorage) — IDs of **seed** items the user deleted. Since seed data can't be mutated, deletion is a soft-delete: the ID is added to this exclusion list. A seed item's favorite ID can be orphaned this way (stays in `escarabajo:favoritos` but is filtered out of the visible list) — this is expected, not a bug.
- **Images**: seed items hotlink royalty-free Unsplash URLs. User-created stories convert an uploaded file to a base64 data URL via `FileReader` in [src/pages/Crear/Crear.jsx](src/pages/Crear/Crear.jsx) (no backend exists, so this is the only way to persist an uploaded image).

## Conventions

- Spanish for all user-facing text, comments/code in English-as-usual (i.e. normal JS conventions).
- Components are folders under `src/components/<Name>/` with a single `<Name>.jsx` (styled with Tailwind utility classes, no separate stylesheet); same pattern for `src/pages/<Name>/`.
- Reuse [ExperienciaCard](src/components/ExperienciaCard/ExperienciaCard.jsx), [Button](src/components/Button/Button.jsx), and [FormField](src/components/FormField/FormField.jsx) rather than hand-rolling cards/buttons/inputs — they're used identically across Home, Explorar, Favoritos, Contacto and Crear.
- Deleting an experience goes through `window.confirm` before calling `deleteExperiencia` (see `ExperienciaCard.jsx`) — keep that guard on any new delete entry point.

## Known quirks (not app bugs)

The Claude Browser pane used during development had an intermittent stale-screenshot issue (a screenshot taken right after a scroll/navigation/click sometimes rendered the _previous_ state). Verified via DOM/`getComputedStyle`/`localStorage` inspection each time — the app itself was always correct. If a screenshot ever looks broken (blank section, wrong page), take a second screenshot before assuming there's a real bug.

## Figma fidelity check (2026-09-24)

Pixel-sampled the actual Figma header export (before hitting the Starter plan's Figma MCP rate limit) and compared against the live app. Findings, already fixed:
- `--color-footer` (header/footer background) was `#2c2035`, Figma's real value is `#3c2d3e` — corrected in [tokens.css](src/styles/tokens.css).
- Logo/avatar were a 🪲 emoji + filled lilac circle with a 👤 emoji. Figma uses an actual illustrated beetle icon and a **stacked two-line wordmark** ("Escarabajo" bold, "News" italic smaller below-right) plus an **outlined** (not filled) avatar circle. The real icon — [src/assets/logo.png](src/assets/logo.png) — came from the user directly (`C:\Users\Nico\Desktop\Universidad\img\logo.png`), not a Figma export; it's now used in both `Header` and `Footer`.
- Nav links (`Inicio`/`Explorar`/…) were the sans-serif body font; Figma uses the serif heading font — `Header`'s nav `<ul>` now has `font-heading`.

**Not re-verified** (Figma API was rate-limited before I got to these): `--color-bg`, `--color-bg-alt`, `--color-surface`, `--color-accent-pink`/`-strong`, `--color-accent-lilac`, `--color-accent-purple`, `--color-border`, and every page beyond the header/footer. Those values are still only visually matched against the reference PDF ([Escarabajo_news.pdf](../Escarabajo_news.pdf)), not pixel-sampled. One data point worth noting: the header's decorative pink icon-stroke color sampled at `#dab7d7`, softer than our `--color-accent-pink: #e3a9dd` — left unchanged since that sample came from thin anti-aliased linework (low confidence) and `--color-accent-pink` is used broadly for solid CTA buttons that were already visually matched against the PDF; re-verify with a proper Figma sample (e.g. `get_variable_defs` or `get_design_context` on a button node) before changing it.

## Not yet done

- No automated tests.
- Full page-by-page Figma pixel verification beyond the header/footer (see above).
