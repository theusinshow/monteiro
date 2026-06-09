import { cn } from "@/lib/cn";

type Entry = { label: string; value: React.ReactNode };

/**
 * Technical sheet — a label/value grid framed by hairlines, like the
 * data block of an architectural drawing. Values use tabular figures.
 */
export function TechnicalSheet({
  entries,
  className,
}: {
  entries: Entry[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 border-t border-line md:grid-cols-4",
        className,
      )}
    >
      {entries.map((entry) => (
        <div
          key={entry.label}
          className="border-b border-line py-6 pr-6 md:border-b-0 md:border-r last:md:border-r-0"
        >
          <dt className="label">{entry.label}</dt>
          <dd className="tabular mt-3 text-lg text-ink">{entry.value}</dd>
        </div>
      ))}
    </dl>
  );
}
