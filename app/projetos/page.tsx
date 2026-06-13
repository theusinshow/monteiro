import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { ProjectsView } from "@/components/projects/ProjectsView";
import { projects } from "@/lib/projects";

const pad = (n: number) => String(n).padStart(2, "0");

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Seleção de projetos residenciais de alto padrão e corporativos do Estúdio Monteiro.",
};

export default function ProjetosPage() {
  return (
    <div className="pb-px">
      <Rule marks />
      <Container className="flex items-center justify-between py-3">
        <span className="label">
          <span className="text-ink">00 /</span>
          <span className="ml-2">Portfólio</span>
        </span>
        <span className="label tabular">{pad(projects.length)} projetos</span>
      </Container>

      <Rule />
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          <div className="col-span-4 md:col-span-6 lg:col-span-6">
            <h1 className="knockout w-fit max-w-[14ch] font-display text-4xl leading-tight md:text-7xl">
              Projetos selecionados
            </h1>
            <p className="knockout mt-6 w-fit max-w-md text-lg text-graphite">
              Cada obra é um estudo de proporção, luz e permanência.
            </p>
          </div>
        </div>
      </Container>

      <ProjectsView projects={projects} />
    </div>
  );
}
