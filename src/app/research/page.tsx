import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Plate, type PlateName } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Band } from "@/components/Section";
import { programs, thesis } from "@/content/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Four active device programs in interventional cardiology, structural heart, acute myocardial infarction and transcatheter valve therapy.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHead
        title={
          <>
            Four problems, each measured
            <br />
            before it is <em className="italic text-gfp">treated.</em>
          </>
        }
        lede="Every program below begins with a quantity a clinician cannot currently see during the procedure, and ends with a device that reports it in real time. The common substrate is conductance."
        meta={[
          { label: "Active programs", value: "04" },
          { label: "Patent estate", value: "200+" },
          { label: "Therapeutic areas", value: "Cardiovascular · GI" },
        ]}
      />

      {programs.map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <Band key={p.id} id={p.id}>
            <div className="shell py-20 md:py-28">
              <div className="grid gap-x-16 gap-y-10 lg:grid-cols-2 lg:items-center">
                <Reveal className={flip ? "lg:order-2" : undefined}>
                  <Plate
                    name={p.plate as PlateName}
                    index={p.index}
                    className="[&>div]:aspect-[4/3]"
                    sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 46vw, 662px"
                  />
                </Reveal>

                <div className={flip ? "lg:order-1" : undefined}>
                  <Reveal className="flex items-baseline gap-3.5">
                    <span className="label text-gfp">{p.index}</span>
                    <span className="label text-dim">{p.field}</span>
                  </Reveal>

                  <Reveal delay={80}>
                    <h2 className="display mt-6 text-large leading-[1.05] text-bone">
                      {p.name}
                    </h2>
                  </Reveal>

                  {p.stat && (
                    <Reveal delay={140}>
                      <p className="mt-8 flex items-baseline gap-4 border-y hairline py-5">
                        <span className="display text-[2.75rem] leading-none text-mcherry">
                          {p.stat.value}
                        </span>
                        <span className="label max-w-[38ch] leading-[1.9] text-dim">
                          {p.stat.label}
                        </span>
                      </p>
                    </Reveal>
                  )}

                  <Reveal delay={180} className="mt-8">
                    <h3 className="label text-dim">The problem</h3>
                    <p className="mt-3 max-w-[56ch] text-[1rem] leading-relaxed text-ash">
                      {p.problem}
                    </p>
                  </Reveal>

                  <Reveal delay={240} className="mt-7">
                    <h3 className="label text-dim">The approach</h3>
                    <p className="mt-3 max-w-[56ch] text-[1rem] leading-relaxed text-bone">
                      {p.approach}
                    </p>
                  </Reveal>

                  <Reveal delay={300} className="mt-8 flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-gfp" />
                    <span className="label text-ash">{p.status}</span>
                  </Reveal>
                </div>
              </div>
            </div>
          </Band>
        );
      })}

      <Band>
        <div className="shell py-24 md:py-32">
          <Reveal>
            <h2 className="display max-w-[20ch] text-large text-bone">
              All four rest on the same measurement.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lede mt-7 max-w-[58ch]">{thesis.lede}</p>
          </Reveal>
          <Reveal delay={220} className="mt-10">
            <Link
              href="/#conductance"
              className="label group flex w-fit items-center gap-3 border hairline px-6 py-4 text-bone transition-colors duration-300 hover:border-gfp hover:text-gfp"
            >
              Run a conductance pullback
              <span aria-hidden className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
