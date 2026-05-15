"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Tiny wrapper that fades + slides children in once on scroll-in.
// Used to add gentle motion without animating every page individually.
export function MotionSection({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
