"use client";

import { Project } from "@/data/projects";

type FilterValue = Project["language"] | "all";

interface FilterTabsProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<FilterValue, number>;
}

const tabs: { value: FilterValue; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: "csharp", label: "C#/.NET" },
  { value: "typescript", label: "TYPESCRIPT" },
  { value: "java", label: "JAVA" },
];

export default function FilterTabs({ active, onChange, counts }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`font-mono text-[10px] px-3 py-1.5 border transition-all ${
            active === tab.value
              ? "text-retro-amber border-retro-amber bg-retro-amber/10"
              : "text-retro-brown border-retro-brown/30 hover:border-retro-amber/40 hover:text-retro-muted"
          }`}
        >
          {tab.label} ({counts[tab.value] ?? 0})
        </button>
      ))}
    </div>
  );
}
