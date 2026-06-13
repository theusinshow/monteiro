"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Reveals its content behind a rising mask (clip-path wipe) with a subtle
 * settle. Used for photography. No-op wrapper when motion is reduced.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  // `initial` is constant (never branches on useReducedMotion, which is null on
  // the server and would otherwise cause a hydration mismatch). Reduced motion
  // collapses the wipe to an instant reveal instead.
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={
        reduce ? { duration: 0 } : { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
