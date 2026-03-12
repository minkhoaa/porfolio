# Portfolio UI Polish — Purple Palette + Font Sizes + Bug Fixes

**Author:** TU MINH KHOA
**Date:** 2026-03-12
**Stack:** Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript

## 1. Overview

Visual overhaul of the existing Neo-Retro pixel portfolio: replace the warm amber/brown color palette with a dark purple/violet scheme inspired by Jules.google, bump all font sizes for readability, and fix 4 UI bugs (scroll-reveal, typing animation, grid columns, page transitions). The retro pixel aesthetic (Press Start 2P, pixel grid, scanlines, glitch effects, particles) is fully preserved.

### Goals
- Make all text readable (high contrast on dark purple background)
- Minimum 10px for pixel font, 12px for body text
- Fix broken scroll-reveal, typing animation, grid layout, and page transitions
- Shift color identity from brown/amber to purple/violet

### Non-Goals
- No layout restructuring (pages, component hierarchy stay the same)
- No new components or pages
- No new animation types
- No changes to data files (projects.ts, profile.ts)

## 2. New Color Palette

All colors defined as CSS custom properties in `src/app/globals.css` via Tailwind v4 `@theme` block. Token names stay the same (retro-*) so all components cascade automatically.

| Token | Old Hex | New Hex | Usage |
|-------|---------|---------|-------|
| `retro-amber` | `#fbbf24` | `#a78bfa` | Primary accent, headings, active states, hover glows |
| `retro-orange` | `#d97706` | `#8b5cf6` | Secondary accent, subheadings, roles |
| `retro-brown` | `#92400e` | `#4c4472` | Borders, muted elements, dividers |
| `retro-tan` | `#d4a574` | `#e2e8f0` | Body text, project names |
| `retro-muted` | `#a8854a` | `#94a3b8` | Secondary text, descriptions |
| `retro-dark` | `#0f0a07` | `#0d0b14` | Page background |
| `retro-card` | `#1c1008` | `#141024` | Card/section backgrounds |
| `green` | `#22c55e` | `#22c55e` | Status indicator (unchanged) |

## 3. Effects Color Updates

**Implementation approach:** Use Tailwind utility classes wherever possible. Only use raw CSS for effects that Tailwind cannot express (keyframe animations, pseudo-element content). Avoid custom CSS classes for layout, spacing, or colors — use Tailwind utilities in JSX instead.

### Pixel Grid Background
- Currently a custom `.bg-pixel-grid` class in globals.css with raw CSS `background-image`
- Keep as custom class (Tailwind cannot express repeating linear-gradient patterns) but update the color from `rgba(146,64,14,...)` (brown) to `rgba(139,92,246,...)` (purple)

### Scanlines
- Currently a custom `.scanlines::after` pseudo-element in globals.css
- Keep as custom class (Tailwind cannot express `::after` with repeating gradients) but update tint from brown to purple: `rgba(139,92,246,0.03)`

### Glitch Keyframes (`@keyframes glitch`)
- Must remain in globals.css (Tailwind cannot define keyframes)
- Text-shadow colors use `var(--color-retro-brown)` — will auto-update via token change

### ParallaxGrid Component
- Update inline style grid line color from `rgba(146,64,14,0.05)` to `rgba(139,92,246,0.05)`

### Inline Hover Glows (in components)
- All `rgba(251,191,36,...)` (amber glow) → `rgba(167,139,250,...)` (violet glow)
- Affects: Hero.tsx, ProjectCard.tsx, ContactForm.tsx, Nav.tsx hover states
- These are Tailwind arbitrary value classes like `hover:shadow-[0_0_20px_rgba(...)]` — update the rgba values in the class strings

## 4. Font Size Changes

Rule: **No pixel font (Press Start 2P) below 10px. No body text (JetBrains Mono) below 12px.**

### Component-by-Component Changes

**Nav.tsx:**
- Nav links: `text-xs` → `text-sm`
- Logo text "KHOA.DEV": `text-[9px]` → `text-[11px]`
- Social links: `text-xs` → `text-sm`

