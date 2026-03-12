"use client";

import Link from "next/link";
import GlitchText from "@/components/effects/GlitchText";
import StatBar from "@/components/StatBar";
import { profile } from "@/data/profile";

export default function Hero() {
  const levelStr = String(profile.level).padStart(2, "0");

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      <div className="max-w-3xl w-full">
        <p className="font-pixel text-xs font-medium text-retro-amber/60 tracking-[0.3em] mb-4">
          CLASS: {profile.role.toUpperCase()}
        </p>

        <GlitchText text={profile.name} as="h1" className="font-pixel text-5xl sm:text-6xl md:text-7xl font-bold text-retro-tan leading-relaxed" />

        <p className="mt-5 font-mono text-sm text-retro-muted tracking-wide">
          LVL {levelStr}  ·  {profile.location.toUpperCase()}  ·  {profile.available ? "AVAILABLE FOR PARTY" : "ON A QUEST"}
        </p>

        <p className="mt-8 font-mono text-base sm:text-lg text-retro-muted/80 leading-relaxed max-w-2xl">
          {profile.bio}
        </p>

        {/* Social links */}
        <div className="mt-6 flex gap-4">
          {profile.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-retro-brown hover:text-retro-amber transition-colors"
            >
              {social.platform.toUpperCase()}
            </a>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-pixel text-base font-semibold text-retro-amber">STATS</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
          </div>
          <div className="space-y-3">
            {profile.stats.map((stat) => (
              <StatBar key={stat.name} label={stat.name} value={stat.value} />
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link href="/projects" className="border-2 border-retro-amber px-8 py-3.5 font-pixel text-sm font-semibold text-retro-amber bg-retro-amber/5 hover:bg-retro-amber/15 transition-all hover:shadow-[0_0_25px_rgba(167,139,250,0.2)] text-center">
            QUEST LOG
          </Link>
          <Link href="/about" className="border-2 border-retro-brown px-8 py-3.5 font-pixel text-sm font-semibold text-retro-muted hover:text-retro-amber hover:border-retro-amber transition-all text-center">
            CHARACTER SHEET
          </Link>
        </div>
      </div>
    </section>
  );
}
