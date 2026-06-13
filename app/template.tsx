"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Route transition wrapper. Re-mounts on navigation (App Router template)
 * for a quiet cross-page fade. The motion wrapper is enabled only after
 * hydration so the server and first client render agree (no opacity
 * mismatch); the fade still plays on every client-side navigation, where
 * this component mounts fresh with `mounted` starting false. Reduced
 * motion → instant.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (reduce || !mounted) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
