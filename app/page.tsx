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
  const meta: [string, string][] = [
    ["Atuação", "Residencial · Corporativo"],
    ["Base", site.location],
    ["Obras", "40+"],
    ["Desde", String(site.foundedYear)],
  ];

  const cover = projects[0];
  const body = projects.slice(1, 4); // [feature, twoA, twoB]

  return (
    <div className="pb-px">
      <Rule />
      <Container className="flex items-center justify-between py-3">
        <span className="label">
          <span className="text-accent">00 /</span>
          <span className="ml-2">Estúdio Monteiro</span>
        </span>
        <span className="label">{site.location}</span>
      </Container>
      <Rule />

      {/* Editorial cover: argument left, photograph right */}
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <Reveal>
            <h1 className="max-w-[12ch] font-display text-(length:--text-display) leading-(--text-display--line-height) tracking-(--text-display--letter-spacing)">
              Espaços que <em className="italic text-accent">permanecem</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-8 max-w-md text-lg text-graphite">
              Estúdio Monteiro projeta residências de alto padrão e ambientes
              corporativos. O desenho como linguagem; a obra como argumento.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/projetos" variant="line">Ver projetos</ButtonLink>
            <ButtonLink href="/contato" variant="ghost">Contato</ButtonLink>
          </div>
        </div>
        <MaskReveal>
          <Link href={`/projetos/${cover.slug}`} className="group block">
            <Figure
              src={cover.cover}
              alt={`${cover.title}, ${cover.location}`}
              ratio="3/4"
              priority
            />
            <div className="mt-4 flex items-baseline justify-between">
              <h2 className="font-display text-xl leading-none">{cover.title}</h2>
              <span className="label tabular">{cover.year}</span>
            </div>
          </Link>
        </MaskReveal>
      </Container>

      {/* Meta strip — calmer inline dl */}
      <Rule />
      <Container className="py-6">
        <dl className="flex flex-wrap gap-x-12 gap-y-4">
          {meta.map(([label, value], i) => (
            <div key={label} className="min-w-32">
              <dt className="label">
                <span className="text-accent">{pad(i + 1)} /</span>
                <span className="ml-2">{label}</span>
              </dt>
              <dd className="tabular mt-2 text-lg">{value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Selected projects — varied editorial layout */}
      <Rule />
      <Container className="flex items-center justify-between py-3">
        <h2 className="label">Projetos / Selecionados</h2>
        <span className="label tabular">{pad(projects.length)} no total</span>
      </Container>
      <Rule />
      <Container className="py-16 md:py-24">
        <ul className="space-y-16 md:space-y-24">
          <li>
            <Link href={`/projetos/${body[0].slug}`} className="group block">
              <MaskReveal>
                <Figure src={body[0].cover} alt={`${body[0].title}, ${body[0].location}`} ratio="16/9" sizes="100vw" />
              </MaskReveal>
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className="font-display text-2xl leading-none">{body[0].title}</h3>
                <span className="label tabular">{body[0].location} · {body[0].year}</span>
              </div>
            </Link>
          </li>
          <li className="grid gap-12 md:grid-cols-2 md:gap-8">
            {body.slice(1).map((project, i) => (
              <div key={project.slug} className={i === 1 ? "md:mt-16" : ""}>
                <Link href={`/projetos/${project.slug}`} className="group block">
                  <MaskReveal>
                    <Figure src={project.cover} alt={`${project.title}, ${project.location}`} ratio="4/5" />
                  </MaskReveal>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="font-display text-xl leading-none">{project.title}</h3>
                    <span className="label tabular">{project.year}</span>
                  </div>
                </Link>
              </div>
            ))}
          </li>
        </ul>
      </Container>

      {/* Manifesto */}
      <Rule />
      <Container className="py-28 md:py-40">
        <Reveal>
          <blockquote className="mx-auto max-w-3xl text-balance text-center font-display text-3xl leading-snug md:text-5xl">
            "Projetar é organizar o silêncio entre as coisas."
          </blockquote>
        </Reveal>
      </Container>

      {/* Contact band */}
      <Rule />
      <Container className="py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
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
