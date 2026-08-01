"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { hero, org } from "@/content/site";

// The field is decoration with a cost. Keep it out of the critical path and
// let the type paint first.
const CellField = dynamic(
  () => import("@/components/webgl/CellField").then((m) => m.CellField),
  { ssr: false },
);

export function Hero() {
  const [ready, setReady] = useState(false);
  // The headline lines slide up out of clipped boxes. Once they have landed the
  // clipping has to go, or it shears the glow off the accent word into a
  // rectangle.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    const t = setTimeout(() => setSettled(true), 1900);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t);
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <CellField />
        {/* Anchors the field to the page edges so it reads as a specimen under
            glass rather than a video playing behind text. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(88%_78%_at_62%_46%,transparent_0%,transparent_38%,var(--color-void)_100%)]"
        />
        {/* Asymmetric scrim: the type lives on the left, so the specimen is
            allowed to stay bright on the right. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-void via-void/55 to-transparent lg:via-void/35"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-void to-transparent"
        />
      </div>

      <div className="shell flex flex-1 flex-col pb-8 pt-[108px] md:pb-10 md:pt-[132px]">
        <h1 className="display mt-auto pt-10 text-mega text-bone">
          {hero.lines.map((line, i) => (
            <span key={line} className={settled ? "block" : "block overflow-hidden"}>
              <span
                className="block transition-transform duration-[1200ms] [transition-timing-function:var(--ease-out-expo)]"
                style={{
                  transform: ready ? "none" : "translateY(105%)",
                  transitionDelay: `${180 + i * 110}ms`,
                }}
              >
                {i === hero.lines.length - 1 ? (
                  <em className="not-italic text-gfp [text-shadow:0_0_50px_color-mix(in_oklab,var(--color-gfp)_38%,transparent)]">
                    {line}
                  </em>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <div
          className="mt-10 grid gap-x-16 gap-y-8 transition-all duration-1000 [transition-timing-function:var(--ease-out-expo)] lg:mt-12 lg:grid-cols-[1fr_auto] lg:items-end"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "none" : "translateY(18px)",
            transitionDelay: "620ms",
          }}
        >
          <p className="lede max-w-[54ch]">{hero.lede}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={hero.cta.href}
              className="label group flex items-center gap-3 bg-gfp px-6 py-4 text-void transition-colors duration-300 hover:bg-bone"
            >
              {hero.cta.label}
              <span aria-hidden className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={hero.secondary.href}
              className="label border hairline px-6 py-4 text-bone transition-colors duration-300 hover:border-gfp hover:text-gfp"
            >
              {hero.secondary.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="shell pb-7">
        <div className="rule" />
        <div className="mt-4 flex items-center justify-between gap-6">
          <p className="label text-dim">
            {org.city} <span className="hidden sm:inline">· {org.coords}</span>
          </p>
          <p className="label hidden items-center gap-3 text-dim md:flex">
            Scroll to scan through the specimen
            <span className="relative block h-6 w-px overflow-hidden bg-steel">
              <span className="absolute inset-x-0 top-0 block h-2.5 animate-[scan_2.6s_var(--ease-in-out-quint)_infinite] bg-gfp" />
            </span>
          </p>
          <p className="label text-dim">
            Est. <span className="text-ash">{org.founded}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
