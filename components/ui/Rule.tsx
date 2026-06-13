import { cn } from "@/lib/cn";
import { MarksAtColumns } from "@/components/ui/Plus";

/**
 * Element-bound horizontal hairline. Spans the grid band (centered, capped at
 * --grid-max). Optional crosshairs mark where it crosses the vertical column
 * lines. There is no horizontal grid field — horizontals exist only as element
 * edges via this primitive.
 */
export function Rule({
  marks = false,
  strong = false,
  className,
}: {
  marks?: boolean;
  strong?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative h-px w-full", className)}>
      <span
        className={cn(
          "mx-auto block h-px w-full",
          strong ? "bg-line-strong" : "bg-line",
        )}
        style={{ maxWidth: "var(--grid-max)" }}
      />
      {marks && <MarksAtColumns />}
    </div>
  );
}
