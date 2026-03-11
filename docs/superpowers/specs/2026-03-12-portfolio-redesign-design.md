# Portfolio Redesign — Neo-Retro / Animation-Heavy

**Author:** TU MINH KHOA
**Date:** 2026-03-12
**Stack:** Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript

## 1. Overview

Redesign personal portfolio with a Neo-Retro aesthetic: pixel typography (Press Start 2P) combined with modern layout, warm amber/orange palette on dark background, and heavy animation effects (pixel dissolve transitions, glitch text, particles, parallax). Multi-page structure optimized for both professional presentation and personal branding.

### Goals
- Showcase projects (prioritize Langfens Microservice and Peerzee Fullstack)
- Present as a .NET Backend Developer with fullstack capabilities
- Balance professionalism (recruiters) with creative personality (retro pixel style)
- Heavy animation/interaction to leave strong impression

### Non-Goals
- CMS or admin panel (content managed via config files)
- Blog or writing section
- Dark/light mode toggle (dark only)

## 2. Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `amber-bright` | `#fbbf24` | Primary accent, headings, active states |
| `orange` | `#d97706` | Secondary accent, subheadings, roles |
| `brown` | `#92400e` | Borders, muted elements, dividers |
| `tan` | `#d4a574` | Body text, project names |
| `muted` | `#a8854a` | Secondary text, descriptions |
| `bg-dark` | `#0f0a07` | Page background |
| `bg-card` | `#1c1008` | Card/section backgrounds |
| `green` | `#22c55e` | Status indicator (available) |

### Typography
| Role | Font | Size Range |
|------|------|------------|
| Pixel headings | Press Start 2P | 7px – 22px |
| Body/mono text | JetBrains Mono | 10px – 14px |

### Background Effects
- Pixel grid pattern (20x20px) in `#92400e` at low opacity
- Scanline overlay (repeating gradient, 2px spacing)
- Subtle parallax movement on scroll

## 3. Sitemap & Routing

```
/                       → Home (hero + featured projects + tech stack)
/about                  → Bio, experience timeline, skills detail
/projects               → All projects grid with filter
/projects/[slug]        → Project detail page
/contact                → Contact form + social links
```

## 4. Shared Components

### Navigation (fixed top)
- Left: Pixel logo "K" (24x24 amber square) + "KHOA.DEV" in Press Start 2P
- Center/Right: NAV links — HOME, ABOUT, PROJECTS, CONTACT
- Far right: Social icon links (GitHub, LinkedIn)
- Active page indicator: amber underline
- Mobile: hamburger menu with pixel animation

### Footer
- Left: "© 2026 KHOA.DEV — Built with Next.js + Tailwind"
- Right: Social links (GH, LI, FB)
- Top border separator

### Page Transition
- **Pixel dissolve:** Current page breaks into pixel blocks, new page assembles from pixels
- **Glitch flash:** Brief CRT-style flicker between pages
- Implementation: Next.js View Transitions API or Framer Motion

## 5. Page Designs

### 5.1 Home Page `/`

**Hero Section (100vh)**
- Typing animation: `> HELLO_WORLD` with blinking cursor
- Large name: "TU MINH KHOA" with glitch text-shadow effect (random flicker)
- Role: ".NET Backend Developer"
- Location: "Ho Chi Minh City, Vietnam"
- Two CTA buttons: "VIEW MY WORK" (primary amber border) / "CONTACT ME" (secondary brown border)
- Pixel particle effects (dust/fireflies floating around)
- Scroll indicator: "▼ SCROLL DOWN ▼"

