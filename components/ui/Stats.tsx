import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";

export type Stat = {
  value: string;
  label: string;
  desc?: string;
};

/**
 * Impact / numbers band. Each stat sits in its own grid cell, separated by the
 * persistent vertical lines (the grid "opens" to present the information); a
 * row of registration dots tops each figure. The big numeral knocks out the
 * grid behind it; labels and copy never sit on a line. Bounded by element Rules
 * with column crosshairs.
 */
export function Stats({ items, eyebrow }: { items: Stat[]; eyebrow?: string }) {
  return (
    <>
      <Rule marks />
      {eyebrow && (
        <Container className="py-3">
          <span className="label">{eyebrow}</span>
        </Container>
      )}
      <Rule />
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map((s) => (
            <div
              key={s.label}
              className="bg-paper px-(--cell-pad) py-10 md:border-l md:border-line md:py-14 md:first:border-l-0"
            >
              <span aria-hidden className="flex gap-1.5">
                {Array.from({ length: 4 }).map((_, d) => (
                  <span key={d} className="h-[3px] w-[3px] rounded-full bg-stone" />
                ))}
              </span>
              <p className="knockout mt-6 w-fit font-display text-5xl leading-none md:text-7xl">
                {s.value}
              </p>
              <p className="label mt-6">{s.label}</p>
              {s.desc && (
                <p className="knockout mt-2 w-fit max-w-[22ch] text-sm text-graphite">
                  {s.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
