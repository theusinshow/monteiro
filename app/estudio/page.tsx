import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { Figure } from "@/components/ui/Figure";
import { Stats, type Stat } from "@/components/ui/Stats";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

const numbers: Stat[] = [
  { value: "40+", label: "Projetos", desc: "Residenciais e corporativos entregues." },
  { value: "15", label: "Anos", desc: "De estúdio, desde 2009." },
  { value: "2", label: "Frentes", desc: "Residencial e corporativo." },
  { value: "100%", label: "Autoral", desc: "Do gesto urbano ao detalhe." },
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
          <span className="text-ink">00 /</span>
          <span className="ml-2">O estúdio</span>
        </span>
        <span className="label">Retrato</span>
      </Container>

      {/* Intro + portrait */}
      <Rule />
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-4 gap-8 md:grid-cols-6 lg:grid-cols-8">
          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <h1 className="max-w-[16ch] font-display text-4xl leading-tight md:text-6xl">
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
          <div className="col-span-4 md:col-span-6 lg:col-span-3">
            <Figure
              src={null}
              alt="Retrato — Estúdio Monteiro"
              ratio="3/4"
              placeholderLabel="Retrato em breve"
            />
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
            <div key={n} className="px-(--cell-pad) py-8 md:min-h-56">
              <p className="label">
                <span className="text-ink">{n} /</span>
                <span className="ml-2">{title}</span>
              </p>
              <p className="knockout mt-3 w-fit text-graphite">{desc}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* CTA */}
      <Rule marks />
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-4 items-end gap-8 md:grid-cols-6 lg:grid-cols-8">
          <p className="col-span-4 font-display text-3xl leading-tight md:col-span-4 md:text-5xl lg:col-span-5">
            Vamos conversar sobre o seu projeto.
          </p>
          <div className="col-span-4 md:col-span-2 lg:col-span-3">
            <ButtonLink href={site.whatsappUrl} variant="solid" block>
              Falar no WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Container>
      <Rule />
    </div>
  );
}
