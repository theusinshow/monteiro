import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CellGroup, Cell } from "@/components/ui/Cell";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Inicie uma conversa com o Estúdio Monteiro sobre o seu projeto.",
};

export default function ContatoPage() {
  return (
    <Container className="pb-28 pt-10 md:pt-14">
      <CellGroup cols="md:grid-cols-12">
        <Cell
          marks
          index="00"
          label="Contato"
          span="md:col-span-5"
          className="p-8 md:p-12"
        >
          <h1 className="max-w-[12ch] font-display text-4xl leading-tight md:text-6xl">
            Vamos começar.
          </h1>
          <p className="mt-6 max-w-sm text-lg text-graphite">
            Conte sobre o seu projeto. Respondemos pessoalmente.
          </p>

          <dl className="mt-12 space-y-6 text-sm">
            <div>
              <dt className="label">WhatsApp</dt>
              <dd className="mt-2">
                <a href={site.whatsappUrl} className="link-underline text-ink">
                  {site.whatsapp}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">E-mail</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-ink"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">Base</dt>
              <dd className="mt-2 text-ink">{site.location}</dd>
            </div>
          </dl>
        </Cell>

        <Cell label="Mensagem" span="md:col-span-7" className="p-8 md:p-12">
          <ContactForm />
        </Cell>
      </CellGroup>
    </Container>
  );
}
