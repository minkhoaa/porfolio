# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign personal portfolio with Neo-Retro aesthetic — pixel fonts, warm amber palette, heavy animations, multi-page Next.js structure.

**Architecture:** Multi-page Next.js 16 app with static data files (no CMS), Framer Motion for page transitions and animations, Tailwind CSS v4 for styling. Components split by responsibility: pages, shared components, effect components, data layer.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-12-portfolio-redesign-design.md`

---

## Chunk 1: Foundation — Data Layer & Design System

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install framer-motion**

Run: `npm install framer-motion`

- [ ] **Step 2: Verify installation**

Run: `npm ls framer-motion`
Expected: `framer-motion@<version>` listed

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add framer-motion dependency"
```

---

### Task 2: Create project data file

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create `src/data/projects.ts`**

```typescript
export interface Project {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  overview: string;
  tech: string[];
  language: "csharp" | "typescript" | "java";
  role: string;
  github: string;
  live?: string;
  screenshot?: string;
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    slug: "langfens-microservice",
    name: "Project Langfens Microservice",
    shortName: "LANGFENS MICRO",
    description: "Microservices architecture project with .NET",
    overview:
      "A microservices-based system built with .NET, demonstrating service decomposition, inter-service communication, and containerized deployment. Implements patterns like API Gateway, service discovery, and event-driven architecture.",
    tech: [".NET", "C#", "Docker", "RabbitMQ", "SQL Server"],
    language: "csharp",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/Project_Langfens_Microservice",
    featured: true,
    order: 1,
  },
  {
    slug: "peerzee",
    name: "Peerzee Fullstack",
    shortName: "PEERZEE",
    description: "Full-stack TypeScript application",
    overview:
      "A full-stack TypeScript application built with modern web technologies. Features server-side rendering, type-safe API layer, and responsive design.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    language: "typescript",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/peerzee-fullstack",
    featured: true,
    order: 2,
  },
  {
    slug: "clinic-api",
    name: "Clinic Management API",
    shortName: "CLINIC API",
    description: "RESTful API for clinic management system",
    overview:
      "A comprehensive clinic management API built with ASP.NET Core. Handles patient records, appointments, prescriptions, and billing with role-based access control.",
    tech: [".NET", "C#", "SQL Server", "Entity Framework"],
    language: "csharp",
    role: "Backend Developer",
    github: "https://github.com/minkhoaa/Clinic_Management_API",
    order: 3,
    featured: false,
  },
  {
    slug: "foodify",
    name: "Foodify Social Media Backend",
    shortName: "FOODIFY",
    description: "Backend for a food-themed social media platform",
    overview:
      "Social media backend focused on food sharing. Features user authentication, post CRUD, image handling, likes/comments, and feed algorithms.",
    tech: [".NET", "C#", "SQL Server", "REST API"],
    language: "csharp",
    role: "Backend Developer",
    github: "https://github.com/minkhoaa/Foodify-Social-Media-Backend",
    order: 4,
    featured: false,
  },
  {
    slug: "english-app",
    name: "English App Backend",
    shortName: "ENGLISH APP",
    description: "Backend for an English learning application",
    overview:
      "An English learning application backend providing vocabulary, grammar exercises, and progress tracking for language learners.",
    tech: [".NET", "C#", "SQL Server"],
    language: "csharp",
    role: "Backend Developer",
    github: "https://github.com/minkhoaa/EnglishApp-Backend",
    order: 5,
    featured: false,
  },
  {
    slug: "wpf-clinic",
    name: "QLPhongMachTu WPF",
    shortName: "WPF CLINIC",
    description: "Desktop clinic management application",
    overview:
      "A Windows desktop application built with WPF for clinic management. Features patient registration, appointment scheduling, and prescription management with a rich UI.",
    tech: ["C#", "WPF", ".NET", "SQL Server"],
    language: "csharp",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/QLPhongMachTu-WPF",
    order: 6,
    featured: false,
  },
  {
    slug: "library-management",
    name: "Library Management",
    shortName: "LIBRARY MGMT",
    description: "Library management system",
    overview:
      "A TypeScript-based library management system handling book cataloging, member management, borrowing/returning workflows, and overdue tracking.",
    tech: ["TypeScript", "React", "Node.js"],
    language: "typescript",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/LibraryManagement",
    order: 7,
    featured: false,
  },
  {
    slug: "clinic-app",
    name: "Clinic App Frontend",
    shortName: "CLINIC APP",
    description: "Frontend for clinic management system",
    overview:
      "A TypeScript frontend application companion to the Clinic Management API. Provides a responsive interface for managing clinic operations.",
    tech: ["TypeScript", "React"],
    language: "typescript",
    role: "Frontend Developer",
    github: "https://github.com/minkhoaa/ClinicApp",
    order: 8,
    featured: false,
  },
  {
    slug: "hr-management",
    name: "HR Management",
    shortName: "HR MGMT",
    description: "Human resources management system",
    overview:
      "A Java-based HR management system for employee records, payroll processing, leave management, and organizational structure.",
    tech: ["Java", "Spring Boot", "MySQL"],
    language: "java",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/HR-Management",
    order: 9,
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getProjectsByLanguage(
  language: Project["language"] | "all"
): Project[] {
  if (language === "all") return [...projects].sort((a, b) => a.order - b.order);
  return projects
    .filter((p) => p.language === language)
    .sort((a, b) => a.order - b.order);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit src/data/projects.ts`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add project data with typed interfaces"
