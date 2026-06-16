import { cn } from "@/lib/cn";

/**
 * Element-bound horizontal hairline, contained within the content band
 * (centered, capped at --grid-max, inset by --gutter) so it ends at the content
 * margin with clean side margins — never edge-to-edge. The only line system in
 * the redesign; reads as an intentional section divider.
 */
export function Rule({
  strong = false,
  className,
}: {
  strong?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="mx-auto w-full max-w-(--grid-max) px-(--gutter)">
        <span
          className={cn(
            "block h-px w-full",
            strong ? "bg-line-strong" : "bg-line",
          )}
        />
      </div>
    </div>
  );
}
