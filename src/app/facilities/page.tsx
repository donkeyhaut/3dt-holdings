import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Band, SectionHead } from "@/components/Section";
import { facilities } from "@/content/site";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Two sterile surgical suites, two flat-panel C-arms, IVUS and echocardiography, an immunopathology core and a multiphysics simulation group, on one corridor in San Diego.",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHead
        title={
          <>
            Bench to first-in-human,
            <br />
            <em className="italic text-gfp">without leaving the building.</em>
          </>
        }
        lede={facilities.lede}
        meta={[
          { label: "Surgical suites", value: "02" },
          { label: "Flat-panel C-arms", value: "02" },
          { label: "Pathology read", value: "In house" },
        ]}
      />

      <Band>
        <div className="shell py-16 md:py-20">
          <Reveal>
            <Plate
              name="catheter-macro"
              caption="Distal tip of a conductance guidewire. The ring electrodes banded along the shaft are the whole instrument: two to inject current, two to read the voltage that survives."
              className="[&>div]:aspect-[21/9]"
              sizes="(max-width: 1440px) 100vw, 1440px"
              priority
            />
          </Reveal>
        </div>
      </Band>

      <Band>
        <div className="shell py-20 md:py-28">
          <SectionHead
            title="What is behind the door"
            lede="Four groups, one corridor. A device can be cut in the morning, implanted in the afternoon and read by a pathologist the same week."
            align="split"
          />

          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.groups.map((g, i) => (
              <Reveal
                key={g.n}
                id={`lab-${g.id}`}
                delay={i * 90}
                className="scroll-mt-28 border-t hairline pt-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="label text-gfp">{g.n}</span>
                  <h3 className="text-[1.0625rem] text-bone">{g.title}</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="hang text-[0.875rem] leading-relaxed text-ash before:mr-2.5 before:text-dim before:content-['–']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      {/* ---- scales ---- */}
      <Band>
        <div className="shell py-20 md:py-28">
          <SectionHead
            title={
              <>
                Multi-scale, because
                <br />
                a device fails at <em className="italic text-gfp">one scale.</em>
              </>
            }
            lede="Work here runs across disciplines, across physics and across four orders of magnitude of length. A thrombogenic surface is a molecular problem that presents as an organ-level one."
            align="split"
          />

          <div className="mt-16 grid gap-px bg-steel/35 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.scales.map((s, i) => (
              <Reveal key={s} delay={i * 80} className="bg-void p-7 lg:p-9">
                <span className="label text-gfp">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-5 text-medium text-bone">{s}</h3>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
            <p className="text-[1rem] leading-relaxed text-ash">
              Experimental and computational. Fluid and solid mechanics, mass transport,
              electromagnetics. Molecule to cell to tissue to organ. The point of holding all
              of it in one place is that the simulation and the animal can disagree, and
              somebody in the building has to reconcile them before the program moves.
            </p>
            <div className="border-t hairline pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <h3 className="label text-dim">External resources</h3>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {facilities.partners.map((p) => (
                  <li key={p} className="text-[0.9375rem] text-bone">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.875rem] leading-relaxed text-dim">
                {facilities.partnerNote}
              </p>
            </div>
          </Reveal>
        </div>
      </Band>

      {/* ---- accreditation ---- */}
      <Band>
        <div className="shell py-20 md:py-28">
          <SectionHead
            title="Accredited, not merely equipped"
            lede="Animal work is the part of device development where a shortcut is both easiest and least forgivable. The program here is registered and externally accredited, and the paperwork travels with the study."
            align="split"
          />

          <div className="mt-14 grid gap-px bg-steel/35 sm:grid-cols-3">
            {facilities.accreditations.map((a, i) => (
              <Reveal key={a.name} delay={i * 90} className="bg-void p-8 lg:p-10">
                <p className="display text-[2.125rem] text-bone">{a.name}</p>
                <p className="mt-3 text-[0.9375rem] leading-snug text-ash">{a.detail}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-8">
            <p className="max-w-[68ch] border-l-2 border-mcherry/50 py-1 pl-5 text-[0.9375rem] leading-[1.75] text-ash">
              {facilities.accreditationNote}
            </p>
          </Reveal>

          <Reveal delay={260} className="mt-12">
            <Link
              href="/services"
              className="label group flex w-fit items-center gap-3 bg-gfp px-6 py-4 text-void transition-colors duration-300 hover:bg-bone"
            >
              Commission a study
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