```

---

### Task 3: Create profile data file

**Files:**
- Create: `src/data/profile.ts`

- [ ] **Step 1: Create `src/data/profile.ts`**

```typescript
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
  bio: string;
  location: string;
  available: boolean;
  avatar?: string;
  socials: SocialLink[];
  experience: ExperienceEntry[];
  skills: {
    category: string;
    items: string[];
  }[];
}

export const profile: Profile = {
  name: "TU MINH KHOA",
  role: ".NET Backend Developer",
  bio: "Passionate about building scalable backend systems and microservices. Experienced with .NET, TypeScript, and modern web technologies.",
  location: "Ho Chi Minh City, Vietnam",
  available: true,
  socials: [
    {
      platform: "github",
      url: "https://github.com/minkhoaa",
      label: "github.com/minkhoaa",
    },
    {
      platform: "linkedin",
      url: "#",
      label: "LinkedIn",
    },
    {
      platform: "email",
      url: "mailto:placeholder@email.com",
      label: "placeholder@email.com",
    },
    {
      platform: "facebook",
      url: "#",
      label: "Facebook",
    },
  ],
  experience: [
    {
      dateRange: "2023 — Present",
      title: "Backend Developer",
      description: "Building scalable .NET backend systems and microservices architecture.",
      current: true,
    },
    {
      dateRange: "2023",
      title: "Started Coding",
      description: "Began programming journey with C# and .NET framework.",
      current: false,
    },
  ],
  skills: [
    {
      category: "BACKEND",
      items: ["C#", ".NET", "ASP.NET", "SQL Server", "Docker"],
    },
    {
      category: "FRONTEND",
      items: ["React", "Next.js", "TypeScript", "Tailwind"],
    },
    {
      category: "TOOLS",
      items: ["Git", "Docker", "Linux", "RabbitMQ", "Redis"],
    },
    {
      category: "OTHER",
      items: ["Java", "WPF", "Microservices"],
    },
  ],
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/data/profile.ts
git commit -m "feat: add profile data with social links and experience"
```

---

### Task 4: Update design system — globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace `src/app/globals.css` with new amber palette**

```css
@import "tailwindcss";

@theme {
  --color-retro-amber: #fbbf24;
  --color-retro-orange: #d97706;
  --color-retro-brown: #92400e;
  --color-retro-tan: #d4a574;
  --color-retro-muted: #a8854a;
  --color-retro-dark: #0f0a07;
  --color-retro-card: #1c1008;
  --color-green: #22c55e;

  --font-family-pixel: var(--font-pixel);
  --font-family-mono: var(--font-mono);
}

@layer base {
  html {
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed;
  }

  body {
    background-color: var(--color-retro-dark);
    color: var(--color-retro-tan);
    font-family: var(--font-family-mono);
  }
}

/* Pixel grid background */
.bg-pixel-grid {
  background-image: linear-gradient(
      to right,
      rgba(146, 64, 14, 0.07) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgba(146, 64, 14, 0.07) 1px,
      transparent 1px
    );
  background-size: 20px 20px;
}

/* Scanline overlay */
.scanlines::after {
  content: "";
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  pointer-events: none;
  z-index: 50;
}

/* Glitch text keyframes */
@keyframes glitch {
  0%, 100% { text-shadow: 2px 2px var(--color-retro-brown), -1px -1px var(--color-retro-orange); }
  20% { text-shadow: -2px 1px var(--color-retro-orange), 1px -2px var(--color-retro-brown); }
  40% { text-shadow: 1px -1px var(--color-retro-brown), -2px 2px var(--color-retro-orange); }
  60% { text-shadow: -1px 2px var(--color-retro-orange), 2px -1px var(--color-retro-brown); }
  80% { text-shadow: 2px -2px var(--color-retro-brown), -1px 1px var(--color-retro-orange); }
}

/* Timeline dot pulse */
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(251, 191, 36, 0); }
}

