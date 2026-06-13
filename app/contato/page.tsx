import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Inicie uma conversa com o Estúdio Monteiro sobre o seu projeto.",
};

export default function ContatoPage() {
  return (
    <div className="pb-px">
      <Rule marks />
      <Container className="flex items-center justify-between py-3">
        <span className="label">
          <span className="text-ink">00 /</span>
          <span className="ml-2">Contato</span>
        </span>
        <span className="label">Mensagem</span>
      </Container>

      <Rule />
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-4 gap-12 md:grid-cols-6 lg:grid-cols-8">
          <div className="col-span-4 md:col-span-6 lg:col-span-3">
            <h1 className="knockout w-fit max-w-[12ch] font-display text-4xl leading-tight md:text-6xl">
              Vamos começar.
            </h1>
            <p className="knockout mt-6 w-fit max-w-sm text-lg text-graphite">
              Conte sobre o seu projeto. Respondemos pessoalmente.
            </p>

            <dl className="mt-12 space-y-6 text-sm">
              <div>
                <dt className="label">WhatsApp</dt>
                <dd className="knockout mt-2 w-fit">
                  <a href={site.whatsappUrl} className="link-underline text-ink">
                    {site.whatsapp}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">E-mail</dt>
                <dd className="knockout mt-2 w-fit">
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
                <dd className="knockout mt-2 w-fit text-ink">{site.location}</dd>
              </div>
            </dl>
          </div>

          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <ContactForm />
          </div>
        </div>
      </Container>
      <Rule />
    </div>
  );
}
