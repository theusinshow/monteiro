import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container framed className="flex min-h-[60vh] flex-col justify-center py-24">
      <p className="label">Erro 404</p>
      <h1 className="mt-6 max-w-[14ch] font-display text-5xl leading-tight md:text-7xl">
        Esta página não foi <em className="italic text-stone">construída</em>.
      </h1>
      <p className="mt-6 max-w-md text-lg text-graphite">
        O endereço não existe ou foi movido. Volte ao início ou veja os
        projetos.
      </p>
      <div className="mt-10 flex gap-6">
        <ButtonLink href="/" variant="line">
          Início
        </ButtonLink>
        <ButtonLink href="/projetos" variant="ghost">
          Ver projetos
        </ButtonLink>
      </div>
    </Container>
  );
}
