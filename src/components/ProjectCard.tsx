"use client";

import Link from "next/link";
import { Project } from "@/data/projects";
import { useScrollReveal } from "@/components/effects/useScrollReveal";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, isVisible } = useScrollReveal();
  const number = String(project.order).padStart(2, "0");

  return (
    <div ref={ref} style={{ animationDelay: `${index * 100}ms` }} className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
      <Link href={`/projects/${project.slug}`} className="block border border-retro-brown/25 bg-retro-card/30 hover:border-retro-amber/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)] transition-all group">
        <div className="relative h-36 bg-gradient-to-br from-retro-card to-retro-dark/50 flex items-end border-b border-retro-brown/15 overflow-hidden">
          <span className="absolute top-3 right-4 font-pixel text-4xl text-retro-amber/10 group-hover:text-retro-amber/20 transition-colors">{number}</span>
          <div className="p-5 pb-4 w-full">
            <span className="font-mono text-xs text-retro-amber/70 tracking-wider">{project.tech[0]}</span>
            <h3 className="font-pixel text-base sm:text-lg text-retro-tan mt-1 leading-relaxed group-hover:text-retro-amber transition-colors">{project.shortName}</h3>
          </div>
        </div>
        <div className="p-5 pt-4">
          <p className="font-mono text-sm text-retro-muted/70 leading-relaxed line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="font-mono text-xs text-retro-amber/80 border border-retro-amber/25 bg-retro-amber/5 px-2.5 py-1">{t}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
