import Link from "next/link";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-32">
      <p className="text-[0.875rem] text-mcherry">404</p>
      <h1 className="display mt-6 max-w-[16ch] text-giant text-bone">
        No signal at <em className="italic text-gfp">this address.</em>
      </h1>
      <p className="lede mt-8">
        The page you asked for is not here. Everything the site does have is one click away.
      </p>
      <ul className="mt-12 grid gap-px border-t hairline bg-steel/35 sm:grid-cols-2 lg:grid-cols-3">
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-baseline gap-3 bg-void px-6 py-6 transition-colors duration-300"
            >
              <span className="text-[0.6875rem] text-dim">{item.index}</span>
              <span className="display text-medium text-bone transition-colors duration-300 group-hover:text-gfp">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
