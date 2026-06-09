import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  children: React.ReactNode;
  className?: string;
  /** Render the structural side hairlines that frame the content column. */
  framed?: boolean;
};

/**
 * Content column with the studio's wide outer gutters.
 * `framed` exposes the left/right structural hairlines that read
 * like the margins of an architectural drawing.
 */
export function Container({
  as: Tag = "div",
  children,
  className,
  framed = false,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)]",
        framed &&
          "relative before:absolute before:inset-y-0 before:left-[var(--gutter)] before:w-px before:bg-line after:absolute after:inset-y-0 after:right-[var(--gutter)] after:w-px after:bg-line",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
