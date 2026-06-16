import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  children: React.ReactNode;
  className?: string;
};

/**
 * Centered content band. Capped at --grid-max and inset by --gutter so its edges
 * are the clean outer margins. Section rules (see Rule) share this band width, so
 * lines and content end at the same margin.
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
