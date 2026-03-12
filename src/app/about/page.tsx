import { Metadata } from "next";
import Timeline from "@/components/Timeline";
import StatBar from "@/components/StatBar";
import PageBackground from "@/components/effects/PageBackground";
import FloatingItems from "@/components/effects/FloatingItems";
import GlassCard from "@/components/effects/GlassCard";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Character Sheet — KHOA.DEV",
  description: profile.bio,
};

export default function AboutPage() {
  const levelStr = String(profile.level).padStart(2, "0");

  return (
    <div className="relative">
      <PageBackground theme="tavern" />
      <FloatingItems theme="tavern" />
      <GlassCard className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center gap-3 mb-12">
        <h1 className="font-pixel text-2xl font-bold text-retro-amber">CHARACTER SHEET</h1>
        <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
      </div>

      {/* Identity card */}
      <div className="border border-retro-brown/20 bg-gradient-to-br from-retro-card/40 to-transparent p-6 mb-14">
        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
          <span className="font-pixel text-xs font-medium text-retro-amber/60 pt-0.5">NAME</span>
          <span className="font-mono text-sm text-retro-tan">{profile.name}</span>
          <span className="font-pixel text-xs font-medium text-retro-amber/60 pt-0.5">CLASS</span>
          <span className="font-mono text-sm text-retro-tan">{profile.role}</span>
          <span className="font-pixel text-xs font-medium text-retro-amber/60 pt-0.5">LEVEL</span>
          <span className="font-mono text-sm text-retro-tan">{levelStr}</span>
          <span className="font-pixel text-xs font-medium text-retro-amber/60 pt-0.5">ORIGIN</span>
          <span className="font-mono text-sm text-retro-tan">{profile.location}</span>
          <span className="font-pixel text-xs font-medium text-retro-amber/60 pt-0.5">STATUS</span>
          <span className={`font-mono text-sm ${profile.available ? "text-green" : "text-retro-muted"}`}>
            {profile.available ? "AVAILABLE FOR PARTY" : "ON A QUEST"}
          </span>
        </div>
      </div>

      {/* Backstory */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="font-pixel text-base font-semibold text-retro-amber">BACKSTORY</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        </div>
        <p className="font-mono text-sm text-retro-muted/80 leading-relaxed">{profile.bio}</p>
      </div>

      {/* Stats */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="font-pixel text-base font-semibold text-retro-amber">STATS</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        </div>
        <div className="border border-retro-brown/15 bg-retro-card/20 p-5 space-y-3">
          {profile.stats.map((stat) => (
            <StatBar key={stat.name} label={stat.name} value={stat.value} />
          ))}
        </div>
      </div>

      {/* Abilities */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="font-pixel text-base font-semibold text-retro-amber">ABILITIES</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        </div>
        <div className="space-y-4">
          {profile.skills.map((skill) => (
            <div key={skill.category} className="border-l-2 border-retro-amber/20 pl-4">
              <span className="font-pixel text-xs font-medium text-retro-amber/70 block mb-1">{skill.category}</span>
              <span className="font-mono text-sm text-retro-tan">{skill.items.join("  ·  ")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Adventure Log */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-pixel text-base font-semibold text-retro-amber">ADVENTURE LOG</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        </div>
        <Timeline entries={profile.experience} />
      </div>
      </GlassCard>
    </div>
  );
}
