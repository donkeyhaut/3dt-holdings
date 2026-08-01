"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ventures } from "@/content/site";
import { PLATES, type PlateName } from "./Plate";

/**
 * The plate follows the cursor on fine pointers and is suppressed entirely on
 * touch, where there is no hover state to hang it on and the rows carry the
 * information by themselves.
 */
export function VentureList() {
  const [active, setActive] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  /* Only plates that have actually been hovered are mounted. The ghost is
     position:fixed and therefore always inside the viewport, so mounting all
     five meant the browser fetched every one of them during the hero's paint
     window, on a page the visitor may never scroll. */
  const [seen, setSeen] = useState<number[]>([]);
  const ghost = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const activate = (i: number) => {
    setActive(i);
    setSeen((s) => (s.includes(i) ? s : [...s, i]));
  };
  const deactivate = (i: number) => setActive((a) => (a === i ? null : a));

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!fine) return;
    // The transform is written imperatively, so the reduced-motion media block
    // in CSS cannot neutralise it. It has to be handled here.
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const place = (x: number, y: number) => {
      if (ghost.current) {
        ghost.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
      if (!smooth) place(e.clientX, e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    if (smooth) {
      const loop = () => {
        const p = pos.current;
        p.x += (p.tx - p.x) * 0.13;
        p.y += (p.ty - p.y) * 0.13;
        place(p.x, p.y);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [fine]);

  return (
    <div className="relative">
      <ul>
        {ventures.map((v, i) => (
          <li key={v.id}>
            <Link
              href={`/ventures#${v.id}`}
              onPointerEnter={() => activate(i)}
              onPointerLeave={() => deactivate(i)}
              onFocus={() => activate(i)}
              onBlur={() => deactivate(i)}
              className={clsx(
                "group relative grid items-baseline gap-x-8 gap-y-3 border-b hairline py-8 transition-colors duration-500 md:grid-cols-[auto_1.4fr_1fr_auto] md:py-10",
                active !== null && active !== i ? "opacity-45" : "opacity-100",
              )}
            >
              <span className="label text-dim transition-colors duration-300 group-hover:text-gfp">
                {v.index}
              </span>

              <h3 className="display text-large leading-[1.05] text-bone transition-colors duration-500 group-hover:text-gfp">
                {v.name}
              </h3>

              <div>
                <p className="text-[0.9375rem] leading-snug text-bone">{v.lede}</p>
                <p className="label mt-2 text-dim">{v.sector}</p>
              </div>

              <span className="label hidden items-center gap-2.5 text-dim transition-colors duration-300 group-hover:text-gfp md:flex">
                {v.lead}
                <span aria-hidden className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                  →
                </span>
              </span>

              {/* Touch fallback: the plate simply lives in the row. Breakpoint
                  matches the ghost's own `hidden lg:block`, or a coarse-pointer
                  tablet at 768px+ would get neither. */}
              {!fine && (
                <div className="relative mt-2 aspect-[16/7] w-full overflow-hidden ring-1 ring-inset ring-steel/45 lg:hidden">
                  <Image
                    src={`/plates/${v.plate}.jpg`}
                    alt={PLATES[v.plate as PlateName].alt}
                    fill
                    sizes="(max-width: 1440px) 100vw, 1440px"
                    className="object-cover"
                  />
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {fine && (
        <div
          ref={ghost}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-50 hidden lg:block"
        >
          <div
            className={clsx(
              "relative h-[248px] w-[372px] overflow-hidden ring-1 ring-inset ring-gfp/25 transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease-out-expo)]",
              active !== null ? "scale-100 opacity-100" : "scale-90 opacity-0",
            )}
          >
            {ventures.map((v, i) =>
              seen.includes(i) ? (
                <Image
                  key={v.id}
                  src={`/plates/${v.plate}.jpg`}
                  alt=""
                  fill
                  sizes="372px"
                  className={clsx(
                    "object-cover transition-opacity duration-500",
                    active === i ? "opacity-100" : "opacity-0",
                  )}
                />
              ) : null,
            )}
            <div className="absolute inset-0 bg-void/25" />
          </div>
        </div>
      )}
    </div>
  );
}
