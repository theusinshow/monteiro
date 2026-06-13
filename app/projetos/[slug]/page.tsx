import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { Figure } from "@/components/ui/Figure";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { getAdjacentProject, getProject, projects } from "@/lib/projects";

const pad = (n: number) => String(n).padStart(2, "0");

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjetoPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);
  const gallery = project.gallery.length ? project.gallery : [null, null, null];

  const sheet: [string, string][] = [
    ["Local", project.location],
    ["Ano", String(project.year)],
    ["Área", `${project.area} m²`],
    ["Tipo", project.type],
  ];

  return (
    <div className="pb-px">
      {/* Title */}
      <Rule marks />
      <Container className="flex items-center justify-between py-3">
        <span className="label">
          <span className="text-ink">00 /</span>
          <span className="ml-2">{project.type}</span>
        </span>
        <span className="label tabular">{project.area} m²</span>
      </Container>
      <Rule />
      <Container className="py-12 md:py-16">
        <h1 className="font-display text-4xl leading-none md:text-7xl">
          {project.title}
        </h1>
      </Container>

      {/* Cover */}
      <Rule marks />
      <Container className="py-10 md:py-14">
        <MaskReveal>
          <Figure
            src={project.cover}
            alt={`${project.title}, ${project.location}`}
            ratio="16/9"
            sizes="100vw"
            priority
          />
        </MaskReveal>
      </Container>

      {/* Technical sheet — columns align to the grid */}
      <Rule marks />
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {sheet.map(([label, value], i) => (
            <div key={label} className="px-(--cell-pad) py-5">
              <p className="label">
                <span className="text-ink">{pad(i + 1)} /</span>
                <span className="ml-2">{label}</span>
              </p>
              <p className="tabular knockout mt-3 w-fit text-lg text-ink">
                {value}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* Summary */}
      <Rule />
      <Container className="py-12 md:py-16">
        <p className="knockout w-fit max-w-2xl text-xl leading-relaxed text-ink">
          {project.summary}
        </p>
      </Container>

      {/* Gallery */}
      <Rule marks />
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {gallery.map((src, i) => (
            <div
              key={i}
              className={i % 3 === 0 ? "md:col-span-12" : "md:col-span-6"}
            >
              <MaskReveal>
                <Figure
                  src={src}
                  alt={`${project.title} — imagem ${i + 1}`}
                  ratio={i % 3 === 0 ? "3/2" : "4/5"}
                />
              </MaskReveal>
            </div>
          ))}
        </div>
      </Container>

      {/* Next project */}
      <Rule marks />
      <Container className="py-8 md:py-10">
        <Link href={`/projetos/${next.slug}`} className="group block">
          <div className="mb-3 flex items-center justify-between">
            <span className="label">Próximo projeto</span>
            <span className="label tabular">{next.year}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-3xl md:text-5xl">
              {next.title}
            </span>
            <span
              aria-hidden
              className="text-2xl text-graphite transition-transform duration-500 ease-editorial group-hover:translate-x-2 group-hover:text-ink"
            >
              →
            </span>
          </div>
        </Link>
      </Container>
      <Rule />
    </div>
  );
}
