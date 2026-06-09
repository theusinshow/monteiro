"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * A hairline that draws itself in from the left on enter — the core motion
 * gesture of the studio ("the drawing builds itself").
 */
export function DrawHairline({
  className,
  strong = false,
  delay = 0,
}: {
  className?: string;
  strong?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={cn(
        "block h-px w-full origin-left",
        strong ? "bg-line-strong" : "bg-line",
        className,
      )}
      initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
