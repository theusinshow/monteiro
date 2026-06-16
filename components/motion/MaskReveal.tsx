"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Photography entrance: the framed plate settles onto the page — a quiet fade
 * with a micro-zoom out (no clip-path). The trigger is `amount` (share of the
 * element visible) instead of a negative root margin, so it can't get stuck
 * hidden the way the old clip-path wipe could when the observer missed under
 * smooth scroll. No-op when motion is reduced. (Name kept for import stability.)
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
  // collapses the settle to an instant reveal.
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              opacity: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
            }
      }
    >
      {children}
    </motion.div>
  );
}
