"use client";

import Link from "next/link";
import GlitchText from "@/components/effects/GlitchText";
import StatBar from "@/components/StatBar";
import { profile } from "@/data/profile";

export default function Hero() {
  const levelStr = String(profile.level).padStart(2, "0");

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      <div className="max-w-2xl w-full">
        <p className="font-pixel text-xs text-retro-amber/70 tracking-widest mb-2">
          CLASS: {profile.role.toUpperCase()}
        </p>

        <GlitchText text={profile.name} as="h1" className="font-pixel text-3xl sm:text-4xl md:text-5xl text-retro-tan leading-relaxed" />

        <p className="mt-4 font-mono text-sm text-retro-muted">
          LVL {levelStr}  ·  {profile.location.toUpperCase()}  ·  {profile.available ? "AVAILABLE FOR PARTY" : "ON A QUEST"}
        </p>

        <p className="mt-6 font-mono text-base text-retro-muted/80 leading-relaxed max-w-xl">
          {profile.bio}
        </p>

        <div className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-pixel text-[10px] text-retro-amber">STATS</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
          </div>
          <div className="space-y-2">
            {profile.stats.map((stat) => (
              <StatBar key={stat.name} label={stat.name} value={stat.value} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/projects" className="border-2 border-retro-amber px-6 py-3 font-pixel text-[11px] text-retro-amber bg-retro-amber/5 hover:bg-retro-amber/15 transition-all hover:shadow-[0_0_20px_rgba(167,139,250,0.2)] text-center">
            QUEST LOG
          </Link>
          <Link href="/about" className="border-2 border-retro-brown px-6 py-3 font-pixel text-[11px] text-retro-muted hover:text-retro-amber hover:border-retro-amber transition-all text-center">
            CHARACTER SHEET
          </Link>
        </div>
      </div>
    </section>
  );
}
