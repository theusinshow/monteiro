import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { Stats, type Stat } from "@/components/ui/Stats";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const numbers: Stat[] = [
  { value: "40+", label: "Projetos", desc: "Residenciais e corporativos entregues." },
  { value: "15", label: "Anos", desc: "De estúdio, desde 2009." },
  { value: "2", label: "Frentes", desc: "Residencial e corporativo." },
  { value: "100%", label: "Autoral", desc: "Do gesto urbano ao detalhe." },
];

const ficha: [string, string][] = [
  ["Fundado", String(site.foundedYear)],
  ["Base", site.location],
  ["Atuação", "Residencial · Corporativo"],
  ["Linguagem", "Autoral"],
  ["Foco", "Proporção, luz, matéria"],
];

export const metadata: Metadata = {
  title: "Estúdio",
  description:
    "O Estúdio Monteiro e sua abordagem para projetos residenciais e corporativos.",
};

const approach: [string, string, string][] = [
  ["01", "Escuta", "Entender o terreno, o programa e o desejo."],
  ["02", "Desenho", "Traduzir em sistema, proporção e luz."],
  ["03", "Obra", "Acompanhar o detalhe até a permanência."],
];

export default function EstudioPage() {
  return (
    <div className="pb-px">
      <Rule marks />
      <Container className="flex items-center justify-between py-3">
        <span className="label">
          <span className="text-accent">00 /</span>
          <span className="ml-2">O estúdio</span>
        </span>
        <span className="label">Ficha</span>
      </Container>

      {/* Intro + studio ficha */}
      <Rule />
      <Container>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          <div className="col-span-4 px-(--cell-pad) py-12 md:col-span-6 md:py-16 lg:col-span-5">
            <h1 className="knockout w-fit max-w-[16ch] font-display text-4xl leading-tight md:text-6xl">
              Arquitetura como ato de permanência.
            </h1>
            <div className="mt-10 max-w-xl space-y-6 text-lg text-graphite">
              <p className="knockout w-fit">
                O Estúdio Monteiro desenvolve projetos residenciais de alto
                padrão e ambientes corporativos, com atenção à proporção, à luz
                e à materialidade.
              </p>
              <p className="knockout w-fit">
                Cada projeto nasce de uma escuta cuidadosa e se desenvolve como
                um sistema coerente, do gesto urbano ao detalhe construtivo.
              </p>
            </div>
          </div>

          {/* Ficha — facts as a ruled vertical index (replaces the portrait) */}
          <div className="col-span-4 self-start bg-paper md:col-span-6 lg:col-span-3 lg:border-l lg:border-line">
            {ficha.map(([label, value], i) => (
              <div
                key={label}
                className={cn(
                  "flex items-baseline justify-between gap-6 px-(--cell-pad) py-5",
                  i > 0 && "border-t border-line",
                )}
              >
                <span className="label">{label}</span>
                <span className="knockout text-right text-ink">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Numbers */}
      <Stats eyebrow="O estúdio em números" items={numbers} />

      {/* Approach */}
      <Rule marks />
      <Container className="py-3">
        <span className="label">Abordagem / Como trabalhamos</span>
      </Container>
      <Rule />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {approach.map(([n, title, desc]) => (
            <div
              key={n}
              className="bg-paper px-(--cell-pad) py-10 md:min-h-56 md:border-l md:border-line md:first:border-l-0"
            >
              <p className="label">
                <span className="text-ink">{n} /</span>
                <span className="ml-2">{title}</span>
              </p>
              <p className="knockout mt-3 w-fit text-graphite">{desc}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* CTA — heading + action in one bounded, aligned band */}
      <Rule marks />
      <Container>
        <div className="grid grid-cols-4 items-center md:grid-cols-6 lg:grid-cols-8">
          <div className="col-span-4 flex items-center px-(--cell-pad) py-10 md:col-span-6 lg:col-span-5">
            <p className="knockout font-display text-3xl leading-tight md:text-5xl">
              Vamos conversar sobre o seu projeto.
            </p>
          </div>
          <ButtonLink
            href={site.whatsappUrl}
            variant="solid"
            block
            className="col-span-4 md:col-span-6 lg:col-span-3"
          >
            Falar no WhatsApp
          </ButtonLink>
        </div>
      </Container>
      <Rule />
    </div>
  );
}
