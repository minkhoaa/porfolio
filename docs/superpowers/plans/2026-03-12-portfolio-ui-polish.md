# Portfolio UI Polish Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace amber/brown palette with dark purple/violet, bump all font sizes for readability, and fix 3 UI bugs (scroll-reveal, typing animation, page transitions).

**Architecture:** CSS custom property cascade — update `@theme` tokens in `globals.css` and all components using `text-retro-*` / `bg-retro-*` / `border-retro-*` auto-update. Manual changes only needed for hardcoded `rgba(...)` values in inline styles and Tailwind arbitrary value classes. Bug fixes are isolated to 3 files.

**Tech Stack:** Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript + Framer Motion

**Spec:** `docs/superpowers/specs/2026-03-12-portfolio-ui-polish-design.md`

---

## Chunk 1: Color Palette + CSS Effects

### Task 1: Update color tokens in globals.css

**Files:**
- Modify: `src/app/globals.css:3-11`

- [ ] **Step 1: Update @theme color tokens**

Replace the 7 color values in the `@theme` block:

```css
@theme {
  --color-retro-amber: #a78bfa;
  --color-retro-orange: #8b5cf6;
  --color-retro-brown: #4c4472;
  --color-retro-tan: #e2e8f0;
  --color-retro-muted: #94a3b8;
  --color-retro-dark: #0d0b14;
  --color-retro-card: #141024;
  --color-green: #22c55e;

  --font-family-pixel: var(--font-pixel);
  --font-family-mono: var(--font-mono);
}
```

- [ ] **Step 2: Update pixel grid background color**

In `.bg-pixel-grid`, change `rgba(146, 64, 14, 0.07)` → `rgba(139, 92, 246, 0.07)`:

```css
.bg-pixel-grid {
  background-image: linear-gradient(to right, rgba(139, 92, 246, 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(139, 92, 246, 0.07) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

- [ ] **Step 3: Update scanlines tint**

In `.scanlines::after`, change `rgba(0, 0, 0, 0.03)` → `rgba(139, 92, 246, 0.03)`:

```css
.scanlines::after {
  content: "";
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 92, 246, 0.03) 2px, rgba(139, 92, 246, 0.03) 4px);
  pointer-events: none;
  z-index: 50;
}
```

- [ ] **Step 4: Update pulse-dot keyframe**

Change `rgba(251, 191, 36, ...)` → `rgba(167, 139, 250, ...)`:

```css
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(167, 139, 250, 0); }
}
```

Note: `@keyframes glitch` uses `var(--color-retro-brown)` and `var(--color-retro-orange)` which auto-cascade — no changes needed.

- [ ] **Step 5: Verify type checking**

Run: `npx tsc --noEmit`
Expected: No errors (CSS-only changes)

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css
git commit -m "style: update color palette from amber/brown to purple/violet"
```

### Task 2: Update ParallaxGrid inline color

**Files:**
- Modify: `src/components/effects/ParallaxGrid.tsx:23`

- [ ] **Step 1: Update grid line rgba values**

Change both `rgba(146,64,14,0.05)` → `rgba(139,92,246,0.05)` in the inline `backgroundImage` style:

```tsx
style={{
  backgroundImage: "linear-gradient(to right, rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.05) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
  willChange: "transform",
}}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/effects/ParallaxGrid.tsx
git commit -m "style: update ParallaxGrid line color to purple"
```

### Task 3: Update PixelParticles color

**Files:**
- Modify: `src/components/effects/PixelParticles.tsx:46`

- [ ] **Step 1: Update particle fill color**

Change `rgba(251, 191, 36, ${p.opacity})` → `rgba(167, 139, 250, ${p.opacity})`:

```tsx
ctx.fillStyle = `rgba(167, 139, 250, ${p.opacity})`;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/effects/PixelParticles.tsx
git commit -m "style: update PixelParticles color to violet"
```

## Chunk 2: Bug Fixes

