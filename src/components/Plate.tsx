"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/** Every generated plate, with its true pixel dimensions. */
export const PLATES = {
  "hero-endothelium": { w: 1536, h: 1024, alt: "Confocal projection of a vascular endothelial monolayer, actin in green, nuclei in blue", scale: "40 µm" },
  "coronary-section": { w: 1024, h: 1024, alt: "Immunofluorescence cross-section of a coronary artery showing concentric media and elastic lamina", scale: "200 µm" },
  "capillary-bed": { w: 1536, h: 1024, alt: "Fluorescent tracer perfusing a branching microvascular capillary bed", scale: "100 µm" },
  "cardiac-muscle": { w: 1024, h: 1024, alt: "Cardiac muscle at high magnification with sarcomere striations and packed mitochondria", scale: "20 µm" },
  "gi-villi": { w: 1024, h: 1024, alt: "Cross-section of intestinal mucosa with villi and epithelial nuclei", scale: "150 µm" },
  organoid: { w: 1024, h: 1024, alt: "A single spherical cardiac organoid in dark-field suspension", scale: "80 µm" },
  "catheter-macro": { w: 1536, h: 1024, alt: "Macro of a guidewire distal tip: helical coil, atraumatic tip and ring electrodes", scale: "500 µm" },
  "field-lines": { w: 1536, h: 1024, alt: "Visualization of an electrical conductance field between two electrodes inside a vessel lumen", scale: "1 mm" },
} as const;

export type PlateName = keyof typeof PLATES;

type Props = {
  name: PlateName;
  caption?: string;
  index?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Slow counter-scroll inside the frame. */
  parallax?: boolean;
  /** Show corner ticks and a scale bar. */
  furniture?: boolean;
  /** Pure texture: drop the alt text and hide the figure from the a11y tree. */
  decorative?: boolean;
};

export function Plate({
  name,
  caption,
  index,
  className,
  imageClassName,
  sizes = "(max-width: 1024px) 100vw, (max-width: 1440px) 50vw, 700px",
  priority = false,
  parallax = true,
  furniture = true,
  decorative = false,
}: Props) {
  const meta = PLATES[name];
  const frame = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    if (!parallax) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = frame.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        if (r.bottom < -200 || r.top > vh + 200) return;
        // -1 above the fold, +1 below it.
        const progress = (r.top + r.height / 2 - vh / 2) / vh;
        setShift(Math.max(-1, Math.min(1, progress)) * 5.5);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [parallax]);

  return (
    <figure className={clsx("group", className)} aria-hidden={decorative || undefined}>
      <div
        ref={frame}
        className="relative overflow-hidden bg-void ring-1 ring-inset ring-steel/45"
      >
        <div
          className="relative h-full w-full will-change-transform"
          style={{
            transform: parallax ? `translate3d(0, ${shift}%, 0) scale(1.13)` : undefined,
          }}
        >
          <Image
            src={`/plates/${name}.jpg`}
            alt={decorative ? "" : meta.alt}
            width={meta.w}
            height={meta.h}
            sizes={sizes}
            priority={priority}
            className={clsx(
              "h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.035]",
              imageClassName,
            )}
          />
        </div>

        {/* Keeps bright plates from fighting the copy that sits beside them. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/55 via-transparent to-void/15"
        />

        {furniture && (
          <>
            {/* Registration ticks, as on a microscope eyepiece reticle. */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {(
                [
                  "left-3 top-3 border-l border-t",
                  "right-3 top-3 border-r border-t",
                  "left-3 bottom-3 border-b border-l",
                  "right-3 bottom-3 border-b border-r",
                ] as const
              ).map((pos) => (
                <span
                  key={pos}
                  className={clsx("absolute h-3.5 w-3.5 border-bone/35", pos)}
                />
              ))}
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2"
            >
              <span className="block h-px w-9 bg-bone/60" />
              {/* Not `.label`: uppercasing turns the micron sign into a capital
                  mu, so "40 µm" reads as "40 MM". */}
              <span className="text-[0.625rem] font-medium tracking-[0.1em] text-bone/70">
                {meta.scale}
              </span>
            </div>

            {index && (
              <span className="label pointer-events-none absolute left-4 top-4 text-[0.5625rem] text-bone/60">
                Plate {index}
              </span>
            )}
          </>
        )}
      </div>

      {caption && (
        <figcaption className="label mt-3.5 leading-[1.7] text-dim">{caption}</figcaption>
      )}
    </figure>
  );
}
