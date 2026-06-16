import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";

export type Stat = {
  value: string;
  label: string;
  desc?: string;
};

/**
 * Impact / numbers band. Each stat sits in a grid cell topped by a row of
 * registration dots; bounded above and below by horizontal Rules.
 */
export function Stats({ items, eyebrow }: { items: Stat[]; eyebrow?: string }) {
  return (
    <>
      <Rule />
      {eyebrow && (
        <Container className="py-3">
          <h2 className="label">{eyebrow}</h2>
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
              <p className="mt-6 font-display text-5xl leading-none md:text-7xl">
                {s.value}
              </p>
              <p className="label mt-6">{s.label}</p>
              {s.desc && (
                <p className="mt-2 max-w-[22ch] text-sm text-graphite">
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
