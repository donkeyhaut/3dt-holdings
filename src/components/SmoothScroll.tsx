"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * `overflow: hidden` on the body stops the user scrolling but leaves the
 * container programmatically scrollable, which is exactly what Lenis does with
 * its intercepted wheel deltas. Anything that covers the page has to pause the
 * instance too, so it is exposed here.
 */
let instance: Lenis | null = null;

export function setScrollLocked(locked: boolean) {
  if (locked) instance?.stop();
  else instance?.start();
}

/**
 * Lenis drives the scroll so the confocal focal-plane sweep in the hero has a
 * continuous input rather than the browser's stepped wheel events. Disabled
 * outright for anyone who has asked for reduced motion, and for coarse
 * pointers, where hijacking native momentum always feels wrong.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    });

    instance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
