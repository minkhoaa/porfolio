# RPG Character Sheet Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio as an RPG character sheet — all personal info becomes prominent character data, projects become quests, tech stack becomes inventory, with all emoji/icon violations removed.

**Architecture:** Presentation-layer reskin of existing Next.js 16 + React 19 portfolio. Update data interfaces (add `stats`, `level`, `difficulty`), create one new component (`StatBar`), rewrite Hero/About/Contact/Nav, rename ProjectCard→QuestCard + ProjectsGrid→QuestLog, delete PixelParticles + TechGrid.

**Tech Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4 (`@theme` tokens in `globals.css`), Framer Motion

**Spec:** `docs/superpowers/specs/2026-03-12-rpg-portfolio-redesign-design.md`

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `src/components/StatBar.tsx` | Animated CSS stat bar with label + fill + value |
| `src/components/QuestCard.tsx` | Quest card (replaces ProjectCard) with difficulty/status/XP |
| `src/components/QuestLog.tsx` | Quest log grid with filters (replaces ProjectsGrid) |

### Modified Files
| File | Changes |
|------|---------|
| `src/data/profile.ts` | Add `CharacterStat` interface, `level` + `stats` fields, remove `avatar?`, expand bio |
| `src/data/projects.ts` | Add `DifficultyLevel` type, `difficulty` field to all 9 projects |
| `src/components/Hero.tsx` | Full rewrite — RPG character intro with stats |
| `src/components/Nav.tsx` | RPG nav labels, text menu toggle |
| `src/components/SocialLinks.tsx` | Remove emoji icons, text-only layout |
| `src/components/ContactForm.tsx` | RPG labels, remove Unicode arrow |
| `src/components/FilterTabs.tsx` | RPG label text |
| `src/app/page.tsx` | Remove TechGrid/PixelParticles imports, use QuestCard, RPG labels |
| `src/app/about/page.tsx` | Full rewrite — character sheet layout with stats + abilities |
| `src/app/contact/page.tsx` | RPG terminology |
| `src/app/projects/page.tsx` | Use QuestLog instead of ProjectsGrid |
| `src/app/projects/[slug]/page.tsx` | RPG terminology, add difficulty display |
| `src/app/not-found.tsx` | RPG terminology |

### Deleted Files
| File | Reason |
|------|--------|
| `src/components/ProjectCard.tsx` | Replaced by QuestCard |
| `src/components/ProjectsGrid.tsx` | Replaced by QuestLog |
| `src/components/TechGrid.tsx` | Used emoji icons, replaced by StatBar + abilities in About |
| `src/components/effects/PixelParticles.tsx` | Noisy component, violates CLAUDE.md |

### Unchanged Files
| File | Reason |
|------|--------|
| `src/components/effects/GlitchText.tsx` | Still used for character name |
| `src/components/effects/TypingAnimation.tsx` | Still used for bio typing |
| `src/components/effects/ParallaxGrid.tsx` | Subtle grid, no icons |
| `src/components/effects/useScrollReveal.ts` | Used by StatBar, QuestCard |
| `src/components/Timeline.tsx` | Used for Adventure Log |
| `src/components/Footer.tsx` | Already text-only, no changes |
| `src/app/template.tsx` | Page transitions unchanged |
| `src/app/layout.tsx` | Root layout unchanged |
| `src/app/globals.css` | Theme tokens unchanged |

---

## Chunk 1: Data Layer + New Components

### Task 1: Update profile data interface and content

**Files:**
- Modify: `src/data/profile.ts`

- [ ] **Step 1: Update the Profile interface and data**

Add `CharacterStat` interface, `level` field, `stats` array, remove `avatar?`, expand bio:

