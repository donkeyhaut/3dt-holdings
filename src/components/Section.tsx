import clsx from "clsx";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Band({
  children,
  className,
  id,
  rule = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  rule?: boolean;
}) {
  return (
    <section id={id} className={clsx("relative", className)}>
      {rule && (
        <div className="shell">
          <div className="rule" />
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * Title and lede only. No kicker line above the heading: the heading is large
 * enough to open a section on its own, and a label stacked over it just makes
 * the reader parse two things before reaching the sentence.
 */
export function SectionHead({
  title,
  lede,
  className,
  align = "left",
}: {
  title: ReactNode;
  lede?: string;
  className?: string;
  align?: "left" | "split";
}) {
  return (
    <div
      className={clsx(
        align === "split"
          ? "grid gap-x-16 gap-y-7 lg:grid-cols-[1.15fr_1fr] lg:items-end"
          : "",
        className,
      )}
    >
      <Reveal>
        <h2 className="display text-giant text-bone">{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={120}>
          <p className="lede max-w-[52ch] lg:pb-3">{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
