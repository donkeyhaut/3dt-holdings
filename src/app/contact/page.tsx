import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/Reveal";
import { Band } from "@/components/Section";
import { contact, org, disclaimer } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `${org.legal}, ${org.address.join(", ")}. ${org.phone}.`,
};

const SUBJECTS: Record<string, string> = {
  "Contract research": "Contract research enquiry",
  "Venture and licensing": "Venture and licensing enquiry",
  Careers: "Careers at 3DT",
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        title={
          <>
            Bring us a problem
            <br />
            <em className="not-italic text-gfp">in a vessel.</em>
          </>
        }
        lede={contact.lede}
      />

      <Band>
        <div className="shell py-16 md:py-24">
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <Reveal>
                <h2 className="label text-dim">Route your enquiry</h2>
              </Reveal>

              <ul className="mt-7">
                {contact.routes.map((r, i) => (
                  <Reveal key={r.label} as="li" delay={i * 90}>
                    <a
                      href={`mailto:${org.email}?subject=${encodeURIComponent(SUBJECTS[r.label] ?? r.label)}`}
                      className="group flex items-baseline justify-between gap-6 border-b hairline py-7 transition-colors duration-300"
                    >
                      <span>
                        <span className="display block text-medium text-bone transition-colors duration-500 group-hover:text-gfp">
                          {r.label}
                        </span>
                        <span className="mt-2 block text-[0.9375rem] text-ash">
                          {r.detail}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="label shrink-0 text-dim transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1 group-hover:text-gfp"
                      >
                        →
                      </span>
                    </a>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={280} className="mt-12 grid gap-8 sm:grid-cols-2">
                <div>
                  <h2 className="label text-dim">Address</h2>
                  <address className="mt-3 not-italic text-[1rem] leading-relaxed text-bone">
                    {org.legal}
                    <br />
                    {org.address[0]}
                    <br />
                    {org.address[1]}
                  </address>
                </div>
                <div>
                  <h2 className="label text-dim">Direct</h2>
                  <p className="mt-3 flex flex-col gap-2">
                    <a
                      href={org.phoneHref}
                      className="text-[1rem] text-bone transition-colors duration-300 hover:text-gfp"
                    >
                      {org.phone}
                    </a>
                    <a
                      href={`mailto:${org.email}`}
                      className="text-[1rem] text-bone transition-colors duration-300 hover:text-gfp"
                    >
                      {org.email}
                    </a>
                  </p>
                  <p className="label mt-4 leading-[1.9] text-dim">
                    Sorrento Valley, twelve minutes from UC San Diego
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={160}>
              <Plate
                name="field-lines"
                caption="Conductance field between two electrodes inside a vessel lumen. The measurement that most conversations here eventually come back to."
                className="[&>div]:aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 46vw, 662px"
              />
            </Reveal>
          </div>

          {/* The site carries no footer, so the standing notice lives here, on
              the page that already handles the entity and its address. It is
              also the only route to the colophon.

              Two things about this block are deliberate. It sits outside the
              two-column grid, so that it closes the page at every width: inside
              the left column it would fall above the plate once the grid
              stacks. And it is not a Reveal, because `.reveal` is opacity 0
              until the observer fires, which would make the standing notice
              conditional on JavaScript. */}
          <div className="mt-16 flex flex-col gap-6 border-t hairline pt-7 lg:flex-row lg:items-start lg:justify-between">
            <p className="label max-w-2xl leading-[1.9] text-dim">{disclaimer}</p>
            <p className="label shrink-0 text-dim">
              Designed and built by{" "}
              {/* Underlined, not just recolored: a link inside a text block
                  cannot rely on color alone, and ash on dim is only 1.48:1. */}
              <Link
                href="/guide"
                className="text-bone underline decoration-steel underline-offset-4 transition-colors hover:text-gfp hover:decoration-gfp"
              >
                Claude Fable 5
              </Link>
            </p>
          </div>
        </div>
      </Band>
    </>
  );
}
