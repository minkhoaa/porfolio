import Link from "next/link";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import TechGrid from "@/components/TechGrid";
import { getFeaturedProjects, projects } from "@/data/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-10">
          <h2 className="font-pixel text-lg text-retro-amber">FEATURED PROJECTS</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
          <span className="font-mono text-xs text-retro-brown">
            {String(featured.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/projects" className="font-mono text-sm text-retro-amber border-b border-dashed border-retro-amber/30 hover:border-retro-amber transition-colors">
            VIEW ALL PROJECTS →
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-10">
          <h2 className="font-pixel text-lg text-retro-amber">TECH STACK</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        </div>
        <TechGrid />
      </section>
    </>
  );
}
