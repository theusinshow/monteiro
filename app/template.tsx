"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Route transition wrapper. Re-mounts on navigation (App Router template)
 * for a quiet cross-page fade. Reduced motion → instant.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