```typescript
export interface CharacterStat {
  name: string;
  value: number;
}

export interface SocialLink {
  platform: "github" | "linkedin" | "email" | "facebook";
  url: string;
  label: string;
}

export interface ExperienceEntry {
  dateRange: string;
  title: string;
  description: string;
  current: boolean;
}

export interface Profile {
  name: string;
  role: string;
  level: number;
  bio: string;
  location: string;
  available: boolean;
  socials: SocialLink[];
  experience: ExperienceEntry[];
  skills: {
    category: string;
    items: string[];
  }[];
  stats: CharacterStat[];
}

export const profile: Profile = {
  name: "TU MINH KHOA",
  role: ".NET Backend Developer",
  level: 3,
  bio: "Passionate about building scalable backend systems and microservices. Started coding in 2023 with C# and .NET, quickly diving into distributed systems and modern web technologies. Experienced with full-stack development across .NET, TypeScript, and Java ecosystems. Currently focused on microservices architecture, containerization, and cloud-native patterns.",
  location: "Ho Chi Minh City, Vietnam",
  available: true,
  socials: [
    { platform: "github", url: "https://github.com/minkhoaa", label: "github.com/minkhoaa" },
    { platform: "linkedin", url: "#", label: "LinkedIn" },
    { platform: "email", url: "mailto:placeholder@email.com", label: "placeholder@email.com" },
    { platform: "facebook", url: "#", label: "Facebook" },
  ],
  experience: [
    { dateRange: "2023 — Present", title: "Backend Developer", description: "Building scalable .NET backend systems and microservices architecture.", current: true },
    { dateRange: "2023", title: "Started Coding", description: "Began programming journey with C# and .NET framework.", current: false },
  ],
  skills: [
    { category: "BACKEND", items: ["C#", ".NET", "ASP.NET", "SQL Server", "Docker"] },
    { category: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
    { category: "TOOLS", items: ["Git", "Docker", "Linux", "RabbitMQ", "Redis"] },
    { category: "OTHER", items: ["Java", "WPF", "Microservices"] },
  ],
  stats: [
    { name: "BACKEND", value: 90 },
    { name: "FRONTEND", value: 55 },
    { name: "DEVOPS", value: 65 },
    { name: "DATABASE", value: 75 },
  ],
};
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/data/profile.ts
git commit -m "feat: add RPG character stats and level to profile data"
```

---

### Task 2: Update projects data with difficulty

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Add DifficultyLevel type and difficulty field to interface**

Add at the top of the file after imports:
```typescript
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
```

Add `difficulty: DifficultyLevel` to the `Project` interface.

- [ ] **Step 2: Add difficulty values to all 9 projects**

| Project | Difficulty |
|---------|-----------|
| langfens-microservice | 5 |
| peerzee | 4 |
| clinic-api | 3 |
| foodify | 3 |
| english-app | 2 |
| wpf-clinic | 3 |
| library-management | 3 |
| clinic-app | 2 |
| hr-management | 4 |

Add `difficulty: N` to each project object in the array.

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add difficulty level to all projects for RPG quest display"
```

---

### Task 3: Create StatBar component

**Files:**
- Create: `src/components/StatBar.tsx`

- [ ] **Step 1: Create the StatBar component**

```typescript
"use client";

import { useScrollReveal } from "@/components/effects/useScrollReveal";

export interface StatBarProps {
  label: string;
  value: number;
}

