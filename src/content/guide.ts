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
  title: "How this site was built",
  lede: `A complete build log for this page and the seven around it: the research, the design
    decisions and the reasons behind them, the code for the two custom visual systems, and the
    deployment. Written so that someone who wants to do the same thing has enough to start from,
    including the parts that went wrong. Especially those.`,
  meta: [
    { label: "Designed and built by", value: "Claude Fable 5" },
    { label: "Stack", value: "Next.js · R3F · Tailwind" },
    { label: "Routes", value: "09" },
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
          design can look like. Bold and professional, with real 3D drawn from cell biology,
          otherworldly motion, an exceptional palette and typography with a point of view. Ship it
          to GitHub and Vercel, document the method, and make at least three fine-toothed
          iteration passes before calling it finished.`,
      },
      {
        kind: "p",
        text: `The most useful constraint was that the subject is a real company doing real work.
          That rules out decoration for its own sake, and it raises the stakes on accuracy. Every
          visual move below is anchored to something 3DT actually does, which is also the fastest
          route to a design that does not look generated.`,
      },
      {
        kind: "note",
        text: `This is an independent design concept. It is not affiliated with, endorsed by, or
          an official property of 3DT Holdings, LLC. Company facts come from public sources and
          have been checked against federal registers and the primary literature; the design,
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
          content, though, is dense and specific: four active device programs, five portfolio
          companies, an animal facility, an immunopathology core, a simulation group, and twelve
          named people with serious industry histories. That is a lot of substance behind a thin
          presentation.`,
      },
      {
        kind: "p",
        text: `Every page was pulled and transcribed into one typed content module before any
          design work started. Facts and layout then stay separate, which means the copy can be
          fact-checked as copy and the design can be judged as design. That separation is what
          made the third iteration pass possible at all.`,
      },
      {
        kind: "code",
        lang: "ts",
        text: `// src/content/site.ts - one source of truth for every fact on the site
export const programs: Program[] = [
  {
    id: "post-dilatation",
    field: "Interventional cardiology",
    problem: "A stent that is not opened to the size of the artery around it...",
    stat: { value: "~50%", label: "of stented lesions fall short of the..." },
  },
  // ...
];`,
      },
      {
        kind: "p",
        text: `Read section 11 before trusting any of this. An earlier version of this very
          paragraph congratulated itself for catching one invented statistic and replacing it
          with a sourced one. The replacement was also wrong, in a way that mattered more, and it
          took a dedicated fact-checking pass against federal registers to find out.`,
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
          unrelated stories, but it is one. Almost everything 3DT owns descends from a single
          measurement technique: drive a small alternating current between two excitation
          electrodes inside a vessel, read the voltage across two detection electrodes between
          them, and the ratio gives you the cross-sectional area of the lumen the current had to
          cross. Conductance turns anatomy into a number, live, without contrast.`,
      },
      {
        kind: "p",
        text: `That gave the site its line, "we make the body measurable", and it gave the design
          its governing metaphor: the whole page behaves like a diagnostic instrument. Scroll
          progress is a depth readout. Images carry registration ticks. The stenosis figure turns
          red past a threshold. None of this is styling applied on top; it all follows from the
          one idea.`,
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
          better colors but to stop picking at all, and instead borrow a color system that
          already exists in the subject matter. Immunofluorescence microscopy images tissue in
          discrete channels: DAPI stains nuclei blue, GFP reports in green, mCherry in red. On a
          black field, those three are the entire visible world.`,
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
          look like one microscope session rather than three unrelated assets. It also gives
          every color a job: green is signal and measurement, red is tissue and alarm, blue is
          structure. The stenosis readout turns red past its threshold because red already means
          tissue in trouble everywhere else on the site.`,
      },
      {
        kind: "p",
        text: `One honest wrinkle. The image generator was given a slightly deeper blue for DAPI
          than the CSS token carries, because a saturated blue survives JPEG compression better
          than it survives a dark web page. Two values, one idea.`,
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
          manually, or the tracking closes the space between words and the line reads as one long
          string. A grotesque needs less tracking than a monospace does, but still needs the
          word-space bump.`,
      },
      {
        kind: "code",
        lang: "css",
        text: `.label {
  font-family: var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  word-spacing: 0.16em;  /* without this, tracked caps fuse into one word */
}`,
      },
      {
        kind: "p",
        text: `Both faces are self-hosted through next/font/local, so there is no third-party
          request and no layout shift on load. Libre Caslon Condensed is under the SIL Open Font
          License and can be used freely. Söhne is a commercial face from Klim Type Foundry and is
          used here under an existing license; anyone rebuilding this needs their own, or a
          substitute.`,
      },
    ],
  },
  {
    id: "kickers",
    n: "05",
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
        text: `A kicker makes the reader parse two things before reaching the sentence that
          actually carries the section, and it usually says something the heading already
          implies. If the heading is strong enough to open a section, the label above it is
          noise; if it is not, the fix is a better heading. Removing them made every section
          start harder and the whole page quieter, and it cost nothing.`,
      },
    ],
  },
  {
    id: "plates",
    n: "06",
    title: "Generating the imagery",
    blocks: [
      {
        kind: "p",
        text: `Eight images were generated with OpenAI gpt-image-2 at high quality: an
          endothelial monolayer, a coronary cross-section, a capillary bed, cardiac muscle,
          intestinal mucosa, a cardiac organoid, a guidewire tip, and a conductance field. They
          are used as editorial plates beside the copy rather than as decoration behind it.`,
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
          confocal composite returns black fields, real bokeh and plausible morphology.
          Explicitly banning text and scale bars matters too, because the model will otherwise
          add illegible pseudo-labels that immediately mark the image as generated.`,
      },
      {
        kind: "p",
        text: `The script converts each master to JPEG at quality 88 as it goes, which takes the
          set from 14MB of PNG to 3.3MB with no visible loss at the sizes used. Doing it inside
          generation rather than as a separate step means the documented pipeline is the one that
          actually ran.`,
      },
      {
        kind: "p",
        text: `The plates carried drawn-on scale bars until the third pass. See section 11.`,
      },
    ],
  },
  {
    id: "hero",
    n: "07",
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
          the focal plane is computed per instance in the vertex shader and drives three things
          at once: brightness, size and the shape of the sprite.`,
      },
      {
        kind: "code",
        lang: "glsl",
        text: `// vertex: distance from the focal plane governs everything
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
        text: `// fragment: in focus, a tight core. Out of focus, a real bokeh disc.
float core = pow(max(0.0, 1.0 - r), 2.3);
float disc = smoothstep(1.0, 0.90, r) * (0.30 + 0.55 * smoothstep(0.70, 0.99, r));
float a    = mix(disc, core, vFocus);

// overdriven at the core on purpose: an emitter in the plane clips to white
float bright = mix(0.15, 2.05, vFocus) * flicker;`,
      },
      {
        kind: "p",
        text: `The single change that mattered most was structural. The first version scattered
          particles at random and looked like every particle-field hero ever shipped. Rewriting
          the generator to assemble cells fixed it: each cell gets one nucleus, a polygonal
          membrane walked out edge by edge in cytoskeletal speckle, and a couple of hot focal
          adhesions at the margin. Every particle in a cell shares one seed and one drift vector
          so the cell translates as a body instead of shearing apart over a minute.`,
      },
      {
        kind: "code",
        lang: "ts",
        text: `// membrane, walked edge by edge so the borders read as continuous
const corners = Array.from({ length: verts }, (_, v) => {
  const a = spin + (v / verts) * Math.PI * 2;
  const r = radius * (0.86 + rnd() * 0.3);
  return [cx + Math.cos(a) * r, cy + Math.sin(a) * r * squash];
});

for (let v = 0; v < verts; v++) {
  const [ax, ay] = corners[v];
  const [bx, by] = corners[(v + 1) % verts];
  for (let k = 0; k < PER_EDGE; k++) {
    const t = (k + rnd() * 0.7) / PER_EDGE;
    put(ax + (bx - ax) * t, ay + (by - ay) * t, cz, GFP, speckleSize);
  }
}`,
      },
      {
        kind: "p",
        text: `Random dust reads as a screensaver. Cobblestone cells with nuclei read as an
          endothelial monolayer, which is what the copy beside them is talking about. Note
          rnd() rather than Math.random: the generator is seeded, so the specimen is identical on
          every render, which matters both for debugging and for the React Compiler lint rules
          that treat Math.random as impure during render.`,
      },
    ],
  },
  {
    id: "pullback",
    n: "08",
    title: "The interactive is the argument",
    blocks: [
      {
        kind: "p",
        text: `The conductance diagram on the home page is the piece of the site doing the most
          work. It is the idea itself, running, rather than a picture of the idea. Drag the
          catheter along the vessel and the electrodes report the lumen they are sitting in;
          the trace underneath builds the pullback profile an interventionalist would actually
          read.`,
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
        text: `const SIGMA   = 0.70;   // blood conductivity, S/m
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
          semantics, and announces settled readings to screen readers. An interactive that only
          works with a mouse is a decorative one.`,
      },
    ],
  },
  {
    id: "motion",
    n: "09",
    title: "Motion rules",
    blocks: [
      {
        kind: "list",
        items: [
          "One easing curve for entrances everywhere on the site, a hard expo out. Consistency of curve does more for coherence than any individual animation.",
          "Reveals are driven by IntersectionObserver and disconnect after firing once. Nothing re-animates on scroll-up, which is the fastest way to make a page feel cheap.",
          "Lenis smooths the wheel so the focal-plane sweep gets a continuous input, but it is disabled for coarse pointers, where hijacking native momentum always feels wrong.",
          "Plates counter-scroll inside their frames by a few percent. Enough to feel alive, not enough to notice as an effect.",
          "prefers-reduced-motion is honored properly: the smooth scroll is not installed at all, the render loop drops to on-demand, the pullback jumps to its finished state, and the reduced-motion block zeroes transition DELAYS as well as durations. Zeroing only durations leaves a blank pause followed by an instant appearance, which is worse than the animation.",
        ],
      },
    ],
  },
  {
    id: "engineering",
    n: "10",
    title: "Performance and accessibility",
    blocks: [
      {
        kind: "list",
        items: [
          "The WebGL canvas is dynamically imported with ssr disabled, so the headline paints before three.js is fetched. It is the only chunk in the build that carries three, and it is not preloaded.",
          "Particle count scales to the device: about 6,800 on a desktop, 3,400 on a low-core machine, 1,900 on a phone. Device pixel ratio is capped at 1.75.",
          "The field is one draw call. Instanced quads, additive blending, no depth write, frustum culling disabled because positions are computed on the GPU.",
          "Every continuous loop is gated on visibility. Both the canvas and the field-line animation stop when their section leaves the viewport.",
          "Only the two font weights the site renders are declared. Declaring unused faces preloads them at high priority on every route for nothing.",
          "Image sizes attributes terminate in a pixel cap rather than a bare vw, because the layout maxes out at 1440px and unbounded vw over-fetches roughly threefold on a wide display.",
          "Lighthouse reports 100 for accessibility, best practices and SEO on both desktop and mobile.",
        ],
      },
    ],
  },
  {
    id: "deploy",
    n: "12",
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
node scripts/gen-images.mjs        # 8 plates via gpt-image-2, converted to jpg

# ship
gh repo create 3dt-holdings --public --source=. --push
vercel --prod`,
      },
      {
        kind: "p",
        text: `Vercel picks up the Next.js build with no configuration. All nine routes prerender
          statically. The whole deployment step is two commands, which is the correct amount of
          attention for a deployment step.`,
      },
    ],
  },
];

/**
 * Written after the passes ran, not before. Everything here was found in the
 * work rather than anticipated.
 */
export const passes: { n: string; title: string; found: string[] }[] = [
  {
    n: "01",
    title: "Design, in the browser at four widths",
    found: [
      "The WebGL field read as generic bokeh, which is the failure mode of every particle hero. Rewrote the generator to assemble cells rather than scatter points. This was the single biggest improvement in the build.",
      "Three lines of the headline overflowed a 900px laptop viewport, which is most laptops. Bounded the type ramp by viewport height as well as width.",
      "The accent word's glow was being sheared into a hard rectangle by the overflow clip that drives the reveal animation. The clip now lifts once the line has landed.",
      "The vessel in the conductance diagram was filled solid, which hid the very narrowing the device exists to find. Rebuilt it as an open lumen between two wall bands.",
      "On a phone the diagram was unreadable: a 1000x430 viewBox scales 12px labels down to about four pixels. Built a second portrait layout rather than squeezing the first.",
      "Wrapped list items lost their hanging indent, so second lines sat flush with the dash and the list stopped reading as a list.",
    ],
  },
  {
    n: "02",
    title: "Engineering and accessibility, by code audit",
    found: [
      "font-variant-numeric: tabular-nums on body. Libre Caslon Condensed maps the comma and full stop to figure-width forms under tnum, inflating them from 0.20em to 0.46em. It opened a visible gap before every comma and period in every heading and paragraph on the site. Two hours were nearly spent hand-kerning the symptom before measuring the cause.",
      "text-transform: uppercase on the plate captions turned the micron sign into a capital mu, so every scale bar read '40 MM' instead of '40 µm'.",
      "The tertiary text color measured 3.87:1 against the background. Every one of its roughly fifty uses is body-size type, so the large-text allowance never applied and all of them failed AA.",
      "The reference-caliber trace in the chart was 1.57:1, far below the 3:1 floor for a graphical object that carries information, and stenosis is measured against it.",
      "The WebGL canvas never stopped drawing. It kept issuing 6,800 instanced quads for the whole session, long after the hero had scrolled away and faded to zero opacity. The field-line loop had the same problem, and started while its section was still below the fold.",
      "The live trace marker was drawn 21.5px from the point its value was sampled at, which visibly detached it from its own curve on the lesion flank, exactly where a reader looks hardest.",
      "Pointer parallax was inverted. Far particles swung about four times more than near ones, which is backwards, and the comment above the line claimed the opposite.",
      "Two font faces were preloaded at high priority on every route and never rendered: roughly 79KB competing with the critical path for nothing.",
      "All five venture plates were being fetched during the hero's paint window, because the hover ghost is position:fixed and therefore always technically in the viewport.",
      "The mobile overlay did not contain focus. Tabbing walked straight out of it into a page that was fully focusable behind an opaque backdrop, and nothing paused the smooth-scroll instance.",
      "Nine arrow glyphs were being read out as part of their link names.",
    ],
  },
  {
    n: "03",
    title: "Facts, against federal registers and the primary literature",
    found: [
      "A member of the team died in June 2026. The company's own site has not been updated, and the copy presented him in the present tense as a serving surgeon. He has been removed from the roster.",
      "All three animal-facility accreditations belong to the neighboring non-profit institute, not to 3DT. 3DT returns zero hits across all 12,443 USDA APHIS licensees, the AAALAC directory and OLAW's live assurance dataset; the institute returns all three. The arrangement is entirely lawful and ordinary, but the claim as written was not supportable. The site now attributes them correctly, with identifiers.",
      "The suite number was wrong, and the coordinates were off by 2.4 kilometers. Both now match SAM.gov and the US Census Geocoder.",
      "All four program development statuses were invented. The source states none, and never has, across Wayback snapshots going back to 2016.",
      "The stent underexpansion statistic was wrong twice over. An earlier draft invented a figure, caught it, and replaced it with a sourced ~35% that was itself wrong: it used restenotic lesions as the denominator, and it conflated underexpansion with malapposition, which are two different failures with two different consequences. ILUMIEN IV puts median expansion at 79.1% across 2,128 core-lab-read cases, so the honest figure is closer to half. The correction story in section 01 was this guide's flagship demonstration of rigor, and it was wrong.",
      "'500+ peer-reviewed publications' was a combined count of proceedings, abstracts and full-length papers. PubMed indexes 373 articles.",
      "The 40-teraflop computing platform is a machine that was retired in 2013, and it was never in-house. The metric was dropped.",
      "Two legal entity names were the source's in-text abbreviations rather than registered names, and one of the two is not registered as a company at all.",
      "The plates carried drawn-on scale bars. They are generated images with no defined magnification, so those were measurements printed on synthetic specimens. On a site about measurement, that is the one piece of decoration that could not stay.",
      "Fecobionics received FDA 510(k) clearance in February 2025. It is the strongest verifiable fact available about the portfolio, it is absent from the company's own site, and it was missing here too. It is now a headline metric.",
      "Eleven career lengths had been frozen into round numbers from open-ended sources. Where a career could be dated independently, the frozen figure was already stale by four to seven years.",
    ],
  },
];
