import { cn } from "@/lib/cn";

type GridLinesProps = {
  /** Number of equal columns; interior boundaries are drawn as hairlines. */
  columns?: number;
  className?: string;
};

/**
 * Decorative-structural overlay: exposed vertical column rules,
 * like the construction lines of an architectural plan.
 * Purely visual — hidden from assistive tech, no layout cost.
 */
export function GridLines({ columns = 4, className }: GridLinesProps) {
  const step = `calc(100% / ${columns})`;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(to right, transparent 0, transparent calc(${step} - 1px), var(--color-line) calc(${step} - 1px), var(--color-line) ${step})`,
        // trim the trailing line that lands on the right edge
        backgroundSize: `calc(100% + 1px) 100%`,
      }}
    />
  );
}
