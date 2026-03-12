import { Metadata } from "next";
import Timeline from "@/components/Timeline";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About — KHOA.DEV",
  description: profile.bio,
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center gap-3 mb-10">
        <h1 className="font-pixel text-base text-retro-amber">ABOUT ME</h1>
        <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="shrink-0">
          <div className="w-20 h-20 border-2 border-retro-amber bg-retro-card flex items-center justify-center text-4xl">👨‍💻</div>
          {profile.available && (
            <p className="font-mono text-[8px] text-green-500 mt-1 text-center">● AVAILABLE</p>
          )}
        </div>
        <div>
          <h2 className="font-pixel text-[10px] text-retro-tan">{profile.name}</h2>
          <p className="font-mono text-sm text-retro-orange mt-1">{profile.role}</p>
          <p className="font-mono text-xs text-retro-muted/70 mt-3 leading-relaxed">{profile.bio}</p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-pixel text-[9px] text-retro-amber mb-6">EXPERIENCE</h2>
        <Timeline entries={profile.experience} />
      </div>

      <div className="mt-16">
        <h2 className="font-pixel text-[9px] text-retro-amber mb-6">SKILLS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.skills.map((skill) => (
            <div key={skill.category} className="border border-retro-brown/20 bg-retro-card/20 p-4">
              <h3 className="font-pixel text-[7px] text-retro-orange mb-3">{skill.category}</h3>
              <p className="font-mono text-[11px] text-retro-muted leading-relaxed">{skill.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
