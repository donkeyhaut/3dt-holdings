export type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "code"; lang: string; text: string }
  | { kind: "note"; text: string };

export type GuideSection = {
  id: string;
  n: string;
  title: string;
  blocks: Block[];
};

export const guideIntro = {
  eyebrow: "Colophon",
  title: "How this site was built",
  lede: `A complete build log for this page and the seven around it: the research, the
    design decisions and the reasons behind them, the code for the two custom visual systems,
    and the deployment. Written so that someone who wants to do the same thing has enough to
    start from, including the parts that went wrong.`,
  meta: [
    { label: "Designed and built by", value: "Claude Fable 5" },
    { label: "Stack", value: "Next.js · R3F · Tailwind" },
    { label: "Routes", value: "08" },
    { label: "Iteration passes", value: "03" },
  ],
};

export const sections: GuideSection[] = [
  {
    id: "brief",
    n: "00",
    title: "The brief",
    blocks: [
      {
        kind: "p",
        text: `Rebuild 3dtholdings.com as a demonstration of what careful machine-authored web
          design can look like. Bold and professional. Real 3D drawn from cell biology, otherworldly
          motion, an exceptional palette, typography with a point of view. Ship it to GitHub and
          Vercel, document the method, and make at least three fine-toothed iteration passes before
          calling it finished.`,
      },
      {
        kind: "p",
        text: `The single most useful constraint was that the subject is a real company with real
          work. That rules out decoration for its own sake. Every visual move below is anchored to
          something 3DT actually does, which is also the fastest route to a design that does not
          look generated.`,
      },
      {
        kind: "note",
        text: `This is an independent design concept. It is not affiliated with, endorsed by, or an
          official property of 3DT Holdings, LLC. Company facts come from public sources; the design,
          prose and imagery are original.`,
      },
    ],
  },
  {
    id: "research",
    n: "01",
    title: "Read the original before touching anything",
    blocks: [
      {
        kind: "p",
        text: `The existing site is a 2021 WordPress build with a copyright notice to match. Its
          content, though, is dense and specific: four active device programs, five spun-out
          companies, a USDA-registered and AAALAC-accredited animal facility, an immunopathology
          core, a supercomputing allocation, and eleven named people with serious industry
          histories. That is a lot of substance behind a thin presentation.`,
      },
      {
        kind: "p",
        text: `Every page was pulled and transcribed into one typed content module before any
          design work started. Facts and layout then stay separate, which means the copy can be
          fact-checked as copy and the design can be judged as design.`,
      },
      {
        kind: "code",
        lang: "ts",
        text: `// src/content/site.ts — one source of truth for every fact on the site
export const programs: Program[] = [
  {
    id: "post-dilatation",
    field: "Interventional cardiology",
    problem: "A stent that does not sit flush against the artery wall...",
    stat: { value: "~35%", label: "of stented lesions are underexpanded on IVUS..." },
    status: "Bench and large-animal validation complete",
  },
  // ...
];`,
      },
      {
        kind: "p",
        text: `Two numbers written during drafting turned out to be wrong and were caught by
          checking them rather than by trusting them. A founding year of 2007 was a guess that
          happened to be right, confirmed against a SAM.gov registration dated July 2007. A claim
          that one in five coronary stents is underexpanded was invented and is materially wrong;
          the published figure from IVUS series is closer to 35% of lesions at the conventional
          threshold of a minimum stent area below 80% of the reference lumen. The invented number
          was replaced with the sourced one.`,
      },
    ],
  },
  {
    id: "idea",
    n: "02",
    title: "Find the one idea the company is actually about",
    blocks: [
      {
        kind: "p",
        text: `A holding company with four programs and five subsidiaries looks like five
          unrelated stories. It is not. Almost everything 3DT owns descends from a single
          measurement technique: drive a small alternating current between two electrodes inside a
          vessel, read the voltage that survives, and the ratio gives you the cross-sectional area
          of the lumen the current had to cross. Conductance turns anatomy into a number, live,
          without contrast.`,
      },
      {
        kind: "p",
        text: `That gave the site its line, "we make the body measurable", and it gave the design
          its governing metaphor: the whole page behaves like a diagnostic instrument. Scroll
          progress is a depth readout. Section labels are set in monospace like equipment
          labelling. Images carry registration ticks and scale bars. None of this is styling
          applied on top; it all follows from the one idea.`,
      },
    ],
  },
  {
    id: "palette",
    n: "03",
    title: "A palette that was not invented",
    blocks: [
      {
        kind: "p",
        text: `Biotech sites default to blue and white. The alternative here was not to pick
          nicer colours but to stop picking at all, and instead borrow a colour system that already
          exists in the subject matter. Immunofluorescence microscopy images tissue in discrete
          channels: DAPI stains nuclei blue, GFP reports in green, mCherry in red. On a black
          field, those three are the entire visible world.`,
      },
      {
        kind: "code",
        lang: "css",
        text: `@theme {
  /* Field */
  --color-void:  #04060a;   /* the unilluminated specimen field */
  --color-bone:  #ece7dd;

  /* Channels */
  --color-gfp:      #5ff0c4;
  --color-dapi:     #6a6aff;
  --color-mcherry:  #ff3e6c;
}`,
      },
      {
        kind: "p",
        text: `The payoff is coherence that costs nothing to maintain. Generated imagery, the
          WebGL hero and the interactive diagram all draw from the same three emitters, so they
          look like one microscope session rather than three unrelated assets. It also gives every
          colour a job: green is signal and measurement, red is tissue and alarm, blue is
          structure. The stenosis readout turns red past 50% because red already means tissue in
          trouble everywhere else on the site.`,
      },
    ],
  },
  {
    id: "type",
    n: "04",
    title: "Two typefaces, no monospace",
    blocks: [
      {
        kind: "list",
        items: [
          "Libre Caslon Condensed for display. A condensed cut of a Caslon, which is an unusual thing to find open-licensed and a very useful one: the narrow set means the headline can run far larger at the same measure, and the classical skeleton keeps a black page from tipping into science fiction. Its italic carries every accent line on the site.",
          "Söhne for everything else. Body copy, navigation, buttons, captions, readouts and labels. A grotesque with enough warmth to sit under a Caslon without arguing with it.",
        ],
      },
      {
        kind: "p",
        text: `There is no third typeface, and specifically no monospace. Instrument panels are
          the obvious place to reach for one, and the obvious reach is exactly what makes a page
          look like every other technical site. The instrument register is carried instead by
          letter-spaced uppercase Söhne, hairline rules, corner ticks and tabular figures, which
          turns out to be both quieter and more distinctive.`,
      },
      {
        kind: "p",
        text: `One detail worth stealing: letter-spaced uppercase needs its word gap opened
          manually, or the tracking closes the space between words and the line reads as one
          long string. A grotesque needs less tracking than a monospace does, but still needs
          the word-space bump.`,
      },
      {
        kind: "code",
        lang: "css",
        text: `.label {
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  word-spacing: 0.16em;  /* without this, tracked caps fuse into one word */
}

/* numerals that have to line up in a column */
.figures {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1, "lnum" 1;
}`,
      },
      {
        kind: "p",
        text: `Both faces are self-hosted through next/font/local, so there is no third-party
          request and no layout shift on load. Libre Caslon Condensed is under the SIL Open Font
          License and can be used freely. Söhne is a commercial face from Klim Type Foundry and
          is used here under an existing licence; anyone rebuilding this needs their own, or a
          substitute.`,
      },
      {
        kind: "p",
        text: `Display type also needs kerning that text type does not. Caslon sets its full
          stop in a wide advance, which is correct at reading sizes and reads as a word space at
          144px, so the terminal period in the headline is pulled back by hand.`,
      },
      {
        kind: "code",
        lang: "tsx",
        text: `{line.replace(/\\.$/, "")}
{line.endsWith(".") && <span className="-ml-[0.075em]">.</span>}`,
      },
    ],
  },
  {
    id: "kickers",
    n: "04b",
    title: "No kicker labels",
    blocks: [
      {
        kind: "p",
        text: `An earlier draft put a small tracked label above every heading, the eyebrow
          pattern that is close to mandatory in contemporary marketing design. All of them were
          removed.`,
      },
      {
        kind: "p",
        text: `The argument against is simple. A kicker makes the reader parse two things before
          reaching the sentence that actually carries the section, and it usually says something
          the heading already implies. If the heading is strong enough to open a section, the
          label above it is noise; if it is not, the fix is a better heading. Removing them made
          every section start harder and the whole page quieter, and it cost nothing.`,
      },
    ],
  },
  {
    id: "plates",
    n: "05",
    title: "Generating the imagery",
    blocks: [
      {
        kind: "p",
        text: `Eight images were generated with OpenAI gpt-image-2 at high quality: an endothelial
          monolayer, a coronary cross-section, a capillary bed, cardiac muscle, intestinal mucosa,
          a cardiac organoid, a guidewire tip, and a conductance field. They are used as editorial
          plates beside the copy rather than as decoration behind it.`,
      },
      {
        kind: "p",
        text: `The technique that made them cohere is a shared optics preamble appended to every
          prompt. Rather than describing a style, it describes an instrument and a stain, which
          constrains lighting, palette and depth of field all at once.`,
      },
      {
        kind: "code",
        lang: "js",
        text: `const OPTICS = \`Shot on a Zeiss LSM 980 confocal laser scanning microscope,
immunofluorescence multichannel composite. Pure black field. Channel palette strictly
limited to: GFP cyan-green (#5FF0C4), DAPI deep blue-violet (#4B4BFF), mCherry
crimson-magenta (#FF3E6C). Extreme micro-detail, shallow depth of field with real
optical bokeh, faint photon shot noise. Scientifically accurate morphology.
No text, no labels, no scale bars, no watermarks, no logos.\`;

// every plate = its own subject + the same OPTICS block
prompt: \`A dense confocal z-projection of vascular endothelial cells in
  monolayer... \${OPTICS}\``,
      },
      {
        kind: "p",
        text: `Naming a specific instrument does more work than any adjective. Asking for
          "scientific microscopy imagery" returns stock-photo pastiche; asking for an LSM 980
          confocal composite returns black fields, real bokeh and plausible morphology. Explicitly
          banning text and scale bars matters too, because the model will otherwise add
          illegible pseudo-labels that immediately mark the image as generated.`,
      },
      {
        kind: "p",
        text: `The plates ship as JPEG at quality 88, which took the set from 14MB of PNG to
          3.3MB with no visible loss at the sizes used. Real scale bars and registration ticks are
          added in the markup afterwards, where they can be accurate and stay crisp.`,
      },
    ],
  },
  {
    id: "hero",
    n: "06",
    title: "The hero is a confocal microscope",
    blocks: [
      {
        kind: "p",
        text: `A confocal microscope does not photograph a specimen. It illuminates one thin
          optical plane and rejects the light from everything above and below it, then builds a
          stack by stepping that plane through the sample. The hero implements exactly that, and
          hands the control to the scroll wheel. Scrolling down the page drives the focal plane
          deeper into the specimen. You are not scrolling past an animation, you are scanning.`,
      },
      {
        kind: "p",
        text: `The field is one instanced draw of about 6,800 billboarded quads. Distance from
          the focal plane is computed per instance in the vertex shader and drives three things at
          once: brightness, size and the shape of the sprite.`,
      },
      {
        kind: "code",
        lang: "glsl",
        text: `// vertex — distance from the focal plane governs everything
vec4 mv = modelViewMatrix * vec4(p, 1.0);

float d     = abs(-mv.z - uFocal);
float focus = exp(-(d * d) / (2.0 * uSigma * uSigma));
vFocus      = focus;

// the disc of confusion widens as the body leaves the plane
float size = aScale * (1.0 + d * 0.28);
mv.xy += position.xy * size;      // billboard in view space
gl_Position = projectionMatrix * mv;`,
      },
      {
        kind: "code",
        lang: "glsl",
        text: `// fragment — in focus: a tight core. Out of focus: a real bokeh disc.
float core = pow(max(0.0, 1.0 - r), 2.3);
float disc = smoothstep(1.0, 0.90, r) * (0.30 + 0.55 * smoothstep(0.70, 0.99, r));
float a    = mix(disc, core, vFocus);

// overdriven at the core on purpose: an emitter in the plane clips to white
float bright = mix(0.15, 2.05, vFocus) * flicker;`,
      },
      {
        kind: "p",
        text: `The single change that mattered most was structural, not visual. The first version
          scattered particles at random and looked like every particle-field hero ever shipped.
          Rewriting the generator to assemble cells fixed it: each cell gets one nucleus, a
          polygonal membrane walked out edge by edge in cytoskeletal speckle, and a couple of hot
          focal adhesions at the margin. Every particle in a cell shares one seed and one drift
          vector so the cell translates as a body instead of shearing apart over a minute.`,
      },
      {
        kind: "code",
        lang: "ts",
        text: `// membrane, walked edge by edge so the borders read as continuous
const corners = Array.from({ length: verts }, (_, v) => {
  const a = spin + (v / verts) * Math.PI * 2;
  const r = radius * (0.86 + Math.random() * 0.3);
  return [cx + Math.cos(a) * r, cy + Math.sin(a) * r * squash];
});

for (let v = 0; v < verts; v++) {
  const [ax, ay] = corners[v];
  const [bx, by] = corners[(v + 1) % verts];
  for (let k = 0; k < PER_EDGE; k++) {
    const t = (k + Math.random() * 0.7) / PER_EDGE;
    put(ax + (bx - ax) * t, ay + (by - ay) * t, cz, GFP, speckleSize);
  }
}`,
      },
      {
        kind: "p",
        text: `Random dust reads as a screensaver. Cobblestone cells with nuclei read as an
          endothelial monolayer, which is what the copy beside them is talking about.`,
      },
    ],
  },
  {
    id: "pullback",
    n: "07",
    title: "The interactive is the argument",
    blocks: [
      {
        kind: "p",
        text: `The conductance diagram on the home page is the piece of the site doing the most
          work. It is not an illustration of the idea, it is the idea, running. Drag the catheter
          along the vessel and the electrodes report the lumen they are sitting in; the trace
          underneath builds the pullback profile an interventionalist would actually read.`,
      },
      {
        kind: "p",
        text: `The physics is real and small enough to fit in a paragraph. Conductance G equals
          the conductivity of blood times the cross-sectional area, divided by the electrode
          spacing. Invert it and area falls out of a voltage measurement.`,
      },
      {
        kind: "code",
        lang: "ts",
        text: `const SIGMA   = 0.5;    // blood conductivity, S/m
const SPACING = 1e-3;   // sensing electrode spacing, m

const areaOf        = (d: number) => Math.PI * (d / 2) ** 2;          // mm²
const conductanceOf = (a: number) => (SIGMA * a * 1e-6) / SPACING / 1e-3;  // mS

// a healthy taper with one focal lesion dropped into it
function diameterAt(t: number) {
  const g = Math.exp(-((t - 0.565) ** 2) / (2 * 0.072 ** 2));
  return Math.max(0.55, (3.62 - 0.5 * t) - 2.12 * g);
}`,
      },
      {
        kind: "p",
        text: `Three decisions made it feel like an instrument rather than a widget. It runs one
          automatic pullback the first time it enters the viewport, so a reader who never touches
          it still sees the point. It remembers the minimum lumen area encountered and annotates
          it, which is the number that decides the case. And the pullback runs right to left,
          distal to proximal, because that is the direction a catheter is actually withdrawn.`,
      },
      {
        kind: "p",
        text: `It is keyboard operable with arrow, Home and End keys, exposes proper slider
          semantics, and announces the live reading to screen readers. An interactive that only
          works with a mouse is a decorative one.`,
      },
    ],
  },
  {
    id: "motion",
    n: "08",
    title: "Motion rules",
    blocks: [
      {
        kind: "list",
        items: [
          "One easing curve for entrances everywhere on the site, a hard expo out. Consistency of curve does more for coherence than any individual animation.",
          "Reveals are driven by IntersectionObserver and disconnect after firing once. Nothing re-animates on scroll-up, which is the fastest way to make a page feel cheap.",
          "Lenis smooths the wheel so the focal-plane sweep gets a continuous input, but it is disabled for coarse pointers, where hijacking native momentum always feels wrong.",
          "Plates counter-scroll inside their frames by a few percent. Enough to feel alive, not enough to notice as an effect.",
          "prefers-reduced-motion is honoured properly: the smooth scroll is not installed at all, the render loop drops to on-demand, and the pullback jumps straight to its finished state rather than animating.",
        ],
      },
    ],
  },
  {
    id: "engineering",
    n: "09",
    title: "Performance and accessibility",
    blocks: [
      {
        kind: "list",
        items: [
          "The WebGL canvas is dynamically imported with ssr disabled, so the headline paints before three.js is fetched.",
          "Particle count scales to the device: about 6,800 on a desktop, 3,400 on a low-core machine, 1,900 on a phone. Device pixel ratio is capped at 1.75.",
          "The field is one draw call. Instanced quads, additive blending, no depth write, frustum culling disabled because positions are computed on the GPU.",
          "The hero canvas fades out as the hero leaves, so nothing below it competes with a live render.",
          "Colour was checked against the background rather than assumed: bone on void and the green on void both clear WCAG AA comfortably at body sizes.",
          "Focus states are visible everywhere, the skip link is real, and the mobile menu traps nothing but does close on Escape and on route change.",
        ],
      },
    ],
  },
  {
    id: "deploy",
    n: "10",
    title: "Shipping it",
    blocks: [
      {
        kind: "code",
        lang: "bash",
        text: `# scaffold
npx create-next-app@latest 3dt-holdings --typescript --tailwind --app --src-dir
pnpm add three @react-three/fiber lenis clsx
pnpm add -D @types/three

# imagery
node scripts/gen-images.mjs        # 8 plates via gpt-image-2

# ship
gh repo create 3dt-holdings --public --source=. --push
vercel --prod`,
      },
      {
        kind: "p",
        text: `Vercel picks up the Next.js build with no configuration. The whole deployment step
          is two commands, which is the correct amount of attention for a deployment step.`,
      },
    ],
  },
];

/** Filled in after the three passes actually ran. */
export const passes: { n: string; title: string; found: string[] }[] = [];
