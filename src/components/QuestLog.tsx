"use client";

import { useState } from "react";
import { Project, projects, getProjectsByLanguage } from "@/data/projects";
import QuestCard from "@/components/QuestCard";
import FilterTabs from "@/components/FilterTabs";

type FilterValue = Project["language"] | "all";

export default function QuestLog() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const filtered = getProjectsByLanguage(filter);

  const counts: Record<FilterValue, number> = {
    all: projects.length,
    csharp: projects.filter((p) => p.language === "csharp").length,
    typescript: projects.filter((p) => p.language === "typescript").length,
    java: projects.filter((p) => p.language === "java").length,
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-pixel text-2xl font-bold text-retro-amber">QUEST LOG</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        <span className="font-mono text-xs text-retro-brown tracking-wider">
          {String(filtered.length).padStart(2, "0")} QUESTS
        </span>
      </div>
      <div className="mb-10">
        <FilterTabs active={filter} onChange={setFilter} counts={counts} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project, i) => (
          <QuestCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </>
  );
}
