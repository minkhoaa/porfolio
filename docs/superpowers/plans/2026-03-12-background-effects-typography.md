# Background Effects & Typography Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Press Start 2P with Pixelify Sans font and add per-page RPG-themed CSS background effects (sprites, torches, stars, embers, quest papers).

**Architecture:** Font swap via `next/font/google` in layout.tsx, with all existing `font-pixel` class references automatically picking up the new font. Two new client components (`PageBackground`, `PixelSprites`) render CSS-only ambient elements per page theme. All animations are pure CSS keyframes.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, `next/font/google` (Pixelify Sans)

---

## File Structure

### New Files
- `src/components/effects/PixelSprites.tsx` — CSS pixel sprite characters (warrior, mage) rendered via `box-shadow`
- `src/components/effects/PageBackground.tsx` — Per-page themed background wrapper (overworld, dungeon, tavern, questboard)

### Modified Files
- `src/app/layout.tsx` — Font swap (Press_Start_2P → Pixelify_Sans)
- `src/app/globals.css` — 7 new keyframes
- `src/components/Hero.tsx` — Font sizes + weights
- `src/components/Nav.tsx` — Font sizes + weights
- `src/components/QuestCard.tsx` — Font sizes + weights
- `src/components/QuestLog.tsx` — Heading size
- `src/components/StatBar.tsx` — Label size
- `src/components/FilterTabs.tsx` — Font size
- `src/components/Timeline.tsx` — Font sizes
- `src/components/ContactForm.tsx` — Font sizes
- `src/components/SocialLinks.tsx` — Font sizes
- `src/components/Footer.tsx` — No changes needed
- `src/app/page.tsx` — Add PageBackground + font sizes
- `src/app/about/page.tsx` — Add PageBackground + font sizes
- `src/app/projects/page.tsx` — Add PageBackground
- `src/app/projects/[slug]/page.tsx` — Add PageBackground + font sizes
- `src/app/contact/page.tsx` — Add PageBackground + font sizes
- `src/app/not-found.tsx` — Font sizes

---

## Chunk 1: Font Swap & CSS Keyframes

### Task 1: Replace Press Start 2P with Pixelify Sans in layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update font import and config**

Replace the Press_Start_2P import and config:

```typescript
// Change this:
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";

const fontPixel = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: "400",
});

// To this:
import { JetBrains_Mono, Pixelify_Sans } from "next/font/google";

const fontPixel = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: ["400", "500", "600", "700"],
});
```

- [ ] **Step 2: Verify dev server loads new font**

Run: `npx tsc --noEmit`
Expected: No errors. Then check `http://localhost:3003` in browser — all `font-pixel` text should render in Pixelify Sans.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: replace Press Start 2P with Pixelify Sans font"
```

---

### Task 2: Add background effect keyframes to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add 7 new keyframes**

Add before the existing `@media (prefers-reduced-motion)` block:

```css
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes torch-flicker {
  0% { opacity: 0.6; box-shadow: 0 0 8px rgba(245,158,11,0.5), 0 -4px 4px rgba(239,68,68,0.4); }
  100% { opacity: 1; box-shadow: 0 0 12px rgba(245,158,11,0.7), 0 -6px 6px rgba(239,68,68,0.5); }
}

@keyframes drip-fall {
  0% { transform: translateY(0); opacity: 0.6; }
  80% { opacity: 0.3; }
  100% { transform: translateY(200px); opacity: 0; }
}

@keyframes ember-rise {
  0% { transform: translateY(0) translateX(0); opacity: 0.5; }
  50% { transform: translateY(-50vh) translateX(15px); opacity: 0.3; }
  100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
}

@keyframes paper-sway {
  0%, 100% { transform: rotate(-1deg); }
  50% { transform: rotate(1deg); }
}

@keyframes sprite-walk-right {
  0% { transform: translateX(-40px); }
  100% { transform: translateX(calc(100vw + 40px)); }
}

@keyframes sprite-walk-left {
  0% { transform: translateX(calc(100vw + 40px)); }
  100% { transform: translateX(-40px); }
}
```

- [ ] **Step 2: Verify CSS parses**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add background effect keyframes to globals.css"
```

---

### Task 3: Typography migration — Hero.tsx

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Update all font sizes and add weights**

Apply these changes to `src/components/Hero.tsx`:

