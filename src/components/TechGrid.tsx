"use client";

import { useScrollReveal } from "@/components/effects/useScrollReveal";

const techItems = [
  { icon: "⚡", label: "C#" },
  { icon: "🔷", label: ".NET" },
  { icon: "📘", label: "TS" },
  { icon: "🐳", label: "DOCKER" },
  { icon: "⚛️", label: "REACT" },
  { icon: "▲", label: "NEXT.JS" },
  { icon: "🗄️", label: "SQL" },
  { icon: "☕", label: "JAVA" },
];

export default function TechGrid() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {techItems.map((item, i) => (
          <div
            key={item.label}
            style={{ animationDelay: `${i * 80}ms` }}
            className={`border border-retro-brown/20 bg-retro-card/20 p-4 text-center hover:border-retro-amber/40 hover:shadow-[0_0_10px_rgba(251,191,36,0.08)] transition-all ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="text-2xl">{item.icon}</div>
            <div className="font-pixel text-[7px] text-retro-tan mt-2">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
