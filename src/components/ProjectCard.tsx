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
      <Link href={`/projects/${project.slug}`} className="block border border-retro-brown/25 bg-retro-card/30 hover:border-retro-amber/50 hover:shadow-[0_0_15px_rgba(167,139,250,0.1)] transition-all group">
        <div className="h-32 bg-gradient-to-br from-retro-card to-retro-dark/50 flex items-center justify-center border-b border-retro-brown/15">
          <span className="font-pixel text-[10px] text-retro-brown/30">SCREENSHOT</span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[10px] text-retro-amber group-hover:animate-[number-glitch_0.3s]">{number}</span>
            <span className="font-mono text-[10px] text-retro-brown">{project.tech[0]}</span>
          </div>
          <h3 className="font-pixel text-[12px] text-retro-tan mt-2 leading-relaxed">{project.shortName}</h3>
          <p className="font-mono text-[13px] text-retro-muted/60 mt-2 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t} className="font-mono text-[10px] text-retro-brown border border-retro-brown/30 px-1.5 py-0.5">{t}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