**Footer.tsx:**
- Copyright text: `text-[10px]` → `text-xs`
- Social links: `text-[10px]` → `text-xs`

**Hero.tsx:**
- Greeting typing text: `text-sm` stays (14px is fine)
- Name (GlitchText): `text-2xl sm:text-3xl lg:text-4xl` → `text-3xl sm:text-4xl lg:text-5xl`
- Role: `text-base` stays (16px is fine)
- Location: `text-xs` stays (12px meets minimum)
- CTA buttons: `text-[9px]` → `text-[11px]`
- Scroll indicator: `text-[10px]` stays (meets minimum)

**ProjectCard.tsx:**
- Project number: `text-[8px]` → `text-[10px]`
- Primary tech label: `text-[10px]` stays
- Project name (h3): `text-[9px]` → `text-[12px]`
- Description: `text-[11px]` → `text-[13px]`
- Tech tags: `text-[9px]` → `text-[10px]`

**TechGrid.tsx:**
- Tech label: `text-[7px]` → `text-[10px]`

**Home page (page.tsx):**
- Section headings: `text-sm` → `text-lg`
- Project count: `text-xs` stays
- "VIEW ALL PROJECTS" link: `text-sm` stays

**Timeline.tsx:**
- Date range: `text-[10px]` stays (meets minimum)
- Title: `text-[8px]` → `text-[11px]`
- Description: `text-xs` stays

**About page (about/page.tsx):**
- Page heading: `text-base` → `text-lg`
- Name: `text-[10px]` → `text-[12px]`
- Role: `text-sm` stays
- Bio: `text-xs` stays
- Section sub-headings (EXPERIENCE, SKILLS): `text-[9px]` → `text-[11px]`
- Skill category titles: `text-[7px]` → `text-[10px]`
- Skill items: `text-[11px]` → `text-[13px]`
- Available badge: `text-[8px]` → `text-[10px]`

**FilterTabs.tsx:**
- Tab text: `text-[10px]` stays (meets minimum)

**ProjectsGrid.tsx:**
- Heading: `text-base` → `text-lg`
- Item count: `text-xs` stays

**Project detail ([slug]/page.tsx):**
- Breadcrumb: `text-[10px]` stays
- Project name (h1): `text-lg sm:text-xl` → `text-xl sm:text-2xl`
- Description: `text-sm` stays
- Section labels (OVERVIEW, TECH USED, ROLE): `text-[8px]` → `text-[11px]`
- Overview body: `text-xs` stays
- Tech tags: `text-[10px]` stays
- Role text: `text-xs` stays
- Prev/next nav: `text-[10px]` stays
- GitHub/Live buttons: `text-[10px]` stays

**Contact page (contact/page.tsx):**
- Page heading: `text-base` → `text-lg`
- Sub-headings: `text-[8px]` → `text-[11px]`

**ContactForm.tsx:**
- Labels: `text-[10px]` stays
- Submit button: `text-[9px]` → `text-[11px]`
- Success message pixel text: `text-[9px]` → `text-[11px]`

**SocialLinks.tsx:**
- Platform name: `text-[7px]` → `text-[10px]`
- Label: `text-[10px]` stays

**Not-found page:**
- Heading: `text-3xl` stays
- Body: `text-sm` stays
- Button: `text-[9px]` → `text-[11px]`

**GlitchText.tsx:**
- No font size changes (inherits from parent)

**TypingAnimation.tsx:**
- No font size changes (inherits from parent)

## 5. Bug Fixes

### Bug 1: Scroll-reveal cards invisible

**File:** `src/components/effects/useScrollReveal.ts`

**Problem:** Elements start at `opacity-0` and rely on IntersectionObserver to set `isVisible = true`. But elements already in viewport when the page loads never trigger the observer callback because they're already intersecting before observation begins.

