# Architecture

Read this before changing anything. It is the map of how the site is put
together and why, so a fresh session does not have to re-derive it.

## What this is

An independent design concept for 3dtholdings.com, a San Diego biomedical
incubator. Not affiliated with or endorsed by 3DT Holdings, LLC. Company facts
come from public sources; the design, prose and imagery are original.

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16, App Router, Turbopack | All 9 routes are statically prerendered |
| Language | TypeScript, strict | `npx tsc --noEmit` must pass |
| Styling | Tailwind v4 | Tokens live in `@theme` in `globals.css`, not a config file |
| 3D | three.js + @react-three/fiber | One canvas, one draw call, custom GLSL |
| Scroll | lenis | Fine pointers only |
| Fonts | next/font/local | Self-hosted, no third-party request |

`pnpm dev` · `pnpm build` · `pnpm lint` · `npx tsc --noEmit`

## The one design idea

Almost everything 3DT owns descends from a single measurement: pass a current
between two electrodes inside a vessel, read the voltage, and the lumen's
cross-sectional area falls out. The site is therefore built to behave like a
diagnostic instrument, and the palette is the channel set of a fluorescence
microscope rather than an invented brand palette.

Every visual decision traces back to one of those two facts. If a change cannot
be justified against them, it probably does not belong.

## Directory map

```
src/
  app/                      one directory per route, all static
    layout.tsx              fonts, metadata, Nav/Grain/SmoothScroll shell
    globals.css             ALL design tokens + base + components + utilities
    page.tsx                home: hero, metrics, conductance, programs,
                            ventures, facility, CTA
    research|ventures|facilities|services|about|contact|guide/page.tsx
    not-found.tsx
  components/
    webgl/CellField.tsx     the hero specimen (see below)
    ConductanceProfile.tsx  the interactive pullback (see below)
    Plate.tsx               lab-plate figure: ticks, scale bar, parallax
    VentureList.tsx         cursor-following hover plate
    Logo.tsx                the 3DT lockup, traced (see below)
    Nav.tsx PageHead.tsx Section.tsx Reveal.tsx
    Grain.tsx SmoothScroll.tsx
  content/
    site.ts                 EVERY fact and line of copy on the site
    guide.ts                the /guide build log
  fonts/                    self-hosted woff2
public/plates/              8 generated JPEGs
scripts/gen-images.mjs      regenerates the plates via OpenAI gpt-image-2
```

**Content and layout are separate on purpose.** Facts live in `src/content/`
so they can be fact-checked as copy, and the pages only arrange them. Put new
copy there, not in JSX.

## Design tokens

All in `globals.css` under `@theme`. Do not introduce colours outside it.

- **Field**: `void` (page), `ink` (raised), `slate`, `graphite`, `steel` (hairlines)
- **Specimen**: `bone` (primary text), `ash` (secondary), `dim` (tertiary)
- **Channels**: `gfp` green (signal/measurement), `dapi` blue (structure),
  `mcherry` red (tissue/alarm), `reference` (the one data-series grey that
  clears 3:1)

Type ramp: `text-mega` → `giant` → `large` → `medium` → `lede` → `label`. Every
heading on the site is one of these. `--text-mega` is bounded by `svh` as well
as `vw`, because three lines at pure `vw` overflow a 900px laptop viewport.

### Two token traps, both already sprung

1. **Never put `font-variant-numeric: tabular-nums` on `body`.** Libre Caslon
   Condensed maps the comma and full stop to figure-width forms under `tnum`,
   inflating them from 0.20em to 0.46em. It opens a visible gap before every
   comma and period in every heading and paragraph. Opt in per element with
   `.figures`, which is used only on the live conductance readout.
2. **`.label` uppercases.** Do not use it for anything containing a micron sign
   or other case-sensitive symbol: `text-transform: uppercase` turns "40 µm"
   into "40 MM". The plate scale bars use a plain span for this reason.

## CellField — the hero

`src/components/webgl/CellField.tsx`

Simulates a confocal microscope. A confocal does not photograph a specimen; it
illuminates one thin optical plane and rejects everything else. Scroll drives
that plane through the volume, so scrolling is scanning.

- One `THREE.Mesh` with an `InstancedBufferGeometry` of billboarded quads,
  additive blended, `depthWrite`/`depthTest` off, `frustumCulled` false.
- Particles are **assembled into cells**, not scattered: one nucleus, a
  polygonal membrane walked out edge by edge in speckle, and focal adhesions at
  the margin. All parts of a cell share one seed and one drift vector so it
  translates as a body. Random scatter reads as a screensaver; this reads as
  an endothelial monolayer.
- Geometry uses a **seeded PRNG** (`mulberry32`), not `Math.random`. The field
  must be identical across renders, and it keeps the build pure for the React
  Compiler lint rules.
- Counts scale to the device: 6800 / 3400 / 1900. DPR capped at 1.75.
- `frameloop` is gated on an IntersectionObserver, so it stops drawing once the
  hero leaves. Reduced motion drops it to `"demand"`.
