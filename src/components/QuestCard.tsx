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

export default function QuestCard({ project, index }: QuestCardProps) {
  const { ref, isVisible } = useScrollReveal();
  const number = String(project.order).padStart(2, "0");

  return (
    <div ref={ref} style={{ animationDelay: `${index * 100}ms` }} className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
      <Link href={`/projects/${project.slug}`} className="block border border-retro-brown/25 bg-retro-card/30 hover:border-retro-amber/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)] transition-all group">
        <div className="relative p-5 pb-3 border-b border-retro-brown/15">
          <span className="absolute top-3 right-4 font-pixel text-3xl text-retro-amber/10 group-hover:text-retro-amber/20 transition-colors">{number}</span>
          <span className="font-mono text-xs text-retro-amber/70 tracking-wider">{project.tech[0]}</span>
          <h3 className="font-pixel text-base sm:text-lg text-retro-tan mt-1 leading-relaxed group-hover:text-retro-amber transition-colors">{project.shortName}</h3>
        </div>
        <div className="p-5 pt-3">
          <p className="font-mono text-sm text-retro-muted/70 leading-relaxed line-clamp-2">{project.description}</p>
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] text-retro-muted w-20">STATUS</span>
              <span className="font-mono text-xs text-green">COMPLETED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] text-retro-muted w-20">DIFFICULTY</span>
              <span className="font-mono text-xs text-retro-amber tracking-widest">{renderDifficulty(project.difficulty)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-retro-brown/10">
            <span className="font-pixel text-[10px] text-retro-muted">XP</span>
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="font-mono text-xs text-retro-amber/80 border border-retro-amber/25 bg-retro-amber/5 px-2 py-0.5">{t}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
