import Link from "next/link";
import { nav, org, disclaimer } from "@/content/site";

const columns = [
  {
    title: "Navigate",
    links: nav.map((n) => ({ href: n.href, label: n.label })),
  },
  {
    title: "Laboratory",
    // Anchored, not four different promises resolving to the same bare page.
    links: [
      { href: "/facilities#lab-surgical", label: "Surgical suites" },
      { href: "/facilities#lab-imaging", label: "Imaging" },
      { href: "/facilities#lab-pathology", label: "Pathology core" },
      { href: "/facilities#lab-computational", label: "Computational" },
      { href: "/services", label: "Contract research" },
    ],
  },
  {
    title: "Colophon",
    links: [{ href: "/guide", label: "How this site was built" }],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t hairline bg-ink">
      <div className="shell pb-12 pt-20 md:pb-16 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="label text-dim">{org.expansion}</p>
            <p className="display mt-5 text-giant leading-[0.9] text-bone">
              Make the body
              <br />
              <span className="italic text-gfp">measurable.</span>
            </p>

            <address className="mt-9 not-italic">
              <p className="text-[0.9375rem] leading-relaxed text-ash">
                {org.address[0]}
                <br />
                {org.address[1]}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={org.phoneHref}
                  className="text-[0.9375rem] text-bone transition-colors duration-300 hover:text-gfp"
                >
                  {org.phone}
                </a>
                <a
                  href={`mailto:${org.email}`}
                  className="text-[0.9375rem] text-bone transition-colors duration-300 hover:text-gfp"
                >
                  {org.email}
                </a>
              </div>
              <p className="label mt-4 text-dim">{org.coords}</p>
            </address>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="label text-dim">{col.title}</h2>
                <ul className="mt-5 space-y-2.5">
                  {col.links.map((link, i) => (
                    <li key={`${link.href}-${i}`}>
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] text-ash transition-colors duration-300 hover:text-gfp"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rule mt-16" />

        <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
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
    </footer>
  );
}
