"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "brightness(2) contrast(2)" }}
        animate={{ opacity: 1, filter: "brightness(1) contrast(1)" }}
        exit={{ opacity: 0, filter: "brightness(2) contrast(2)" }}
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
    </AnimatePresence>
  );
}
