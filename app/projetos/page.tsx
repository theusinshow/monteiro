import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CellGroup, Cell } from "@/components/ui/Cell";
import { ProjectsView } from "@/components/projects/ProjectsView";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Seleção de projetos residenciais de alto padrão e corporativos do Estúdio Monteiro.",
};

export default function ProjetosPage() {
  return (
    <Container className="pb-28 pt-10 md:pt-14">
      <CellGroup>
        <Cell
          marks
          index="00"
          label="Portfólio"
          annotation={`${String(projects.length).padStart(2, "0")} projetos`}
          className="p-8 md:p-14"
        >
          <h1 className="max-w-[14ch] font-display text-4xl leading-tight md:text-7xl">
            Projetos selecionados
          </h1>
          <p className="mt-6 max-w-md text-lg text-graphite">
            {/* PLACEHOLDER — intro copy (CNT-006) */}
            Cada obra é um estudo de proporção, luz e permanência.
          </p>
        </Cell>
      </CellGroup>

      <div className="-mt-px">
        <ProjectsView projects={projects} />
      </div>
    </Container>
  );
}
