# Plan: Studio Page Improvements

## Phase 1 — Technical Fixes (blocking, must do first)

1. **Import Inter font** — globals.css references `Inter` but never imports it; add Google Fonts `@import` at top of globals.css before the `@import "tailwindcss"` line.
2. **Fix `color-scheme` conflict** — `:root { color-scheme: dark }` is hardcoded; the JS themeMap switches light/dark via inline styles but this CSS property never updates. Simplest fix: remove the declaration from globals.css since inline styles handle theming.
3. **Fix background gradient for light mode** — `html, body { background: radial-gradient(circle at top, #21103d …) }` is hardcoded dark purple; will not adapt in light mode. Strip this from globals.css; the page wrapper already sets `backgroundColor: theme.page` inline.

## Phase 2 — Visual Hierarchy & Impact

4. **Hero glow — increase opacity** — Change `opacity-30` → `opacity-50`, increase blob `h-[500px] w-[500px]` → `h-[700px] w-[700px]`. Bump light mode heroGlow from `rgba(122,60,255,0.22)` → `rgba(122,60,255,0.35)`.
5. **Section differentiation** — All sections share identical card style. Distinguish:
   - Process steps: add a colored left border accent (`borderLeft: 3px solid theme.accent`)
   - Outcomes: add a leading `✓` checkmark in `theme.accent` color before each item
   - Services: add a small inline SVG icon in the card header
6. **Eyebrow labels** — Add small uppercase labels above each `<h2>` (`WHAT WE DO`, `HOW WE WORK`, `WHAT YOU GAIN`) matching the contact section's existing pattern.
7. **Typography scaling** — Hero h1 jumps `text-4xl → text-6xl` at 640px. Add intermediate `md:text-5xl`.
8. **Step number styling** — Step numbers at 50% opacity are barely visible. Switch to `font-mono` + subtle accent-color background pill.

## Phase 3 — UX & Accessibility

9. **Focus-visible states** — Add `focus-visible:outline-2 focus-visible:outline-offset-2` Tailwind classes to CTA buttons and email link.
10. **Prefers-reduced-motion** — Prefix hover translations with `motion-safe:` (e.g. `motion-safe:hover:translate-y-[-1px]`).
11. **Language selector affordance** — Add `appearance-none` + chevron SVG overlay so the select is clearly a dropdown.

## Relevant Files
- `app/studio/page.jsx` — Phases 2 & 3
- `app/globals.css` — Phase 1

## Verification
1. Toggle to light mode → no dark purple background visible
2. DevTools Network → Inter font file loads
3. Tab through page → visible focus rings on all interactive elements
4. Hero glow visible in both dark and light modes
5. Section cards visually distinct from one another

## Scope
- **Included**: font import, bg fix, visual polish, eyebrow labels, step styling, focus states, reduced-motion
- **Excluded**: icon library, major layout restructure, new sections, multilingual copy changes