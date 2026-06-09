"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CellGroup, Cell } from "@/components/ui/Cell";
import { Figure } from "@/components/ui/Figure";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { projectTypes, type Project, type ProjectType } from "@/lib/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/** Filterable project index, laid out as a continuous bordered cell matrix. */
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
    <CellGroup cols="md:grid-cols-3">
      {/* Filter strip spans the full matrix width */}
      <div className="relative bg-paper md:col-span-3">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-6">
          <FilterTabs
            options={projectTypes}
            value={filter}
            onChange={setFilter}
          />
          <span className="label tabular">
            {pad(visible.length)} {visible.length === 1 ? "projeto" : "projetos"}
          </span>
        </div>
      </div>

      {visible.map((project, i) => (
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
                priority={i < 3}
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
    </CellGroup>
  );
}