export default function StatBar({ label, value }: StatBarProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="font-pixel text-[10px] text-retro-muted w-24 shrink-0">{label}</span>
      <div className="flex-1 h-3 bg-retro-brown/30 overflow-hidden">
        <div
          className="h-full bg-retro-amber transition-all duration-1000 motion-reduce:transition-none"
          style={{ width: isVisible ? `${value}%` : "0%" }}
        />
      </div>
      <span className="font-mono text-xs text-retro-amber w-8 text-right">{value}</span>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/StatBar.tsx
git commit -m "feat: create StatBar component with animated CSS fill"
```

---

### Task 4: Create QuestCard component

**Files:**
- Create: `src/components/QuestCard.tsx`

- [ ] **Step 1: Create the QuestCard component**

```typescript
"use client";

import Link from "next/link";
import { Project, DifficultyLevel } from "@/data/projects";
import { useScrollReveal } from "@/components/effects/useScrollReveal";

export interface QuestCardProps {
  project: Project;
  index: number;
}

function renderDifficulty(level: DifficultyLevel): string {
  return "■".repeat(level) + "□".repeat(5 - level);
}

export default function QuestCard({ project, index }: QuestCardProps) {
  const { ref, isVisible } = useScrollReveal();
  const number = String(project.order).padStart(2, "0");

  return (
    <div ref={ref} style={{ animationDelay: `${index * 100}ms` }} className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
      <Link href={`/projects/${project.slug}`} className="block border border-retro-brown/25 bg-retro-card/30 hover:border-retro-amber/50 hover:shadow-[0_0_20px_rgba(167,139,250,0.15)] transition-all group">
        <div className="relative p-5 pb-3 border-b border-retro-brown/15">
          <span className="absolute top-3 right-4 font-pixel text-3xl text-retro-amber/10 group-hover:text-retro-amber/20 transition-colors">{number}</span>
          <span className="font-mono text-xs text-retro-amber/70 tracking-wider">{project.tech[0]}</span>
          <h3 className="font-pixel text-base sm:text-lg text-retro-tan mt-1 leading-relaxed group-hover:text-retro-amber transition-colors">{project.shortName}</h3>
        </div>
        <div className="p-5 pt-3">
          <p className="font-mono text-sm text-retro-muted/70 leading-relaxed line-clamp-2">{project.description}</p>
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] text-retro-muted w-20">STATUS</span>
              <span className="font-mono text-xs text-green">COMPLETED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[10px] text-retro-muted w-20">DIFFICULTY</span>
              <span className="font-mono text-xs text-retro-amber tracking-widest">{renderDifficulty(project.difficulty)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-retro-brown/10">
            <span className="font-pixel text-[10px] text-retro-muted">XP</span>
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="font-mono text-xs text-retro-amber/80 border border-retro-amber/25 bg-retro-amber/5 px-2 py-0.5">{t}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/QuestCard.tsx
git commit -m "feat: create QuestCard component with difficulty and XP display"
```

---

### Task 5: Create QuestLog component

**Files:**
- Create: `src/components/QuestLog.tsx`

- [ ] **Step 1: Create the QuestLog component**

```typescript
"use client";

import { useState } from "react";
import { Project, projects, getProjectsByLanguage } from "@/data/projects";
import QuestCard from "@/components/QuestCard";
import FilterTabs from "@/components/FilterTabs";

type FilterValue = Project["language"] | "all";

export default function QuestLog() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const filtered = getProjectsByLanguage(filter);

  const counts: Record<FilterValue, number> = {
    all: projects.length,
    csharp: projects.filter((p) => p.language === "csharp").length,
    typescript: projects.filter((p) => p.language === "typescript").length,
    java: projects.filter((p) => p.language === "java").length,
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-pixel text-lg text-retro-amber">QUEST LOG</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        <span className="font-mono text-xs text-retro-brown">
          {String(filtered.length).padStart(2, "0")} QUESTS
        </span>
      </div>
      <div className="mb-8">
        <FilterTabs active={filter} onChange={setFilter} counts={counts} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <QuestCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/QuestLog.tsx
git commit -m "feat: create QuestLog component with RPG terminology"
```

---

## Chunk 2: Rewrite Core Pages

### Task 6: Rewrite Hero component

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero as RPG character intro**

Replace the entire file content with:

```typescript
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: rewrite Hero as RPG character intro with stats"
```

---

### Task 7: Update home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite home page — remove TechGrid, use QuestCard, RPG labels**

Replace the entire file content with:

```typescript
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: update home page with RPG terminology, remove TechGrid"
```

---

### Task 8: Rewrite About page as Character Sheet

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Rewrite about page as RPG character sheet**

Replace the entire file content with:

```typescript
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: rewrite About page as RPG character sheet"
```

---

### Task 9: Update projects page to use QuestLog

**Files:**
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Replace ProjectsGrid with QuestLog**

Replace the entire file content with:

```typescript
import { Metadata } from "next";
import QuestLog from "@/components/QuestLog";

export const metadata: Metadata = {
  title: "Quest Log — KHOA.DEV",
  description: "All quests by Tu Minh Khoa — .NET, TypeScript, Java",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <QuestLog />
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "feat: update projects page to use QuestLog"
```

---

### Task 10: Update project detail page with RPG terminology

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Add RPG terminology to detail page**

Replace the entire file content with:

```typescript
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="font-mono text-[10px] text-retro-brown mb-6">
        <Link href="/projects" className="text-retro-muted hover:text-retro-amber transition-colors">QUESTS</Link>
        {" / "}
        <span className="text-retro-amber">{project.shortName}</span>
      </div>

      <p className="font-pixel text-xs text-retro-muted mb-2">QUEST {questNumber}</p>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="font-pixel text-xl sm:text-2xl text-retro-amber leading-relaxed">{project.name}</h1>
          <p className="font-mono text-sm text-retro-orange mt-2">{project.description}</p>
          <p className="font-mono text-xs text-retro-amber mt-2 tracking-widest">DIFFICULTY {renderDifficulty(project.difficulty)}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="border border-retro-amber px-3 py-1.5 font-mono text-[10px] text-retro-amber hover:bg-retro-amber/10 transition-colors">VIEW SOURCE</a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="border border-retro-brown px-3 py-1.5 font-mono text-[10px] text-retro-muted hover:text-retro-amber hover:border-retro-amber transition-colors">LIVE DEMO</a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="font-pixel text-[11px] text-retro-amber">QUEST BRIEFING</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
          </div>
          <p className="font-mono text-xs text-retro-muted leading-relaxed">{project.overview}</p>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="font-pixel text-[11px] text-retro-amber">XP GAINED</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-[10px] text-retro-amber border border-retro-amber/30 px-2 py-0.5">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-6 mb-3">
            <h2 className="font-pixel text-[11px] text-retro-amber">CLASS ROLE</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
          </div>
          <p className="font-mono text-xs text-retro-muted">{project.role}</p>
        </div>
      </div>

      <div className="flex justify-between mt-16 pt-6 border-t border-retro-brown/15">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="font-mono text-[10px] text-retro-muted hover:text-retro-amber transition-colors">PREVIOUS QUEST</Link>
        ) : <div />}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="font-mono text-[10px] text-retro-muted hover:text-retro-amber transition-colors">NEXT QUEST</Link>
        ) : <div />}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/[slug]/page.tsx
git commit -m "feat: add RPG terminology to quest detail page"
```

---

## Chunk 3: Update Remaining Components + Cleanup

### Task 11: Update Nav with RPG labels

**Files:**
- Modify: `src/components/Nav.tsx`

- [ ] **Step 1: Update nav labels and mobile toggle**

Change the `navLinks` array:
```typescript
const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "CHARACTER" },
  { href: "/projects", label: "QUESTS" },
  { href: "/contact", label: "NEW QUEST" },
];
```

Change the mobile toggle button text from `"✕"` to `"CLOSE"` and `"≡"` to `"MENU"`. Update the button className to add proper padding:
```typescript
<button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-retro-amber font-pixel text-[10px] px-3 py-2" aria-label="Toggle menu" aria-expanded={menuOpen}>
  {menuOpen ? "CLOSE" : "MENU"}
