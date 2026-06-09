import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CellGroup, Cell } from "@/components/ui/Cell";
import { Figure } from "@/components/ui/Figure";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

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
    <Container className="pb-28 pt-10 md:pt-14">
      {/* Intro + portrait */}
      <CellGroup cols="md:grid-cols-12">
        <Cell
          marks
          index="00"
          label="O estúdio"
          span="md:col-span-7"
          className="p-8 md:p-14"
        >
          <h1 className="max-w-[16ch] font-display text-4xl leading-tight md:text-6xl">
            Arquitetura como ato de permanência.
          </h1>
          <div className="mt-10 max-w-xl space-y-6 text-lg text-graphite">
            {/* PLACEHOLDER — bio / filosofia (CNT-004) */}
            <p>
              O Estúdio Monteiro desenvolve projetos residenciais de alto padrão
              e ambientes corporativos, com atenção à proporção, à luz e à
              materialidade.
            </p>
            <p>
              Cada projeto nasce de uma escuta cuidadosa e se desenvolve como um
              sistema coerente — do gesto urbano ao detalhe construtivo.
            </p>
          </div>
        </Cell>

        <Cell label="Retrato" span="md:col-span-5" className="p-0">
          <Figure
            src={null}
            alt="Retrato — Estúdio Monteiro"
            ratio="3/4"
            placeholderLabel="Retrato em breve"
          />
        </Cell>
      </CellGroup>

      {/* Approach */}
      <CellGroup cols="md:grid-cols-3" className="-mt-px">
        <Cell span="md:col-span-3" label="Abordagem / Como trabalhamos" />
        {approach.map(([n, title, desc]) => (
          <Cell key={n} index={n} label={title} className="md:min-h-56">
            <p className="mt-2 text-graphite">{desc}</p>
          </Cell>
        ))}
      </CellGroup>

      {/* CTA */}
      <CellGroup className="-mt-px">
        <Cell marks label="Contato" className="px-6 py-16 text-center md:py-24">
          <p className="font-display text-3xl md:text-5xl">
            Vamos conversar sobre o seu projeto.
          </p>
          <div className="mt-10 flex justify-center">
            <ButtonLink href={site.whatsappUrl} variant="solid">
              Falar no WhatsApp
            </ButtonLink>
          </div>
        </Cell>
      </CellGroup>
    </Container>
  );
}
