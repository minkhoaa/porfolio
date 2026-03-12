# RPG Character Sheet Portfolio Redesign

## Goal

Redesign the portfolio website as an RPG character sheet experience. All personal information becomes prominent character data. Projects become quests. Tech stack becomes inventory. The entire UI uses RPG game terminology with text-only visuals (no emoji, no icons) following CLAUDE.md rules.

## Context

The current portfolio uses a Neo-Retro pixel aesthetic (Press Start 2P + JetBrains Mono, dark purple palette). This redesign applies an RPG skin on top of the existing architecture — same Next.js 16 + React 19 + Tailwind v4 stack, same data files, same routing. The pixel font already fits RPG perfectly.

**Current violations to fix:**
- 6 emoji/icon violations (TechGrid, SocialLinks, Hero, about page, Nav, ContactForm)
- Personal info is too small and sparse
- TechGrid uses emoji as visual markers

## Design Decisions

- **RPG as presentation layer only** — no actual game mechanics, state machines, or save systems
- **Text block indicators** (■/□) for proficiency/difficulty — no icons, no stars, no emoji
- **All personal info enlarged** — name, class, level, stats are the visual center
- **Stat bars** — CSS-only animated bars, no JS game engine
- **Sharp corners everywhere** — consistent with CLAUDE.md rules

---

## Section 1: Data Layer Changes

### `src/data/profile.ts`

Add new fields to the existing `Profile` interface. Keep existing types (`SocialLink`, `ExperienceEntry`) unchanged.

```typescript
// NEW interface
export interface CharacterStat {
  name: string;           // e.g., "BACKEND", "FRONTEND", "DEVOPS", "DATABASE"
  value: number;          // 0-100
}

// Updated Profile interface — add `level` and `stats`, remove `avatar?` (unused in RPG layout)
export interface Profile {
  name: string;
  role: string;           // displayed as "CLASS"
  level: number;          // NEW — years since started coding (2023 → LVL 03)
  bio: string;            // displayed as "BACKSTORY" — expand to 3-4 sentences
  location: string;       // displayed as "ORIGIN"
  available: boolean;     // displayed as "AVAILABLE FOR PARTY"
  socials: SocialLink[];  // existing type, unchanged
  experience: ExperienceEntry[];  // existing type, unchanged (already has `description`)
  skills: {               // existing inline type, unchanged
    category: string;
    items: string[];
  }[];
  stats: CharacterStat[]; // NEW
}
```

Add `stats` array to profile data:
```typescript
stats: [
  { name: "BACKEND", value: 90 },
  { name: "FRONTEND", value: 55 },
  { name: "DEVOPS", value: 65 },
  { name: "DATABASE", value: 75 },
]
```

Add `level: 3` to profile data.

