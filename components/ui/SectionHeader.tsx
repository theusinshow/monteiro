import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  /** Small tracked eyebrow. */
  label?: string;
  title: React.ReactNode;
  /** Optional index marker, e.g. "01 / 04" — architectural numbering. */
  index?: string;
  className?: string;
};

/** Editorial section header: eyebrow + large display title, optional index. */
export function SectionHeader({
  label,
  title,
  index,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-baseline justify-between gap-6", className)}>
      <div>
        {label ? <p className="label">{label}</p> : null}
        <h2 className="mt-4 max-w-[18ch] font-display text-3xl leading-tight md:text-5xl">
          {title}
        </h2>
      </div>
      {index ? (
        <span className="label tabular shrink-0 pt-1">{index}</span>
      ) : null}
    </div>
  );
}
