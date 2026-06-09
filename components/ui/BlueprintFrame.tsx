/**
 * A fixed, page-wide blueprint frame: two continuous vertical rails at the
 * content edges that run the full height of the viewport, plus crosshair marks.
 * Purely structural atmosphere — sits behind content, hidden from AT.
 */
export function BlueprintFrame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 flex justify-center"
    >
      <div className="relative h-full w-full max-w-[var(--container-max)] px-[var(--gutter)]">
        <span className="absolute inset-y-0 left-[var(--gutter)] w-px bg-line" />
        <span className="absolute inset-y-0 right-[var(--gutter)] w-px bg-line" />
        {/* crosshairs near the top where the rails begin */}
        <span className="absolute left-[var(--gutter)] top-24 h-2 w-2 -translate-x-1/2">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/40" />
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-ink/40" />
        </span>
        <span className="absolute right-[var(--gutter)] top-24 h-2 w-2 translate-x-1/2">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/40" />
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-ink/40" />
        </span>
      </div>
    </div>
  );
}
