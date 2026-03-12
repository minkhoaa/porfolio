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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {techItems.map((item, i) => (
          <div
            key={item.label}
            style={{ animationDelay: `${i * 80}ms` }}
            className={`border border-retro-brown/20 bg-retro-card/20 p-5 text-center hover:border-retro-amber/40 hover:shadow-[0_0_10px_rgba(167,139,250,0.08)] transition-all ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="text-3xl">{item.icon}</div>
            <div className="font-pixel text-xs text-retro-tan mt-3">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
