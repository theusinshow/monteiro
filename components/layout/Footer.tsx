import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { nav, site } from "@/lib/site";

/**
 * Footer as an index — a quiet navigation grid on the global columns, its
 * edges drawn by element Rules; carries the low-pressure contact path.
 */
export function Footer() {
  return (
    <footer className="relative z-10 mt-32 bg-paper">
      <Rule marks />
      <Container className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-6 md:py-20 lg:grid-cols-8">
        <div className="col-span-2 md:col-span-6 lg:col-span-4">
          <p className="font-display text-3xl leading-none md:text-4xl">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="knockout mt-4 w-fit max-w-xs text-sm text-graphite">
            {site.tagline}.
          </p>
        </div>

        <nav
          className="col-span-2 md:col-span-3 lg:col-span-2 lg:col-start-5"
          aria-label="Rodapé"
        >
          <p className="label mb-4">Navegação</p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href} className="knockout w-fit">
                <Link
                  href={item.href}
                  className="link-underline text-sm text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:col-start-7">
          <p className="label mb-4">Contato</p>
          <ul className="space-y-2 wrap-break-word text-sm text-ink">
            <li className="knockout w-fit">
              <a href={site.whatsappUrl} className="link-underline">
                WhatsApp
              </a>
            </li>
            <li className="knockout w-fit">
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
            </li>
            <li className="knockout w-fit">
              <a href={site.instagram} className="link-underline">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Rule />
      <Container className="flex flex-col gap-2 py-6 text-xs text-graphite md:flex-row md:items-center md:justify-between">
        <span className="knockout">
          © {site.fullName}. {site.location}.
        </span>
        <span className="label">Site por Coded by M</span>
      </Container>
    </footer>
  );
}
