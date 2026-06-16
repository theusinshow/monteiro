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
      <Rule />
      <Container className="flex items-center justify-between py-3">
        <span className="label">
          <span className="text-accent">00 /</span>
          <span className="ml-2">Portfólio</span>
        </span>
        <span className="label tabular">{pad(projects.length)} projetos</span>
      </Container>

      <Rule />
      <Container className="py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="max-w-[14ch] font-display text-4xl leading-tight md:text-7xl">
            Projetos selecionados
          </h1>
          <p className="mt-6 max-w-md text-lg text-graphite">
            Cada obra é um estudo de proporção, luz e permanência.
          </p>
        </div>
      </Container>

      <ProjectsView projects={projects} />
    </div>
  );
}
