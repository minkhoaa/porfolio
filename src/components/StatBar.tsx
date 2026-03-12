"use client";

import { useScrollReveal } from "@/components/effects/useScrollReveal";

export interface StatBarProps {
  label: string;
  value: number;
}

export default function StatBar({ label, value }: StatBarProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="font-pixel text-[10px] text-retro-muted w-24 shrink-0">{label}</span>
      <div className="flex-1 h-3 bg-retro-brown/30 overflow-hidden">
        <div
          className="h-full bg-retro-amber transition-all duration-1000 motion-reduce:transition-none"
          style={{ width: isVisible ? `${value}%` : "0%" }}
        />
      </div>
      <span className="font-mono text-xs text-retro-amber w-8 text-right">{value}</span>
    </div>
  );
}
