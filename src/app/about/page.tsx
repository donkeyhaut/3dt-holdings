import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Band, SectionHead } from "@/components/Section";
import { about, people, vision, org } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "An incubator that owns its own operating room. Eleven engineers, surgeons, pathologists and technicians in San Diego, founded 2007 by Ghassan Kassab.",
};

export default function AboutPage() {
  return (
    <>
      <PageHead
        title={
          <>
            An incubator that owns
            <br />
            its own <em className="italic text-gfp">operating room.</em>
          </>
        }
        meta={[
          { label: "Founded", value: String(org.founded) },
          { label: "People", value: String(people.length) },
          { label: "Location", value: "San Diego" },
        ]}
      />

      <Band>
        <div className="shell py-16 md:py-24">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            <div className="grid gap-6">
              {about.body.map((para, i) => (
                <Reveal key={i} delay={i * 90}>
                  <p className="max-w-[60ch] text-[1.0625rem] leading-[1.75] text-ash">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160}>
              <Plate
                name="organoid"
                caption="Cardiac organoid in dark-field suspension. Tissue-scale models sit between the simulation and the animal, and narrow what the animal has to answer."
                className="[&>div]:aspect-square"
                sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 42vw, 605px"
              />
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ---- vision ---- */}
      <Band>
        <div className="shell py-20 md:py-28">
          <Reveal>
            <blockquote className="display max-w-[22ch] text-giant leading-[0.95] text-bone">
              {vision}
            </blockquote>
          </Reveal>
        </div>
      </Band>

      {/* ---- people ---- */}
      <Band>
        <div className="shell py-20 md:py-28">
          <SectionHead
            title="Who is in the building"
            lede="Cumulatively, several centuries of device development. Most of it was spent inside Medtronic, Abbott, Dexcom and the operating theatre, which is why the failure modes get caught early here."
            align="split"
          />

          <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {people.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 90} className="border-t hairline pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display text-medium leading-tight text-bone">
                    {p.name}
                    {p.credential && (
                      <span className="ml-2 font-sans text-[0.8125rem] tracking-wide text-dim">
                        {p.credential}
                      </span>
                    )}
                  </h3>
                  <span className="label shrink-0 text-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="label mt-3 text-gfp">{p.role}</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ash">{p.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      <Band>
        <div className="shell py-24 md:py-32">
          <Reveal>
            <h2 className="display max-w-[18ch] text-large text-bone">
              We hire engineers who have shipped a Class III device.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-9 flex flex-wrap gap-3">
            <a
              href={`mailto:${org.email}?subject=${encodeURIComponent("Careers at 3DT")}`}
              className="label group flex items-center gap-3 bg-gfp px-6 py-4 text-void transition-colors duration-300 hover:bg-bone"
            >
              Careers
              <span aria-hidden className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                →
              </span>
            </a>
            <Link
              href="/facilities"
              className="label border hairline px-6 py-4 text-bone transition-colors duration-300 hover:border-gfp hover:text-gfp"
            >
              See the laboratory
            </Link>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
