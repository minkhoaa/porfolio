"use client";

import { ExperienceEntry } from "@/data/profile";
import { useScrollReveal } from "@/components/effects/useScrollReveal";

interface TimelineProps {
  entries: ExperienceEntry[];
}

function TimelineEntry({ entry, delay, isVisible }: { entry: ExperienceEntry; delay: number; isVisible: boolean }) {
  return (
    <div style={{ animationDelay: `${delay}ms` }} className={`relative ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
      <div className={`absolute -left-[22px] top-1 w-2.5 h-2.5 border-2 border-retro-dark ${entry.current ? "bg-retro-amber animate-[pulse-dot_2s_ease-in-out_infinite]" : "bg-retro-brown"}`} />
      <p className="font-mono text-xs text-retro-brown">{entry.dateRange}</p>
      <h3 className="font-pixel text-sm font-semibold text-retro-tan mt-1">{entry.title}</h3>
      <p className="font-mono text-xs text-retro-muted/70 mt-1">{entry.description}</p>
    </div>
  );
}

export default function Timeline({ entries }: TimelineProps) {
  const { ref, isVisible } = useScrollReveal();

  const currentEntries = entries.filter((e) => e.current);
  const pastEntries = entries.filter((e) => !e.current);

  // If there are multiple current entries, render them as parallel branches
  if (currentEntries.length > 1) {
    return (
      <div ref={ref}>
        {/* Parallel current branches */}
        <div className="mb-6">
          <p className="font-pixel text-xs font-medium text-retro-amber/60 mb-4 tracking-wider">PRESENT</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentEntries.map((entry, i) => (
              <div
                key={i}
                style={{ animationDelay: `${i * 150}ms` }}
                className={`relative border-l-2 border-retro-amber/40 pl-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              >
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 border-2 border-retro-dark bg-retro-amber animate-[pulse-dot_2s_ease-in-out_infinite]" />
                <p className="font-mono text-xs text-retro-brown">{entry.dateRange}</p>
                <h3 className="font-pixel text-sm font-semibold text-retro-tan mt-1">{entry.title}</h3>
                <p className="font-mono text-xs text-retro-muted/70 mt-1">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Past entries — single timeline */}
        {pastEntries.length > 0 && (
          <div className="border-l-2 border-retro-brown/25 pl-4 ml-2">
            {pastEntries.map((entry, i) => (
              <div key={i} className="mb-8 last:mb-0">
                <TimelineEntry entry={entry} delay={(currentEntries.length + i) * 150} isVisible={isVisible} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default: single timeline
  return (
    <div ref={ref} className="border-l-2 border-retro-brown/25 pl-4 ml-2">
      {entries.map((entry, i) => (
        <div key={i} className="mb-8 last:mb-0">
          <TimelineEntry entry={entry} delay={i * 150} isVisible={isVisible} />
        </div>
      ))}
    </div>
  );
}
