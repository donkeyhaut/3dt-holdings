/**
 * Photon shot noise. A real fluorescence image is never clean, and a perfectly
 * flat black on a 4K display reads as dead pixels rather than a dark field.
 * Screen-blended at 4% so it registers as texture, not as dirt.
 */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Grain() {
  return (
    <div
      aria-hidden
      className="grain"
      style={{ ["--grain-src" as string]: NOISE }}
    />
  );
}
