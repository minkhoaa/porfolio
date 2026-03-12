import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="font-mono text-[10px] text-retro-brown mb-6">
        <Link href="/projects" className="text-retro-muted hover:text-retro-amber transition-colors">PROJECTS</Link>
        {" / "}
        <span className="text-retro-amber">{project.shortName}</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="font-pixel text-xl sm:text-2xl text-retro-amber leading-relaxed">{project.name}</h1>
          <p className="font-mono text-sm text-retro-orange mt-2">{project.description}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="border border-retro-amber px-3 py-1.5 font-mono text-[10px] text-retro-amber hover:bg-retro-amber/10 transition-colors">GITHUB ↗</a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="border border-retro-brown px-3 py-1.5 font-mono text-[10px] text-retro-muted hover:text-retro-amber hover:border-retro-amber transition-colors">LIVE ↗</a>
          )}
        </div>
      </div>

      <div className="mt-8 h-48 sm:h-64 border border-retro-brown/20 bg-gradient-to-br from-retro-card to-retro-dark/50 flex items-center justify-center">
        <span className="font-mono text-xs text-retro-brown/30">PROJECT SCREENSHOT / DEMO</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div>
          <h2 className="font-pixel text-[11px] text-retro-orange mb-3">OVERVIEW</h2>
          <p className="font-mono text-xs text-retro-muted leading-relaxed">{project.overview}</p>
        </div>
        <div>
          <h2 className="font-pixel text-[11px] text-retro-orange mb-3">TECH USED</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-[10px] text-retro-amber border border-retro-amber/30 px-2 py-0.5">{t}</span>
            ))}
          </div>
          <h2 className="font-pixel text-[11px] text-retro-orange mt-6 mb-3">ROLE</h2>
          <p className="font-mono text-xs text-retro-muted">{project.role}</p>
        </div>
      </div>

      <div className="flex justify-between mt-16 pt-6 border-t border-retro-brown/15">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="font-mono text-[10px] text-retro-muted hover:text-retro-amber transition-colors">← {prev.shortName}</Link>
        ) : <div />}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="font-mono text-[10px] text-retro-muted hover:text-retro-amber transition-colors">{next.shortName} →</Link>
        ) : <div />}
      </div>
    </div>
  );
}