| Line | Current | New |
|------|---------|-----|
| 14 | `font-pixel text-[10px] text-retro-amber/60` | `font-pixel text-xs font-medium text-retro-amber/60` |
| 18 | `font-pixel text-4xl sm:text-5xl md:text-6xl` | `font-pixel text-5xl sm:text-6xl md:text-7xl font-bold` |
| 58 | `font-pixel text-[11px] text-retro-amber` | `font-pixel text-sm font-semibold text-retro-amber` |
| 61 | `font-pixel text-[11px] text-retro-muted` | `font-pixel text-sm font-semibold text-retro-muted` |

Also update the STATS section heading (line 46):
- Current: `font-pixel text-[10px] text-retro-amber`
- New: `font-pixel text-base font-semibold text-retro-amber`

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Check `http://localhost:3003` — hero text should be bigger, bolder.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "style: update Hero typography to Pixelify Sans scale"
```

---

### Task 4: Typography migration — Nav.tsx

**Files:**
- Modify: `src/components/Nav.tsx`

- [ ] **Step 1: Update font sizes**

| Line | Current | New |
|------|---------|-----|
| 24 | `font-pixel text-[10px] text-retro-dark` | `font-pixel text-xs font-bold text-retro-dark` |
| 26 | `font-pixel text-[11px] text-retro-amber` | `font-pixel text-sm font-semibold text-retro-amber` |
| 55 | `font-pixel text-[10px] px-3 py-2` | `font-pixel text-xs font-medium px-3 py-2` |

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "style: update Nav typography to Pixelify Sans scale"
```

---

### Task 5: Typography migration — QuestCard.tsx

**Files:**
- Modify: `src/components/QuestCard.tsx`

- [ ] **Step 1: Update font sizes**

| Current | New |
|---------|-----|
| `font-pixel text-[9px]` (STATUS/DIFFICULTY labels) | `font-pixel text-xs font-medium` |
| `font-pixel text-base sm:text-lg` (card title) | `font-pixel text-lg sm:text-xl font-semibold` |
| `font-mono text-[11px]` (tech tag on line 25) | `font-mono text-xs` |
| `font-mono text-[11px]` ("COMPLETED" text on line 33) | `font-mono text-xs` |
| `font-mono text-[11px]` (tech tags in loop on line 43) | `font-mono text-xs` |

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/QuestCard.tsx
git commit -m "style: update QuestCard typography to Pixelify Sans scale"
```

---

### Task 6: Typography migration — remaining components

**Files:**
- Modify: `src/components/StatBar.tsx`
- Modify: `src/components/QuestLog.tsx`
- Modify: `src/components/FilterTabs.tsx`
- Modify: `src/components/Timeline.tsx`
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/components/SocialLinks.tsx`

- [ ] **Step 1: StatBar.tsx**

Change `font-pixel text-[10px]` → `font-pixel text-xs font-medium`

- [ ] **Step 2: QuestLog.tsx**

Change heading `font-pixel text-lg` → `font-pixel text-2xl font-bold`

- [ ] **Step 3: FilterTabs.tsx**

Change `font-mono text-[10px]` → `font-mono text-xs`

- [ ] **Step 4: Timeline.tsx**

- Change `font-mono text-[10px]` (date) → `font-mono text-xs`
- Change `font-pixel text-[11px]` (title) → `font-pixel text-sm font-semibold`

- [ ] **Step 5: ContactForm.tsx**

- Change `font-mono text-[10px]` (labels, error) → `font-mono text-xs`
- Change `font-pixel text-[11px]` (button, success) → `font-pixel text-sm font-semibold`

- [ ] **Step 6: SocialLinks.tsx**

Change `font-pixel text-[10px]` → `font-pixel text-sm font-medium`

- [ ] **Step 7: Verify all**

Run: `npx tsc --noEmit`

- [ ] **Step 8: Commit**

```bash
git add src/components/StatBar.tsx src/components/QuestLog.tsx src/components/FilterTabs.tsx src/components/Timeline.tsx src/components/ContactForm.tsx src/components/SocialLinks.tsx
git commit -m "style: update remaining component typography to Pixelify Sans scale"
```

---

### Task 7: Typography migration — pages

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/not-found.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: about/page.tsx**

- Page heading `font-pixel text-lg` → `font-pixel text-2xl font-bold`
- Identity card field labels `font-pixel text-[10px]` (NAME, CLASS, LEVEL, ORIGIN, STATUS) → `font-pixel text-xs font-medium`
- Skill category labels `font-pixel text-[10px]` (BACKEND, FRONTEND, TOOLS, OTHER in ABILITIES section) → `font-pixel text-xs font-medium`
- Section headings `font-pixel text-[11px]` (BACKSTORY, STATS, ABILITIES, ADVENTURE LOG) → `font-pixel text-base font-semibold`

