import { cn } from "@/lib/cn";
import { CornerMarks } from "@/components/ui/Plus";

/**
 * A run of content blocks laid out on the global column grid. No boxed border /
 * background — the persistent GridField shows through; structure reads from the
 * shared columns and from element-bound Rules, not from per-section boxes.
 */
export function CellGroup({
  children,
  className,
  cols = "grid-cols-4 md:grid-cols-6 lg:grid-cols-8",
}: {
  children: React.ReactNode;
  className?: string;
  /** Tailwind grid-cols utility; defaults to the global 4/6/8 rhythm. */
  cols?: string;
}) {
  return <div className={cn("grid", cols, className)}>{children}</div>;
}

type CellProps = {
  children?: React.ReactNode;
  className?: string;
  /** Slash-numbered marker, e.g. "01". Rendered as "01 /". */
  index?: string;
  /** Right-aligned annotation, e.g. a year or tag. */
  annotation?: string;
  /** Eyebrow label in the cell header. */
  label?: string;
  /** Grid span utilities, e.g. "lg:col-span-4". */
  span?: string;
  /** Render crosshair (+) marks at the cell's four corners. */
  marks?: boolean;
};

/**
 * A content block placed on the grid. An optional header (index / label /
 * annotation) sits above a local hairline that spans only the cell.
 */
export function Cell({
  children,
  className,
  index,
  annotation,
  label,
  span,
  marks = false,
}: CellProps) {
  const hasHeader = index || annotation || label;
  return (
    <div className={cn("relative", span)}>
      {marks && <CornerMarks />}
      {hasHeader && (
        <div className="flex items-center justify-between border-b border-line px-(--cell-pad) py-3">
          <span className="label">
            {index && <span className="text-ink">{index} /</span>}
            {label && <span className={cn(index && "ml-2")}>{label}</span>}
          </span>
          {annotation && <span className="label tabular">{annotation}</span>}
        </div>
      )}
      {children && (
        <div className={cn("p-(--cell-pad)", className)}>{children}</div>
      )}
    </div>
  );
}
