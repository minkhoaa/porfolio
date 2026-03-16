"use client";

import Link from "next/link";
import { Project, DifficultyLevel } from "@/data/projects";
import { useScrollReveal } from "@/components/effects/useScrollReveal";

export interface QuestCardProps {
  project: Project;
  index: number;
}

function renderDifficulty(level: DifficultyLevel): string {
  return "■".repeat(level) + "□".repeat(5 - level);
}

const langConfig = {
  csharp: {
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #1e1546 100%)",
    accentColor: "#a78bfa",
    label: "C# · .NET",
    symbol: "◆",
  },
  typescript: {
    gradient: "linear-gradient(135deg, #0c1a2e 0%, #0f3460 60%, #0a1628 100%)",
    accentColor: "#38bdf8",
    label: "TypeScript",
    symbol: "▲",
  },
  java: {
    gradient: "linear-gradient(135deg, #1c0a00 0%, #431407 60%, #180800 100%)",
    accentColor: "#fb923c",
    label: "Java",
    symbol: "●",
  },
} as const;

export default function QuestCard({ project, index }: QuestCardProps) {
  const { ref, isVisible } = useScrollReveal();
  const number = String(project.order).padStart(2, "0");
  const lang = langConfig[project.language];

  return (
    <div ref={ref} style={{ animationDelay: `${index * 100}ms` }} className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
      <Link href={`/projects/${project.slug}`} className="block border border-retro-brown/20 bg-gradient-to-br from-retro-card/50 to-retro-card/20 hover:border-retro-amber/40 hover:bg-gradient-to-br hover:from-retro-card/70 hover:to-retro-amber/5 hover:shadow-[0_0_30px_rgba(167,139,250,0.1)] transition-all duration-300 group card-glow">
        {/* Language gradient header */}
        <div
          className="relative h-24 overflow-hidden"
          style={{ background: lang.gradient }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)" }}
          />
          {project.screenshot && (
            <img src={project.screenshot} alt={project.shortName} className="absolute inset-0 w-full h-full object-cover opacity-60" />
          )}
          <span
            className="absolute right-4 bottom-2 font-pixel text-6xl select-none opacity-10"
            style={{ color: lang.accentColor }}
          >
            {lang.symbol}
          </span>
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span
              className="font-pixel text-xs tracking-widest px-2 py-0.5 border"
              style={{ color: lang.accentColor, borderColor: `${lang.accentColor}40`, backgroundColor: `${lang.accentColor}12` }}
            >
              {lang.label}
            </span>
          </div>
        </div>
        <div className="relative p-6 pb-4 border-b border-retro-brown/10">
          <span className="absolute top-4 right-5 font-pixel text-4xl text-retro-amber/8 group-hover:text-retro-amber/15 transition-colors duration-300 select-none">{number}</span>
          <span className="font-mono text-xs text-retro-amber/60 tracking-widest uppercase">{project.tech[0]}</span>
          <h3 className="font-pixel text-lg sm:text-xl font-semibold text-retro-tan mt-2 leading-relaxed group-hover:text-retro-amber transition-colors duration-300">{project.shortName}</h3>
        </div>
        <div className="p-6 pt-4">
          <p className="font-mono text-sm text-retro-muted/70 leading-relaxed line-clamp-2">{project.description}</p>
          <div className="mt-5 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs font-medium text-retro-muted/60">STATUS</span>
              <span className="font-mono text-xs text-green tracking-wider">COMPLETED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs font-medium text-retro-muted/60">DIFFICULTY</span>
              <span className="font-mono text-xs text-retro-amber tracking-[0.2em]">{renderDifficulty(project.difficulty)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-retro-brown/10">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="font-mono text-xs text-retro-amber/70 border border-retro-amber/15 bg-retro-amber/5 px-2.5 py-1">{t}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