- [ ] **Step 2: contact/page.tsx**

- Page heading `font-pixel text-lg` → `font-pixel text-2xl font-bold`
- Section headings `font-pixel text-[11px]` → `font-pixel text-base font-semibold`

- [ ] **Step 3: projects/[slug]/page.tsx**

- Quest label `font-pixel text-xs` → `font-pixel text-sm font-medium`
- Project title `font-pixel text-2xl sm:text-3xl` → `font-pixel text-3xl sm:text-4xl font-bold`
- Section headings `font-pixel text-[11px]` (QUEST BRIEFING, XP GAINED, CLASS ROLE) → `font-pixel text-base font-semibold`
- Breadcrumb `font-mono text-[10px]` → `font-mono text-xs`
- VIEW SOURCE button `font-mono text-[10px]` → `font-mono text-xs`
- LIVE DEMO button `font-mono text-[10px]` → `font-mono text-xs`
- Tech tag spans `font-mono text-[11px]` → `font-mono text-xs`

- [ ] **Step 4: not-found.tsx**

- Heading `font-pixel text-2xl` → `font-pixel text-3xl font-bold`
- Button `font-pixel text-[11px]` → `font-pixel text-sm font-semibold`

- [ ] **Step 5: page.tsx (home)**

- Section heading `font-pixel text-lg` → `font-pixel text-2xl font-bold`
- Button `font-pixel text-[11px]` → `font-pixel text-sm font-semibold`

- [ ] **Step 6: Verify all**

Run: `npx tsc --noEmit`
Browse all pages to check typography visually.

- [ ] **Step 7: Commit**

```bash
git add src/app/about/page.tsx src/app/contact/page.tsx 'src/app/projects/[slug]/page.tsx' src/app/not-found.tsx src/app/page.tsx
git commit -m "style: update page typography to Pixelify Sans scale"
```

---

## Chunk 2: Background Effects

### Task 8: Create PixelSprites component

**Files:**
- Create: `src/components/effects/PixelSprites.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

function WarriorSprite() {
  // 12x16 pixel warrior using box-shadow, each pixel is 3px
  // Colors: retro-amber (#a78bfa) hood, retro-tan (#e2e8f0) face,
  //         retro-orange (#8b5cf6) body, retro-brown (#4c4472) legs
  return (
    <div
      className="absolute bottom-10 w-[3px] h-[3px] will-change-transform"
      style={{
        animation: "sprite-walk-right 45s linear infinite",
        imageRendering: "pixelated",
        boxShadow: `
          /* hat */
          3px 0 0 #a78bfa, 6px 0 0 #a78bfa, 9px 0 0 #a78bfa,
          0px 3px 0 #a78bfa, 3px 3px 0 #a78bfa, 6px 3px 0 #a78bfa, 9px 3px 0 #a78bfa, 12px 3px 0 #a78bfa,
          /* face */
          3px 6px 0 #e2e8f0, 6px 6px 0 #e2e8f0, 9px 6px 0 #e2e8f0,
          3px 9px 0 #e2e8f0, 6px 9px 0 #4c4472, 9px 9px 0 #e2e8f0,
          /* body */
          3px 12px 0 #8b5cf6, 6px 12px 0 #8b5cf6, 9px 12px 0 #8b5cf6,
          0px 15px 0 #8b5cf6, 3px 15px 0 #8b5cf6, 6px 15px 0 #8b5cf6, 9px 15px 0 #8b5cf6, 12px 15px 0 #8b5cf6,
          3px 18px 0 #a78bfa, 6px 18px 0 #8b5cf6, 9px 18px 0 #a78bfa,
          /* legs */
          3px 21px 0 #4c4472, 9px 21px 0 #4c4472,
          3px 24px 0 #4c4472, 9px 24px 0 #4c4472
        `,
      }}
    />
  );
}

function MageSprite() {
  // 12x16 pixel mage, pointed hat
  // Colors: retro-orange (#8b5cf6) hat, retro-tan (#e2e8f0) face,
  //         retro-amber (#a78bfa) robe, retro-brown (#4c4472) staff
  return (
    <div
      className="absolute bottom-10 w-[3px] h-[3px] will-change-transform"
      style={{
        animation: "sprite-walk-left 55s linear infinite",
        imageRendering: "pixelated",
        boxShadow: `
          /* hat point */
          6px 0 0 #8b5cf6,
          3px 3px 0 #8b5cf6, 6px 3px 0 #8b5cf6, 9px 3px 0 #8b5cf6,
          0px 6px 0 #8b5cf6, 3px 6px 0 #8b5cf6, 6px 6px 0 #8b5cf6, 9px 6px 0 #8b5cf6, 12px 6px 0 #8b5cf6,
          /* face */
          3px 9px 0 #e2e8f0, 6px 9px 0 #e2e8f0, 9px 9px 0 #e2e8f0,
          3px 12px 0 #e2e8f0, 6px 12px 0 #4c4472, 9px 12px 0 #e2e8f0,
          /* robe */
          3px 15px 0 #a78bfa, 6px 15px 0 #a78bfa, 9px 15px 0 #a78bfa,
          0px 18px 0 #a78bfa, 3px 18px 0 #a78bfa, 6px 18px 0 #a78bfa, 9px 18px 0 #a78bfa, 12px 18px 0 #a78bfa,
          3px 21px 0 #a78bfa, 6px 21px 0 #a78bfa, 9px 21px 0 #a78bfa,
          /* staff */
          15px 6px 0 #4c4472, 15px 9px 0 #4c4472, 15px 12px 0 #4c4472,
          15px 15px 0 #4c4472, 15px 18px 0 #4c4472, 15px 21px 0 #a78bfa,
          /* legs */
          3px 24px 0 #4c4472, 9px 24px 0 #4c4472
        `,
      }}
    />
  );
}

export default function PixelSprites() {
  return (
    <>
      <WarriorSprite />
      <MageSprite />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/effects/PixelSprites.tsx
git commit -m "feat: create PixelSprites component with warrior and mage"
```

