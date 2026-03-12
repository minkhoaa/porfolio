"use client";

import { ExperienceEntry } from "@/data/profile";
import { useScrollReveal } from "@/components/effects/useScrollReveal";

interface TimelineProps {
  entries: ExperienceEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref} className="border-l-2 border-retro-brown/25 pl-4 ml-2">
      {entries.map((entry, i) => (
        <div key={i} style={{ animationDelay: `${i * 150}ms` }} className={`relative mb-8 last:mb-0 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className={`absolute -left-[22px] top-1 w-2.5 h-2.5 border-2 border-retro-dark ${entry.current ? "bg-retro-amber animate-[pulse-dot_2s_ease-in-out_infinite]" : "bg-retro-brown"}`} />
          <p className="font-mono text-[10px] text-retro-brown">{entry.dateRange}</p>
          <h3 className="font-pixel text-[8px] text-retro-tan mt-1">{entry.title}</h3>
          <p className="font-mono text-xs text-retro-muted/70 mt-1">{entry.description}</p>
        </div>
      ))}
    </div>
  );
}
