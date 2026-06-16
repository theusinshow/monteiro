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

const details: [string, string, string?][] = [
  ["WhatsApp", site.whatsapp, site.whatsappUrl],
  ["E-mail", site.email, `mailto:${site.email}`],
  ["Base", site.location],
];

export default function ContatoPage() {
  return (
    <div className="pb-px">
      <Rule />
      <Container className="flex items-center justify-between py-3">
        <span className="label">
          <span className="text-accent">00 /</span>
          <span className="ml-2">Contato</span>
        </span>
        <span className="label">Mensagem</span>
      </Container>

      <Rule />
      <Container className="py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: invitation + contact ficha */}
          <div>
            <h1 className="max-w-[12ch] font-display text-4xl leading-tight md:text-6xl">
              Vamos começar.
            </h1>
            <p className="mt-6 max-w-sm text-lg text-graphite">
              Conte sobre o seu projeto. Respondemos pessoalmente.
            </p>

            <h2 className="sr-only">Dados de contato</h2>
            <dl className="mt-12 border-t border-line">
              {details.map(([label, value, href]) => (
                <div key={label} className="border-b border-line py-5">
                  <dt className="label">{label}</dt>
                  <dd className="mt-2 wrap-break-word">
                    {href ? (
                      <a
                        href={href}
                        className="link-underline text-ink"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-ink">{value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: form, separated from the details by a left border on desktop */}
          <div className="md:border-l md:border-line md:pl-16">
            <h2 className="sr-only">Formulário de contato</h2>
            <ContactForm />
          </div>
        </div>
      </Container>
      <Rule />
    </div>
  );
}
