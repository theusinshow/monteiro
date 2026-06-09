import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { nav, site } from "@/lib/site";

/**
 * Minimal editorial header. A single hairline divides it from the page;
 * scroll-reactive treatment is layered in Phase 05.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-display text-xl tracking-tight md:text-2xl"
          aria-label={`${site.fullName} — início`}
        >
          {site.name}
          <span className="text-stone">.</span>
        </Link>

        <nav aria-label="Principal">
          <ul className="flex items-center gap-7 md:gap-10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline pb-0.5 text-sm text-graphite transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
