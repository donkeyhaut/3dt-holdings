/**
 * The 3DT lockup. Traced from the client-supplied "3DT R1" artwork, which
 * shipped as a PNG wrapped in an SVG envelope; the raster is discarded and the
 * two colour layers are real paths, so the mark stays crisp at any size and
 * the wordmark can take a colour from the page.
 *
 * The mark keeps its brand gold (`--color-brand`). The wordmark inherits
 * `currentColor`, because the supplied artwork sets it in near-black and the
 * site's field is near-black: rendered as given it would be invisible.
 *
 * Coordinates are the artwork's own 1620 x 556 grid. potrace emits paths in a
 * flipped, 10x space, hence the `translate/scale` on each group. Cropping to
 * the mark alone is a viewBox change, nothing more.
 */
type LogoProps = {
  /** `lockup` is mark plus wordmark; `mark` is the asterisk alone. */
  variant?: "lockup" | "mark";
  className?: string;
};

const FLIP = "translate(0,556) scale(0.1,-0.1)";

export function Logo({ variant = "lockup", className }: LogoProps) {
  const lockup = variant === "lockup";
  return (
    <svg
      viewBox={lockup ? "0 0 1620 556" : "0 0 576 556"}
      className={className}
      role="img"
      aria-hidden
      focusable="false"
    >
      <g transform={FLIP} fill="var(--color-brand)" stroke="none">
        <path d="M2555 5531 c-51 -23 -101 -79 -114 -128 -7 -25 -11 -302 -11 -808 l0 -770 -552 552 c-383 383 -564 557 -590 568 -50 20 -124 19 -173 -4 -25 -12 -114 -94 -241 -222 -179 -182 -202 -209 -214 -252 -10 -39 -11 -59 0 -105 l12 -57 554 -555 c305 -306 554 -559 554 -563 0 -4 -362 -7 -805 -7 -889 0 -842 3 -908 -65 -59 -61 -62 -79 -62 -385 0 -304 3 -325 59 -382 71 -73 -23 -68 1235 -68 l1131 0 0 -1062 c0 -1010 1 -1065 19 -1103 22 -50 71 -92 114 -100 18 -3 174 -5 348 -3 l316 3 37 29 c21 16 47 47 57 70 18 39 19 87 19 1104 l0 1062 1128 0 c1076 0 1129 1 1167 19 22 10 52 31 67 47 55 59 58 79 58 384 0 231 -3 287 -16 318 -19 47 -58 88 -106 113 -36 18 -70 19 -843 19 -443 0 -805 3 -805 8 0 4 243 250 541 547 322 322 549 556 561 580 28 54 28 136 0 190 -29 56 -397 420 -444 440 -50 20 -124 19 -173 -4 -27 -13 -218 -197 -585 -565 l-545 -546 -5 782 c-5 778 -5 783 -27 823 -27 50 -58 80 -105 100 -31 12 -88 15 -325 15 -257 0 -292 -2 -328 -19z" />
        <path d="M1535 1993 c-81 -18 -92 -27 -463 -397 -212 -210 -383 -388 -395 -411 -27 -52 -29 -145 -3 -195 28 -54 394 -416 440 -435 51 -21 135 -21 183 1 53 24 764 734 792 791 25 51 28 128 6 181 -19 45 -383 415 -435 441 -39 20 -95 31 -125 24z" />
        <path d="M4156 1989 c-21 -5 -59 -25 -85 -43 -80 -59 -379 -370 -397 -412 -21 -50 -21 -128 0 -179 24 -56 744 -777 800 -800 51 -21 135 -21 183 1 54 25 418 389 439 439 23 56 21 133 -4 186 -31 65 -754 783 -802 797 -59 18 -93 21 -134 11z" />
      </g>
      {lockup && (
        <g transform={FLIP} fill="currentColor" stroke="none">
          <path d="M10718 4553 l-798 -3 0 -1735 0 -1735 883 0 c932 1 975 2 1167 49 422 101 767 374 987 781 135 250 203 551 203 905 0 497 -128 879 -405 1205 -209 247 -483 412 -810 489 -190 45 -238 47 -1227 44z m960 -759 c247 -50 474 -251 573 -508 58 -151 73 -240 73 -451 1 -249 -27 -384 -117 -560 -106 -209 -264 -350 -477 -426 -64 -23 -74 -23 -532 -27 l-468 -3 0 995 0 996 435 0 c355 0 450 -3 513 -16z" />
          <path d="M6850 4185 l0 -365 681 0 c421 0 679 -4 677 -9 -1 -6 -126 -165 -275 -355 -150 -190 -273 -352 -273 -359 0 -15 126 -456 132 -462 2 -2 38 7 79 21 98 34 262 43 366 21 231 -50 383 -234 383 -468 0 -135 -45 -244 -143 -342 -99 -101 -218 -147 -382 -147 -166 0 -283 48 -401 165 -103 103 -189 249 -209 356 -12 67 7 69 -381 -41 -198 -56 -361 -104 -363 -106 -2 -2 6 -46 18 -96 110 -448 453 -811 881 -931 258 -73 600 -82 841 -23 237 59 414 160 595 340 215 215 320 459 331 766 6 167 -6 285 -44 404 -98 315 -343 549 -693 662 -71 23 -79 28 -68 42 7 9 167 182 356 385 l342 368 0 270 0 269 -1225 0 -1225 0 0 -365z" />
          <path d="M13160 4180 l0 -370 550 0 550 0 0 -1365 0 -1365 415 0 415 0 0 1365 0 1365 555 0 555 0 0 370 0 370 -1520 0 -1520 0 0 -370z" />
        </g>
      )}
    </svg>
  );
}
