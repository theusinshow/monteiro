import { cn } from "@/lib/cn";

type HairlineProps = {
  className?: string;
  /** Stronger line for primary structural breaks. */
  strong?: boolean;
  orientation?: "horizontal" | "vertical";
};

/** A single structural 1px line. Structure, never decoration. */
export function Hairline({
  className,
  strong = false,
  orientation = "horizontal",
}: HairlineProps) {
  return (
    <span
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "block shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch",
        strong ? "bg-line-strong" : "bg-line",
        className,
      )}
    />
  );
}
