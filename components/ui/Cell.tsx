import { cn } from "@/lib/cn";
import { CornerMarks } from "@/components/ui/Plus";

/**
 * CellGroup — a bordered modular matrix. Children are laid out on a grid with
 * 1px hairline gaps (single, never doubled) and an outer hairline frame, like
 * the cells of an architectural drawing.
 */
export function CellGroup({
  children,
  className,
  cols,
}: {
  children: React.ReactNode;
  className?: string;
  /** Tailwind grid-cols utility, e.g. "md:grid-cols-3". */
  cols?: string;
}) {
  return (
    <div className={cn("border border-line bg-line", className)}>
      <div className={cn("grid gap-px", cols)}>{children}</div>
    </div>
  );
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
  /** Grid span utilities, e.g. "md:col-span-2". */
  span?: string;
  /** Render crosshair (+) marks at the cell's four corners. */
  marks?: boolean;
};

/** A single bordered cell. Sits on the CellGroup's hairline grid. */
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
    <div className={cn("relative bg-paper", span)}>
      {marks && <CornerMarks />}
      {hasHeader && (
        <div className="flex items-center justify-between border-b border-line px-5 py-3 md:px-6">
          <span className="label">
            {index && <span className="text-ink">{index} /</span>}
            {label && <span className={cn(index && "ml-2")}>{label}</span>}
          </span>
          {annotation && <span className="label tabular">{annotation}</span>}
        </div>
      )}
      {children && (
        <div className={cn("p-5 md:p-6", className)}>{children}</div>
      )}
    </div>
  );
}
