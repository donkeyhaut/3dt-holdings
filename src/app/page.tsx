import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Band, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Plate, type PlateName } from "@/components/Plate";
import { ConductanceProfile } from "@/components/ConductanceProfile";
import { VentureList } from "@/components/VentureList";
import { metrics, thesis, programs, facilities, ventures } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />

      {/* ---- readout band ------------------------------------------------ */}
      <Band>
        <div className="shell grid gap-px border-x-0 bg-steel/35 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 80}
              className="bg-void px-0 py-9 sm:px-7 sm:first:pl-0 lg:py-12"
            >
              <p className="display text-[clamp(3rem,5.6vw,4.75rem)] leading-none text-gfp">
                {m.value}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-snug text-bone">{m.label}</p>
              <p className="label mt-3 leading-[1.8] text-dim">{m.detail}</p>
            </Reveal>
          ))}
        </div>
      </Band>

      {/* ---- the through-line -------------------------------------------- */}
      <Band id="conductance">
        <div className="shell py-24 md:py-36">
          <SectionHead
            title={
              <>
                Everything here descends
                <br />
                from one <em className="italic text-gfp">measurement.</em>
              </>
            }
            lede={thesis.lede}
            align="split"
          />

          <Reveal delay={120} className="mt-16 md:mt-20">
            <ConductanceProfile />
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {thesis.beats.map((beat, i) => (
              <Reveal key={beat.n} delay={i * 90} className="border-t hairline pt-6">
                <div className="flex items-baseline gap-3">
                  <span className="label text-gfp">{beat.n}</span>
                  <h3 className="text-[1.0625rem] text-bone">{beat.title}</h3>
                </div>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ash">{beat.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      {/* ---- programs ----------------------------------------------------- */}
      <Band id="programs">
        <div className="shell py-24 md:py-36">
          <SectionHead
            title={
              <>
                Four problems, each
                <br />
                measured before it is treated.
              </>
            }
            lede="Every program starts with a quantity a clinician cannot currently see, and ends with a device that reports it during the procedure rather than after it."
            align="split"
          />

          <div className="mt-16 grid gap-x-10 gap-y-16 md:mt-20 lg:grid-cols-2">
            {programs.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 110}>
                <Link href={`/research#${p.id}`} className="group block">
                  <Plate
                    name={p.plate as PlateName}
                    index={p.index}
                    className="[&>div]:aspect-[16/10]"
                    sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 46vw, 662px"
                  />

                  <div className="mt-7 flex items-baseline justify-between gap-6">
                    <span className="label text-dim">{p.field}</span>
                    <span className="label text-dim transition-colors duration-300 group-hover:text-gfp">
                      {p.status}
                    </span>
                  </div>

                  <h3 className="display mt-4 text-medium leading-[1.1] text-bone transition-colors duration-500 group-hover:text-gfp">
                    {p.name}
                  </h3>

                  <p className="mt-4 max-w-[54ch] text-[0.9375rem] leading-relaxed text-ash">
                    {p.problem}
                  </p>

                  {p.stat && (
                    <p className="mt-6 flex items-baseline gap-3.5 border-t hairline pt-5">
                      <span className="display text-[2rem] leading-none text-mcherry">
                        {p.stat.value}
                      </span>
                      <span className="label max-w-[34ch] leading-[1.8] text-dim">
                        {p.stat.label}
                      </span>
                    </p>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      {/* ---- ventures ----------------------------------------------------- */}
      <Band id="ventures">
        <div className="shell py-24 md:py-36">
          <SectionHead
            title={
              <>
                {ventures.length} companies, each
                <br />
                proven <em className="italic text-gfp">in this building.</em>
              </>
            }
            lede="An incubator that owns an operating room does not have to take a founder's word for whether the device works. Nothing is spun out of 3DT until it has survived a large-animal study downstairs."
            align="split"
          />

          <Reveal delay={110} className="mt-14 md:mt-16">
            <VentureList />
          </Reveal>
        </div>
      </Band>

      {/* ---- the building -------------------------------------------------- */}
      <Band id="facility" rule={false}>
        <div className="relative overflow-hidden border-t hairline bg-ink">
          <div className="absolute inset-0 opacity-[0.13]">
            <Plate
              name="capillary-bed"
              decorative
              furniture={false}
              parallax={false}
              className="h-full [&>div]:h-full [&>div]:ring-0"
              imageClassName="h-full"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink"
          />

          <div className="shell relative py-24 md:py-36">
            <SectionHead
              title={
                <>
                  Bench to first-in-human,
                  <br />
                  <em className="italic text-gfp">without leaving the building.</em>
                </>
              }
              lede={facilities.lede}
              align="split"
            />

            <div className="mt-16 grid gap-x-10 gap-y-12 md:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {facilities.groups.map((g, i) => (
                <Reveal key={g.n} delay={i * 90} className="border-t hairline pt-6">
                  <div className="flex items-baseline gap-3">
                    <span className="label text-gfp">{g.n}</span>
                    <h3 className="text-[1.0625rem] text-bone">{g.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
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

            <Reveal
              delay={140}
              className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t hairline pt-8"
            >
              {facilities.accreditations.map((a) => (
                <span key={a.name} className="flex items-baseline gap-2.5">
                  <span className="text-[0.9375rem] font-medium tracking-wide text-bone">
                    {a.name}
                  </span>
                  <span className="label text-dim">{a.detail}</span>
                </span>
              ))}
              <Link
                href="/facilities"
                className="label ml-auto flex items-center gap-2.5 text-gfp"
              >
                Tour the laboratory <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* ---- close --------------------------------------------------------- */}
      <Band rule={false}>
        <div className="shell py-28 md:py-40">
          <Reveal>
            <h2 className="display max-w-[16ch] text-giant text-bone">
              Bring us a problem <em className="italic text-gfp">in a vessel.</em>
            </h2>
          </Reveal>
          <Reveal delay={180} className="mt-11 flex flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="label group flex items-center gap-3 bg-gfp px-6 py-4 text-void transition-colors duration-300 hover:bg-bone"
            >
              Commission a study
              <span aria-hidden className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/contact"
              className="label border hairline px-6 py-4 text-bone transition-colors duration-300 hover:border-gfp hover:text-gfp"
            >
              Contact
            </Link>
          </Reveal>
        </div>
      </Band>
    </>
  );
}
