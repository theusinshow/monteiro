import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { nav, site } from "@/lib/site";

/**
 * Footer as an index — a quiet navigation grid framed by hairlines,
 * carrying the persistent, low-pressure contact path.
 */
export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-line bg-paper">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-12 md:py-20">
        <div className="col-span-2 md:col-span-5">
          <p className="font-display text-3xl leading-none md:text-4xl">
            {site.name}
            <span className="text-stone">.</span>
          </p>
          <p className="mt-4 max-w-xs text-sm text-graphite">
            {site.tagline}. {/* PLACEHOLDER — manifesto (CNT-006) */}
          </p>
        </div>

        <nav className="md:col-span-3 md:col-start-7" aria-label="Rodapé">
          <p className="label mb-4">Navegação</p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
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

        <div className="md:col-span-3">
          <p className="label mb-4">Contato</p>
          <ul className="space-y-2 text-sm text-ink">
            <li>
              <a href={site.whatsappUrl} className="link-underline">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.instagram} className="link-underline">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-graphite md:flex-row md:items-center md:justify-between">
        <span>
          © {site.fullName}. {site.location}.
        </span>
        <span className="label">Site por Coded by M</span>
      </Container>
    </footer>
  );
}
