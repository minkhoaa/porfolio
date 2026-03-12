"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "brightness(2) contrast(2)" }}
      animate={{ opacity: 1, filter: "brightness(1) contrast(1)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        className="fixed inset-0 bg-retro-amber/5 pointer-events-none z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.15, delay: 0.05 }}
      />
      {children}
    </motion.div>
  );
}
