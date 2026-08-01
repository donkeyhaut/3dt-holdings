"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ---------------------------------------------------------------------------
   A confocal microscope does not photograph a specimen. It illuminates one
   thin optical plane at a time and rejects everything above and below it.

   That is the whole idea here. The particles are a fixed volume of fluorescent
   bodies. Scrolling moves the focal plane through them: whatever the plane
   crosses snaps into a sharp bright core, and everything else swells into a
   dim bokeh disc. You are not scrolling past an animation, you are scanning
   down through a specimen.
   --------------------------------------------------------------------------- */

/**
 * Seeded PRNG. The field has to be identical on every render and every reload:
 * a specimen that reshuffles itself is not a specimen. It also keeps the
 * geometry build pure, which Math.random would not.
 */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VERT = /* glsl */ `
  attribute vec3  aOffset;
  attribute vec3  aDrift;
  attribute float aScale;
  attribute float aSeed;
  attribute float aChannel;

  uniform float uTime;
  uniform float uFocal;
  uniform float uSigma;
  uniform vec2  uPointer;

  varying vec2  vUv;
  varying float vFocus;
  varying float vChannel;
  varying float vSeed;

  void main() {
    vUv      = uv;
    vChannel = aChannel;
    vSeed    = aSeed;

    // Brownian-ish drift. Every cell keeps its own phase so the field never
    // pulses in unison, which is the tell of a cheap particle system.
    vec3 p = aOffset;
    p.x += sin(uTime * 0.13 + aSeed * 6.2831) * aDrift.x;
    p.y += cos(uTime * 0.11 + aSeed * 4.7123) * aDrift.y;
    p.z += sin(uTime * 0.09 + aSeed * 3.1415) * aDrift.z;

    // Parallax: bodies nearer the objective swing further under the pointer.
    // cz runs [-16, 0] with the camera at z=8, so 1.0 is the NEAR plane.
    float nearness = clamp((p.z + 16.0) / 16.0, 0.0, 1.0);
    p.xy += uPointer * mix(0.12, 1.5, nearness);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // Distance from the focal plane governs focus, and focus governs everything.
    float d     = abs(-mv.z - uFocal);
    float focus = exp(-(d * d) / (2.0 * uSigma * uSigma));
    vFocus      = focus;

    // Defocus blur, done honestly: the disc of confusion widens with distance.
    // Kept modest, because overlapping additive discs turn into grey haze fast.
    float size = aScale * (1.0 + d * 0.28);

    mv.xy += position.xy * size;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uOpacity;

  varying vec2  vUv;
  varying float vFocus;
  varying float vChannel;
  varying float vSeed;

  const vec3 GFP     = vec3(0.373, 0.941, 0.769);
  const vec3 DAPI    = vec3(0.400, 0.420, 1.000);
  const vec3 MCHERRY = vec3(1.000, 0.243, 0.424);

  void main() {
    float r = length(vUv - 0.5) * 2.0;
    if (r > 1.0) discard;

    // In focus: a tight Airy-ish core.
    float core = pow(max(0.0, 1.0 - r), 2.3);

    // Out of focus: a flat disc with a brighter rim, which is what a real
    // out-of-focus point source looks like through a circular stop.
    float disc = smoothstep(1.0, 0.90, r) * (0.30 + 0.55 * smoothstep(0.70, 0.99, r));

    float a = mix(disc, core, vFocus);

    vec3 col = vChannel < 0.5 ? GFP : (vChannel < 1.5 ? DAPI : MCHERRY);

    // Fluorophores blink and bleach. A perfectly steady emitter looks synthetic.
    float flicker = 0.87 + 0.13 * sin(uTime * (1.1 + vSeed * 2.4) + vSeed * 37.0);

    // Overdriven at the core on purpose: an emitter sitting in the focal plane
    // clips to white, which is what gives the field its glow.
    float bright = mix(0.15, 2.05, vFocus) * flicker;
    gl_FragColor = vec4(col * bright, a * uOpacity * mix(0.20, 1.0, vFocus));
  }
`;

