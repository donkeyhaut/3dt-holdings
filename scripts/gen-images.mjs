#!/usr/bin/env node
/**
 * Generates the site's scientific imagery with OpenAI gpt-image-2.
 * Every prompt is locked to the same optical grammar so the plates read as one
 * microscope session: black field, GFP cyan-green, DAPI blue, mCherry magenta.
 *
 *   node scripts/gen-images.mjs [name ...]     # omit names to build everything
 */
import { writeFile, mkdir, readFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import os from "node:os";

const run = promisify(execFile);

const OUT = path.resolve(process.cwd(), "public/plates");

const OPTICS = `Shot on a Zeiss LSM 980 confocal laser scanning microscope, immunofluorescence
multichannel composite. Pure black field. Channel palette strictly limited to: GFP cyan-green
(#5FF0C4), DAPI deep blue-violet (#4B4BFF), mCherry crimson-magenta (#FF3E6C). Extreme
micro-detail, shallow depth of field with real optical bokeh in the out-of-focus plane,
faint photon shot noise. Scientifically accurate morphology. No text, no labels, no scale bars,
no watermarks, no UI, no logos, no human figures.`;

const PLATES = [
  {
    name: "hero-endothelium",
    size: "1536x1024",
    prompt: `A dense confocal z-projection of vascular endothelial cells in monolayer. Cyan-green
      actin cytoskeleton filaments form a tight cobblestone mesh of cell borders; deep blue-violet
      nuclei sit at the centre of each cell; scattered crimson-magenta focal adhesion puncta.
      The mesh recedes into darkness toward the upper right, creating enormous depth. ${OPTICS}`,
  },
  {
    name: "coronary-section",
    size: "1024x1024",
    prompt: `Transverse histological cross-section of a coronary artery, immunofluorescence stained.
      Concentric rings: a crimson-magenta smooth muscle media, a cyan-green elastic lamina, blue-violet
      nuclei studded through the wall. The central lumen is void black. Perfectly circular, centred,
      specimen floating in black. ${OPTICS}`,
  },
  {
    name: "capillary-bed",
    size: "1536x1024",
    prompt: `A microvascular capillary bed perfused with fluorescent tracer. Branching cyan-green
      vessels of decreasing calibre fan out fractally across black, thinning to single-cell-wide
      capillaries at the frame edges. Faint blue-violet perivascular nuclei. One arteriole glows
      hot crimson-magenta where the tracer bolus arrives. ${OPTICS}`,
  },
  {
    name: "cardiac-muscle",
    size: "1024x1024",
    prompt: `Cardiac muscle tissue at high magnification. Parallel cyan-green sarcomere striations
      run diagonally with visible periodic banding; crimson-magenta mitochondria are packed in dense
      rows between the myofibrils; elongated blue-violet nuclei lie parallel to the fibre axis.
      Sharply in focus at the centre, dissolving to bokeh at both ends. ${OPTICS}`,
  },
  {
    name: "gi-villi",
    size: "1024x1024",
    prompt: `Cross-section of intestinal mucosa. Finger-like villi project upward, each outlined by a
      cyan-green brush border, with blue-violet epithelial nuclei arranged in a single palisade along
      the basement membrane and crimson-magenta goblet cells scattered between them. The lumen above
      is black void. ${OPTICS}`,
  },
  {
    name: "organoid",
    size: "1024x1024",
    prompt: `A single spherical cardiac organoid suspended in black medium, dark-field illumination.
      The sphere's surface is a shell of cyan-green cell membranes with blue-violet nuclei packed
      beneath; light scatters through its translucent body so the core glows faint crimson-magenta.
      Perfectly isolated, centred, with a soft photon halo. ${OPTICS}`,
  },
  {
    name: "catheter-macro",
    size: "1536x1024",
    prompt: `Scanning electron micrograph aesthetic, but tinted. Extreme macro of the distal tip of a
      medical guidewire: a tightly wound helical platinum coil, a polished hemispherical atraumatic tip,
      and four ring electrodes banded along the shaft. Rendered in near-monochrome graphite and bone
      white with a cold cyan-green rim light along every edge, on a black field. Razor-sharp industrial
      detail, machined tolerances visible. No text, no labels, no watermarks, no logos.`,
  },
  {
    name: "field-lines",
    size: "1536x1024",
    prompt: `Abstract scientific visualization of an electrical conductance field inside a blood vessel.
      A translucent cylindrical lumen runs horizontally through black space; hundreds of fine cyan-green
      equipotential field lines bow outward from two crimson-magenta point electrodes on its axis and
      wrap the inner wall. Faint blue-violet volumetric haze fills the lumen. Precise, technical,
      luminous, like a physics simulation rendered for a journal cover. No text, no labels,
      no watermarks, no logos.`,
  },
];

const key =
  process.env.OPENAI_API_KEY ||
  (existsSync(path.join(os.homedir(), ".3dt_openai_key"))
    ? (await readFile(path.join(os.homedir(), ".3dt_openai_key"), "utf8")).trim()
    : null);
if (!key) throw new Error("No OPENAI_API_KEY");

async function gen(plate, attempt = 1) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt: plate.prompt.replace(/\s+/g, " ").trim(),
      size: plate.size,
      quality: "high",
      n: 1,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    if (attempt < 3 && (res.status === 429 || res.status >= 500)) {
      await new Promise((r) => setTimeout(r, 4000 * attempt));
      return gen(plate, attempt + 1);
    }
    throw new Error(`${plate.name}: ${res.status} ${body.slice(0, 300)}`);
  }
  const json = await res.json();
  const buf = Buffer.from(json.data[0].b64_json, "base64");

  /* The site loads .jpg. The PNG masters are ~2MB each and are not committed,
     so the conversion is part of generation rather than a separate step
     somebody has to remember. */
  const png = path.join(OUT, `${plate.name}.png`);
  const jpg = path.join(OUT, `${plate.name}.jpg`);
  await writeFile(png, buf);

  try {
    await run("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "88", png, "--out", jpg]);
    await rm(png);
    console.log(`ok   ${plate.name}  ${plate.size}  ${(buf.length / 1e6).toFixed(1)}MB -> jpg`);
  } catch {
    console.warn(
      `warn ${plate.name}: sips unavailable, left as PNG. Convert to ${plate.name}.jpg at quality ~88 before shipping.`,
    );
  }
}

const only = process.argv.slice(2);
const queue = only.length ? PLATES.filter((p) => only.includes(p.name)) : PLATES;
await mkdir(OUT, { recursive: true });

const results = await Promise.allSettled(queue.map((p) => gen(p)));
const failed = results.filter((r) => r.status === "rejected");
failed.forEach((f) => console.error("FAIL", f.reason.message));
console.log(`\n${results.length - failed.length}/${results.length} plates generated -> ${OUT}`);
if (failed.length) process.exitCode = 1;
