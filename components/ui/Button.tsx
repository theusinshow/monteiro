import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "line" | "solid" | "ghost";

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  /** Full-width action bar: label left, arrow right. */
  block?: boolean;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 text-sm transition-colors duration-300 ease-editorial disabled:opacity-50";

const variants: Record<Variant, string> = {
  // hairline-bordered, the studio default
  line: "border border-line bg-paper px-6 py-3 text-ink hover:border-ink",
  // inverted, reserved for the single primary action
  solid: "bg-ink px-6 py-3 text-paper hover:bg-graphite",
  // text-only with animated underline
  ghost: "link-underline pb-0.5 text-graphite hover:text-ink",
};

/**
 * `block` makes a full-width action bar with the label left and an arrow right.
 * A trailing arrow is appended automatically in block mode.
 */
function blockShell(variant: Variant) {
  return cn(
    "group/btn flex w-full items-center justify-between gap-6 px-(--cell-pad) py-5 text-sm",
    "transition-colors duration-300 ease-editorial",
    variant === "solid"
      ? "bg-ink text-paper hover:bg-graphite"
      : "border border-line-strong bg-paper text-ink hover:border-ink",
  );
}

function BlockInner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="text-base transition-transform duration-500 ease-editorial group-hover/btn:translate-x-1"
      >
        →
      </span>
    </>
  );
}

/** Anchor/Link variant. */
export function ButtonLink({
  href,
  children,
  variant = "line",
  block = false,
  className,
}: CommonProps & { href: string }) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = block
    ? cn(blockShell(variant), className)
    : cn(base, variants[variant], className);
  const content = block ? <BlockInner>{children}</BlockInner> : children;

  if (external) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/** Native button variant (forms, interactions). */
export function Button({
  children,
  variant = "solid",
  block = false,
  className,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={
        block
          ? cn(blockShell(variant), className)
          : cn(base, variants[variant], className)
      }
      {...props}
    >
      {block ? <BlockInner>{children}</BlockInner> : children}
    </button>
  );
}
