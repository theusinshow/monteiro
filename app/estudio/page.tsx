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
      <Rule />
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
        <div className="grid gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div>
            <h1 className="max-w-[16ch] font-display text-4xl leading-tight md:text-6xl">
              Arquitetura como ato de permanência.
            </h1>
            <div className="mt-10 max-w-xl space-y-6 text-lg text-graphite">
              <p>
                O Estúdio Monteiro desenvolve projetos residenciais de alto
                padrão e ambientes corporativos, com atenção à proporção, à luz
                e à materialidade.
              </p>
              <p>
                Cada projeto nasce de uma escuta cuidadosa e se desenvolve como
                um sistema coerente, do gesto urbano ao detalhe construtivo.
              </p>
            </div>
          </div>

          {/* Ficha — facts as a ruled vertical index (replaces the portrait) */}
          <dl className="self-start bg-paper md:border-l md:border-line md:pl-16">
            {ficha.map(([label, value], i) => (
              <div
                key={label}
                className={cn(
                  "flex items-baseline justify-between gap-6 py-5",
                  i > 0 && "border-t border-line",
                )}
              >
                <dt className="label">{label}</dt>
                <dd className="text-right text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      {/* Numbers */}
      <Stats eyebrow="O estúdio em números" items={numbers} />

      {/* Approach */}
      <Rule />
      <Container className="py-3">
        <h2 className="label">Abordagem / Como trabalhamos</h2>
      </Container>
      <Rule />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {approach.map(([n, title, desc]) => (
            <div
              key={n}
              className="bg-paper px-(--cell-pad) py-16 md:min-h-56 md:border-l md:border-line md:first:border-l-0"
            >
              <h3 className="label">
                <span className="text-ink">{n} /</span>
                <span className="ml-2">{title}</span>
              </h3>
              <p className="mt-3 text-graphite">{desc}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* CTA — heading + action in one bounded, aligned band */}
      <Rule />
      <Container>
        <div className="flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-24">
          <p className="font-display text-3xl leading-tight md:text-5xl">
            Vamos conversar sobre o seu projeto.
          </p>
          <ButtonLink href={site.whatsappUrl} variant="solid">
            Falar no WhatsApp
          </ButtonLink>
        </div>
      </Container>
      <Rule />
    </div>
  );
}
