import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CellGroup, Cell } from "@/components/ui/Cell";
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
  const gallery = project.gallery.length
    ? project.gallery
    : [null, null, null]; // PLACEHOLDER (CNT-002)

  const sheet: [string, string][] = [
    ["Local", project.location],
    ["Ano", String(project.year)],
    ["Área", `${project.area} m²`],
    ["Tipo", project.type],
  ];

  return (
    <Container className="pb-28 pt-10 md:pt-14">
      {/* Title */}
      <CellGroup>
        <Cell
          marks
          index="00"
          label={project.type}
          annotation={`${project.area} m²`}
          className="p-8 md:p-14"
        >
          <h1 className="font-display text-4xl leading-none md:text-7xl">
            {project.title}
          </h1>
        </Cell>
      </CellGroup>

      {/* Cover */}
      <CellGroup className="-mt-px">
        <Cell label="Capa" annotation={project.location} className="p-0">
          <MaskReveal>
            <Figure
              src={project.cover}
              alt={`${project.title}, ${project.location}`}
              ratio="16/9"
              sizes="100vw"
              priority
            />
          </MaskReveal>
        </Cell>
      </CellGroup>

      {/* Technical sheet */}
      <CellGroup cols="grid-cols-2 md:grid-cols-4" className="-mt-px">
        {sheet.map(([label, value], i) => (
          <Cell key={label} index={pad(i + 1)} label={label}>
            <p className="tabular text-lg text-ink">{value}</p>
          </Cell>
        ))}
      </CellGroup>

      {/* Summary */}
      <CellGroup className="-mt-px">
        <Cell label="Sobre o projeto" className="p-8 md:p-14">
          <p className="max-w-2xl text-xl leading-relaxed text-ink">
            {project.summary}
          </p>
        </Cell>
      </CellGroup>

      {/* Gallery */}
      <CellGroup cols="md:grid-cols-12" className="-mt-px">
        {gallery.map((src, i) => (
          <Cell
            key={i}
            span={i % 3 === 0 ? "md:col-span-12" : "md:col-span-6"}
            className="p-0"
          >
            <MaskReveal>
              <Figure
                src={src}
                alt={`${project.title} — imagem ${i + 1}`}
                ratio={i % 3 === 0 ? "3/2" : "4/5"}
              />
            </MaskReveal>
          </Cell>
        ))}
      </CellGroup>

      {/* Next project */}
      <CellGroup className="-mt-px">
        <Cell label="Próximo projeto" annotation={String(next.year)}>
          <Link href={`/projetos/${next.slug}`} className="group block">
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
        </Cell>
      </CellGroup>
    </Container>
  );
}