---

### Task 9: Create PageBackground component

**Files:**
- Create: `src/components/effects/PageBackground.tsx`

- [ ] **Step 1: Create the component with all 4 themes**

```tsx
"use client";

import PixelSprites from "@/components/effects/PixelSprites";

interface PageBackgroundProps {
  theme: "overworld" | "dungeon" | "tavern" | "questboard";
}

function Stars() {
  const positions = [
    { left: "8%", top: "12%" },
    { left: "15%", top: "25%" },
    { left: "25%", top: "8%" },
    { left: "38%", top: "18%" },
    { left: "50%", top: "10%" },
    { left: "62%", top: "22%" },
    { left: "72%", top: "6%" },
    { left: "80%", top: "15%" },
    { left: "88%", top: "28%" },
    { left: "45%", top: "32%" },
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-retro-amber"
          style={{
            left: pos.left,
            top: pos.top,
            animation: `twinkle ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </>
  );
}

function PixelGround() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-10"
      style={{
        background: "repeating-linear-gradient(90deg, #1a1030 0px, #1a1030 8px, #150d28 8px, #150d28 16px)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: "repeating-linear-gradient(90deg, rgba(34,197,94,0.12) 0px, rgba(34,197,94,0.12) 4px, rgba(34,197,94,0.08) 4px, rgba(34,197,94,0.08) 8px)",
        }}
      />
    </div>
  );
}

function Torch({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div
      className={`absolute w-1 h-2 ${className}`}
      style={{
        backgroundColor: "#f59e0b",
        animation: "torch-flicker 0.5s ease-in-out infinite alternate",
        animationDelay: delay ? `${delay}s` : undefined,
      }}
    />
  );
}

function Overworld() {
  return (
    <>
      <Stars />
      <PixelGround />
      <PixelSprites />
    </>
  );
}

