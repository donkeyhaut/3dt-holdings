"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { nav, org } from "@/content/site";
import { setScrollLocked } from "./SmoothScroll";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* scrollHeight forces a layout flush, and this handler also writes state, so
     reading it on every raw scroll event is a read-after-write cycle. It only
     changes on resize, so it is cached and the handler is rAF-throttled. */
  useEffect(() => {
    let raf = 0;
    let max = 0;
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };

    measure();
    onScroll();
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Lock the page behind the overlay. Hiding it visually is not enough: without
     `inert`, tabbing out of the panel walks straight into the page underneath,
     which is fully focusable behind an opaque backdrop. The header itself stays
     live because it holds the close button. Closing on navigation is handled by
     the links themselves rather than by an effect on pathname. */
  useEffect(() => {
    const behind = [document.getElementById("main")].filter(
      Boolean,
    ) as HTMLElement[];

    const release = () => {
      document.body.style.overflow = "";
      setScrollLocked(false);
      behind.forEach((el) => el.removeAttribute("inert"));
    };

    if (open) {
      document.body.style.overflow = "hidden";
      setScrollLocked(true);
      behind.forEach((el) => el.setAttribute("inert", ""));
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    } else {
      release();
    }
    return release;
  }, [open]);

  // Send focus back where it came from, but only after a real close.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-[100] transition-[background-color,backdrop-filter,border-color] duration-500",
          scrolled || open
            ? "border-b hairline bg-void/72 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        {/* Depth-through-document readout. The site is a specimen; this is how
            far down the stack you are. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px origin-left bg-gfp/70"
          style={{ transform: `scaleX(${progress})`, transition: "transform 120ms linear" }}
        />

        <div className="shell flex h-[68px] items-center justify-between gap-6 md:h-[76px]">
          {/* No aria-label. An explicit one broke Label in Name: the two spans
              have no whitespace between them, so the visible string is
              "3DTHoldings", which is not a substring of any readable label.
              The name is built from the visible text plus an sr-only suffix. */}
          <Link href="/" className="group flex items-baseline gap-2.5">
            <span className="display text-[1.75rem] leading-none tracking-tight transition-colors duration-300 group-hover:text-gfp">
              3DT
            </span>{" "}
            <span className="label hidden text-dim transition-colors duration-300 group-hover:text-ash xs:block">
              Holdings
            </span>
            <span className="sr-only">, home</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "group relative flex items-baseline gap-1.5 py-2 text-[0.9375rem] transition-colors duration-300",
                    active ? "text-bone" : "text-ash hover:text-bone",
                  )}
                >
                  <span className="text-[0.625rem] font-medium text-dim transition-colors duration-300 group-hover:text-gfp">
                    {item.index}
                  </span>
                  {item.label}
                  <span
                    className={clsx(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gfp transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/services"
              className="label hidden border hairline px-4 py-2.5 text-bone transition-colors duration-300 hover:border-gfp hover:text-gfp md:inline-block"
            >
              Run a study
            </Link>

            <button
              type="button"
              ref={toggleRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="label flex items-center gap-2.5 py-2 text-bone lg:hidden"
            >
              {open ? "Close" : "Menu"}
              <span className="relative block h-3 w-4" aria-hidden>
                <span
                  className={clsx(
                    "absolute left-0 block h-px w-full bg-current transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0.5",
                  )}
                />
                <span
                  className={clsx(
                    "absolute left-0 block h-px w-full bg-current transition-all duration-300",
                    open ? "top-1.5 -rotate-45" : "top-[9px]",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        ref={panelRef}
        aria-hidden={!open}
        className={clsx(
          "fixed inset-0 z-[99] bg-void/97 backdrop-blur-2xl transition-[opacity,visibility] duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="shell flex h-full flex-col justify-center pt-[68px]">
          <nav aria-label="Mobile">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b hairline py-5 transition-colors duration-300"
                style={{
                  transitionDelay: open ? `${120 + i * 55}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(14px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "700ms",
                  transitionTimingFunction: "var(--ease-out-expo)",
                }}
              >
                <span className="text-[0.6875rem] font-medium text-dim">
                  {item.index}
                </span>
                <span className="display text-large text-bone transition-colors duration-300 group-hover:text-gfp">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-1">
            {/* Guarded like the nav links: `visibility` interpolates discretely,
                so the panel stays visible for the whole 500ms close transition
                after aria-hidden has already flipped to true. */}
            <a href={org.phoneHref} tabIndex={open ? 0 : -1} className="label text-gfp">
              {org.phone}
            </a>
            <p className="label text-dim">{org.address[0]}</p>
            <p className="label text-dim">{org.address[1]}</p>
          </div>
        </div>
      </div>
    </>
  );
}
