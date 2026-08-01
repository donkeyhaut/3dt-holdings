import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * The interior-page counterpart to the home hero. No WebGL: the specimen is a
 * front-door gesture, and repeating it on every route would cheapen it and
 * cost every page a canvas.
 */
export function PageHead({
  title,
  lede,
  meta,
}: {
  title: ReactNode;
  lede?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(70%_100%_at_18%_0%,color-mix(in_oklab,var(--color-gfp)_7%,transparent)_0%,transparent_70%)]"
      />

      <div className="shell relative pb-16 pt-[136px] md:pb-24 md:pt-[196px]">
        <Reveal>
          <h1 className="display max-w-[19ch] text-giant text-bone">{title}</h1>
        </Reveal>

        {lede && (
          <Reveal delay={120}>
            <p className="lede mt-9 max-w-[58ch]">{lede}</p>
          </Reveal>
        )}

        {meta && meta.length > 0 && (
          <Reveal delay={200} className="mt-14 border-t hairline pt-7">
            <dl className="flex flex-wrap gap-x-14 gap-y-6">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="label text-dim">{m.label}</dt>
                  <dd className="mt-2.5 text-[1.25rem] text-bone">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </header>
  );
}
