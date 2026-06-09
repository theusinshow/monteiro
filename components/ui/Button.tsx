import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "line" | "solid" | "ghost";

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 text-sm transition-colors duration-300 ease-editorial disabled:opacity-50";

const variants: Record<Variant, string> = {
  // hairline-bordered, the studio default — no heavy fill
  line: "border border-line px-6 py-3 text-ink hover:border-ink",
  // inverted, reserved for the single primary action
  solid: "bg-ink px-6 py-3 text-paper hover:bg-graphite",
  // text-only with animated underline
  ghost: "link-underline pb-0.5 text-graphite hover:text-ink",
};

/** Anchor/Link variant. */
export function ButtonLink({
  href,
  children,
  variant = "line",
  className,
}: CommonProps & { href: string }) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cn(base, variants[variant], className);

  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Native button variant (forms, interactions). */
export function Button({
  children,
  variant = "solid",
  className,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
