import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Rule } from "@/components/ui/Rule";
import { nav, site } from "@/lib/site";

/**
 * Minimal editorial header. Its baseline is an element Rule on the grid, with
 * crosshairs at the column intersections; logo and nav align to the band edges.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="knockout font-display text-xl tracking-tight md:text-2xl"
          aria-label={`${site.fullName} — início`}
        >
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Principal">
          <ul className="flex items-center gap-7 md:gap-10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="knockout link-underline pb-0.5 text-sm text-graphite transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Rule marks />
    </header>
  );
}
