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
      <Rule marks />
      <Container className="flex items-center justify-between py-3">
        <span className="label">
          <span className="text-ink">00 /</span>
          <span className="ml-2">Contato</span>
        </span>
        <span className="label">Mensagem</span>
      </Container>

      <Rule />
      <Container>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {/* Left: invitation + contact ficha */}
          <div className="col-span-4 px-(--cell-pad) py-12 md:col-span-6 md:py-16 lg:col-span-3">
            <h1 className="knockout w-fit max-w-[12ch] font-display text-4xl leading-tight md:text-6xl">
              Vamos começar.
            </h1>
            <p className="knockout mt-6 w-fit max-w-sm text-lg text-graphite">
              Conte sobre o seu projeto. Respondemos pessoalmente.
            </p>

            <dl className="mt-12 border-t border-line">
              {details.map(([label, value, href]) => (
                <div key={label} className="border-b border-line py-5">
                  <dt className="label">{label}</dt>
                  <dd className="mt-2 wrap-break-word">
                    {href ? (
                      <a
                        href={href}
                        className="knockout link-underline text-ink"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="knockout text-ink">{value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: form, divided from the index by a vertical hairline */}
          <div className="col-span-4 px-(--cell-pad) py-12 md:col-span-6 md:py-16 lg:col-span-5 lg:border-l lg:border-line">
            <ContactForm />
          </div>
        </div>
      </Container>
      <Rule />
    </div>
  );
}
