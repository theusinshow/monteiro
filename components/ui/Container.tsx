import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  children: React.ReactNode;
  className?: string;
};

/**
 * Centered content band, aligned to the global GridField. Capped at --grid-max
 * and inset by --gutter so its edges land on the grid's outer lines; the gutters
 * are the clean outer margins. The structural side rails now come from GridField.
 */
export function Container({ as: Tag = "div", children, className }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-(--grid-max) px-(--gutter)",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
