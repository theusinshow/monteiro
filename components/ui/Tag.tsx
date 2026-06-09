import { cn } from "@/lib/cn";

/** Text + hairline label (project type). No pill fill — stays editorial. */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-line px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-graphite",
        className,
      )}
    >
      {children}
    </span>
  );
}