### Task 4: Fix scroll-reveal elements invisible on load

**Files:**
- Modify: `src/components/effects/useScrollReveal.ts`

- [ ] **Step 1: Add initial viewport check and rootMargin**

Replace the entire file with:

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
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);

    // Elements already in viewport on page load may not trigger the observer
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setIsVisible(true);
      observer.unobserve(el);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

Key changes:
- Added `rootMargin: "0px 0px -50px 0px"` for slight offset trigger
- After `observer.observe(el)`, check if element is already in viewport using `getBoundingClientRect()` and set `isVisible = true` immediately if so

- [ ] **Step 2: Verify type checking**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/effects/useScrollReveal.ts
git commit -m "fix: scroll-reveal elements invisible when already in viewport on load"
```

### Task 5: Fix typing animation in React 19 strict mode

**Files:**
- Modify: `src/components/effects/TypingAnimation.tsx`

- [ ] **Step 1: Use ref for index to handle strict mode double-mount**

Replace the entire file with:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypingAnimation({ text, speed = 80, className = "" }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");

    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        indexRef.current += 1;
        setDisplayedText(text.slice(0, indexRef.current));
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => {
      clearInterval(timer);
      indexRef.current = 0;
    };
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
      <span className={`transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>
    </span>
  );
}
```

Key changes:
- Added `indexRef = useRef(0)` to avoid stale closure with `setInterval`
- Reset `indexRef.current = 0` and `setDisplayedText("")` at the start of the effect
- Reset `indexRef.current = 0` in cleanup function so strict mode remount starts fresh
- Read from `indexRef.current` inside the interval callback

- [ ] **Step 2: Verify type checking**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/effects/TypingAnimation.tsx
git commit -m "fix: typing animation works correctly with React 19 strict mode"
```

### Task 6: Fix page transitions not firing

**Files:**
- Modify: `src/app/template.tsx`

- [ ] **Step 1: Add AnimatePresence with pathname key**

Replace the entire file with:

```tsx
"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "brightness(2) contrast(2)" }}
        animate={{ opacity: 1, filter: "brightness(1) contrast(1)" }}
        exit={{ opacity: 0, filter: "brightness(2) contrast(2)" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="fixed inset-0 bg-retro-amber/5 pointer-events-none z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.15, delay: 0.05 }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

Key changes:
- Import `usePathname` from `next/navigation`
- Wrap `motion.div` in `<AnimatePresence mode="wait">` so exit completes before enter
- Add `key={pathname}` to the outer `motion.div` so React unmounts/remounts on route change
- Add `exit` prop matching the `initial` state for the exit animation

- [ ] **Step 2: Verify type checking**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/template.tsx
git commit -m "fix: page transitions fire on route change via pathname key"
```

## Chunk 3: Font Size Bumps + Hover Glow Colors

### Task 7: Update Nav.tsx font sizes

**Files:**
- Modify: `src/components/Nav.tsx`

- [ ] **Step 1: Apply font size changes**

Three changes in Nav.tsx:

1. Logo text `KHOA.DEV`: `text-[9px]` → `text-[11px]` (line 26)
2. Desktop nav links: `text-xs` → `text-sm` (line 38)
3. Desktop social links: `text-xs` → `text-sm` (line 51)

For line 26:
```tsx
<span className="font-pixel text-[11px] text-retro-amber group-hover:text-retro-orange transition-colors">
```

