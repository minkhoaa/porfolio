"use client";

import Link from "next/link";
import GlitchText from "@/components/effects/GlitchText";
import TypingAnimation from "@/components/effects/TypingAnimation";
import PixelParticles from "@/components/effects/PixelParticles";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      <PixelParticles count={25} />
      <div className="text-center max-w-2xl">
        <div className="font-mono text-sm text-retro-brown tracking-widest">
          <TypingAnimation text="> HELLO_WORLD" speed={100} className="text-retro-brown" />
        </div>

        <div className="mt-6">
          <GlitchText text={profile.name} as="h1" className="font-pixel text-3xl sm:text-4xl lg:text-5xl text-retro-amber leading-relaxed" />
        </div>

        <p className="mt-4 font-mono text-base text-retro-orange">{profile.role}</p>
        <p className="mt-2 font-mono text-xs text-retro-brown">📍 {profile.location}</p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/projects" className="border-2 border-retro-amber px-6 py-3 font-pixel text-[11px] text-retro-amber bg-retro-amber/5 hover:bg-retro-amber/15 transition-all hover:shadow-[0_0_20px_rgba(167,139,250,0.2)]">
            VIEW MY WORK
          </Link>
          <Link href="/contact" className="border-2 border-retro-brown px-6 py-3 font-pixel text-[11px] text-retro-muted hover:text-retro-amber hover:border-retro-amber transition-all">
            CONTACT ME
          </Link>
        </div>

        <div className="mt-16 animate-bounce">
          <span className="font-mono text-[10px] text-retro-brown/40">▼ SCROLL DOWN ▼</span>
        </div>
      </div>
    </section>
  );
}
