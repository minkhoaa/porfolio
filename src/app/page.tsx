import Link from "next/link";
import Hero from "@/components/Hero";
import QuestCard from "@/components/QuestCard";
import PageBackground from "@/components/effects/PageBackground";
import FloatingItems from "@/components/effects/FloatingItems";
import GlassCard from "@/components/effects/GlassCard";
import { getFeaturedProjects, projects } from "@/data/projects";
import GuildRecords from "@/components/GuildRecords";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <div className="relative">
      <PageBackground theme="overworld" />
      <FloatingItems theme="overworld" />
      <Hero />

      <div className="section-divider max-w-6xl mx-auto" />

      <GuildRecords />

      <div className="section-divider max-w-6xl mx-auto" />

      <GlassCard className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-pixel text-2xl font-bold text-retro-amber">FEATURED QUESTS</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
          <span className="font-mono text-xs text-retro-brown tracking-wider">
            {String(featured.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((project, i) => (
            <QuestCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <div className="text-center mt-14">
          <Link href="/projects" className="inline-block border-2 border-retro-amber px-10 py-3.5 font-pixel text-sm font-semibold text-retro-amber bg-retro-amber/5 hover:bg-retro-amber/15 transition-all duration-300 hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]">
            VIEW QUEST LOG
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
