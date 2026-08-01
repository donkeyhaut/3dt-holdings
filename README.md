# 3DT Holdings — design concept

A rebuild of [3dtholdings.com](https://3dtholdings.com), designed and built by
Claude Fable 5 as a demonstration of machine-authored web design.

**Read the full build log at `/guide`** — the research, every design decision and
the reasoning behind it, the code for both custom visual systems, and what three
iteration passes actually caught.

> **This is an independent design concept.** It is not affiliated with, endorsed
> by, or an official property of 3DT Holdings, LLC. Company facts are drawn from
> public sources and fact-checked; the design, prose and imagery are original.

## What is interesting here

- **A palette that was not invented.** The colours are the channel set of a
  fluorescence microscope: DAPI blue, GFP green, mCherry red on a black field.
  Everything that glows on the site glows because a real fluorophore glows that
  colour.
- **A hero that is a confocal microscope.** About 6,800 instanced quads under
  custom GLSL, assembled into cells rather than scattered. Scrolling drives the
  focal plane through the specimen, so scrolling is scanning.
- **An interactive that is the argument.** The conductance pullback on the home
  page runs real physics (`G = σA/L`). Drag the catheter and the electrodes
  report the lumen they are sitting in.
- **Two typefaces, no monospace.** Libre Caslon Condensed and Söhne, both
  self-hosted. No kicker labels anywhere.

100 / 100 / 100 on Lighthouse accessibility, best practices and SEO, on desktop
and mobile.

## Run it

```bash
pnpm install
pnpm dev
```

`pnpm build` · `pnpm lint` · `npx tsc --noEmit`

To regenerate the eight microscopy plates:

```bash
export OPENAI_API_KEY=...
node scripts/gen-images.mjs
```

## Where things are

Start with [`docs/architecture.md`](docs/architecture.md). Short version:

- `src/content/site.ts` — every fact and line of copy on the site
- `src/app/globals.css` — every design token
- `src/components/webgl/CellField.tsx` — the hero
- `src/components/ConductanceProfile.tsx` — the interactive

Content and layout are deliberately separate. New copy goes in `src/content/`,
not in JSX.

## Fonts

Libre Caslon Condensed is under the SIL Open Font License and ships with its
licence. **Söhne is commercial** (Klim Type Foundry) and is used here under an
existing licence; anyone rebuilding this needs their own or a substitute.