/** One nucleus, a polygonal membrane, and a couple of focal adhesions. */
const PER_CELL = 38;

function buildField(count: number) {
  const rnd = mulberry32(0x3d7c0de);

  const offset = new Float32Array(count * 3);
  const drift = new Float32Array(count * 3);
  const scale = new Float32Array(count);
  const seed = new Float32Array(count);
  const channel = new Float32Array(count);

  /* Particles are not scattered at random. They are assembled into cells, so
     the field reads as an endothelial monolayer rather than as dust. Every
     part of a cell shares one seed and one drift vector, so the cell
     translates as a body instead of shearing itself apart over a minute. */
  let i = 0;
  let cellSeed = 0;
  const cellDrift = [0, 0, 0];

  const put = (x: number, y: number, z: number, ch: number, s: number) => {
    if (i >= count) return;
    offset[i * 3 + 0] = x;
    offset[i * 3 + 1] = y;
    offset[i * 3 + 2] = z;
    drift[i * 3 + 0] = cellDrift[0];
    drift[i * 3 + 1] = cellDrift[1];
    drift[i * 3 + 2] = cellDrift[2];
    scale[i] = s;
    seed[i] = cellSeed;
    channel[i] = ch;
    i++;
  };

  const cells = Math.max(1, Math.floor(count / PER_CELL));

  for (let c = 0; c < cells; c++) {
    // Held close to the frame the camera actually sees, so the visible field
    // stays dense rather than scattering most of its budget off screen.
    const cx = (rnd() - 0.5) * 26;
    const cy = (rnd() - 0.5) * 17;
    // Slab sits wholly in front of the camera at z=8, so nothing ever swells
    // into a screen-filling near-field blob.
    const cz = -16 + rnd() * 16;

    cellSeed = rnd();
    const wobble = 0.12 + rnd() * 0.2;
    cellDrift[0] = wobble * (0.6 + rnd() * 0.8);
    cellDrift[1] = wobble * (0.6 + rnd() * 0.8);
    cellDrift[2] = wobble * (0.4 + rnd() * 0.6);

    const radius = 0.5 + rnd() * 0.42;
    const squash = 0.78 + rnd() * 0.34;
    const spin = rnd() * Math.PI * 2;
    const verts = 6 + Math.floor(rnd() * 3);

    // Nucleus
    put(cx + (rnd() - 0.5) * 0.12, cy + (rnd() - 0.5) * 0.12, cz, 1, radius * (0.42 + rnd() * 0.16));

    // Membrane, walked edge by edge so the borders read as continuous.
    const corners = Array.from({ length: verts }, (_, v) => {
      const a = spin + (v / verts) * Math.PI * 2;
      const r = radius * (0.86 + rnd() * 0.3);
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r * squash] as const;
    });

    const PER_EDGE = 5;
    for (let v = 0; v < verts; v++) {
      const [ax, ay] = corners[v];
      const [bx, by] = corners[(v + 1) % verts];
      for (let k = 0; k < PER_EDGE; k++) {
        const t = (k + rnd() * 0.7) / PER_EDGE;
        put(
          ax + (bx - ax) * t + (rnd() - 0.5) * 0.07,
          ay + (by - ay) * t + (rnd() - 0.5) * 0.07,
          cz + (rnd() - 0.5) * 0.16,
          0,
          0.055 + rnd() * 0.075,
        );
      }
    }

    // Focal adhesions cluster at the cell margin, as they do in life.
    const puncta = rnd() < 0.65 ? 2 : 1;
    for (let p = 0; p < puncta; p++) {
      const a = rnd() * Math.PI * 2;
      const r = radius * (0.55 + rnd() * 0.4);
      put(
        cx + Math.cos(a) * r,
        cy + Math.sin(a) * r * squash,
        cz + (rnd() - 0.5) * 0.2,
        2,
        0.034 + rnd() * 0.042,
      );
    }
  }

  // Loose cytoskeletal dust in whatever budget is left over.
  cellDrift[0] = 0.3;
  cellDrift[1] = 0.3;
  cellDrift[2] = 0.2;
  while (i < count) {
    cellSeed = rnd();
    put((rnd() - 0.5) * 30, (rnd() - 0.5) * 20, -16 + rnd() * 16, 0, 0.03 + rnd() * 0.045);
  }

  return { offset, drift, scale, seed, channel };
}