function Dungeon() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(180deg, #0d0b14, #0a0812)",
        backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 30px, rgba(76,68,114,0.08) 30px, rgba(76,68,114,0.08) 31px)",
      }}
    >
      <Torch className="left-8 top-[20%]" />
      <Torch className="right-8 top-[20%]" delay={0.3} />
      {[1, 2].map((i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-retro-amber/25"
          style={{
            left: `${55 + i * 15}%`,
            top: "10%",
            animation: `drip-fall 4s ease-in infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
}

function Tavern() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(180deg, #0d0b14, #12091c)" }}
    >
      <Torch className="left-8 top-[30%]" />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px]"
          style={{
            backgroundColor: "rgba(245,158,11,0.3)",
            left: `${20 + i * 25}%`,
            bottom: "10%",
            animation: `ember-rise ${6 + i * 1}s ease-out infinite`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function QuestBoard() {
  const papers = [
    { right: "5%", top: "15%", w: 20, h: 24, delay: 0 },
    { right: "10%", top: "30%", w: 18, h: 22, delay: 1 },
    { right: "8%", top: "45%", w: 22, h: 20, delay: 0.5 },
  ];

  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(180deg, #0d0b14, #100c1a)" }}
    >
      {papers.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            right: p.right,
            top: p.top,
            width: `${p.w}px`,
            height: `${p.h}px`,
            backgroundColor: "rgba(226,232,240,0.04)",
            border: "1px solid rgba(76,68,114,0.15)",
            animation: `paper-sway 3s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function PageBackground({ theme }: PageBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {theme === "overworld" && <Overworld />}
      {theme === "dungeon" && <Dungeon />}
      {theme === "tavern" && <Tavern />}
      {theme === "questboard" && <QuestBoard />}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/effects/PageBackground.tsx
git commit -m "feat: create PageBackground component with 4 RPG themes"
```

---

### Task 10: Add PageBackground to home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add import and wrap content**

Add `import PageBackground from "@/components/effects/PageBackground";` at top.

Wrap the return in a `<div className="relative">` and add `<PageBackground theme="overworld" />` as first child:

```tsx
return (
  <div className="relative">
    <PageBackground theme="overworld" />
    <Hero />
    <div className="section-divider max-w-6xl mx-auto" />
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* ... existing content ... */}
    </section>
  </div>
);
```

- [ ] **Step 2: Verify visually**

Check `http://localhost:3003` — should see twinkling stars, pixel ground, and 2 sprites walking.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add overworld background to home page"
```

---

### Task 11: Add PageBackground to quests page

**Files:**
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Add background**

Add import and wrap:

```tsx
import PageBackground from "@/components/effects/PageBackground";

export default function ProjectsPage() {
  return (
    <div className="relative">
      <PageBackground theme="dungeon" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <QuestLog />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Check `http://localhost:3003/projects` — should see torches flickering, water drips.

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "feat: add dungeon background to quests page"
```

---

### Task 12: Add PageBackground to about page

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Add background**

Add import and wrap content in `<div className="relative">` with `<PageBackground theme="tavern" />` as first child.

- [ ] **Step 2: Verify**

Check `http://localhost:3003/about` — should see torch + floating embers.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add tavern background to about page"
```

---

### Task 13: Add PageBackground to contact and project detail pages

**Files:**
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: contact/page.tsx**

Add import, wrap content with `<PageBackground theme="questboard" />`.

- [ ] **Step 2: projects/[slug]/page.tsx**

Add import, wrap content with `<PageBackground theme="dungeon" />`.

- [ ] **Step 3: Verify both pages**

Check `/contact` (quest papers swaying) and `/projects/langfens-microservice` (dungeon theme).

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.tsx 'src/app/projects/[slug]/page.tsx'
git commit -m "feat: add themed backgrounds to contact and project detail pages"
```

---

### Task 14: Final verification and cleanup

- [ ] **Step 1: Run full type check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 2: Run lint and build**

Run: `npm run lint && npm run build`
Expected: No errors.

- [ ] **Step 3: Visual check all pages**

Browse through every page at `http://localhost:3003`:
- `/` — overworld (stars, ground, sprites, bigger font)
- `/about` — tavern (torch, embers, bigger font)
- `/projects` — dungeon (torches, drips)
- `/projects/langfens-microservice` — dungeon
- `/contact` — questboard (papers)
- `/nonexistent` — 404 page (no background, updated font)

Verify:
- All text uses Pixelify Sans (no Press Start 2P)
- No text smaller than 12px with font-pixel
- All backgrounds have `pointer-events: none` (can click through)
- Backgrounds animate smoothly
- Page transitions fade backgrounds in/out

- [ ] **Step 4: Test reduced motion**

In browser DevTools → Rendering → check "Emulate CSS prefers-reduced-motion: reduce". All animations should stop.

- [ ] **Step 5: Update CLAUDE.md**

Update these references in CLAUDE.md:
- Line 18: "Fonts: Press Start 2P (headings)" → "Fonts: Pixelify Sans (headings)"
- Line 59: min size `text-[10px]` → `text-xs` (12px)

- [ ] **Step 6: Commit any fixes**

If any issues found, fix and commit.

```bash
git add -A
git commit -m "chore: final verification fixes and CLAUDE.md font reference update"
```

---

**Note on inline styles:** `PageBackground` and `PixelSprites` use inline `style={{}}` for `box-shadow` pixel art, `background` gradients, and `animation` properties. These cannot be expressed as Tailwind utilities (complex box-shadow values, CSS calc() in keyframe targets). This is an acknowledged exception to CLAUDE.md's "Tailwind utility classes only" rule, consistent with the existing exemption for "dynamic values (animation delays)".