Expand bio to a fuller backstory (3-4 sentences about the developer's journey).

Note: `ExperienceEntry` already has a `description: string` field — no schema change needed, just ensure the existing descriptions are meaningful.

### `src/data/projects.ts`

Add `difficulty` field to Project interface:

```typescript
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface Project {
  // ... existing fields
  difficulty: DifficultyLevel;  // NEW — displayed as ■■■□□
}
```

Assign difficulty 1-5 to each of the 9 projects based on tech complexity.

---

## Section 2: Home Page — Character Introduction

**File:** `src/components/Hero.tsx`, `src/app/page.tsx`

Replace current hero with RPG character intro:

```
CLASS: .NET BACKEND DEVELOPER

TU MINH KHOA                          [GlitchText]
LVL 03  ·  HO CHI MINH CITY  ·  AVAILABLE FOR PARTY

"Passionate about building scalable backend systems..."

── STATS ──────────────────────────────
BACKEND   ████████████████░░  90
FRONTEND  ██████████░░░░░░░░  55
DEVOPS    ████████████░░░░░░  65
DATABASE  ██████████████░░░░  75

[ QUEST LOG ]         [ CHARACTER SHEET ]
```

**Key elements:**
- Class label: `font-pixel text-xs text-retro-amber/70` above the name
- Name: `font-pixel text-3xl sm:text-4xl md:text-5xl text-retro-tan` with GlitchText
- Meta line: `font-mono text-sm text-retro-muted` — level, location, status separated by `·`
- Bio: `font-mono text-base text-retro-muted/80` — 2-3 lines
- Stats section: labeled divider + 4 animated stat bars
- CTA buttons: `font-pixel text-[11px]` — "QUEST LOG" links to /projects, "CHARACTER SHEET" links to /about

**Stat Bar component** (`src/components/StatBar.tsx`):

```typescript
export interface StatBarProps {
  label: string;
  value: number;  // 0-100
}
```

- Client component (uses `useScrollReveal` for trigger)
- Label: `font-pixel text-[10px] text-retro-muted` fixed width (`w-24`)
- Bar: `h-3 bg-retro-brown/30` container, inner `bg-retro-amber` fill
- Fill animates from 0% to value% width on scroll reveal (CSS `transition-all duration-1000`)
- The **numeric value displays immediately** (no animated counter) — only the visual bar fill animates
- Value number: `font-mono text-xs text-retro-amber` right-aligned
- `prefers-reduced-motion`: bar displays at full width immediately, no transition
- ASCII art in this spec (████░░) is illustrative — actual render is CSS-based bars

**Remove from home page:**
- PixelParticles canvas background (noise, performance cost — contradicts CLAUDE.md "no noisy components")
- TechGrid section with emoji icons (replaced by stats in hero)
- "SCROLL DOWN" bounce indicator (noisy, uses ▼ symbol)
- Featured projects section stays but uses new QuestCard component

**Home page structure:**
1. Hero with character intro + stats
2. Featured Quests section (2 featured projects as QuestCards)
3. "VIEW QUEST LOG" button

---

## Section 3: Projects Page — Quest Log

**Files:** `src/components/ProjectCard.tsx` → rename to `QuestCard.tsx`, `src/components/ProjectsGrid.tsx` → `QuestLog.tsx`

```
QUEST LOG                                09 QUESTS
──────────────────────────────────────────────────
[ALL] [C#/.NET] [TYPESCRIPT] [JAVA]

┌──────────────────────────┐  ┌──────────────────────────┐
│ QUEST 01                 │  │ QUEST 02                 │
│                          │  │                          │
│ LANGFENS                 │  │ PEERZEE                  │
│ MICROSERVICE             │  │ FULLSTACK                │
│                          │  │                          │
│ Build a distributed...   │  │ Build a full-stack...    │
│                          │  │                          │
│ STATUS     COMPLETED     │  │ STATUS     COMPLETED     │
│ DIFFICULTY ■■■■□         │  │ DIFFICULTY ■■■□□         │
│ XP  .NET  Docker  MQ    │  │ XP  Next.js  TS  React  │
└──────────────────────────┘  └──────────────────────────┘
```

**QuestCard layout:**
- Header area: Quest number (`font-pixel text-3xl text-retro-amber/10` watermark) + quest name large (`font-pixel text-base sm:text-lg`)
- Description: `font-mono text-sm text-retro-muted/70` (2-line clamp)
- Footer area with key-value pairs:
  - `STATUS` → `COMPLETED` (all projects are completed)
  - `DIFFICULTY` → ■■■□□ pattern using text characters
  - `XP` → tech tags (first 4 technologies)

**Difficulty display helper:**
```typescript
function renderDifficulty(level: DifficultyLevel): string {
  return "■".repeat(level) + "□".repeat(5 - level);
}
```

**QuestCard is a client component** (uses `useScrollReveal` for scroll-triggered animation, same as current ProjectCard).

**FilterTabs** — keep existing but rename labels:
- "ALL QUESTS", "C# / .NET", "TYPESCRIPT", "JAVA"
- Section header: "QUEST LOG" instead of "ALL PROJECTS"
- Count display retained: `09 QUESTS` format in header

---

## Section 4: About Page — Character Sheet

**File:** `src/app/about/page.tsx`

```
CHARACTER SHEET
──────────────────────────────────────────────────

NAME      TU MINH KHOA
CLASS     .NET BACKEND DEVELOPER
LEVEL     03
ORIGIN    HO CHI MINH CITY, VIETNAM
STATUS    AVAILABLE FOR PARTY

── BACKSTORY ──────────────────────────────
(expanded 3-4 sentence bio)

── STATS ──────────────────────────────────
BACKEND   ████████████████░░  90
FRONTEND  ██████████░░░░░░░░  55
DEVOPS    ████████████░░░░░░  65
DATABASE  ██████████████░░░░  75

── ABILITIES ──────────────────────────────
BACKEND    C#  ·  .NET  ·  REST API  ·  Entity Framework
FRONTEND   React  ·  Next.js  ·  TypeScript  ·  Tailwind
TOOLS      Docker  ·  Git  ·  SQL Server  ·  RabbitMQ
OTHER      Java  ·  Spring Boot  ·  WPF  ·  MySQL

── ADVENTURE LOG ──────────────────────────
2023         STARTED CODING
             First quest: learning C# and .NET
2023 — NOW   BACKEND DEVELOPER          [pulse dot]
             Building microservices and APIs
```

**Character info section:**
- Key-value pairs in a structured layout
- Keys: `font-pixel text-[10px] text-retro-muted` — fixed width column
- Values: `font-mono text-sm text-retro-tan` — prominent
- STATUS value: `text-green` when available

**Abilities section:**
- Replaces TechGrid (which had emoji)
- Category label: `font-pixel text-[10px] text-retro-amber`
- Items: `font-mono text-sm text-retro-tan` separated by ` · `
- No icons, no emoji — text only

**Stats section:**
- Same StatBar component used in Hero
- Reused, not duplicated

**Adventure Log:**
- Same timeline data, RPG terminology
- Date: `font-mono text-xs text-retro-muted`
- Title: `font-pixel text-[11px] text-retro-tan`
- Description: `font-mono text-xs text-retro-muted` — add brief description to each entry

---

## Section 4b: Quest Detail Page

**File:** `src/app/projects/[slug]/page.tsx`

```
QUESTS / LANGFENS MICROSERVICE
──────────────────────────────────────────────────

QUEST 01

LANGFENS MICROSERVICE
Full-stack Developer

DIFFICULTY ■■■■■

[ VIEW SOURCE ]    [ LIVE DEMO ]

── QUEST BRIEFING ─────────────────────────
A microservices-based system built with .NET...

── XP GAINED ──────────────────────────────
.NET  ·  C#  ·  Docker  ·  RabbitMQ  ·  SQL Server

── CLASS ROLE ─────────────────────────────
Full-stack Developer

← PREVIOUS QUEST                    NEXT QUEST →
```

**Changes from current:**
- Breadcrumb: "QUESTS / {project.name}" instead of "PROJECTS / {project.name}"
- Section headings renamed:
  - "OVERVIEW" → "QUEST BRIEFING"
  - "TECH USED" → "XP GAINED"
  - "ROLE" → "CLASS ROLE"
- Add difficulty display: `DIFFICULTY ■■■■□`
- Quest number displayed: `QUEST {order}` above the name
- Prev/next links: "PREVIOUS QUEST" / "NEXT QUEST"
- GitHub link: "VIEW SOURCE" (already text-based)
- Page metadata title: unchanged (keep project name for SEO)

---

## Section 5: Contact Page — New Quest

**File:** `src/app/contact/page.tsx`, `src/components/ContactForm.tsx`, `src/components/SocialLinks.tsx`

```
START A NEW QUEST
──────────────────────────────────────────────────

QUEST DETAILS                    CONNECT
┌──────────────────────┐
│ YOUR NAME            │         GITHUB
│ [_______________]    │         github.com/minkhoaa
│                      │
│ YOUR EMAIL           │         LINKEDIN
│ [_______________]    │         linkedin.com/in/...
│                      │
│ QUEST DESCRIPTION    │         EMAIL
│ [_______________]    │         khoa@email.com
│ [_______________]    │
│ [_______________]    │
│                      │
│ [ SEND QUEST REQUEST ] │
└──────────────────────┘
```

**Changes:**
- Heading: "START A NEW QUEST" instead of "GET IN TOUCH"
- Form labels: "YOUR NAME", "YOUR EMAIL", "QUEST DESCRIPTION" (was "MESSAGE")
- Submit button: "SEND QUEST REQUEST" (remove ▶ Unicode arrow)
- Success message: "QUEST REQUEST SENT. I'LL RESPOND SOON."
- "Send another" action: "START ANOTHER QUEST"
- Sending state: "SENDING QUEST REQUEST..."
- Error state: "QUEST FAILED. TRY AGAIN."

**SocialLinks redesign:**
- Remove all emoji icons (currently uses octopus, briefcase, envelope, book emoji)
- Each link is a text block: platform name (`font-pixel text-[10px]`) + URL/value (`font-mono text-xs`)
- Simple border card, no icon decoration

---

## Section 6: Navigation & Layout

### Nav (`src/components/Nav.tsx`)

- Logo/brand: "TMK" or "TU MINH KHOA" — `font-pixel text-[11px]`
- Nav links renamed: "PROJECTS" → "QUESTS", "ABOUT" → "CHARACTER", "CONTACT" → "NEW QUEST"
  - Note: nav says "CHARACTER" (short for nav), page heading says "CHARACTER SHEET" (full title) — intentional difference for space
- Mobile menu toggle: use text "MENU" / "CLOSE" instead of ≡/✕ symbols
  - Touch target: `px-3 py-2` min — wider than single-char toggle, but "MENU" is still short enough
- Footer social links: "GH" / "LI" text abbreviations (already correct, no emoji)

### Footer (`src/components/Footer.tsx`)

- Keep minimal: copyright + text social links
- No changes needed (already text-only)

### 404 Page (`src/app/not-found.tsx`)

- Heading: "QUEST NOT FOUND" instead of current error text
- Sub-text: "THE PATH YOU SEEK DOES NOT EXIST."
- Button: "RETURN TO BASE" links to home

### Template transitions (`src/app/template.tsx`)

- Keep existing Framer Motion page transitions — they fit the RPG feel

---

## Section 7: Components to Create/Modify/Remove

### New Components
| Component | Purpose |
|-----------|---------|
| `StatBar.tsx` | Animated stat bar (label + fill bar + value) |

### Modified Components
| Component | Changes |
|-----------|---------|
| `Hero.tsx` | Full rewrite — character intro with stats, remove location emoji |
| `ProjectCard.tsx` → `QuestCard.tsx` | Create new file, delete old. Data changes (add `difficulty`) must happen first. Client component. |
| `ProjectsGrid.tsx` → `QuestLog.tsx` | Create new file, delete old. Client component. |
| `TechGrid.tsx` | Remove entirely (replaced by stats in Hero + abilities in About) |
| `SocialLinks.tsx` | Remove emoji icons, text-only layout |
| `ContactForm.tsx` | RPG labels, remove Unicode arrow |
| `FilterTabs.tsx` | Update labels to RPG terminology |
| `Nav.tsx` | RPG nav labels, text menu toggle |
| `about/page.tsx` | Full rewrite — character sheet layout |
| `contact/page.tsx` | RPG terminology |
| `page.tsx` (home) | New structure — hero + featured quests |
| `projects/page.tsx` | RPG terminology |
| `projects/[slug]/page.tsx` | RPG terminology (Quest Detail) |

### Removed Components
| Component | Reason |
|-----------|--------|
| `PixelParticles.tsx` | Noisy background effect — violates CLAUDE.md |
| `TechGrid.tsx` | Used emoji icons, replaced by StatBar + Abilities |

### Unchanged Components
| Component | Reason |
|-----------|--------|
| `GlitchText.tsx` | Still used for character name |
| `TypingAnimation.tsx` | Can be used for bio/backstory |
| `ParallaxGrid.tsx` | Subtle grid background, no icons |
| `useScrollReveal.ts` | Used by StatBar and QuestCard |
| `Timeline.tsx` | Used by Adventure Log (may need minor RPG label changes) |
| `Footer.tsx` | Already text-only |

---

## Section 8: Data Changes Summary

### `profile.ts`
- Add `level: 3` field
- Add `stats: CharacterStat[]` array (4 stats)
- Remove `avatar?: string` field (intentionally dropped — RPG layout uses text-only, no avatar image)
- Expand `bio` to 3-4 sentences
- `ExperienceEntry.description` already exists — ensure values are meaningful (current values are fine)

### `projects.ts`
- Add `difficulty: 1-5` to Project interface
- Assign difficulty to all 9 projects:
  - Langfens Microservice: 5 (distributed system)
  - Peerzee Fullstack: 4 (full-stack Next.js)
  - Clinic API: 3 (REST API)
  - Foodify Backend: 3 (REST API)
  - English App: 2 (simple backend)
  - WPF Clinic: 3 (desktop app)
  - Library Management: 3 (full-stack React)
  - Clinic App Frontend: 2 (frontend only)
  - HR Management: 4 (Spring Boot)

---

## Section 9: Non-Goals

- No actual game state, save/load, or progression mechanics
- No sound effects or music
- No pixel art images or sprites
- No game engine or canvas-based rendering (remove PixelParticles)
- No achievement/badge system
- No XP counter animations
- No interactive combat or minigames

The RPG theme is purely **presentational** — terminology and layout inspired by RPG character sheets, not an actual game.

---

## Section 10: CLAUDE.md Compliance Notes

- **Labeled dividers** (e.g., "── STATS ──") are implemented as: `<h3 className="font-pixel">` + `<div className="flex-1 h-px bg-gradient-to-r">` — same pattern already used throughout the codebase. CLAUDE.md prohibits "decorative dividers with icons" — these are text-labeled dividers, which are compliant.
- **Stat bar animation** is a visual bar fill, NOT an animated counter. The numeric value (e.g., "90") renders immediately. Only the CSS width transitions. This complies with "no animated counters or number tickers."
- **No rounded corners** — all new components use sharp edges.
- **No new dependencies** — all effects are CSS transitions + existing Tailwind/Framer Motion.

## Section 11: Accessibility & Performance

- All stat bars have text values alongside visual bars (screen reader friendly)
- Difficulty blocks (■□) are decorative — actual value conveyed by adjacent text
- `prefers-reduced-motion` disables stat bar animations (bar renders at full width)
- Removing PixelParticles improves performance (was a canvas animation)
- No new dependencies — all effects are CSS-only
