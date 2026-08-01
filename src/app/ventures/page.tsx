import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Plate, type PlateName } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Band } from "@/components/Section";
import { ventures } from "@/content/site";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "Five operating companies spun out of 3DT: Intelligent Delivery Systems, GRest, Retroperfusion, Pericardial Access and GI Bionics.",
};

export default function VenturesPage() {
  return (
    <>
      <PageHead
        title={
          <>
            Five companies, each proven
            <br />
            <em className="italic text-gfp">in this building.</em>
          </>
        }
        lede="An incubator that owns an operating room does not have to take a founder's word for whether a device works. Nothing leaves 3DT as a company until it has survived a large-animal study downstairs."
        meta={[
          { label: "Operating companies", value: "05" },
          { label: "Founded", value: "2007" },
          { label: "Model", value: "Invent · prove · spin out" },
        ]}
      />

      {ventures.map((v, i) => {
        const flip = i % 2 === 1;
        return (
          <Band key={v.id} id={v.id}>
            <div className="shell py-20 md:py-28">
              <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                <Reveal className={flip ? "lg:order-2" : undefined}>
                  <Plate
                    name={v.plate as PlateName}
                    index={v.index}
                    className="[&>div]:aspect-[5/4]"
                    sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 44vw, 634px"
                  />
                </Reveal>

                <div className={flip ? "lg:order-1" : undefined}>
                  <Reveal className="flex items-baseline gap-3.5">
                    <span className="label text-gfp">{v.index}</span>
                    <span className="label text-dim">{v.sector}</span>
                  </Reveal>

                  <Reveal delay={80}>
                    <h2 className="display mt-6 text-large leading-[1.02] text-bone">
                      {v.name}
                    </h2>
                    <p className="label mt-3 text-dim">{v.entity}</p>
                  </Reveal>

                  <Reveal delay={140}>
                    <p className="display mt-8 text-medium italic leading-tight text-gfp">
                      {v.lede}
                    </p>
                  </Reveal>

                  <Reveal delay={200}>
                    <p className="mt-6 max-w-[56ch] text-[1rem] leading-relaxed text-ash">
                      {v.body}
                    </p>
                  </Reveal>

                  <Reveal delay={260} className="mt-8 border-t hairline pt-5">
                    <p className="label text-dim">Lead program</p>
                    <p className="mt-2.5 text-[1.0625rem] font-medium text-bone">{v.lead}</p>
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
            <h2 className="display max-w-[18ch] text-large text-bone">
              Have a platform that needs an animal answer?
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="label group flex items-center gap-3 bg-gfp px-6 py-4 text-void transition-colors duration-300 hover:bg-bone"
            >
              Contract research
              <span aria-hidden className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/contact"
              className="label border hairline px-6 py-4 text-bone transition-colors duration-300 hover:border-gfp hover:text-gfp"
            >
              Talk to us
            </Link>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
