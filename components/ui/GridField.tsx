"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * The persistent global grid: a fixed, full-height centered band of vertical
 * hairlines (responsive 4 / 6 / 8 columns, driven by --grid-cols). Mounted once
 * at the app root, identical on every route. The lines span the content band
 * (capped at --grid-max, inset by --gutter) so they align exactly with content;
 * the gutters read as the clean outer margins. The vertical field is the ONLY
 * persistent structure — horizontals come from element edges (see Rule).
 *
 * On first load the field fades in once ("the drawing appears"), via a CSS
 * opacity transition toggled after mount — server and first client render agree
 * on the hidden state (no hydration mismatch), and `motion-reduce` collapses the
 * transition to instant. Structure, never decoration: aria-hidden,
 * pointer-events none, behind content.
 */
export function GridField() {
  const [shown, setShown] = useState(false);

  useEffect(() => setShown(true), []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 flex justify-center"
    >
      <div
        className={cn(
          "relative h-full w-full max-w-(--grid-max) px-(--gutter)",
          "transition-opacity duration-1200 ease-out motion-reduce:transition-none",
          shown ? "opacity-100" : "opacity-0",
        )}
      >
        <div
          className="relative h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, var(--color-line) 0, var(--color-line) 1px, transparent 1px, transparent var(--col))",
          }}
        >
          {/* explicit right edge (the repeat's final line lands just outside) */}
          <span className="absolute inset-y-0 right-0 w-px bg-line" />
        </div>
      </div>
    </div>
  );
}
