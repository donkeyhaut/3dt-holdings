"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import clsx from "clsx";

/**
 * Kept to a short list of tags on purpose. A fully polymorphic `as` forces
 * TypeScript to intersect every intrinsic element's props, which collapses to
 * `never` and then to an unrepresentable union.
 */
type Tag = "div" | "section" | "article" | "li" | "figure" | "p" | "span";

type Props = {
  children: ReactNode;
  /** ms */
  delay?: number;
  /** "fade" translates up; "clip" wipes the element in from its own top edge. */
  variant?: "fade" | "clip";
  as?: Tag;
  className?: string;
  id?: string;
};

export function Reveal({
  children,
  delay = 0,
  variant = "fade",
  as = "div",
  className,
  id,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const props = {
    ref: ref as React.Ref<never>,
    id,
    "data-shown": shown,
    style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
    className: clsx(variant === "clip" ? "reveal-clip" : "reveal", className),
    children,
  };

  switch (as) {
    case "section":
      return <section {...props} />;
    case "article":
      return <article {...props} />;
    case "li":
      return <li {...props} />;
    case "figure":
      return <figure {...props} />;
    case "p":
      return <p {...props} />;
    case "span":
      return <span {...props} />;
    default:
      return <div {...props} />;
  }
}
