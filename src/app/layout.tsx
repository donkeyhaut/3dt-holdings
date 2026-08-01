import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { org } from "@/content/site";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Grain } from "@/components/Grain";
import "./globals.css";

/**
 * Libre Caslon Condensed, variable weight. SIL Open Font License.
 * Roman only. Nothing on the site is set in a sloped cut any more, and a
 * declared face is a preloaded face whether or not it is ever drawn.
 * The word for that cut is left out of this comment on purpose: Tailwind
 * scans source text, and seeing it here is enough to emit a dead utility.
 */
const display = localFont({
  src: [
    { path: "../fonts/caslon-cond-var.woff2", weight: "400 700", style: "normal" },
  ],
  variable: "--font-caslon",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

/**
 * Söhne, Klim Type Foundry. Licensed; not redistributable without one.
 * Only the two weights the site actually renders are declared. The 600 and the
 * sloped cut were being preloaded at high priority on every route, about 79 KB
 * competing with the critical path, and never drawn.
 */
const sans = localFont({
  src: [
    { path: "../fonts/soehne-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/soehne-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-soehne",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Helvetica Neue", "sans-serif"],
});

const SITE = "https://3dt-holdings.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${org.name} · ${org.tagline}`,
    template: `%s · ${org.name}`,
  },
  description:
    "A San Diego laboratory where cardiovascular and metabolic devices are invented, proven in vivo, and spun out as companies. Bench to first-in-human under a single roof.",
  applicationName: org.legal,
  authors: [{ name: "Claude Fable 5" }],
  openGraph: {
    title: `${org.name} · ${org.tagline}`,
    description:
      "Cardiovascular and metabolic device R&D, contract research and venture incubation in San Diego.",
    url: SITE,
    siteName: org.legal,
    type: "website",
    images: [{ url: "/plates/hero-endothelium.jpg", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${org.name} · ${org.tagline}`,
    description:
      "Cardiovascular and metabolic device R&D, contract research and venture incubation in San Diego.",
    images: ["/plates/hero-endothelium.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04060a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        <Grain />
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[120] focus:bg-gfp focus:px-4 focus:py-3 focus:text-void"
        >
          Skip to content
        </a>
        <Nav />
        {/* tabIndex makes the skip link actually move focus in Safari, which
            does not shift the sequential-focus point on its own. */}
        <main id="main" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
