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
 * Photography as a framed plate. The figure's opaque paper footprint BREAKS the
 * persistent grid (the vertical lines stop at the photo), and a hairline frame —
 * inset by a clean paper margin — traces the image border, like a drawing
 * mounted on a sheet. Fixed aspect ratio (no CLS); a neutral placeholder holds
 * the frame when the real photograph is missing. On hover the image zooms
 * WITHIN the frame (the frame itself never scales) when wrapped in a `group`.
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
      className={cn("relative bg-paper", className)}
      style={{ aspectRatio: ratio }}
    >
      {/* clean paper margin + traced hairline frame around the image */}
      <div className="absolute inset-[clamp(0.625rem,0.8vw,1rem)] overflow-hidden border border-line-strong bg-paper-deep">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-label={alt}
            role="img"
            className="absolute inset-0 grid place-items-center"
          >
            <span className="label bg-transparent">{placeholderLabel}</span>
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
      </div>
    </figure>
  );
}