type FieldProps = { count: number; scrollRef: React.RefObject<number> };

function Field({ count, scrollRef }: FieldProps) {
  const { mesh, uniforms } = useMemo(() => {
    const attrs = buildField(count);

    const plane = new THREE.PlaneGeometry(1, 1);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = plane.index;
    geo.setAttribute("position", plane.attributes.position);
    geo.setAttribute("uv", plane.attributes.uv);
    geo.instanceCount = count;
    geo.setAttribute("aOffset", new THREE.InstancedBufferAttribute(attrs.offset, 3));
    geo.setAttribute("aDrift", new THREE.InstancedBufferAttribute(attrs.drift, 3));
    geo.setAttribute("aScale", new THREE.InstancedBufferAttribute(attrs.scale, 1));
    geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(attrs.seed, 1));
    geo.setAttribute("aChannel", new THREE.InstancedBufferAttribute(attrs.channel, 1));

    const u = {
      uTime: { value: 0 },
      uFocal: { value: 10 },
      uSigma: { value: 3.5 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uOpacity: { value: 1 },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: u,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const m = new THREE.Mesh(geo, mat);
    // Positions are computed on the GPU, so the CPU-side bounds are meaningless.
    m.frustumCulled = false;
    return { mesh: m, uniforms: u };
  }, [count]);

  useEffect(() => {
    return () => {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    };
  }, [mesh]);

  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  /* three.js owns `mesh` and `uniforms`. The render loop writes to them on
     every frame and those writes go straight to the GPU, which is the entire
     point of useFrame. That lies outside the React state model this rule
     governs, so it is exempted here deliberately rather than worked around. */
  /* eslint-disable react-hooks/immutability -- imperative three.js render loop */
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    uniforms.uTime.value = state.clock.elapsedTime;

    const p = pointer.current;
    p.x += (p.tx - p.x) * Math.min(1, dt * 2.4);
    p.y += (p.ty - p.y) * Math.min(1, dt * 2.4);
    uniforms.uPointer.value.set(p.x * 0.55, p.y * 0.35);

    // Two inputs into one plane: a slow idle breath so the scene lives while
    // untouched, and scroll, the deliberate drive down through the stack.
    const idle = Math.sin(state.clock.elapsedTime * 0.14) * 1.9;
    uniforms.uFocal.value = 9.6 + idle + scrollRef.current * 13.5;

    // The field lifts away as the hero leaves, so the copy below never has to
    // compete with it.
    uniforms.uOpacity.value = Math.max(0, 1 - scrollRef.current * 1.25);

    // A narrower aperture on small screens keeps the in-focus band readable.
    uniforms.uSigma.value = state.size.width < 768 ? 2.6 : 3.5;

    mesh.rotation.z = state.clock.elapsedTime * 0.006;
  });
  /* eslint-enable react-hooks/immutability */

  return <primitive object={mesh} />;
}

export function CellField() {
  const scrollRef = useRef(0);
  const hostRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  // Imported with ssr:false, so window is guaranteed here on first render.
  const [profile] = useState(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const weak = (navigator.hardwareConcurrency ?? 4) <= 4;
    return {
      count: mobile ? 1900 : weak ? 3400 : 6800,
      run: !reduced,
    };
  });

  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight || 1;
      scrollRef.current = Math.min(1, Math.max(0, window.scrollY / h));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Without this the canvas keeps drawing 6,800 instanced quads for the whole
     session, long after the hero has scrolled away and uOpacity has reached
     zero. Nobody sees it and everybody pays for it. */
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0">
      <Canvas
        className="!absolute inset-0"
        dpr={[1, 1.75]}
        camera={{ fov: 52, position: [0, 0, 8], near: 0.1, far: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={!profile.run ? "demand" : onScreen ? "always" : "never"}
        style={{ pointerEvents: "none" }}
      >
        <Field count={profile.count} scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
