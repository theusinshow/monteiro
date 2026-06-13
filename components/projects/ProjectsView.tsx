"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { Figure } from "@/components/ui/Figure";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { projectTypes, type Project, type ProjectType } from "@/lib/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/** Filterable project index, laid out on the global grid (3-up on desktop). */
export function ProjectsView({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectType | "Todos">("Todos");

  const visible = useMemo(
    () =>
      filter === "Todos"
        ? projects
        : projects.filter((p) => p.type === filter),
    [filter, projects],
  );

  return (
    <>
      {/* Filter strip — an element edge on the grid */}
      <Rule marks />
      <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
        <FilterTabs options={projectTypes} value={filter} onChange={setFilter} />
        <span className="label tabular">
          {pad(visible.length)} {visible.length === 1 ? "projeto" : "projetos"}
        </span>
      </Container>

      <Rule />
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
          {visible.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projetos/${project.slug}`}
              className="group block"
            >
              <div className="mb-4 flex items-baseline justify-between">
                <span className="label">
                  <span className="text-ink">{pad(i + 1)} /</span>
                  <span className="ml-2">{project.type}</span>
                </span>
                <span className="label tabular">{project.year}</span>
              </div>
              <MaskReveal>
                <Figure
                  src={project.cover}
                  alt={`${project.title}, ${project.location}`}
                  ratio="4/5"
                  priority={i < 3}
                />
              </MaskReveal>
              {/* hairline delimiting the caption, full card width */}
              <span className="mt-5 block h-px w-full bg-line transition-colors duration-500 ease-editorial group-hover:bg-ink" />
              <h3 className="knockout w-fit pt-4 font-display text-xl leading-none">
                {project.title}
              </h3>
              <p className="knockout mt-1 w-fit text-sm text-graphite">
                {project.location}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
