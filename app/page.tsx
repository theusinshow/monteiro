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
          <span className="text-ink">00 /</span>
          <span className="ml-2">Estúdio Monteiro</span>
        </span>
        <span className="label">{site.location}</span>
      </Container>

      {/* Hero */}
      <Rule />
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-4 gap-y-10 md:grid-cols-6 lg:grid-cols-8">
          <div className="col-span-4 md:col-span-6 lg:col-span-6">
            <Reveal>
              <h1 className="max-w-[14ch] font-display text-(length:--text-display) leading-(--text-display--line-height) tracking-(--text-display--letter-spacing)">
                Espaços que <em className="italic text-stone">permanecem</em>.
              </h1>
            </Reveal>
          </div>
          <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-1">
            <Reveal delay={0.12}>
              <p className="max-w-md text-lg text-graphite">
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
        </div>
      </Container>

      {/* Meta strip — items align to the grid columns */}
      <Rule marks />
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8">
          {meta.map(([label, value], i) => (
            <div
              key={label}
              className="col-span-1 px-(--cell-pad) py-5 md:col-span-3 lg:col-span-2"
            >
              <p className="label">
                <span className="text-ink">{pad(i + 1)} /</span>
                <span className="ml-2">{label}</span>
              </p>
              <p className="tabular mt-3 text-lg">{value}</p>
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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
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
                  className="transition-transform duration-700 ease-editorial group-hover:scale-[1.01]"
                />
              </MaskReveal>
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className="font-display text-xl leading-none">
                  {project.title}
                </h3>
                <span className="label tabular">{project.year}</span>
              </div>
              <p className="mt-2 text-sm text-graphite">{project.location}</p>
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <ButtonLink href="/projetos" variant="ghost">
            Ver todos os projetos →
          </ButtonLink>
        </div>
      </Container>

      {/* Manifesto */}
      <Rule marks />
      <Container className="py-24 md:py-32">
        <Reveal>
          <p className="mx-auto max-w-3xl text-balance text-center font-display text-3xl leading-snug md:text-5xl">
            “Projetar é organizar o silêncio entre as coisas.”
          </p>
        </Reveal>
      </Container>

      {/* Contact */}
      <Rule marks />
      <Container className="py-12 md:py-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-[16ch] font-display text-3xl leading-tight md:text-5xl">
            Vamos conversar sobre o seu projeto.
          </h2>
          <ButtonLink href="/contato" variant="solid">
            Iniciar conversa
          </ButtonLink>
        </div>
      </Container>
      <Rule />
    </div>
  );
}
