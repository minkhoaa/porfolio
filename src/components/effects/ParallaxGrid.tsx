"use client";

import { useEffect, useRef } from "react";

export default function ParallaxGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return;
      const scrollY = window.scrollY;
      gridRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={gridRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: "linear-gradient(to right, rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        willChange: "transform",
      }}
    />
  );
}
