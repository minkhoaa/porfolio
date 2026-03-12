import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBackground from "@/components/effects/PageBackground";
import FloatingItems from "@/components/effects/FloatingItems";
import GlassCard from "@/components/effects/GlassCard";
import { projects, getProjectBySlug, DifficultyLevel } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

function renderDifficulty(level: DifficultyLevel): string {
  return "■".repeat(level) + "□".repeat(5 - level);
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.name} — KHOA.DEV`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
  const currentIndex = sortedProjects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? sortedProjects[currentIndex - 1] : null;
  const next = currentIndex < sortedProjects.length - 1 ? sortedProjects[currentIndex + 1] : null;
  const questNumber = String(project.order).padStart(2, "0");

  return (
    <div className="relative">
      <PageBackground theme="dungeon" />
      <FloatingItems theme="dungeon" />
      <GlassCard className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="font-mono text-xs text-retro-brown mb-8 tracking-wider">
        <Link href="/projects" className="text-retro-muted hover:text-retro-amber transition-colors">QUESTS</Link>
        {" / "}
        <span className="text-retro-amber">{project.shortName}</span>
      </div>

      <p className="font-pixel text-sm font-medium text-retro-muted/60 mb-2 tracking-wider">QUEST {questNumber}</p>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="font-pixel text-3xl sm:text-4xl font-bold text-retro-amber leading-relaxed">{project.name}</h1>
          <p className="font-mono text-sm text-retro-orange/80 mt-3">{project.description}</p>
          <p className="font-mono text-xs text-retro-amber/70 mt-3 tracking-[0.2em]">DIFFICULTY {renderDifficulty(project.difficulty)}</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="border-2 border-retro-amber px-5 py-2 font-mono text-xs text-retro-amber bg-retro-amber/5 hover:bg-retro-amber/15 transition-all duration-300 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]">VIEW SOURCE</a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="border-2 border-retro-brown px-5 py-2 font-mono text-xs text-retro-muted hover:text-retro-amber hover:border-retro-amber transition-all duration-300">LIVE DEMO</a>
          )}
        </div>
      </div>

      <div className="section-divider my-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-pixel text-base font-semibold text-retro-amber">QUEST BRIEFING</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
          </div>
          <p className="font-mono text-sm text-retro-muted/80 leading-relaxed">{project.overview}</p>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-pixel text-base font-semibold text-retro-amber">XP GAINED</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-xs text-retro-amber/80 border border-retro-amber/20 bg-retro-amber/5 px-2.5 py-1">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-8 mb-4">
            <h2 className="font-pixel text-base font-semibold text-retro-amber">CLASS ROLE</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
          </div>
          <p className="font-mono text-sm text-retro-muted/80">{project.role}</p>
        </div>
      </div>

      <div className="flex justify-between mt-20 pt-6 border-t border-retro-brown/15">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="font-mono text-xs text-retro-muted hover:text-retro-amber transition-colors duration-200 tracking-wider">PREVIOUS QUEST</Link>
        ) : <div />}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="font-mono text-xs text-retro-muted hover:text-retro-amber transition-colors duration-200 tracking-wider">NEXT QUEST</Link>
        ) : <div />}
      </div>
      </GlassCard>
    </div>
  );
}
