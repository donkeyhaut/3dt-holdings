"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

/* ---------------------------------------------------------------------------
   A working conductance pullback.

   Drag the catheter along the vessel. The electrodes read the conductance of
   the blood column they are sitting in, that reading converts to a lumen
   cross-section, and the trace underneath builds the pullback profile an
   interventionalist would actually read. The lesion is invisible on the vessel
   silhouette until the numbers find it, which is precisely the point.
   --------------------------------------------------------------------------- */

const WIDTH = 1000;
const PAD = 60; // left/right inset of the instrumented run

/** Blood conductivity (S/m) and sensing electrode spacing (m). */
const SIGMA = 0.5;
const SPACING = 1e-3;

/** Healthy calibre with a gentle natural taper, proximal to distal. */
const taper = (t: number) => 3.62 - 0.5 * t;

/** True diameter in mm at normalised position t, with one focal lesion. */
function diameterAt(t: number) {
  const g = Math.exp(-((t - 0.565) ** 2) / (2 * 0.072 ** 2));
  return Math.max(0.55, taper(t) - 2.12 * g);
}

const areaOf = (d: number) => Math.PI * (d / 2) ** 2; // mm²
const conductanceOf = (a: number) => (SIGMA * a * 1e-6) / SPACING / 1e-3; // mS

const xOf = (t: number) => PAD + t * (WIDTH - PAD * 2);
const tOf = (x: number) => (x - PAD) / (WIDTH - PAD * 2);

const SAMPLES = 220;
const profile = Array.from({ length: SAMPLES }, (_, i) => {
  const t = i / (SAMPLES - 1);
  const d = diameterAt(t);
  return { t, d, a: areaOf(d), ref: areaOf(taper(t)) };
});
const maxArea = Math.max(...profile.map((p) => p.ref));

/**
 * Two geometries, not one squeezed. At phone width a 1000x430 viewBox scales
 * every label down to about four pixels, so narrow screens get a taller board
 * with a larger vessel and proportionally bigger furniture.
 */
function buildLayout(compact: boolean) {
  const height = compact ? 880 : 430;
  const cy = compact ? 215 : 148;
  const pxPerMm = compact ? 43 : 25.5;
  const plot = compact ? { top: 470, bottom: 800 } : { top: 258, bottom: 398 };
  const s = compact ? 2.1 : 1; // furniture scale
  const wall = 10 * s;

  const yOfArea = (a: number) =>
    plot.bottom - (a / maxArea) * (plot.bottom - plot.top);

  /**
   * One edge of the vessel: `sign` picks the side, `pad` steps outward from the
   * lumen. The run is extended flat to both frame edges, because an artery does
   * not begin and end where the instrumented segment does.
   */
  const edge = (sign: 1 | -1, pad: number, reverse = false) => {
    const y = (d: number) => (cy + sign * ((d / 2) * pxPerMm + pad)).toFixed(2);
    const pts = profile.map((p) => `${xOf(p.t).toFixed(2)},${y(p.d)}`);
    const all = [
      `0,${y(profile[0].d)}`,
      ...pts,
      `${WIDTH},${y(profile[profile.length - 1].d)}`,
    ];
    return (reverse ? all.reverse() : all).join("L");
  };

  const tracePath = `M${profile.map((p) => `${xOf(p.t).toFixed(2)},${yOfArea(p.a).toFixed(2)}`).join("L")}`;
  const refPath = `M${profile.map((p) => `${xOf(p.t).toFixed(2)},${yOfArea(p.ref).toFixed(2)}`).join("L")}`;

  return {
    height,
    cy,
    pxPerMm,
    plot,
    s,
    yOfArea,
    /* The lumen is the thing being measured, so it is drawn as the open channel
       it is. Filling the whole silhouette hides the very narrowing the device
       exists to find. */
    lumenPath: `M${edge(-1, 0)}L${edge(1, 0, true)}Z`,
    wallTopPath: `M${edge(-1, 0)}L${edge(-1, wall, true)}Z`,
    wallBottomPath: `M${edge(1, 0)}L${edge(1, wall, true)}Z`,
    intimaTop: `M${edge(-1, 0)}`,
    intimaBottom: `M${edge(1, 0)}`,
    tracePath,
    refPath,
  };
}