**Featured Projects Section**
- Section header: "FEATURED PROJECTS" + decorative line + count "02 / 09"
- Two project cards side-by-side:
  - Card 1: Langfens Microservice (C# / .NET) — #01
  - Card 2: Peerzee Fullstack (TypeScript) — #02
- Each card: screenshot placeholder, number, name, description, tech tags
- Animations: cards fade-in + slide-up on scroll, hover border glow + scale, number glitch on hover
- "VIEW ALL PROJECTS →" link below

**Tech Stack Section**
- Section header: "TECH STACK" + decorative line
- 4x2 grid of tech items: C#, .NET, TypeScript, Docker, React, Next.js, SQL, Java
- Each item: icon + label in Press Start 2P
- Animations: staggered fade-in, hover glow + tooltip

### 5.2 About Page `/about`

**Profile Section**
- Pixel avatar (80x80, placeholder — user adds real image later)
- "● AVAILABLE" status badge (toggleable)
- Name, role, bio paragraph

**Experience Timeline**
- Vertical timeline with left border
- Timeline dots: amber (current) / brown (past) with pulse animation
- Each entry: date range, title, description (placeholder content)

**Skills Detail**
- 2x2 grid of skill categories:
  - Backend: C#, .NET, ASP.NET, SQL Server, Docker
  - Frontend: React, Next.js, TypeScript, Tailwind
  - Tools: Git, Docker, Linux, RabbitMQ, Redis
  - Other: Java, WPF, Microservices
- Staggered reveal animation on scroll

### 5.3 Projects Page `/projects`

**Filter Bar**
- Tabs: ALL (default) / C#/.NET / TypeScript / Java
- Active tab: amber border + background tint
- Pixel slide animation on tab switch

**Project Grid**
- 3-column grid (2 on tablet, 1 on mobile)
- Each card: number, project name, tech tags
- Order: Langfens Microservice, Peerzee, Clinic API, Foodify, English App, WPF Clinic, Library Management, ClinicApp Frontend, HR Management
- Animations: shuffle/re-arrange on filter, fade-in stagger on load
- Click → navigate to `/projects/[slug]` with pixel dissolve transition

### 5.4 Project Detail `/projects/[slug]`

**Header**
- Breadcrumb: PROJECTS / PROJECT_NAME
- Large project name in Press Start 2P
- Short description
- Action buttons: "GITHUB ↗" / "LIVE ↗"

**Content**
- Screenshot/demo image area (placeholder)
- Two-column layout:
  - Left: Overview text (description, architecture, key features)
  - Right: Tech tags + Role info

**Navigation**
- Bottom: "← PREV PROJECT" / "NEXT PROJECT →"
- Content sections fade-in stagger

### 5.5 Contact Page `/contact`

**Contact Form**
- Terminal-style labels: `> NAME`, `> EMAIL`, `> MESSAGE`
- Input fields with amber border on focus
- Submit button: "SEND_MESSAGE.exe ▶" with glitch hover effect
- Form backend: API route or Formspree (placeholder)

**Social Links**
- Vertical stack of 4 cards: GitHub, LinkedIn, Email, Facebook
- Each: icon + platform name + link/placeholder
- Hover: border glow + slide right animation

## 6. Animations & Effects Summary

| Effect | Where | Implementation |
|--------|-------|----------------|
| Typing animation | Hero greeting | CSS animation + JS |
| Glitch text | Hero name, button hovers | CSS text-shadow keyframes |
| Pixel particles | Hero background | Canvas or CSS particles |
| Pixel dissolve transition | Page navigation | Framer Motion / View Transitions |
| CRT glitch flash | Page transitions | CSS overlay flash |
| Fade-in + slide-up | Cards, sections on scroll | Intersection Observer + CSS |
| Staggered reveal | Tech grid, skills, projects | CSS animation-delay |
| Border glow | Card/button hover | CSS box-shadow transition |
| Parallax grid | Background | Scroll event + transform |
| Cursor particle trail | Global | Canvas overlay |
| Number glitch | Project card hover | CSS/JS random text flicker |
| Timeline dot pulse | About timeline | CSS pulse keyframes |

## 7. Data Architecture

Project data stored as a TypeScript config file (`src/data/projects.ts`):

```typescript
interface Project {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  overview: string;
  tech: string[];
  language: string; // for filter: "csharp" | "typescript" | "java"
  role: string;
  github: string;
  live?: string;
  screenshot?: string;
  featured: boolean;
  order: number;
}
```

Social links and personal info in `src/data/profile.ts`.

## 8. Technical Considerations

- **Performance:** Heavy animations need optimization — use `will-change`, GPU-accelerated properties, lazy-load animations off-screen, reduce particle count on mobile
- **Responsive:** Mobile-first approach. Pixel fonts scale down well but need minimum sizes. Grid layouts collapse to single column. Hamburger menu on mobile.
- **Accessibility:** Respect `prefers-reduced-motion` — disable particle effects, simplify transitions. Ensure sufficient color contrast for amber-on-dark.
- **SEO:** Multi-page structure with proper meta tags, Open Graph images, semantic HTML
- **No external dependencies for data:** All content in local config files, easy to update

## 9. Project Structure

```
src/
├── app/
│   ├── layout.tsx          (root layout, nav, footer, fonts)
│   ├── page.tsx            (home page)
│   ├── about/page.tsx
│   ├── projects/
│   │   ├── page.tsx        (projects list)
│   │   └── [slug]/page.tsx (project detail)
│   ├── contact/page.tsx
│   └── globals.css
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProjectCard.tsx
│   ├── TechGrid.tsx
│   ├── Timeline.tsx
│   ├── ContactForm.tsx
│   ├── SocialLinks.tsx
│   ├── FilterTabs.tsx
│   ├── PageTransition.tsx
│   └── effects/
│       ├── GlitchText.tsx
│       ├── TypingAnimation.tsx
│       ├── PixelParticles.tsx
│       └── ParallaxGrid.tsx
├── data/
│   ├── projects.ts
│   └── profile.ts
└── lib/
    └── utils.ts
```
