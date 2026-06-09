import Image from "next/image";
import { cn } from "@/lib/cn";

type FigureProps = {
  src?: string | null;
  alt: string;
  /** CSS aspect-ratio token, e.g. "4/5", "3/2", "16/9". */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Caption shown on the neutral placeholder when no image exists yet. */
  placeholderLabel?: string;
};

/**
 * Image wrapper with a fixed aspect ratio (no CLS). When the real photograph
 * is missing, renders a neutral, intentional placeholder framed by a hairline
 * rather than a broken image.
 */
export function Figure({
  src,
  alt,
  ratio = "4/5",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  className,
  placeholderLabel = "Imagem em breve",
}: FigureProps) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden bg-paper-deep",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-label={alt}
          role="img"
          className="absolute inset-0 grid place-items-center"
        >
          <span className="label">{placeholderLabel}</span>
          {/* faint diagonal construction line, architectural cue */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(to top right, transparent calc(50% - 0.5px), var(--color-line) 50%, transparent calc(50% + 0.5px))",
            }}
          />
        </div>
      )}
    </figure>
  );
}