/** Subscribes properly rather than setting state from an effect. */
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function ConductanceProfile() {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const compact = useMediaQuery("(max-width: 640px)");
  const L = useMemo(() => buildLayout(compact), [compact]);

  // Pullback runs right (distal) to left (proximal), as it does in the lab.
  const [t, setT] = useState(1);
  const [minSeen, setMinSeen] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [auto, setAuto] = useState(false);
  const [phase, setPhase] = useState(0);
  const [inView, setInView] = useState(false);
  /* Screen readers get settled values only. Announcing every commit would fire
     roughly 250 times during the intro sweep and on every pointermove. */
  const [announce, setAnnounce] = useState(1);

  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const commit = useCallback((next: number) => {
    const clamped = Math.min(1, Math.max(0, next));
    setT(clamped);
    setMinSeen((m) => Math.min(m, clamped));
  }, []);

  /* One observer does two jobs: run a single automatic pullback the first time
     the panel is seen, and keep `inView` current so the field-line loop is not
     animating a component that is far below the fold. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting || started) return;
        started = true;
        if (reduced.current) {
          setT(0);
          setMinSeen(0);
          setAnnounce(0);
        } else {
          setAuto(true);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto) return;
    let raf = 0;
    let start = 0;
    const DURATION = 4200;
    const step = (now: number) => {
      if (!start) start = now;
      const k = Math.min(1, (now - start) / DURATION);
      commit(1 - (1 - Math.pow(1 - k, 2.2)));
      if (k < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setAuto(false);
        setAnnounce(0);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [auto, commit]);

  /* Current is alternating, so the field lines breathe. Gated on visibility:
     unthrottled this re-rendered ~60 SVG nodes every frame, forever, starting
     while the section was still below the fold at zero opacity. */
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const step = (now: number) => {
      setPhase(now / 1000);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const pointerT = useCallback((clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    if (r.width === 0) return null;
    return tOf(((clientX - r.left) / r.width) * WIDTH);
  }, []);

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return; // a right-click should not start a drag
    setAuto(false);
    setDragging(true);
    // Throws NotFoundError if the pointer is already gone; without the guard
    // `dragging` would stay true and bare hover would drive the catheter.
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* capture is an optimisation, not a requirement */
    }
    const next = pointerT(e.clientX);
    if (next !== null) commit(next);
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging) return;
    if (e.buttons === 0) {
      setDragging(false);
      setAnnounce(t);
      return;
    }
    const next = pointerT(e.clientX);
    if (next !== null) commit(next);
  };

  const endDrag = (e: React.PointerEvent<SVGSVGElement>) => {
    setDragging(false);
    setAnnounce(t);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 0.05 : 0.012;
    const keys: Record<string, number> = {
      ArrowLeft: -step,
      ArrowDown: -step,
      ArrowRight: step,
      ArrowUp: step,
    };
    const go = (next: number) => {
      e.preventDefault();
      setAuto(false);
      const clamped = Math.min(1, Math.max(0, next));
      commit(clamped);
      setAnnounce(clamped);
    };
    if (e.key in keys) go(t + keys[e.key]);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(1);
  };

  const live = useMemo(() => {
    const d = diameterAt(t);
    const a = areaOf(d);
    return {
      d,
      a,
      g: conductanceOf(a),
      stenosis: Math.max(0, (1 - a / areaOf(taper(t))) * 100),
    };
  }, [t]);

  /** Settled reading, for assistive technology only. */
  const announced = useMemo(() => {
    const a = areaOf(diameterAt(announce));
    return {
      pct: Math.round(announce * 100),
      a,
      stenosis: Math.max(0, (1 - a / areaOf(taper(announce))) * 100),
    };
  }, [announce]);

  const worst = useMemo(() => {
    const scanned = profile.filter((p) => p.t >= minSeen);
    if (!scanned.length) return null;
    return scanned.reduce((lo, p) => (p.a < lo.a ? p : lo), scanned[0]);
  }, [minSeen]);

  const { cy, s, plot } = L;
  const x = xOf(t);
  const rPx = (live.d / 2) * L.pxPerMm;

  /* Sensing pair sits 1 mm apart, straddling x, with the excitation pair
     outside it. The midpoint of the sensing pair IS the measurement point:
     drawing the electrodes distal of the sampled position detached the trace
     marker from the trace by about a tenth of the plot height on the lesion
     flank, which is exactly where a reader looks hardest. */
  const half = L.pxPerMm / 2;
  const e1 = x - half;
  const e2 = x + half;
  const x1 = e1 - 20 * s;
  const x2 = e2 + 20 * s;
  const axis = x;

  const scannedClip = `M${xOf(minSeen)},${plot.top - 10 * s} H${xOf(1)} V${plot.bottom + 10 * s} H${xOf(minSeen)} Z`;

  return (
    <div ref={wrapRef} className="relative">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
        <p className="label max-w-[46ch] leading-[1.9] text-ash">
          Drag along the vessel to move the catheter. Arrow keys work too.
        </p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          <Legend swatch="bg-gfp" label="Measured lumen" />
          <Legend swatch="bg-reference" label="Reference calibre" />
          <Legend swatch="bg-mcherry" label="Minimum lumen area" />
        </div>
      </div>

      {/* Not `overflow-hidden`: nothing overflows, and it clipped the focus
          ring off the only keyboard-operable control on the site. */}
      <div className="mt-7 border hairline bg-ink">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${L.height}`}
          className={`w-full touch-none select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          role="slider"
          tabIndex={0}
          aria-label="Catheter position along the vessel"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={announced.pct}
          aria-valuetext={
            `Position ${announced.pct} percent along the vessel. ` +
            `Lumen area ${announced.a.toFixed(2)} square millimetres, ` +
            `${announced.stenosis.toFixed(0)} percent area stenosis.` +
            (worst && minSeen < 0.52
              ? ` Minimum lumen area found: ${worst.a.toFixed(2)} square millimetres.`
              : "")
          }
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
        >
          <defs>
            <linearGradient id="cp-wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff3e6c" stopOpacity="0.16" />
              <stop offset="50%" stopColor="#ff3e6c" stopOpacity="0.46" />
              <stop offset="100%" stopColor="#ff3e6c" stopOpacity="0.16" />
            </linearGradient>
            <linearGradient id="cp-lumen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5ff0c4" stopOpacity="0.10" />
              <stop offset="50%" stopColor="#5ff0c4" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#5ff0c4" stopOpacity="0.10" />
            </linearGradient>
            <linearGradient id="cp-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5ff0c4" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#5ff0c4" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="cp-tip">
              <stop offset="0%" stopColor="#5ff0c4" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#5ff0c4" stopOpacity="0" />
            </radialGradient>
            <clipPath id="cp-scanned">
              <path d={scannedClip} />
            </clipPath>
          </defs>

          {/* ---- vessel ---- */}
          <path d={L.wallTopPath} fill="url(#cp-wall)" />
          <path d={L.wallBottomPath} fill="url(#cp-wall)" />
          <path d={L.lumenPath} fill="url(#cp-lumen)" />
          <path d={L.intimaTop} fill="none" stroke="#ff3e6c" strokeOpacity="0.7" strokeWidth={1.4 * s} />
          <path d={L.intimaBottom} fill="none" stroke="#ff3e6c" strokeOpacity="0.7" strokeWidth={1.4 * s} />

          {/* Field lines between the sensing electrodes, filling the lumen. */}
          <g stroke="#5ff0c4" fill="none" strokeLinecap="round">
            {Array.from({ length: 9 }, (_, i) => {
              const k = (i + 1) / 10;
              const bulge = rPx * 0.94 * Math.sin(k * Math.PI) * 1.55;
              const pulse = 0.42 + 0.34 * Math.sin(phase * 3.1 - i * 0.55);
              return (
                <g key={i} strokeOpacity={pulse * 0.9} strokeWidth={1.1 * s}>
                  <path d={`M${e1},${cy} Q${axis},${cy - bulge} ${e2},${cy}`} />
                  <path d={`M${e1},${cy} Q${axis},${cy + bulge} ${e2},${cy}`} />
                </g>
              );
            })}
          </g>

          <circle cx={axis} cy={cy} r={rPx * 2.4} fill="url(#cp-tip)" opacity="0.5" />

          {/* ---- catheter ---- */}
          <g>
            <line x1={-12} y1={cy} x2={x2} y2={cy} stroke="#9aa4b4" strokeWidth={3.4 * s} strokeLinecap="round" />
            <line x1={-12} y1={cy} x2={x2} y2={cy} stroke="#ece7dd" strokeWidth={1.1 * s} strokeOpacity="0.6" />
            {[x1, x2].map((ex) => (
              <rect key={ex} x={ex - 2.5 * s} y={cy - 5 * s} width={5 * s} height={10 * s} rx={s} fill="#ff3e6c" />
            ))}
            {[e1, e2].map((ex) => (
              <rect key={ex} x={ex - 2.5 * s} y={cy - 5.5 * s} width={5 * s} height={11 * s} rx={s} fill="#5ff0c4" />
            ))}
          </g>

          {/* Position spine tying the vessel to the trace below. */}
          <line
            x1={axis}
            y1={cy + rPx + 10 * s}
            x2={axis}
            y2={plot.bottom}
            stroke="#5ff0c4"
            strokeOpacity="0.32"
            strokeDasharray={`${3 * s} ${5 * s}`}
            strokeWidth={s}
          />

          {/* ---- pullback trace ---- */}
          <g>
            <line x1={PAD} y1={plot.bottom} x2={WIDTH - PAD} y2={plot.bottom} stroke="#3a4657" strokeWidth={s} />
            <path d={L.refPath} stroke="#58667d" strokeWidth={1.4 * s} fill="none" strokeDasharray={`${5 * s} ${4 * s}`} />

            <g clipPath="url(#cp-scanned)">
              <path
                d={`${L.tracePath}L${xOf(1)},${plot.bottom}L${xOf(0)},${plot.bottom}Z`}
                fill="url(#cp-fill)"
              />
              <path d={L.tracePath} stroke="#5ff0c4" strokeWidth={2 * s} fill="none" strokeLinejoin="round" />
            </g>

            {/* Minimum lumen area found so far. */}
            {worst && minSeen < 0.52 && (
              <g>
                <circle cx={xOf(worst.t)} cy={L.yOfArea(worst.a)} r={4.5 * s} fill="#ff3e6c" />
                <line
                  x1={xOf(worst.t)}
                  y1={L.yOfArea(worst.a)}
                  x2={xOf(worst.t)}
                  y2={plot.top - 16 * s}
                  stroke="#ff3e6c"
                  strokeOpacity="0.45"
                  strokeWidth={s}
                />
                <text
                  x={xOf(worst.t)}
                  y={plot.top - 24 * s}
                  fill="#ff3e6c"
                  fontSize={12.5 * s}
                  fontFamily="var(--font-sans)"
                  fontWeight="500"
                  letterSpacing={1.6 * s}
                  textAnchor="middle"
                >
                  MLA {worst.a.toFixed(2)} mm²
                </text>
              </g>
            )}

            <circle cx={axis} cy={L.yOfArea(live.a)} r={5 * s} fill="#5ff0c4" />
            <circle cx={axis} cy={L.yOfArea(live.a)} r={11 * s} fill="none" stroke="#5ff0c4" strokeOpacity="0.35" strokeWidth={s} />
          </g>

          <text x={PAD} y={plot.bottom + 24 * s} fill="#8b95a5" fontSize={11.5 * s} fontFamily="var(--font-sans)" fontWeight="500" letterSpacing={1.8 * s}>
            PROXIMAL
          </text>
          <text x={WIDTH - PAD} y={plot.bottom + 24 * s} fill="#8b95a5" fontSize={11.5 * s} fontFamily="var(--font-sans)" fontWeight="500" letterSpacing={1.8 * s} textAnchor="end">
            DISTAL
          </text>
        </svg>

        {/* ---- readout ---- */}
        <div className="grid grid-cols-2 border-t hairline md:grid-cols-4">
          <Readout label="Lumen area" value={live.a.toFixed(2)} unit="mm²" />
          <Readout label="Diameter" value={live.d.toFixed(2)} unit="mm" />
          <Readout label="Conductance" value={live.g.toFixed(2)} unit="mS" />
          <Readout
            label="Area stenosis"
            value={live.stenosis.toFixed(0)}
            unit="%"
            alert={live.stenosis > 50}
          />
        </div>
      </div>

      {/* No aria-live mirror here. `aria-valuetext` already announces the
          reading on every change, and a second live region simply doubled
          every one of the ~250 updates the auto-pullback emits. */}
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="label flex items-center gap-2.5 text-ash">
      <span className={`block h-px w-6 ${swatch}`} />
      {label}
    </span>
  );
}

function Readout({
  label,
  value,
  unit,
  alert = false,
}: {
  label: string;
  value: string;
  unit: string;
  alert?: boolean;
}) {
  return (
    <div className="border-b hairline px-5 py-5 [&:nth-child(-n+2)]:border-b md:border-b-0 md:border-r md:last:border-r-0">
      <p className="label text-ash">{label}</p>
      <p className="mt-2.5 flex items-baseline gap-1.5">
        <span
          className={`figures text-[2rem] leading-none ${alert ? "text-mcherry" : "text-bone"}`}
        >
          {value}
        </span>
        <span className="text-[0.8125rem] text-dim">{unit}</span>
      </p>
    </div>
  );
}
