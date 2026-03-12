import Link from "next/link";
import Hero from "@/components/Hero";
import QuestCard from "@/components/QuestCard";
import { getFeaturedProjects, projects } from "@/data/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-10">
          <h2 className="font-pixel text-lg text-retro-amber">FEATURED QUESTS</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
          <span className="font-mono text-xs text-retro-brown">
            {String(featured.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <QuestCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/projects" className="inline-block border-2 border-retro-amber px-8 py-3 font-pixel text-[11px] text-retro-amber bg-retro-amber/5 hover:bg-retro-amber/15 transition-all hover:shadow-[0_0_20px_rgba(167,139,250,0.2)]">
            VIEW QUEST LOG
          </Link>
        </div>
      </section>
    </>
  );
}
