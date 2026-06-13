import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Figure } from "@/components/ui/Figure";
import { Rule } from "@/components/ui/Rule";
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
    ["Obras", "40+"],
    ["Desde", String(site.foundedYear)],
  ];

  return (
    <div className="pb-px">
      {/* Eyebrow */}
      <Rule marks />
      <Container className="flex items-center justify-between py-3">
        <span className="label">
          <span className="text-accent">00 /</span>
          <span className="ml-2">Estúdio Monteiro</span>
        </span>
        <span className="label">{site.location}</span>
      </Container>

      {/* Hero headline */}
      <Rule />
      <Container className="py-16 md:py-28">
        <Reveal>
          <h1 className="knockout w-fit max-w-[14ch] font-display text-(length:--text-display) leading-(--text-display--line-height) tracking-(--text-display--letter-spacing)">
            Espaços que <em className="italic text-accent">permanecem</em>.
          </h1>
        </Reveal>
      </Container>

      {/* Intro + CTAs — a bounded band aligned to the meta columns below */}
      <Rule />
      <Container>
        <div className="grid grid-cols-4 items-center md:grid-cols-6 lg:grid-cols-8">
          <div className="col-span-4 flex items-center px-(--cell-pad) py-8 md:col-span-6 lg:col-span-4">
            <Reveal>
              <p className="knockout max-w-md text-lg text-graphite">
                Estúdio Monteiro projeta residências de alto padrão e ambientes
                corporativos. O desenho como linguagem; a obra como argumento.
              </p>
            </Reveal>
          </div>
          <ButtonLink
            href="/projetos"
            variant="line"
            block
            className="col-span-2 md:col-span-3 lg:col-span-2"
          >
            Ver projetos
          </ButtonLink>
          <ButtonLink
            href="/contato"
            variant="line"
            block
            className="col-span-2 md:col-span-3 lg:col-span-2"
          >
            Contato
          </ButtonLink>
        </div>
      </Container>

      {/* Meta strip — items align to the grid columns */}
      <Rule marks />
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8">
          {meta.map(([label, value], i) => (
            <div
              key={label}
              className="col-span-1 px-(--cell-pad) py-6 md:col-span-3 lg:col-span-2"
            >
              <p className="label">
                <span className="text-accent">{pad(i + 1)} /</span>
                <span className="ml-2">{label}</span>
              </p>
              <p className="tabular knockout mt-3 w-fit text-lg">{value}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Selected projects */}
      <Rule marks />
      <Container className="flex items-center justify-between py-3">
        <span className="label">Projetos / Selecionados</span>
        <span className="label tabular">{pad(projects.length)} no total</span>
      </Container>
      <Rule />
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
          {selected.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projetos/${project.slug}`}
              className="group block"
            >
              <MaskReveal>
                <Figure
                  src={project.cover}
                  alt={`${project.title}, ${project.location}`}
                  ratio="4/5"
                  priority={i < 2}
                />
              </MaskReveal>
              {/* hairline delimiting the caption, full card width */}
              <span className="mt-5 block h-px w-full bg-line transition-colors duration-500 ease-editorial group-hover:bg-ink" />
              <div className="flex items-baseline justify-between pt-4">
                <h3 className="knockout font-display text-xl leading-none">
                  {project.title}
                </h3>
                <span className="label tabular">{project.year}</span>
              </div>
              <p className="knockout mt-1 w-fit text-sm text-graphite">
                {project.location}
              </p>
            </Link>
          ))}
        </div>
      </Container>

      {/* All projects CTA — anchored to the grid */}
      <Rule />
      <Container>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          <ButtonLink
            href="/projetos"
            variant="line"
            block
            className="col-span-4 md:col-span-3 lg:col-span-3"
          >
            Ver todos os projetos
          </ButtonLink>
        </div>
      </Container>

      {/* Manifesto */}
      <Rule marks />
      <Container className="py-24 md:py-32">
        <Reveal>
          <p className="knockout mx-auto w-fit max-w-3xl text-balance text-center font-display text-3xl leading-snug md:text-5xl">
            “Projetar é organizar o silêncio entre as coisas.”
          </p>
        </Reveal>
      </Container>

      {/* Contact — heading + action in one bounded, aligned band */}
      <Rule marks />
      <Container>
        <div className="grid grid-cols-4 items-center md:grid-cols-6 lg:grid-cols-8">
          <div className="col-span-4 flex items-center px-(--cell-pad) py-10 md:col-span-6 lg:col-span-5">
            <h2 className="knockout max-w-[16ch] font-display text-3xl leading-tight md:text-5xl">
              Vamos conversar sobre o seu projeto.
            </h2>
          </div>
          <ButtonLink
            href="/contato"
            variant="solid"
            block
            className="col-span-4 md:col-span-6 lg:col-span-3"
          >
            Iniciar conversa
          </ButtonLink>
        </div>
      </Container>
      <Rule />
    </div>
  );
}
