"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";
import { CornerMarks } from "@/components/ui/Plus";

type FigureProps = {
  src?: string | null;
  alt: string;
  /** CSS aspect-ratio token, e.g. "4/5", "3/2", "16/9". */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Registration crosshairs at the four frame corners. */
  marks?: boolean;
  /** Caption shown on the neutral placeholder when no image exists yet. */
  placeholderLabel?: string;
};

/**
 * Photography as a framed plate. A hairline frame — inset by a clean paper
 * margin — traces the image border, and crosshairs (+) register the four
 * corners, like a drawing mounted on a sheet. Fixed aspect ratio (no CLS); a
 * neutral placeholder holds the frame when the photograph is missing.
 *
 * Motion: the photograph drifts a few percent WITHIN the frame as the figure
 * travels through the viewport (a quiet scroll parallax; the frame never moves)
 * and zooms within the frame on hover when wrapped in a `group`. The image is
 * always rendered — there is no entrance state that can get stuck hidden.
 * Parallax is disabled under prefers-reduced-motion.
 */
export function Figure({
  src,
  alt,
  ratio = "4/5",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  className,
  marks = true,
  placeholderLabel = "Imagem em breve",
}: FigureProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // ±6% of the (taller-than-frame) inner layer; the frame's overflow clips it.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-6%", "6%"],
  );

  return (
    <figure
      ref={ref}
      className={cn("relative bg-paper", className)}
      style={{ aspectRatio: ratio }}
    >
      {/* frame wrapper: clean paper margin around the image; not clipped so the
          corner crosshairs can sit on the frame corners */}
      <div className="absolute inset-[clamp(0.625rem,0.8vw,1rem)]">
        <div className="relative h-full w-full overflow-hidden border border-line-strong bg-paper-deep">
          {src ? (
            // inner layer is taller than the frame (-inset-y) so the parallax
            // drift never exposes an edge; the frame above clips the overflow.
            <motion.div
              style={{ y }}
              className="absolute inset-x-0 inset-y-[-8%]"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
              />
            </motion.div>
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
        </div>
        {marks && <CornerMarks />}
      </div>
    </figure>
  );
}
