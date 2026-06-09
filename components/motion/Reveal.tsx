"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical travel distance. */
  y?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** Quiet fade-up on enter. Falls back to a plain fade when motion is reduced. */
export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
