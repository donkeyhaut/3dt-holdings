import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Band, SectionHead } from "@/components/Section";
import { services, org } from "@/content/site";

export const metadata: Metadata = {
  title: "Contract research",
  description:
    "In vivo and bench studies, immunopathology and multiphysics simulation, designed, run and read in one San Diego facility.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHead
        title={
          <>
            Use the laboratory
            <br />
            <em className="italic text-gfp">without building one.</em>
          </>
        }
        lede={services.lede}
        meta={[
          { label: "Study design", value: "In house" },
          { label: "Pathology read", value: "Board certified" },
          { label: "Turnaround", value: "Days, not weeks" },
        ]}
      />

      <Band>
        <div className="shell py-20 md:py-28">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div className="grid gap-10">
              {services.lines.map((l, i) => (
                <Reveal key={l.n} delay={i * 90} className="border-t hairline pt-6">
                  <div className="flex items-baseline gap-3.5">
                    <span className="label text-gfp">{l.n}</span>
                    <h2 className="text-[1.125rem] text-bone">{l.title}</h2>
                  </div>
                  <p className="mt-3.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ash">
                    {l.body}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={140} className="lg:sticky lg:top-28">
              <Plate
                name="coronary-section"
                caption="Immunopathology read from the EPIL core. Immunofluorescence, immunoperoxidase, and single, double or triple-antibody methods, reported by a board-certified pathologist."
                className="[&>div]:aspect-square"
                sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 46vw, 662px"
              />
            </Reveal>
          </div>
        </div>
      </Band>

      <Band>
        <div className="shell py-20 md:py-28">
          <SectionHead
            title="Where we are useful"
            lede="Depth in a few anatomies rather than a catalogue across all of them. If the study touches a vessel, a heart or a gut, it is probably in scope."
            align="split"
          />

          <ul className="mt-14 grid gap-px bg-steel/35 sm:grid-cols-2 lg:grid-cols-5">
            {services.domains.map((d, i) => (
              <Reveal
                key={d}
                as="li"
                delay={i * 45}
                className="bg-void px-6 py-7 text-[0.9375rem] text-bone"
              >
                <span className="label mb-3 block text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {d}
              </Reveal>
            ))}
          </ul>
        </div>
      </Band>

      <Band>
        <div className="shell py-24 md:py-32">
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <h2 className="display max-w-[16ch] text-giant text-bone">
                  Tell us what you need <em className="italic text-gfp">to prove.</em>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={170} className="grid gap-4">
              <p className="text-[1rem] leading-relaxed text-ash">
                Send the device description, the endpoint and the decision the data has to
                support. A protocol sketch and a quote come back from the people who will run
                the study, not from a sales desk.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href={`mailto:${org.email}?subject=${encodeURIComponent("Contract research enquiry")}`}
                  className="label group flex items-center gap-3 bg-gfp px-6 py-4 text-void transition-colors duration-300 hover:bg-bone"
                >
                  {org.email}
                  <span aria-hidden className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href={org.phoneHref}
                  className="label border hairline px-6 py-4 text-bone transition-colors duration-300 hover:border-gfp hover:text-gfp"
                >
                  {org.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Band>
    </>
  );
}