/* Fade in up animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

/* Cursor blink */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Number glitch on hover */
@keyframes number-glitch {
  0%, 100% { opacity: 1; }
  33% { opacity: 0.8; content: "##"; }
  66% { opacity: 0.9; content: "??"; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .scanlines::after {
    display: none;
  }
}
```

- [ ] **Step 2: Verify dev server starts**

Run: `npm run dev`
Expected: Server starts, page renders with dark amber background

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: update design system to amber/retro palette with animations"
```

---

### Task 5: Update Tailwind config

**Files:**
- Delete: `tailwind.config.ts`

- [ ] **Step 1: Delete `tailwind.config.ts`**

Tailwind v4 uses CSS-first configuration via `@theme` in `globals.css`. The config file is no longer needed — colors are defined in `@theme` and font families are set there too. Content detection is automatic in Tailwind v4.

Run: `rm tailwind.config.ts`

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: remove tailwind config — use CSS-first @theme for Tailwind v4"
```

---

## Chunk 2: Layout & Shared Components

### Task 6: Create Nav component

**Files:**
- Create: `src/components/Nav.tsx`

- [ ] **Step 1: Create `src/components/Nav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/contact", label: "CONTACT" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-retro-brown/20 bg-retro-dark/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-retro-amber flex items-center justify-center">
              <span className="font-pixel text-[10px] text-retro-dark">K</span>
            </div>
            <span className="font-pixel text-[9px] text-retro-amber group-hover:text-retro-orange transition-colors">
              KHOA.DEV
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-mono text-xs transition-colors ${
                    isActive
                      ? "text-retro-amber border-b-2 border-retro-amber pb-0.5"
                      : "text-retro-muted hover:text-retro-amber"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Social links (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/minkhoaa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-retro-muted hover:text-retro-amber text-xs font-mono transition-colors"
            >
              GH
            </a>
            <a
              href="#"
              className="text-retro-muted hover:text-retro-amber text-xs font-mono transition-colors"
            >
              LI
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-retro-amber font-pixel text-xs p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "≡"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-retro-brown/20 bg-retro-dark/98">
          <div className="px-4 py-3 flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-mono text-sm py-1 ${
                    isActive ? "text-retro-amber" : "text-retro-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add navigation component with mobile menu"
```

---

### Task 7: Create Footer component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create `src/components/Footer.tsx`**

```tsx
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-retro-brown/20 bg-retro-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-retro-brown">
            &copy; 2026 KHOA.DEV — Built with Next.js + Tailwind
          </p>
          <div className="flex items-center gap-4">
            {profile.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target={social.platform !== "email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-retro-muted hover:text-retro-amber transition-colors"
              >
                {social.platform.toUpperCase().slice(0, 2)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add footer component"
```

---

### Task 8: Create template.tsx for page transitions

**Files:**
- Create: `src/app/template.tsx`

Note: Using `template.tsx` instead of wrapping children in `layout.tsx`. In Next.js App Router, `layout.tsx` persists across routes and does not unmount/remount children, so AnimatePresence exit animations won't fire. `template.tsx` remounts per-route, making it the correct place for page transitions.

- [ ] **Step 1: Create `src/app/template.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "brightness(2) contrast(2)" }}
      animate={{ opacity: 1, filter: "brightness(1) contrast(1)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* CRT glitch flash overlay */}
      <motion.div
        className="fixed inset-0 bg-retro-amber/5 pointer-events-none z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.15, delay: 0.05 }}
      />
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/template.tsx
git commit -m "feat: add page transition template with CRT glitch flash"
```

---

### Task 9: Rewrite root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace `src/app/layout.tsx`**

```tsx
import "./globals.css";
import { Metadata } from "next";
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const fontPixel = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: "400",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "KHOA.DEV — .NET Backend Developer",
  description:
    "Tu Minh Khoa — .NET Backend Developer based in Ho Chi Minh City. Building scalable backend systems and microservices.",
  openGraph: {
    title: "KHOA.DEV — .NET Backend Developer",
    description:
      "Tu Minh Khoa — .NET Backend Developer. Microservices, C#, TypeScript.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontPixel.variable} ${fontMono.variable} font-mono bg-retro-dark text-retro-tan bg-pixel-grid scanlines`}
      >
        <Nav />
        <main className="min-h-screen pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify dev server renders with Nav + Footer**

Run: `npm run dev`
Expected: Page shows navigation bar at top with "K KHOA.DEV" logo and links, footer at bottom, dark background with pixel grid

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: rewrite root layout with nav, footer, page transitions"
```

---

## Chunk 3: Effect Components

### Task 10: Create GlitchText component

**Files:**
- Create: `src/components/effects/GlitchText.tsx`

- [ ] **Step 1: Create `src/components/effects/GlitchText.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
}

export default function GlitchText({
  text,
  className = "",
  as: Tag = "span",
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tag
      className={`${className} ${isGlitching ? "animate-[glitch_0.3s_ease-in-out]" : ""}`}
      style={{
        textShadow: "2px 2px var(--color-retro-brown), -1px -1px var(--color-retro-orange)",
      }}
    >
      {text}
    </Tag>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/effects/GlitchText.tsx
git commit -m "feat: add glitch text effect component"
```

---

### Task 11: Create TypingAnimation component

**Files:**
- Create: `src/components/effects/TypingAnimation.tsx`

- [ ] **Step 1: Create `src/components/effects/TypingAnimation.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypingAnimation({
  text,
  speed = 80,
  className = "",
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <span
        className={`transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`}
      >
        |
      </span>
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/effects/TypingAnimation.tsx
git commit -m "feat: add typing animation component"
```

---

### Task 12: Create ParallaxGrid component

**Files:**
- Create: `src/components/effects/ParallaxGrid.tsx`

- [ ] **Step 1: Create `src/components/effects/ParallaxGrid.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function ParallaxGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return;
      const scrollY = window.scrollY;
      gridRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={gridRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(146,64,14,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(146,64,14,0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        willChange: "transform",
      }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/effects/ParallaxGrid.tsx
git commit -m "feat: add parallax grid background effect"
```

---

### Task 13: Create ScrollReveal hook

**Files:**
- Create: `src/components/effects/useScrollReveal.ts`

- [ ] **Step 1: Create `src/components/effects/useScrollReveal.ts`**

This hook uses Intersection Observer to trigger fade-in-up on scroll.

```typescript
"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/effects/useScrollReveal.ts
git commit -m "feat: add scroll reveal hook with intersection observer"
```

---

### Task 13b: Verify effect components compile

**Files:**
- None (verification only)

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 2: Commit if any fixes needed**

---

## Chunk 4: Home Page

### Task 14: Create Hero component

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```tsx
"use client";

import Link from "next/link";
import GlitchText from "@/components/effects/GlitchText";
import TypingAnimation from "@/components/effects/TypingAnimation";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      <div className="text-center max-w-2xl">
        {/* Greeting */}
        <div className="font-mono text-sm text-retro-brown tracking-widest">
          <TypingAnimation text="> HELLO_WORLD" speed={100} className="text-retro-brown" />
        </div>

        {/* Name */}
        <div className="mt-6">
          <GlitchText
            text={profile.name}
            as="h1"
            className="font-pixel text-2xl sm:text-3xl lg:text-4xl text-retro-amber leading-relaxed"
          />
        </div>

        {/* Role */}
        <p className="mt-4 font-mono text-base text-retro-orange">
          {profile.role}
        </p>

        {/* Location */}
        <p className="mt-2 font-mono text-xs text-retro-brown">
          📍 {profile.location}
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="border-2 border-retro-amber px-6 py-3 font-pixel text-[9px] text-retro-amber bg-retro-amber/5 hover:bg-retro-amber/15 transition-all hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]"
          >
            VIEW MY WORK
          </Link>
          <Link
            href="/contact"
            className="border-2 border-retro-brown px-6 py-3 font-pixel text-[9px] text-retro-muted hover:text-retro-amber hover:border-retro-amber transition-all"
          >
            CONTACT ME
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <span className="font-mono text-[10px] text-retro-brown/40">
            ▼ SCROLL DOWN ▼
          </span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add hero section with typing and glitch effects"
```

---

### Task 15: Create ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Create `src/components/ProjectCard.tsx`**

```tsx
"use client";

import Link from "next/link";
import { Project } from "@/data/projects";
import { useScrollReveal } from "@/components/effects/useScrollReveal";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, isVisible } = useScrollReveal();
  const number = String(project.order).padStart(2, "0");

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${index * 100}ms` }}
      className={isVisible ? "animate-fade-in-up" : "opacity-0"}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block border border-retro-brown/25 bg-retro-card/30 hover:border-retro-amber/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.1)] transition-all group"
      >
        {/* Screenshot placeholder */}
        <div className="h-32 bg-gradient-to-br from-retro-card to-retro-dark/50 flex items-center justify-center border-b border-retro-brown/15">
          <span className="font-pixel text-[7px] text-retro-brown/30">
            SCREENSHOT
          </span>
        </div>

        <div className="p-4">
          {/* Number + language */}
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[8px] text-retro-amber group-hover:animate-[number-glitch_0.3s]">
              {number}
            </span>
            <span className="font-mono text-[10px] text-retro-brown">
              {project.tech[0]}
            </span>
          </div>

          {/* Name */}
          <h3 className="font-pixel text-[9px] text-retro-tan mt-2 leading-relaxed">
            {project.shortName}
          </h3>

          {/* Description */}
          <p className="font-mono text-[11px] text-retro-muted/60 mt-2 line-clamp-2">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] text-retro-brown border border-retro-brown/30 px-1.5 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: add project card component with scroll reveal"
```

---

### Task 16: Create TechGrid component

**Files:**
- Create: `src/components/TechGrid.tsx`

- [ ] **Step 1: Create `src/components/TechGrid.tsx`**

```tsx
"use client";

import { useScrollReveal } from "@/components/effects/useScrollReveal";

const techItems = [
  { icon: "⚡", label: "C#" },
  { icon: "🔷", label: ".NET" },
  { icon: "📘", label: "TS" },
  { icon: "🐳", label: "DOCKER" },
  { icon: "⚛️", label: "REACT" },
  { icon: "▲", label: "NEXT.JS" },
  { icon: "🗄️", label: "SQL" },
  { icon: "☕", label: "JAVA" },
];

export default function TechGrid() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {techItems.map((item, i) => (
          <div
            key={item.label}
            style={{ animationDelay: `${i * 80}ms` }}
            className={`border border-retro-brown/20 bg-retro-card/20 p-4 text-center hover:border-retro-amber/40 hover:shadow-[0_0_10px_rgba(251,191,36,0.08)] transition-all ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="text-2xl">{item.icon}</div>
            <div className="font-pixel text-[7px] text-retro-tan mt-2">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TechGrid.tsx
git commit -m "feat: add tech stack grid component"
```

---

### Task 17: Create Home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
import Link from "next/link";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import TechGrid from "@/components/TechGrid";
import { getFeaturedProjects, projects } from "@/data/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-10">
          <h2 className="font-pixel text-sm text-retro-amber">
            FEATURED PROJECTS
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
          <span className="font-mono text-xs text-retro-brown">
            {String(featured.length).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="font-mono text-sm text-retro-amber border-b border-dashed border-retro-amber/30 hover:border-retro-amber transition-colors"
          >
            VIEW ALL PROJECTS →
          </Link>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-10">
          <h2 className="font-pixel text-sm text-retro-amber">TECH STACK</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        </div>
        <TechGrid />
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify home page renders**

Run: `npm run dev` and visit `http://localhost:3000`
Expected: Hero with typing animation, glitch name, CTA buttons. Below: featured projects section with 2 cards, tech stack grid.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: implement home page with hero, featured projects, tech stack"
```

---

## Chunk 5: About Page

### Task 18: Create Timeline component

**Files:**
- Create: `src/components/Timeline.tsx`

- [ ] **Step 1: Create `src/components/Timeline.tsx`**

```tsx
"use client";

import { ExperienceEntry } from "@/data/profile";
import { useScrollReveal } from "@/components/effects/useScrollReveal";

interface TimelineProps {
  entries: ExperienceEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref} className="border-l-2 border-retro-brown/25 pl-4 ml-2">
      {entries.map((entry, i) => (
        <div
          key={i}
          style={{ animationDelay: `${i * 150}ms` }}
          className={`relative mb-8 last:mb-0 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Dot */}
          <div
            className={`absolute -left-[22px] top-1 w-2.5 h-2.5 border-2 border-retro-dark ${
              entry.current
                ? "bg-retro-amber animate-[pulse-dot_2s_ease-in-out_infinite]"
                : "bg-retro-brown"
            }`}
          />

          <p className="font-mono text-[10px] text-retro-brown">
            {entry.dateRange}
          </p>
          <h3 className="font-pixel text-[8px] text-retro-tan mt-1">
            {entry.title}
          </h3>
          <p className="font-mono text-xs text-retro-muted/70 mt-1">
            {entry.description}
          </p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Timeline.tsx
git commit -m "feat: add experience timeline component"
```

---

### Task 19: Create About page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create `src/app/about/page.tsx`**

```tsx
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
      {/* Page title */}
      <div className="flex items-center gap-3 mb-10">
        <h1 className="font-pixel text-base text-retro-amber">ABOUT ME</h1>
        <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
      </div>

      {/* Profile section */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="w-20 h-20 border-2 border-retro-amber bg-retro-card flex items-center justify-center text-4xl">
            👨‍💻
          </div>
          {profile.available && (
            <p className="font-mono text-[8px] text-green-500 mt-1 text-center">
              ● AVAILABLE
            </p>
          )}
        </div>

        {/* Bio */}
        <div>
          <h2 className="font-pixel text-[10px] text-retro-tan">
            {profile.name}
          </h2>
          <p className="font-mono text-sm text-retro-orange mt-1">
            {profile.role}
          </p>
          <p className="font-mono text-xs text-retro-muted/70 mt-3 leading-relaxed">
            {profile.bio}
          </p>
        </div>
      </div>

      {/* Experience */}
      <div className="mt-16">
        <h2 className="font-pixel text-[9px] text-retro-amber mb-6">
          EXPERIENCE
        </h2>
        <Timeline entries={profile.experience} />
      </div>

      {/* Skills */}
      <div className="mt-16">
        <h2 className="font-pixel text-[9px] text-retro-amber mb-6">SKILLS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.skills.map((skill) => (
            <div
              key={skill.category}
              className="border border-retro-brown/20 bg-retro-card/20 p-4"
            >
              <h3 className="font-pixel text-[7px] text-retro-orange mb-3">
                {skill.category}
              </h3>
              <p className="font-mono text-[11px] text-retro-muted leading-relaxed">
                {skill.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify `/about` renders**

Run: `npm run dev` and visit `http://localhost:3000/about`
Expected: Profile section with avatar, bio. Experience timeline with pulse dots. Skills grid 2x2.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: implement about page with profile, timeline, skills"
```

---

## Chunk 6: Projects Pages

### Task 20: Create FilterTabs component

**Files:**
- Create: `src/components/FilterTabs.tsx`

- [ ] **Step 1: Create `src/components/FilterTabs.tsx`**

```tsx
"use client";

import { Project } from "@/data/projects";

type FilterValue = Project["language"] | "all";

interface FilterTabsProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<FilterValue, number>;
}

const tabs: { value: FilterValue; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: "csharp", label: "C#/.NET" },
  { value: "typescript", label: "TYPESCRIPT" },
  { value: "java", label: "JAVA" },
];

export default function FilterTabs({
  active,
  onChange,
  counts,
}: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`font-mono text-[10px] px-3 py-1.5 border transition-all ${
            active === tab.value
              ? "text-retro-amber border-retro-amber bg-retro-amber/10"
              : "text-retro-brown border-retro-brown/30 hover:border-retro-amber/40 hover:text-retro-muted"
          }`}
        >
          {tab.label} ({counts[tab.value] ?? 0})
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FilterTabs.tsx
git commit -m "feat: add filter tabs for project list"
```

---

### Task 21: Create Projects list page

**Files:**
- Create: `src/components/ProjectsGrid.tsx` (client component for interactive filter)
- Create: `src/app/projects/page.tsx` (server component with metadata)

Note: Splitting into server page + client grid component so we can export metadata for SEO while keeping filter interactivity.

- [ ] **Step 1: Create `src/components/ProjectsGrid.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Project, projects, getProjectsByLanguage } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import FilterTabs from "@/components/FilterTabs";

type FilterValue = Project["language"] | "all";

export default function ProjectsGrid() {
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
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-pixel text-base text-retro-amber">ALL PROJECTS</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
        <span className="font-mono text-xs text-retro-brown">
          {String(filtered.length).padStart(2, "0")} ITEMS
        </span>
      </div>

      {/* Filter */}
      <div className="mb-8">
        <FilterTabs active={filter} onChange={setFilter} counts={counts} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Create `src/app/projects/page.tsx`**

```tsx
import { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects — KHOA.DEV",
  description: "All projects by Tu Minh Khoa — .NET, TypeScript, Java",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ProjectsGrid />
    </div>
  );
}
```

- [ ] **Step 3: Verify `/projects` renders with filter**

Run: `npm run dev` and visit `http://localhost:3000/projects`
Expected: Filter tabs (ALL/C#/.NET/TYPESCRIPT/JAVA), 3-column grid of project cards. Clicking filter shows subset.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectsGrid.tsx src/app/projects/page.tsx
git commit -m "feat: implement projects list page with filter"
```

---

### Task 22: Create Project detail page

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create directories**

Run: `mkdir -p src/app/projects/\[slug\]`

- [ ] **Step 2: Create `src/app/projects/[slug]/page.tsx`**

```tsx
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
  const next =
    currentIndex < sortedProjects.length - 1
      ? sortedProjects[currentIndex + 1]
      : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Breadcrumb */}
      <div className="font-mono text-[10px] text-retro-brown mb-6">
        <Link href="/projects" className="text-retro-muted hover:text-retro-amber transition-colors">
          PROJECTS
        </Link>
        {" / "}
        <span className="text-retro-amber">{project.shortName}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="font-pixel text-lg sm:text-xl text-retro-amber leading-relaxed">
            {project.name}
          </h1>
          <p className="font-mono text-sm text-retro-orange mt-2">
            {project.description}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-retro-amber px-3 py-1.5 font-mono text-[10px] text-retro-amber hover:bg-retro-amber/10 transition-colors"
          >
            GITHUB ↗
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-retro-brown px-3 py-1.5 font-mono text-[10px] text-retro-muted hover:text-retro-amber hover:border-retro-amber transition-colors"
            >
              LIVE ↗
            </a>
          )}
        </div>
      </div>

      {/* Screenshot placeholder */}
      <div className="mt-8 h-48 sm:h-64 border border-retro-brown/20 bg-gradient-to-br from-retro-card to-retro-dark/50 flex items-center justify-center">
        <span className="font-mono text-xs text-retro-brown/30">
          PROJECT SCREENSHOT / DEMO
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div>
          <h2 className="font-pixel text-[8px] text-retro-orange mb-3">
            OVERVIEW
          </h2>
          <p className="font-mono text-xs text-retro-muted leading-relaxed">
            {project.overview}
          </p>
        </div>
        <div>
          <h2 className="font-pixel text-[8px] text-retro-orange mb-3">
            TECH USED
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] text-retro-amber border border-retro-amber/30 px-2 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>

          <h2 className="font-pixel text-[8px] text-retro-orange mt-6 mb-3">
            ROLE
          </h2>
          <p className="font-mono text-xs text-retro-muted">{project.role}</p>
        </div>
      </div>

      {/* Prev/Next */}
      <div className="flex justify-between mt-16 pt-6 border-t border-retro-brown/15">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="font-mono text-[10px] text-retro-muted hover:text-retro-amber transition-colors"
          >
            ← {prev.shortName}
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="font-mono text-[10px] text-retro-muted hover:text-retro-amber transition-colors"
          >
            {next.shortName} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify project detail page**

Run: `npm run dev` and visit `http://localhost:3000/projects/langfens-microservice`
Expected: Breadcrumb, project name, GitHub link, screenshot placeholder, overview, tech tags, prev/next nav.

- [ ] **Step 4: Commit**

```bash
git add src/app/projects/
git commit -m "feat: implement project detail page with prev/next navigation"
```

---

### Task 23: Create custom 404 page

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Create `src/app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-pixel text-3xl text-retro-amber">ERROR 404</h1>
        <p className="font-mono text-sm text-retro-brown mt-4">
          Page not found in this directory.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 border-2 border-retro-amber px-6 py-3 font-pixel text-[9px] text-retro-amber hover:bg-retro-amber/10 transition-colors"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: add custom 404 page with retro styling"
```

---

## Chunk 7: Contact Page & API

### Task 24: Create Contact API route

**Files:**
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create `src/app/api/contact/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: ContactRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { name, email, message } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: "Name is required" },
      { status: 400 }
    );
  }

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, error: "Valid email is required" },
      { status: 400 }
    );
  }

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: "Message is required" },
      { status: 400 }
    );
  }

  // Log to console — user will wire up email service later
  console.log("Contact form submission:", {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: add contact form API route with validation"
```

---

### Task 25: Create ContactForm component

**Files:**
- Create: `src/components/ContactForm.tsx`

- [ ] **Step 1: Create `src/components/ContactForm.tsx`**

```tsx
"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong");
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setError("Failed to send message");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="border border-green-500/30 bg-green-500/5 p-6 text-center">
        <p className="font-pixel text-[9px] text-green-500">
          MESSAGE SENT SUCCESSFULLY
        </p>
        <p className="font-mono text-xs text-retro-muted mt-2">
          Thank you! I will get back to you soon.
        </p>
        <button
          onClick={() => setState("idle")}
          className="mt-4 font-mono text-xs text-retro-amber hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="font-mono text-[10px] text-retro-muted block mb-1">
          &gt; NAME
        </label>
        <input
          name="name"
          required
          className="w-full border border-retro-brown/30 bg-retro-card/30 px-3 py-2 font-mono text-xs text-retro-tan focus:border-retro-amber focus:outline-none transition-colors placeholder:text-retro-brown/30"
          placeholder="Your name..."
        />
      </div>

      <div>
        <label className="font-mono text-[10px] text-retro-muted block mb-1">
          &gt; EMAIL
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full border border-retro-brown/30 bg-retro-card/30 px-3 py-2 font-mono text-xs text-retro-tan focus:border-retro-amber focus:outline-none transition-colors placeholder:text-retro-brown/30"
          placeholder="your@email.com..."
        />
      </div>

      <div>
        <label className="font-mono text-[10px] text-retro-muted block mb-1">
          &gt; MESSAGE
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-retro-brown/30 bg-retro-card/30 px-3 py-2 font-mono text-xs text-retro-tan focus:border-retro-amber focus:outline-none transition-colors resize-none placeholder:text-retro-brown/30"
          placeholder="Write something..."
        />
      </div>

      {state === "error" && (
        <p className="font-mono text-[10px] text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full border-2 border-retro-amber px-6 py-3 font-pixel text-[9px] text-retro-amber bg-retro-amber/5 hover:bg-retro-amber/15 transition-all hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === "sending" ? "SENDING..." : "SEND_MESSAGE.exe ▶"}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "feat: add contact form component with validation and states"
```

---

### Task 26: Create SocialLinks component

**Files:**
- Create: `src/components/SocialLinks.tsx`

- [ ] **Step 1: Create `src/components/SocialLinks.tsx`**

```tsx
import { SocialLink } from "@/data/profile";

const icons: Record<SocialLink["platform"], string> = {
  github: "🐙",
  linkedin: "💼",
  email: "📧",
  facebook: "📘",
};

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
          className="flex items-center gap-3 border border-retro-brown/20 bg-retro-card/20 p-3 hover:border-retro-amber/40 hover:translate-x-1 transition-all group"
        >
          <span className="text-lg">{icons[link.platform]}</span>
          <div>
            <p className="font-pixel text-[7px] text-retro-tan group-hover:text-retro-amber transition-colors">
              {link.platform.toUpperCase()}
            </p>
            <p className="font-mono text-[10px] text-retro-brown">
              {link.label}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SocialLinks.tsx
git commit -m "feat: add social links component"
```

---

### Task 27: Create Contact page

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create `src/app/contact/page.tsx`**

```tsx
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact — KHOA.DEV",
  description: "Get in touch with Tu Minh Khoa",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <h1 className="font-pixel text-base text-retro-amber">GET IN TOUCH</h1>
        <div className="flex-1 h-px bg-gradient-to-r from-retro-amber/30 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form */}
        <div>
          <h2 className="font-pixel text-[8px] text-retro-orange mb-4">
            SEND MESSAGE
          </h2>
          <ContactForm />
        </div>

        {/* Social links */}
        <div>
          <h2 className="font-pixel text-[8px] text-retro-orange mb-4">
            FIND ME
          </h2>
          <SocialLinks links={profile.socials} />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify contact page and form submission**

Run: `npm run dev` and visit `http://localhost:3000/contact`
Expected: Contact form with terminal-style labels, social links on right side. Submit form → see console log in terminal.

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: implement contact page with form and social links"
```

---

### Task 28: Create PixelParticles component (nice-to-have)

**Files:**
- Create: `src/components/effects/PixelParticles.tsx`

- [ ] **Step 1: Create `src/components/effects/PixelParticles.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";

interface PixelParticlesProps {
  count?: number;
}

export default function PixelParticles({ count = 30 }: PixelParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parent = canvas.parentElement;
    const resize = () => {
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1 + Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -0.1 - Math.random() * 0.3,
      opacity: 0.2 + Math.random() * 0.5,
    }));

    let animId: number;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity})`;
        ctx.fillRect(
          Math.floor(p.x),
          Math.floor(p.y),
          p.size,
          p.size
        );

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10 || p.x > canvas.width + 10) {
          p.x = Math.random() * canvas.width;
        }
      }

      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ willChange: "transform" }}
    />
  );
}
```

- [ ] **Step 2: Add PixelParticles to Hero**

In `src/components/Hero.tsx`, add the import at the top:

```tsx
import PixelParticles from "@/components/effects/PixelParticles";
```

Then inside the `<section>` element, add as the first child (before the `<div className="text-center">`):

```tsx
<PixelParticles count={25} />
```

The PixelParticles component uses `absolute` positioning so it stays within the hero section.

- [ ] **Step 3: Commit**

```bash
git add src/components/effects/PixelParticles.tsx src/components/Hero.tsx
git commit -m "feat: add pixel particle effect to hero section"
```

---

### Task 29: Final build verification

**Files:**
- None (verification only)

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors (or only warnings)

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Build succeeds with all pages generated

- [ ] **Step 4: Verify all routes**

Run: `npm run dev` and visit:
- `http://localhost:3000` — Home with hero, projects, tech
- `http://localhost:3000/about` — Profile, timeline, skills
- `http://localhost:3000/projects` — Grid with filter
- `http://localhost:3000/projects/langfens-microservice` — Detail page
- `http://localhost:3000/projects/peerzee` — Detail page
- `http://localhost:3000/contact` — Form + social links
- `http://localhost:3000/nonexistent` — Custom 404

Expected: All pages render correctly with retro amber theme, animations working

- [ ] **Step 5: Final commit (if any remaining unstaged changes)**

```bash
git status
# Stage only relevant source files if any remain
git add src/
git commit -m "feat: complete portfolio redesign — neo-retro pixel aesthetic"
```