**Fix:** After creating the observer, check if the element is already within the viewport bounds. If `element.getBoundingClientRect().top < window.innerHeight`, immediately set `isVisible = true`. Also set `threshold: 0.1` (instead of default 0) and `rootMargin: "0px 0px -50px 0px"` for a slight offset trigger.

### Bug 2: Typing animation broken

**File:** `src/components/effects/TypingAnimation.tsx`

**Problem:** React 19 strict mode double-mounts components in development. The first mount's interval gets cleaned up, and the second mount may start with stale state, resulting in only the cursor "|" being visible.

**Fix:** Reset `index` to 0 in the cleanup function so the remount starts fresh. Use a ref for the index to avoid stale closure issues with `setInterval`. The interval should read from `indexRef.current` and update both the ref and state.

### Bug 3: Projects grid 2 columns instead of 3

**File:** `src/components/ProjectsGrid.tsx`

**Problem:** The grid uses `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` but only 2 columns appear on desktop-width screens.

**Fix:** Verify the Tailwind classes are correct. The issue may be that the viewport in testing was below `lg` (1024px). If the grid truly doesn't go to 3 columns at `lg`, check if a parent container is constraining width. Ensure `max-w-6xl` (1152px) allows 3 columns at `lg` breakpoint.

### Bug 4: Page transitions not firing

**File:** `src/app/template.tsx`

**Problem:** The `motion.div` in `template.tsx` wraps `{children}` but `AnimatePresence` needs a changing `key` prop to detect route changes and trigger exit/enter animations. Without a unique key per route, React sees the same component and doesn't unmount/remount.

**Fix:** Import `usePathname` from `next/navigation`. Pass `pathname` as the `key` prop on the `motion.div` inside `AnimatePresence`. Mark the component as `"use client"` (it already is since it uses framer-motion). Add `mode="wait"` on `AnimatePresence` so exit completes before enter begins.

## 6. Files Changed

| File | Change Type |
|------|-------------|
| `src/app/globals.css` | Color tokens + pixel grid + scanlines colors |
| `src/components/effects/useScrollReveal.ts` | Bug fix: initial viewport check |
| `src/components/effects/TypingAnimation.tsx` | Bug fix: strict mode handling |
| `src/components/effects/ParallaxGrid.tsx` | Grid line color brown → purple |
| `src/app/template.tsx` | Bug fix: add pathname key for transitions |
| `src/components/Nav.tsx` | Font sizes + hover glow color |
| `src/components/Footer.tsx` | Font sizes |
| `src/components/Hero.tsx` | Font sizes + hover glow color |
| `src/components/ProjectCard.tsx` | Font sizes + hover glow color |
| `src/components/TechGrid.tsx` | Font sizes |
| `src/components/Timeline.tsx` | Font sizes |
| `src/components/FilterTabs.tsx` | (no changes needed, sizes already ≥10px) |
| `src/components/ProjectsGrid.tsx` | Font sizes + grid bug verification |
| `src/components/ContactForm.tsx` | Font sizes + hover glow color |
| `src/components/SocialLinks.tsx` | Font sizes |
| `src/app/page.tsx` | Font sizes |
| `src/app/about/page.tsx` | Font sizes |
| `src/app/projects/page.tsx` | (no changes needed) |
| `src/app/projects/[slug]/page.tsx` | Font sizes |
| `src/app/contact/page.tsx` | Font sizes |
| `src/app/not-found.tsx` | Font sizes |

## 7. Testing

After all changes:
1. `npx tsc --noEmit` — no type errors
2. `npm run lint` — no lint errors
3. `npm run build` — successful build
4. Visual verification of all routes:
   - `/` — hero visible with typing + glitch, cards visible below fold, tech grid visible
   - `/about` — profile, timeline dots, skills grid all readable
   - `/projects` — 3-column grid on desktop, filter works, all 9 cards visible
   - `/projects/langfens-microservice` — detail page readable
   - `/contact` — form + social links visible
   - Page transitions fire with CRT flash on navigation
   - Purple pixel grid and scanlines visible in background
