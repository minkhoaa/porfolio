import { projects } from "@/data/projects";
import GlassCard from "@/components/effects/GlassCard";

const uniqueTechCount = new Set(projects.flatMap((p) => p.tech)).size;

const stats = [
  {
    value: String(projects.length).padStart(2, "0"),
    label: "QUESTS COMPLETED",
    sublabel: "missions logged",
  },
  {
    value: String(uniqueTechCount).padStart(2, "0"),
    label: "TECHNOLOGIES USED",
    sublabel: "across all quests",
  },
  {
    value: "03",
    label: "YEARS IN THE FIELD",
    sublabel: "since AUG 2023",
  },
  {
    value: "02",
    label: "ACTIVE PARTY ROLES",
    sublabel: "concurrent positions",
  },
] as const;

export default function GuildRecords() {
  return (
    <GlassCard className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="font-pixel text-2xl font-bold text-retro-amber">MISSION STATS</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        <span className="font-mono text-xs text-retro-brown tracking-wider">GUILD RECORDS</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-retro-brown/20 bg-gradient-to-br from-retro-card/50 to-retro-card/20 p-6 flex flex-col gap-3 hover:border-retro-amber/30 transition-colors duration-300"
          >
            <span className="font-pixel text-4xl sm:text-5xl font-bold text-retro-amber leading-none">
              {stat.value}
            </span>
            <div>
              <p className="font-pixel text-xs font-semibold text-retro-tan tracking-wider leading-relaxed">
                {stat.label}
              </p>
              <p className="font-mono text-xs text-retro-muted/50 mt-1">{stat.sublabel}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
