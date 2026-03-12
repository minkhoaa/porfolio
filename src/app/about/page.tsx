import { Metadata } from "next";
import Timeline from "@/components/Timeline";
import StatBar from "@/components/StatBar";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Character Sheet — KHOA.DEV",
  description: profile.bio,
};

export default function AboutPage() {
  const levelStr = String(profile.level).padStart(2, "0");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center gap-3 mb-10">
        <h1 className="font-pixel text-lg text-retro-amber">CHARACTER SHEET</h1>
        <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
      </div>

      <div className="space-y-3 mb-12">
        <div className="flex gap-4">
          <span className="font-pixel text-[10px] text-retro-muted w-20 shrink-0 pt-0.5">NAME</span>
          <span className="font-mono text-sm text-retro-tan">{profile.name}</span>
        </div>
        <div className="flex gap-4">
          <span className="font-pixel text-[10px] text-retro-muted w-20 shrink-0 pt-0.5">CLASS</span>
          <span className="font-mono text-sm text-retro-tan">{profile.role}</span>
        </div>
        <div className="flex gap-4">
          <span className="font-pixel text-[10px] text-retro-muted w-20 shrink-0 pt-0.5">LEVEL</span>
          <span className="font-mono text-sm text-retro-tan">{levelStr}</span>
        </div>
        <div className="flex gap-4">
          <span className="font-pixel text-[10px] text-retro-muted w-20 shrink-0 pt-0.5">ORIGIN</span>
          <span className="font-mono text-sm text-retro-tan">{profile.location}</span>
        </div>
        <div className="flex gap-4">
          <span className="font-pixel text-[10px] text-retro-muted w-20 shrink-0 pt-0.5">STATUS</span>
          <span className={`font-mono text-sm ${profile.available ? "text-green" : "text-retro-muted"}`}>
            {profile.available ? "AVAILABLE FOR PARTY" : "ON A QUEST"}
          </span>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-pixel text-[11px] text-retro-amber">BACKSTORY</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        </div>
        <p className="font-mono text-sm text-retro-muted/80 leading-relaxed">{profile.bio}</p>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-pixel text-[11px] text-retro-amber">STATS</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        </div>
        <div className="space-y-2">
          {profile.stats.map((stat) => (
            <StatBar key={stat.name} label={stat.name} value={stat.value} />
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-pixel text-[11px] text-retro-amber">ABILITIES</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        </div>
        <div className="space-y-3">
          {profile.skills.map((skill) => (
            <div key={skill.category} className="flex gap-4">
              <span className="font-pixel text-[10px] text-retro-amber w-20 shrink-0 pt-0.5">{skill.category}</span>
              <span className="font-mono text-sm text-retro-tan">{skill.items.join("  ·  ")}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-pixel text-[11px] text-retro-amber">ADVENTURE LOG</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        </div>
        <Timeline entries={profile.experience} />
      </div>
    </div>
  );
}
