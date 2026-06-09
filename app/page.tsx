import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GridLines } from "@/components/ui/GridLines";
import { CellGroup, Cell } from "@/components/ui/Cell";
import { Figure } from "@/components/ui/Figure";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

export default function HomePage() {
  const selected = projects.slice(0, 3);

  const meta: [string, string][] = [
    ["Atuação", "Residencial · Corporativo"],
    ["Base", site.location],
    ["Projetos", "—"], // PLACEHOLDER (CNT-003)
    ["Desde", "—"], // PLACEHOLDER (CNT-004)
  ];

  return (
    <Container className="pb-28 pt-10 md:pt-14">
      {/* Hero cell */}
      <CellGroup>
        <Cell
          marks
          index="00"
          label="Estúdio Monteiro"
          annotation={`${site.location}`}
          className="relative overflow-hidden p-8 md:p-16"
        >
          <GridLines columns={4} className="opacity-50" />
          <div className="relative">
            <Reveal>
              <h1 className="max-w-[14ch] font-display text-(length:--text-display) leading-(--text-display--line-height) tracking-(--text-display--letter-spacing)">
                Espaços que <em className="italic text-stone">permanecem</em>.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-md text-lg text-graphite">
                {/* PLACEHOLDER — manifesto (CNT-006) */}
                Estúdio Monteiro projeta residências de alto padrão e ambientes
                corporativos. O desenho como linguagem; a obra como argumento.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex items-center gap-8">
                <ButtonLink href="/projetos" variant="ghost">
                  Ver projetos
                </ButtonLink>
                <ButtonLink href="/contato" variant="ghost">
                  Contato
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Cell>
      </CellGroup>

      {/* Meta strip */}
      <CellGroup cols="grid-cols-2 md:grid-cols-4" className="-mt-px">
        {meta.map(([label, value], i) => (
          <Cell key={label} index={pad(i + 1)} label={label}>
            <p className="tabular text-lg">{value}</p>
          </Cell>
        ))}
      </CellGroup>

      {/* Selected projects matrix */}
      <CellGroup cols="md:grid-cols-3" className="-mt-px">
        <Cell
          span="md:col-span-3"
          label="Projetos / Selecionados"
          annotation={`${pad(projects.length)} no total`}
        />
        {selected.map((project, i) => (
          <Cell
            key={project.slug}
            index={pad(i + 1)}
            label={project.type}
            annotation={String(project.year)}
          >
            <Link href={`/projetos/${project.slug}`} className="group block">
              <MaskReveal>
                <Figure
                  src={project.cover}
                  alt={`${project.title}, ${project.location}`}
                  ratio="4/5"
                  priority={i < 2}
                  className="transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
                />
              </MaskReveal>
              <h3 className="mt-5 font-display text-xl leading-none">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-graphite">{project.location}</p>
            </Link>
          </Cell>
        ))}
        <Cell span="md:col-span-3">
          <ButtonLink href="/projetos" variant="ghost">
            Ver todos os projetos →
          </ButtonLink>
        </Cell>
      </CellGroup>

      {/* Manifesto cell */}
      <CellGroup className="-mt-px">
        <Cell label="Manifesto" className="px-6 py-20 md:py-32">
          <Reveal>
            <p className="mx-auto max-w-3xl text-balance text-center font-display text-3xl leading-snug md:text-5xl">
              {/* PLACEHOLDER — manifesto (CNT-006) */}
              “Projetar é organizar o silêncio entre as coisas.”
            </p>
          </Reveal>
        </Cell>
      </CellGroup>

      {/* Contact cell */}
      <CellGroup className="-mt-px">
        <Cell marks label="Contato" annotation="↘" className="p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-[16ch] font-display text-3xl leading-tight md:text-5xl">
              Vamos conversar sobre o seu projeto.
            </h2>
            <ButtonLink href="/contato" variant="solid">
              Iniciar conversa
            </ButtonLink>
          </div>
        </Cell>
      </CellGroup>
    </Container>
  );
}
