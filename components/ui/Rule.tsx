import { cn } from "@/lib/cn";
import { MarksAtColumns } from "@/components/ui/Plus";

/**
 * Element-bound horizontal hairline. Spans the content band (centered, capped
 * at --grid-max, inset by --gutter) so it aligns with the grid and content.
 * Optional crosshairs mark where it crosses the vertical column lines. There is
 * no horizontal grid field — horizontals exist only as element edges via this.
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
    <div className={cn("w-full", className)}>
      <div className="mx-auto w-full max-w-(--grid-max) px-(--gutter)">
        <div className="relative h-px w-full">
          <span
            className={cn(
              "block h-px w-full",
              strong ? "bg-line-strong" : "bg-line",
            )}
          />
          {marks && <MarksAtColumns />}
        </div>
      </div>
    </div>
  );
}
