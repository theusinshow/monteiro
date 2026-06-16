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