</button>
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: update Nav with RPG terminology, text menu toggle"
```

---

### Task 12: Update FilterTabs labels

**Files:**
- Modify: `src/components/FilterTabs.tsx`

- [ ] **Step 1: Update tab labels**

Change the `tabs` array:
```typescript
const tabs: { value: FilterValue; label: string }[] = [
  { value: "all", label: "ALL QUESTS" },
  { value: "csharp", label: "C# / .NET" },
  { value: "typescript", label: "TYPESCRIPT" },
  { value: "java", label: "JAVA" },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FilterTabs.tsx
git commit -m "feat: update FilterTabs with RPG quest labels"
```

---

### Task 13: Update SocialLinks — remove emoji

**Files:**
- Modify: `src/components/SocialLinks.tsx`

- [ ] **Step 1: Rewrite SocialLinks without emoji**

Replace the entire file content with:

```typescript
import { SocialLink } from "@/data/profile";

interface SocialLinksProps {
  links: SocialLink[];
}

export default function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target={link.platform !== "email" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="border border-retro-brown/20 bg-retro-card/20 p-3 hover:border-retro-amber/40 hover:translate-x-1 transition-all group"
        >
          <p className="font-pixel text-[10px] text-retro-tan group-hover:text-retro-amber transition-colors">
            {link.platform.toUpperCase()}
          </p>
          <p className="font-mono text-xs text-retro-brown mt-1">
            {link.label}
          </p>
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SocialLinks.tsx
git commit -m "fix: remove emoji icons from SocialLinks, text-only layout"
```

---

### Task 14: Update ContactForm with RPG labels

**Files:**
- Modify: `src/components/ContactForm.tsx`

- [ ] **Step 1: Update labels and button text**

Make the following text changes in the existing file:

1. Success state text:
   - `"MESSAGE SENT SUCCESSFULLY"` → `"QUEST REQUEST SENT"`
   - `"Thank you! I will get back to you soon."` → `"I'll respond to your quest soon."`
   - `"Send another message"` → `"START ANOTHER QUEST"`

2. Form labels:
   - `"> NAME"` → `"> YOUR NAME"`
   - `"> EMAIL"` → `"> YOUR EMAIL"`
   - `"> MESSAGE"` → `"> QUEST DESCRIPTION"`

3. Submit button:
   - `'SENDING...'` → `'SENDING QUEST REQUEST...'`
   - `'SEND_MESSAGE.exe \u25B6'` → `'SEND QUEST REQUEST'`

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "feat: update ContactForm with RPG labels, remove Unicode arrow"
```

---

### Task 15: Update contact page with RPG terminology

**Files:**
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Update headings**

Change the following text in the file:
- Page title metadata: `"Contact — KHOA.DEV"` → `"New Quest — KHOA.DEV"`
- Description: `"Get in touch with Tu Minh Khoa"` → `"Start a new quest with Tu Minh Khoa"`
- `<h1>`: `"GET IN TOUCH"` → `"START A NEW QUEST"`
- `<h2>` for form: `"SEND MESSAGE"` → `"QUEST DETAILS"`
- `<h2>` for socials: `"FIND ME"` → `"CONNECT"`

- [ ] **Step 2: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: update contact page with RPG terminology"
```

---

### Task 16: Update 404 page with RPG text

**Files:**
- Modify: `src/app/not-found.tsx`

- [ ] **Step 1: Update text**

Change:
- `"ERROR 404"` → `"QUEST NOT FOUND"`
- `"Page not found in this directory."` → `"THE PATH YOU SEEK DOES NOT EXIST."`
- `"RETURN HOME"` → `"RETURN TO BASE"`

- [ ] **Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: update 404 page with RPG terminology"
```

---

### Task 17: Delete old components

**Files:**
- Delete: `src/components/ProjectCard.tsx`
- Delete: `src/components/ProjectsGrid.tsx`
- Delete: `src/components/TechGrid.tsx`
- Delete: `src/components/effects/PixelParticles.tsx`

- [ ] **Step 1: Delete the files**

```bash
rm src/components/ProjectCard.tsx
rm src/components/ProjectsGrid.tsx
rm src/components/TechGrid.tsx
rm src/components/effects/PixelParticles.tsx
```

- [ ] **Step 2: Verify no remaining imports**

Run: `npx tsc --noEmit`
Expected: No errors (all imports should already point to new components)

If there are errors about missing imports, fix them.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 4: Verify lint**

Run: `npm run lint`
Expected: No lint errors

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: delete replaced components (ProjectCard, ProjectsGrid, TechGrid, PixelParticles)"
```

---

### Task 18: Final verification

- [ ] **Step 1: Full type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds, all routes generate correctly

- [ ] **Step 4: Visual verification**

Start dev server and check all routes:
- `/` — Hero with character intro, stats bars, featured quests
- `/about` — Character sheet with name/class/level table, stats, abilities, adventure log
- `/projects` — Quest log with filters, quest cards showing difficulty
- `/projects/langfens-microservice` — Quest detail with difficulty, RPG sections
- `/contact` — New quest form, text-only social links
- `/404` — RPG themed not found page

Verify:
- No emoji anywhere
- All text is readable (min 10px pixel, 12px mono)
- Stat bars animate on scroll
- Sharp corners throughout
- Mobile responsive
