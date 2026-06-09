import Link from "next/link";
import { Figure } from "@/components/ui/Figure";
import { MaskReveal } from "@/components/motion/MaskReveal";
import type { Project } from "@/lib/projects";

/**
 * Project card — image first, metadata revealed beneath a hairline on hover.
 * The work is the argument; chrome stays minimal.
 */
export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <Link href={`/projetos/${project.slug}`} className="group block">
      <MaskReveal>
        <Figure
          src={project.cover}
          alt={`${project.title}, ${project.location}`}
          ratio="4/5"
          priority={priority}
          className="transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
        />
      </MaskReveal>

      <div className="mt-5 flex items-baseline justify-between">
        <h3 className="font-display text-xl leading-none">{project.title}</h3>
        <span className="label tabular">{project.year}</span>
      </div>

      {/* hairline that deepens on hover */}
      <span className="mt-4 block h-px w-full bg-line transition-colors duration-500 ease-editorial group-hover:bg-ink" />

      <div className="mt-4 flex items-center justify-between text-sm text-graphite">
        <span>{project.location}</span>
        <span>{project.type}</span>
      </div>
    </Link>
  );
}
