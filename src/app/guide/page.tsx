import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Reveal } from "@/components/Reveal";
import { Band } from "@/components/Section";
import { guideIntro, sections, passes, type Block } from "@/content/guide";
import { disclaimer } from "@/content/site";

export const metadata: Metadata = {
  title: "How this site was built",
  description:
    "A full build log: research, design decisions, the WebGL confocal field, the interactive conductance pullback, and deployment.",
};

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="grid gap-6">
      {blocks.map((b, i) => {
        if (b.kind === "p") {
          return (
            <p key={i} className="max-w-[64ch] text-[1.0625rem] leading-[1.75] text-ash">
              {b.text}
            </p>
          );
        }
        if (b.kind === "list") {
          return (
            <ul key={i} className="grid max-w-[64ch] gap-3.5">
              {b.items.map((item) => (
                <li
                  key={item}
                  className="hang text-[1rem] leading-[1.7] text-ash before:mr-3 before:text-gfp before:content-['–']"
                >
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (b.kind === "note") {
          return (
            <p
              key={i}
              className="max-w-[64ch] border-l-2 border-mcherry/60 py-1 pl-5 text-[0.9375rem] leading-[1.7] text-ash"
            >
              {b.text}
            </p>
          );
        }
        return (
          <figure key={i} className="max-w-full overflow-hidden border hairline bg-ink">
            <figcaption className="label border-b hairline px-5 py-2.5 text-dim">
              {b.lang}
            </figcaption>
            <pre className="overflow-x-auto px-5 py-5">
              <code className="text-[0.8125rem] leading-[1.75] text-bone [font-family:ui-monospace,SFMono-Regular,Menlo,monospace]">
                {b.text}
              </code>
            </pre>
          </figure>
        );
      })}
    </div>
  );
}

export default function GuidePage() {
  return (
    <>
      <PageHead
        title={
          <>
            How this site
            <br />
            <em className="italic text-gfp">was built.</em>
          </>
        }
        lede={guideIntro.lede}
        meta={guideIntro.meta}
      />

      <Band>
        <div className="shell py-16 md:py-24">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[15rem_1fr] lg:items-start">
            {/* contents */}
            <nav aria-label="Contents" className="lg:sticky lg:top-28">
              <h2 className="label border-b hairline pb-4 text-dim">Contents</h2>
              <ol className="mt-5 grid gap-2.5">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex gap-3 text-[0.875rem] leading-snug text-ash transition-colors duration-300 hover:text-gfp"
                    >
                      <span className="shrink-0 text-dim">{s.n}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
                {passes.length > 0 && (
                  <li>
                    <a
                      href="#passes"
                      className="flex gap-3 text-[0.875rem] leading-snug text-ash transition-colors duration-300 hover:text-gfp"
                    >
                      <span className="shrink-0 text-dim">11</span>
                      What three passes caught
                    </a>
                  </li>
                )}
              </ol>
            </nav>

            {/* body */}
            <div className="grid gap-16 md:gap-24">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <Reveal>
                    <div className="flex items-baseline gap-4 border-t hairline pt-6">
                      <span className="text-[0.875rem] text-gfp">{s.n}</span>
                      <h2 className="display text-large leading-[1.05] text-bone">
                        {s.title}
                      </h2>
                    </div>
                  </Reveal>
                  <Reveal delay={90} className="mt-8">
                    <Blocks blocks={s.blocks} />
                  </Reveal>
                </section>
              ))}

              {passes.length > 0 && (
                <section id="passes" className="scroll-mt-28">
                  <Reveal>
                    <div className="flex items-baseline gap-4 border-t hairline pt-6">
                      <span className="text-[0.875rem] text-gfp">11</span>
                      <h2 className="display text-large leading-[1.05] text-bone">
                        What three iteration passes caught
                      </h2>
                    </div>
                  </Reveal>

                  <Reveal delay={90} className="mt-8 grid gap-10">
                    <p className="max-w-[64ch] text-[1.0625rem] leading-[1.75] text-ash">
                      The brief asked for three fine-toothed passes after the site was
                      otherwise finished. Each one is listed with what it actually found,
                      including the things that were embarrassing.
                    </p>

                    {passes.map((p) => (
                      <div key={p.n}>
                        <h3 className="flex items-baseline gap-3.5">
                          <span className="text-[0.875rem] text-gfp">{p.n}</span>
                          <span className="text-[1.125rem] text-bone">{p.title}</span>
                        </h3>
                        <ul className="mt-4 grid max-w-[64ch] gap-3">
                          {p.found.map((f) => (
                            <li
                              key={f}
                              className="hang text-[0.9375rem] leading-[1.7] text-ash before:mr-3 before:text-dim before:content-['–']"
                            >
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </Reveal>
                </section>
              )}

              <Reveal className="border-t hairline pt-8">
                <p className="max-w-[64ch] text-[0.9375rem] leading-[1.8] text-dim">
                  {disclaimer}
                </p>
                <Link
                  href="/"
                  className="label group mt-8 flex w-fit items-center gap-3 border hairline px-6 py-4 text-bone transition-colors duration-300 hover:border-gfp hover:text-gfp"
                >
                  Back to the site
                  <span aria-hidden className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}
