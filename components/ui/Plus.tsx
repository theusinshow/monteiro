import { cn } from "@/lib/cn";

type Corner = "tl" | "tr" | "bl" | "br";

const cornerPos: Record<Corner, string> = {
  tl: "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
  tr: "right-0 top-0 translate-x-1/2 -translate-y-1/2",
  bl: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
  br: "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
};

/** A small crosshair (+) marker, like a registration mark on a drawing. */
export function Plus({
  corner,
  className,
  size = 9,
}: {
  corner?: Corner;
  className?: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-20",
        corner && cornerPos[corner],
        className,
      )}
      style={{ width: size, height: size }}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/45" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-ink/45" />
    </span>
  );
}

/** Renders crosshair markers at all four corners of a positioned parent. */
export function CornerMarks({ className }: { className?: string }) {
  return (
    <>
      <Plus corner="tl" className={className} />
      <Plus corner="tr" className={className} />
      <Plus corner="bl" className={className} />
      <Plus corner="br" className={className} />
    </>
  );
}

/** A single + tick at a horizontal percentage of the parent band. */
function ColMark({ left }: { left: number }) {
  return (
    <span
      aria-hidden
      className="absolute top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${left}%` }}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/40" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink/40" />
    </span>
  );
}

const PCTS = {
  sm: [25, 50, 75],
  md: [100 / 6, 200 / 6, 50, 400 / 6, 500 / 6],
  lg: [12.5, 25, 37.5, 50, 62.5, 75, 87.5],
};

/**
 * Crosshairs at every interior column boundary of the global grid. Positions
 * are percentages of the band (== the content Container), so they land exactly
 * on the field lines and on content column edges. The active set swaps with the
 * breakpoint to match --grid-cols (4 / 6 / 8). Place inside a relatively-
 * positioned, band-width row (e.g. Rule).
 */
export function MarksAtColumns() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 mx-auto block"
      style={{ maxWidth: "var(--grid-max)" }}
    >
      <span className="absolute inset-0 lg:hidden md:hidden">
        {PCTS.sm.map((p) => (
          <ColMark key={p} left={p} />
        ))}
      </span>
      <span className="absolute inset-0 hidden md:block lg:hidden">
        {PCTS.md.map((p) => (
          <ColMark key={p} left={p} />
        ))}
      </span>
      <span className="absolute inset-0 hidden lg:block">
        {PCTS.lg.map((p) => (
          <ColMark key={p} left={p} />
        ))}
      </span>
    </span>
  );
}