- The `useFrame` body carries a deliberate `react-hooks/immutability` exemption:
  three.js owns those objects and the render loop writes straight to the GPU.

## ConductanceProfile — the interactive

`src/components/ConductanceProfile.tsx`

A working pullback, not an illustration. Drag the catheter; the electrodes
report the lumen they sit in and the trace builds the profile.

- Physics is real: `G = σA/L` with σ = 0.5 S/m and 1 mm electrode spacing.
- **The sensing-pair midpoint is the measurement point.** Every readout, the
  marker and the position spine sample at the same x. Drawing the electrodes
  offset from the sampled position detaches the marker from its own trace.
- Two layouts, not one squeezed: `buildLayout(compact)` returns a taller board
  with larger furniture under 640px, because a 1000x430 viewBox scales labels
  to about four pixels on a phone.
- Runs one automatic pullback on first view so a reader who never touches it
  still sees the point. Remembers the minimum lumen area.
- Keyboard operable, proper slider semantics. `aria-valuetext` announces
  **settled** values only; announcing every commit fires ~250 times during the
  intro sweep.
- The field-line loop is gated on visibility.

## Conventions

- **Motion**: one easing curve (`--ease-out-expo`) for all entrances. Reveals
  fire once and disconnect. `prefers-reduced-motion` kills durations *and*
  delays, and every imperative animation checks it in JS, because CSS cannot
  reach a transform written to `.style`.
- **Images**: always through `Plate`. `sizes` must terminate in a pixel cap,
  because `.shell` maxes at 1440px and bare `vw` over-fetches ~3x on wide
  screens. Decorative plates take `decorative`.
- **Accessibility is a build requirement, not a pass.** Lighthouse is
  100/100/100 on desktop and mobile for `/` and `/research`. Keep it there.
  Every arrow glyph is `aria-hidden`; the mobile overlay sets `inert` on
  `main` and pauses Lenis.
- **House style**: American English, no em dashes anywhere, including CSS
  `content`. Use an en dash for list markers.
- **No italics.** Accent phrases in headings are set in `gfp` roman, not in a
  slope. The `<em>` elements that carry them all take `not-italic`, and the
  Caslon sloped face is deliberately undeclared, so a bare `<em>` or
  `<address>` will fall back to a synthesized oblique rather than draw the real
  cut. If you add one, add `not-italic` with it.
- **No footer.** The site ends at `main`. The standing "not affiliated" notice
  and the only link to `/guide` therefore live at the foot of `/contact`,
  which already carries the entity and its address. If that block goes, the
  disclaimer leaves the site and the colophon is orphaned. It is the one block
  deliberately not wrapped in `Reveal`: `.reveal` is opacity 0 until the
  observer fires, and a legal notice must not be conditional on JavaScript.
- **No coordinates.** The street address places the building. A lat-long on a
  laboratory page reads as surveillance rather than precision.

## The logo

`src/components/Logo.tsx`. The client supplied `3DT R1.svg`, which is not a
vector file: it is a 1620 x 556 PNG carried inside an SVG envelope by way of a
base64 `<image>`. It was separated into its two colours, traced with potrace,
and rewritten as paths on the artwork's own 1620 x 556 grid. Nothing raster is
left, and the mark is legible at any size.

Two things about it are deliberate:

- **The wordmark takes `currentColor`, not its supplied colour.** As given, the
  letters are `#000717`, which is the site's own field colour. Rendered
  faithfully on `void` the wordmark would be invisible. The Nav therefore sets
  the colour on the link, which is also what carries the green hover.
- **The mark keeps its gold**, held in `--color-brand`. It is the one value in
  the palette that is given rather than derived from a fluorophore, so it is
  named apart from the channels and confined to the mark. Do not reach for it
  for interface chrome.

`variant="mark"` crops to the asterisk by narrowing the viewBox; the paths are
shared and unchanged.

## Regenerating imagery

```bash
export OPENAI_API_KEY=...
node scripts/gen-images.mjs                  # all eight
node scripts/gen-images.mjs field-lines      # one
```

Every prompt appends a shared `OPTICS` block naming a specific instrument and
stain. That is what makes the set cohere. Convert to JPEG q88 afterwards; the
PNG masters are ~14MB and are not committed.

## Fonts and licensing

- **Libre Caslon Condensed** — SIL Open Font License, free to use. Licence text
  is committed alongside it in `src/fonts/`.
- **Söhne** — commercial, Klim Type Foundry. Used here under an existing
  licence. Anyone rebuilding this needs their own, or a substitute.

Only the faces the site renders are declared: Söhne 400 and 500, and Caslon
roman. Declaring
unused faces preloads them at high priority on every route for nothing.

## Deployment

GitHub → Vercel, zero config. `pnpm build` must pass, and so must
`npx tsc --noEmit` and `pnpm lint`.