For line 38:
```tsx
className={`font-mono text-sm transition-colors ${
```

For line 51:
```tsx
<a href="https://github.com/minkhoaa" target="_blank" rel="noopener noreferrer" className="text-retro-muted hover:text-retro-amber text-sm font-mono transition-colors">GH</a>
<a href="#" className="text-retro-muted hover:text-retro-amber text-sm font-mono transition-colors">LI</a>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "style: bump Nav font sizes for readability"
```

### Task 8: Update Footer.tsx font sizes

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Apply font size changes**

Two changes:

1. Copyright text: `text-[10px]` → `text-xs` (line 8)
2. Social links: `text-[10px]` → `text-xs` (line 13)

For line 8:
```tsx
<p className="font-mono text-xs text-retro-brown">
```

For line 13:
```tsx
className="font-mono text-xs text-retro-muted hover:text-retro-amber transition-colors"
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "style: bump Footer font sizes for readability"
```

### Task 9: Update Hero.tsx font sizes + hover glow

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Apply font size and glow color changes**

Three changes:

1. GlitchText name: `text-2xl sm:text-3xl lg:text-4xl` → `text-3xl sm:text-4xl lg:text-5xl` (line 19)
2. CTA "VIEW MY WORK" button: `text-[9px]` → `text-[11px]` AND glow `rgba(251,191,36,0.2)` → `rgba(167,139,250,0.2)` (line 26)
3. CTA "CONTACT ME" button: `text-[9px]` → `text-[11px]` (line 29)

For line 19:
```tsx
<GlitchText text={profile.name} as="h1" className="font-pixel text-3xl sm:text-4xl lg:text-5xl text-retro-amber leading-relaxed" />
```

For line 26:
```tsx
<Link href="/projects" className="border-2 border-retro-amber px-6 py-3 font-pixel text-[11px] text-retro-amber bg-retro-amber/5 hover:bg-retro-amber/15 transition-all hover:shadow-[0_0_20px_rgba(167,139,250,0.2)]">
```

For line 29:
```tsx
<Link href="/contact" className="border-2 border-retro-brown px-6 py-3 font-pixel text-[11px] text-retro-muted hover:text-retro-amber hover:border-retro-amber transition-all">
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "style: bump Hero font sizes and update hover glow to violet"
```

### Task 10: Update ProjectCard.tsx font sizes + hover glow

**Files:**
- Modify: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Apply font size and glow color changes**

Six changes:

1. Hover glow on link: `rgba(251,191,36,0.1)` → `rgba(167,139,250,0.1)` (line 18)
2. Screenshot placeholder: `text-[7px]` → `text-[10px]` (line 20)
3. Project number: `text-[8px]` → `text-[10px]` (line 24)
4. Project name h3: `text-[9px]` → `text-[12px]` (line 27)
5. Description: `text-[11px]` → `text-[13px]` (line 28)
6. Tech tags: `text-[9px]` → `text-[10px]` (line 31)

For line 18:
```tsx
<Link href={`/projects/${project.slug}`} className="block border border-retro-brown/25 bg-retro-card/30 hover:border-retro-amber/50 hover:shadow-[0_0_15px_rgba(167,139,250,0.1)] transition-all group">
```

For line 20:
```tsx
<span className="font-pixel text-[10px] text-retro-brown/30">SCREENSHOT</span>
```

For line 24:
```tsx
<span className="font-pixel text-[10px] text-retro-amber group-hover:animate-[number-glitch_0.3s]">{number}</span>
```

For line 27:
```tsx
<h3 className="font-pixel text-[12px] text-retro-tan mt-2 leading-relaxed">{project.shortName}</h3>
```

For line 28:
```tsx
<p className="font-mono text-[13px] text-retro-muted/60 mt-2 line-clamp-2">{project.description}</p>
```

For line 31:
```tsx
<span key={t} className="font-mono text-[10px] text-retro-brown border border-retro-brown/30 px-1.5 py-0.5">{t}</span>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "style: bump ProjectCard font sizes and update hover glow to violet"
```

### Task 11: Update TechGrid.tsx font sizes + hover glow

**Files:**
- Modify: `src/components/TechGrid.tsx`

- [ ] **Step 1: Apply font size and glow color changes**

Two changes:

1. Hover glow: `rgba(251,191,36,0.08)` → `rgba(167,139,250,0.08)` (line 26)
2. Tech label: `text-[7px]` → `text-[10px]` (line 31)

For line 26:
```tsx
className={`border border-retro-brown/20 bg-retro-card/20 p-4 text-center hover:border-retro-amber/40 hover:shadow-[0_0_10px_rgba(167,139,250,0.08)] transition-all ${
```

For line 31:
```tsx
<div className="font-pixel text-[10px] text-retro-tan mt-2">{item.label}</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TechGrid.tsx
git commit -m "style: bump TechGrid font sizes and update hover glow to violet"
```

### Task 12: Update Timeline.tsx font sizes

**Files:**
- Modify: `src/components/Timeline.tsx`

- [ ] **Step 1: Apply font size changes**

One change:

1. Title: `text-[8px]` → `text-[11px]` (line 19)

```tsx
<h3 className="font-pixel text-[11px] text-retro-tan mt-1">{entry.title}</h3>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Timeline.tsx
git commit -m "style: bump Timeline title font size"
```

### Task 13: Update Home page (page.tsx) font sizes

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Apply font size changes**

Two changes (both section headings):

1. "FEATURED PROJECTS": `text-sm` → `text-lg` (line 16)
2. "TECH STACK": `text-sm` → `text-lg` (line 36)

For line 16:
```tsx
<h2 className="font-pixel text-lg text-retro-amber">FEATURED PROJECTS</h2>
```

For line 36:
```tsx
<h2 className="font-pixel text-lg text-retro-amber">TECH STACK</h2>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "style: bump home page section heading font sizes"
```

### Task 14: Update About page font sizes

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Apply font size changes**

Six changes:

1. Page heading: `text-base` → `text-lg` (line 14)
2. Name: `text-[10px]` → `text-[12px]` (line 26)
3. EXPERIENCE sub-heading: `text-[9px]` → `text-[11px]` (line 33)
4. SKILLS sub-heading: `text-[9px]` → `text-[11px]` (line 38)
5. Skill category titles: `text-[7px]` → `text-[10px]` (line 42)
6. Skill items: `text-[11px]` → `text-[13px]` (line 43)

For line 14:
```tsx
<h1 className="font-pixel text-lg text-retro-amber">ABOUT ME</h1>
```

For line 26:
```tsx
<h2 className="font-pixel text-[12px] text-retro-tan">{profile.name}</h2>
```

For line 33:
```tsx
<h2 className="font-pixel text-[11px] text-retro-amber mb-6">EXPERIENCE</h2>
```

For line 38:
```tsx
<h2 className="font-pixel text-[11px] text-retro-amber mb-6">SKILLS</h2>
```

For line 42:
```tsx
<h3 className="font-pixel text-[10px] text-retro-orange mb-3">{skill.category}</h3>
```

For line 43:
```tsx
<p className="font-mono text-[13px] text-retro-muted leading-relaxed">{skill.items.join(" · ")}</p>
```

Also update the available badge at line 22-24:

7. Available badge: `text-[8px]` → `text-[10px]` (line 23)

```tsx
<p className="font-mono text-[10px] text-green-500 mt-1 text-center">● AVAILABLE</p>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "style: bump About page font sizes"
```

### Task 15: Update ProjectsGrid.tsx font sizes

**Files:**
- Modify: `src/components/ProjectsGrid.tsx`

- [ ] **Step 1: Apply font size changes**

One change:

1. Heading: `text-base` → `text-lg` (line 24)

```tsx
<h2 className="font-pixel text-lg text-retro-amber">ALL PROJECTS</h2>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectsGrid.tsx
git commit -m "style: bump ProjectsGrid heading font size"
```

### Task 16: Update project detail page font sizes

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Apply font size changes**

Four changes:

1. Project name h1: `text-lg sm:text-xl` → `text-xl sm:text-2xl` (line 44)
2. OVERVIEW label: `text-[8px]` → `text-[11px]` (line 61)
3. TECH USED label: `text-[8px]` → `text-[11px]` (line 65)
4. ROLE label: `text-[8px]` → `text-[11px]` (line 71)

For line 44:
```tsx
<h1 className="font-pixel text-xl sm:text-2xl text-retro-amber leading-relaxed">{project.name}</h1>
```

For line 61:
```tsx
<h2 className="font-pixel text-[11px] text-retro-orange mb-3">OVERVIEW</h2>
```

For line 65:
```tsx
<h2 className="font-pixel text-[11px] text-retro-orange mb-3">TECH USED</h2>
```

For line 71:
```tsx
<h2 className="font-pixel text-[11px] text-retro-orange mt-6 mb-3">ROLE</h2>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/projects/[slug]/page.tsx
git commit -m "style: bump project detail page font sizes"
```

### Task 17: Update Contact page font sizes

**Files:**
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Apply font size changes**

Three changes:

1. Page heading: `text-base` → `text-lg` (line 16)
2. "SEND MESSAGE" sub-heading: `text-[8px]` → `text-[11px]` (line 23)
3. "FIND ME" sub-heading: `text-[8px]` → `text-[11px]` (line 31)

For line 16:
```tsx
<h1 className="font-pixel text-lg text-retro-amber">GET IN TOUCH</h1>
```

For line 23:
```tsx
<h2 className="font-pixel text-[11px] text-retro-orange mb-4">
```

For line 31:
```tsx
<h2 className="font-pixel text-[11px] text-retro-orange mb-4">
```

- [ ] **Step 2: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "style: bump Contact page font sizes"
```

### Task 18: Update ContactForm.tsx font sizes + hover glow

**Files:**
- Modify: `src/components/ContactForm.tsx`

- [ ] **Step 1: Apply font size and glow color changes**

Two changes:

1. Success message pixel text: `text-[9px]` → `text-[11px]` (line 48)
2. Submit button: `text-[9px]` → `text-[11px]` AND glow `rgba(251,191,36,0.2)` → `rgba(167,139,250,0.2)` (line 114)

For line 48:
```tsx
<p className="font-pixel text-[11px] text-green-500">
```

For line 114 (entire button className):
```tsx
className="w-full border-2 border-retro-amber px-6 py-3 font-pixel text-[11px] text-retro-amber bg-retro-amber/5 hover:bg-retro-amber/15 transition-all hover:shadow-[0_0_20px_rgba(167,139,250,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "style: bump ContactForm font sizes and update hover glow to violet"
```

### Task 19: Update SocialLinks.tsx font sizes

**Files:**
- Modify: `src/components/SocialLinks.tsx`

- [ ] **Step 1: Apply font size changes**

One change:

1. Platform name: `text-[7px]` → `text-[10px]` (line 27)

```tsx
<p className="font-pixel text-[10px] text-retro-tan group-hover:text-retro-amber transition-colors">
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SocialLinks.tsx
git commit -m "style: bump SocialLinks platform name font size"
```

### Task 20: Update not-found.tsx font sizes

**Files:**
- Modify: `src/app/not-found.tsx`

- [ ] **Step 1: Apply font size changes**

One change:

1. "RETURN HOME" button: `text-[9px]` → `text-[11px]` (line 9)

```tsx
<Link href="/" className="inline-block mt-8 border-2 border-retro-amber px-6 py-3 font-pixel text-[11px] text-retro-amber hover:bg-retro-amber/10 transition-colors">
```

- [ ] **Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "style: bump not-found page button font size"
```

### Task 21: Final verification

- [ ] **Step 1: Type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: No lint errors

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Successful build with no errors

- [ ] **Step 4: Visual verification**

Start dev server and verify all routes in browser:
- `/` — hero with typing + glitch, cards visible below fold, tech grid visible, purple palette
- `/about` — profile, timeline dots pulse violet, skills grid readable
- `/projects` — 3-column grid on desktop, filter works, all 9 cards visible
- `/projects/langfens-microservice` — detail page readable
- `/contact` — form + social links visible
- Page transitions fire with CRT flash on navigation
- Purple pixel grid and scanlines visible in background
