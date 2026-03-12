# Enhanced Effects & Glass Cards Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add floating pixel art items and glowing particles throughout the portfolio, and wrap page content in semi-transparent glass cards.

**Architecture:** Two new components: `FloatingItems` (client component with pixel art items + particles at z-index -5) and `GlassCard` (server component wrapper with backdrop-blur). Both integrate into existing pages alongside the existing `PageBackground` system.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, CSS keyframes, box-shadow pixel art

---

## File Structure

### New Files
- `src/components/effects/FloatingItems.tsx` — Pixel items + glowing particles (client component)
- `src/components/effects/GlassCard.tsx` — Glass card content wrapper (server component)

### Modified Files
- `src/app/globals.css` — 3 new keyframes (`item-bob`, `particle-pulse`, `particle-rise`)
- `src/app/page.tsx` — Add FloatingItems + GlassCard around featured quests section
- `src/app/about/page.tsx` — Add FloatingItems + GlassCard around content
- `src/app/projects/page.tsx` — Add FloatingItems + GlassCard around QuestLog
- `src/app/contact/page.tsx` — Add FloatingItems + GlassCard around form + social
- `src/app/projects/[slug]/page.tsx` — Add FloatingItems + GlassCard around content

---

## Chunk 1: New Components & Keyframes

### Task 1: Add keyframes to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add 3 new keyframes**

Add these keyframes before the existing `@media (prefers-reduced-motion)` block (currently at line 148):

```css
@keyframes item-bob {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(4deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes particle-pulse {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.5; box-shadow: 0 0 8px rgba(167,139,250,0.3); }
}

@keyframes particle-rise {
  0% { transform: translateY(0); opacity: 0; }
  15% { opacity: 0.4; }
  85% { opacity: 0.3; }
  100% { transform: translateY(-100vh); opacity: 0; }
}
```

- [ ] **Step 2: Verify CSS parses**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add item-bob, particle-pulse, particle-rise keyframes"
```

---

### Task 2: Create GlassCard component

**Files:**
- Create: `src/components/effects/GlassCard.tsx`

- [ ] **Step 1: Create the component**

```tsx
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={`bg-retro-amber/[0.06] border border-retro-amber/15 backdrop-blur-md sm:backdrop-blur-xl ${className ?? ""}`}
      style={{
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(167, 139, 250, 0.1)",
      }}
    >
      {children}
    </div>
  );
}
```

Note: This is a Server Component (no `"use client"` directive). It uses `backdrop-blur-md` on mobile and `backdrop-blur-xl` on desktop (`sm:backdrop-blur-xl`). The `WebkitBackdropFilter` inline style provides Safari support. No `border-radius` (sharp corners per design system).

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/effects/GlassCard.tsx
git commit -m "feat: create GlassCard component with backdrop blur"
```

---

### Task 3: Create FloatingItems component

**Files:**
- Create: `src/components/effects/FloatingItems.tsx`

- [ ] **Step 1: Create the component with all pixel art items, config, and particles**

```tsx
"use client";

type ItemType = "sword" | "potion" | "shield" | "scroll" | "gem";

interface ItemConfig {
  type: ItemType;
  position: { left?: string; right?: string; top: string };
  duration: number;
  delay: number;
}

interface PulseParticleConfig {
  left?: string;
  right?: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
}

interface RiseParticleConfig {
  left: string;
  duration: number;
  delay: number;
}

// Box-shadow pixel art for each item type, 2px scale
// Colors: #a78bfa (retro-amber), #8b5cf6 (retro-orange), #4c4472 (retro-brown), #e2e8f0 (retro-tan)
const ITEM_SHADOWS: Record<ItemType, string> = {
  sword: `
    /* blade */
    4px 0 0 #a78bfa, 6px 0 0 #a78bfa,
    4px 2px 0 #a78bfa, 6px 2px 0 #a78bfa,
    4px 4px 0 #a78bfa, 6px 4px 0 #a78bfa,
    4px 6px 0 #a78bfa, 6px 6px 0 #a78bfa,
    4px 8px 0 #a78bfa, 6px 8px 0 #a78bfa,
    /* guard */
    0 10px 0 #8b5cf6, 2px 10px 0 #8b5cf6, 4px 10px 0 #8b5cf6, 6px 10px 0 #8b5cf6, 8px 10px 0 #8b5cf6, 10px 10px 0 #8b5cf6,
    /* handle */
    4px 12px 0 #4c4472, 6px 12px 0 #4c4472,
    4px 14px 0 #4c4472, 6px 14px 0 #4c4472,
    /* pommel */
    2px 16px 0 #8b5cf6, 4px 16px 0 #8b5cf6, 6px 16px 0 #8b5cf6, 8px 16px 0 #8b5cf6
  `,
  potion: `
    /* cork */
    4px 0 0 #a78bfa, 6px 0 0 #a78bfa,
    /* neck */
    4px 2px 0 #4c4472, 6px 2px 0 #4c4472,
    /* body */
    2px 4px 0 #4c4472, 4px 4px 0 #8b5cf6, 6px 4px 0 #8b5cf6, 8px 4px 0 #4c4472,
    2px 6px 0 #4c4472, 4px 6px 0 #8b5cf6, 6px 6px 0 #a78bfa, 8px 6px 0 #4c4472,
    2px 8px 0 #4c4472, 4px 8px 0 #8b5cf6, 6px 8px 0 #8b5cf6, 8px 8px 0 #4c4472,
    /* base */
    2px 10px 0 #4c4472, 4px 10px 0 #4c4472, 6px 10px 0 #4c4472, 8px 10px 0 #4c4472
  `,
  shield: `
    /* top */
    4px 0 0 #a78bfa, 6px 0 0 #a78bfa, 8px 0 0 #a78bfa, 10px 0 0 #a78bfa,
    /* upper */
    2px 2px 0 #a78bfa, 4px 2px 0 #8b5cf6, 6px 2px 0 #8b5cf6, 8px 2px 0 #8b5cf6, 10px 2px 0 #8b5cf6, 12px 2px 0 #a78bfa,
    2px 4px 0 #a78bfa, 4px 4px 0 #8b5cf6, 6px 4px 0 #a78bfa, 8px 4px 0 #a78bfa, 10px 4px 0 #8b5cf6, 12px 4px 0 #a78bfa,
    /* middle */
    2px 6px 0 #a78bfa, 4px 6px 0 #8b5cf6, 6px 6px 0 #8b5cf6, 8px 6px 0 #8b5cf6, 10px 6px 0 #8b5cf6, 12px 6px 0 #a78bfa,
    /* lower */
    4px 8px 0 #a78bfa, 6px 8px 0 #8b5cf6, 8px 8px 0 #8b5cf6, 10px 8px 0 #a78bfa,
    /* point */
    6px 10px 0 #4c4472, 8px 10px 0 #4c4472
  `,
  scroll: `
    /* top roll */
    2px 0 0 #4c4472, 4px 0 0 #e2e8f0, 6px 0 0 #e2e8f0, 8px 0 0 #e2e8f0, 10px 0 0 #4c4472,
    /* paper */
    4px 2px 0 #e2e8f0, 6px 2px 0 #e2e8f0, 8px 2px 0 #e2e8f0,
    4px 4px 0 #e2e8f0, 6px 4px 0 #4c4472, 8px 4px 0 #e2e8f0,
    4px 6px 0 #e2e8f0, 6px 6px 0 #e2e8f0, 8px 6px 0 #4c4472,
    4px 8px 0 #e2e8f0, 6px 8px 0 #e2e8f0, 8px 8px 0 #e2e8f0,
    /* seal */
    6px 10px 0 #a78bfa,
    /* bottom roll */
    2px 12px 0 #4c4472, 4px 12px 0 #e2e8f0, 6px 12px 0 #e2e8f0, 8px 12px 0 #e2e8f0, 10px 12px 0 #4c4472
  `,
  gem: `
    /* top facet */
    6px 0 0 #a78bfa, 8px 0 0 #a78bfa,
    /* upper facets */
    4px 2px 0 #a78bfa, 6px 2px 0 #8b5cf6, 8px 2px 0 #8b5cf6, 10px 2px 0 #a78bfa,
    /* wide middle */
    2px 4px 0 #a78bfa, 4px 4px 0 #8b5cf6, 6px 4px 0 #a78bfa, 8px 4px 0 #a78bfa, 10px 4px 0 #8b5cf6, 12px 4px 0 #a78bfa,
    /* lower facets */
    4px 6px 0 #8b5cf6, 6px 6px 0 #8b5cf6, 8px 6px 0 #a78bfa, 10px 6px 0 #8b5cf6,
    /* bottom point */
    6px 8px 0 #4c4472, 8px 8px 0 #4c4472
  `,
};

const THEME_ITEMS: Record<string, ItemConfig[]> = {
  overworld: [
    { type: "sword", position: { left: "4%", top: "18%" }, duration: 6, delay: 0 },
    { type: "gem", position: { right: "5%", top: "30%" }, duration: 8, delay: 2 },
    { type: "potion", position: { left: "6%", top: "60%" }, duration: 7, delay: 3 },
  ],
  dungeon: [
    { type: "shield", position: { left: "5%", top: "22%" }, duration: 7, delay: 0 },
    { type: "sword", position: { right: "4%", top: "40%" }, duration: 6, delay: 1.5 },
    { type: "potion", position: { left: "4%", top: "55%" }, duration: 8, delay: 3 },
  ],
  tavern: [
    { type: "potion", position: { left: "5%", top: "20%" }, duration: 6, delay: 0 },
    { type: "scroll", position: { right: "5%", top: "35%" }, duration: 8, delay: 2 },
    { type: "gem", position: { left: "4%", top: "65%" }, duration: 7, delay: 1 },
  ],
  questboard: [
    { type: "scroll", position: { left: "4%", top: "25%" }, duration: 7, delay: 0 },
    { type: "gem", position: { right: "5%", top: "45%" }, duration: 6, delay: 2 },
    { type: "shield", position: { left: "6%", top: "60%" }, duration: 8, delay: 1 },
  ],
};

const PULSE_PARTICLES: PulseParticleConfig[] = [
  { left: "15%", top: "12%", size: 3, duration: 3, delay: 0 },
  { right: "12%", top: "45%", size: 3, duration: 4, delay: 1 },
  { left: "20%", top: "75%", size: 3, duration: 3.5, delay: 0.5 },
  { right: "18%", top: "70%", size: 4, duration: 3, delay: 2 },
  { left: "12%", top: "35%", size: 3, duration: 4.5, delay: 1.5 },
];

const RISE_PARTICLES: RiseParticleConfig[] = [
  { left: "35%", duration: 10, delay: 0 },
  { left: "65%", duration: 12, delay: 4 },
  { left: "80%", duration: 9, delay: 7 },
];

interface FloatingItemsProps {
  theme: "overworld" | "dungeon" | "tavern" | "questboard";
}

export default function FloatingItems({ theme }: FloatingItemsProps) {
  const items = THEME_ITEMS[theme] ?? [];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden hidden sm:block"
      style={{ zIndex: -5 }}
      aria-hidden="true"
    >
      {/* Pixel art items */}
      {items.map((item, i) => (
        <div
          key={`item-${i}`}
          className="absolute w-[2px] h-[2px]"
          style={{
            ...item.position,
            boxShadow: ITEM_SHADOWS[item.type],
            animation: `item-bob ${item.duration}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
          }}
        />
      ))}

      {/* Pulse particles */}
      {PULSE_PARTICLES.map((p, i) => (
        <div
          key={`pulse-${i}`}
          className="absolute bg-retro-amber"
          style={{
            left: p.left,
            right: p.right,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `particle-pulse ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Rise particles */}
      {RISE_PARTICLES.map((p, i) => (
        <div
          key={`rise-${i}`}
          className="absolute bottom-0 w-[2px] h-[2px] bg-retro-amber"
          style={{
            left: p.left,
            animation: `particle-rise ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/effects/FloatingItems.tsx
git commit -m "feat: create FloatingItems component with pixel art items and particles"
```

---

## Chunk 2: Page Integration

### Task 4: Add FloatingItems + GlassCard to home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add imports**

Add after existing imports:

```typescript
import FloatingItems from "@/components/effects/FloatingItems";
import GlassCard from "@/components/effects/GlassCard";
```

- [ ] **Step 2: Add FloatingItems and wrap featured quests section in GlassCard**

The current return structure is:
```tsx
<div className="relative">
  <PageBackground theme="overworld" />
  <Hero />
  <div className="section-divider max-w-6xl mx-auto" />
  <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    ...
  </section>
</div>
```

Change to:
```tsx
<div className="relative">
  <PageBackground theme="overworld" />
  <FloatingItems theme="overworld" />
  <Hero />
  <div className="section-divider max-w-6xl mx-auto" />
  <GlassCard className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="flex items-center gap-4 mb-12">
      ...existing content...
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      ...existing content...
    </div>
    <div className="text-center mt-14">
      ...existing button...
    </div>
  </GlassCard>
</div>
```

Replace the `<section>` tag with `<GlassCard>`, moving the section's className to GlassCard's className prop.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Check `http://localhost:3003` — should see floating items at edges, particles, and featured quests in a glass card.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add FloatingItems and GlassCard to home page"
```

---

### Task 5: Add FloatingItems + GlassCard to projects page

**Files:**
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Add imports and update return**

Add imports for `FloatingItems` and `GlassCard`.

Current:
```tsx
<div className="relative">
  <PageBackground theme="dungeon" />
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <QuestLog />
  </div>
</div>
```

Change to:
```tsx
<div className="relative">
  <PageBackground theme="dungeon" />
  <FloatingItems theme="dungeon" />
  <GlassCard className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <QuestLog />
  </GlassCard>
</div>
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Check `http://localhost:3003/projects`

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "feat: add FloatingItems and GlassCard to projects page"
```

---

### Task 6: Add FloatingItems + GlassCard to about page

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Add imports and update return**

Add imports for `FloatingItems` and `GlassCard`.

Current structure:
```tsx
<div className="relative">
  <PageBackground theme="tavern" />
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    ...all content...
  </div>
</div>
```

Change to:
```tsx
<div className="relative">
  <PageBackground theme="tavern" />
  <FloatingItems theme="tavern" />
  <GlassCard className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    ...all content unchanged...
  </GlassCard>
</div>
```

Replace the inner `<div className="max-w-3xl ...">` with `<GlassCard className="max-w-3xl ...">` and its closing `</div>` with `</GlassCard>`.

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Check `http://localhost:3003/about`

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add FloatingItems and GlassCard to about page"
```

---

### Task 7: Add FloatingItems + GlassCard to contact page

**Files:**
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Add imports and update return**

Add imports for `FloatingItems` and `GlassCard`.

Current structure:
```tsx
<div className="relative">
  <PageBackground theme="questboard" />
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    ...header + content grid...
  </div>
</div>
```

Change to:
```tsx
<div className="relative">
  <PageBackground theme="questboard" />
  <FloatingItems theme="questboard" />
  <GlassCard className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    ...header + content grid unchanged...
  </GlassCard>
</div>
```

Replace the inner `<div className="max-w-4xl ...">` with `<GlassCard className="max-w-4xl ...">` and its closing `</div>` with `</GlassCard>`.

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Check `http://localhost:3003/contact`

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: add FloatingItems and GlassCard to contact page"
```

---

### Task 8: Add FloatingItems + GlassCard to project detail page

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Add imports and update return**

Add imports for `FloatingItems` and `GlassCard`.

Current structure:
```tsx
<div className="relative">
  <PageBackground theme="dungeon" />
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    ...breadcrumb, quest label, title, content, prev/next...
  </div>
</div>
```

Change to:
```tsx
<div className="relative">
  <PageBackground theme="dungeon" />
  <FloatingItems theme="dungeon" />
  <GlassCard className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    ...all content unchanged...
  </GlassCard>
</div>
```

Replace the inner `<div className="max-w-4xl ...">` with `<GlassCard className="max-w-4xl ...">` and its closing `</div>` with `</GlassCard>`.

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Check `http://localhost:3003/projects/langfens-microservice`

- [ ] **Step 3: Commit**

```bash
git add 'src/app/projects/[slug]/page.tsx'
git commit -m "feat: add FloatingItems and GlassCard to project detail page"
```

---

### Task 9: Final verification

- [ ] **Step 1: Run full type check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 2: Run lint and build**

Run: `npm run lint && npm run build`
Expected: No errors, all pages build successfully.

- [ ] **Step 3: Visual check all pages**

Browse through every page at `http://localhost:3003`:
- `/` — overworld floating items (sword, gem, potion) + particles + glass card on featured quests
- `/projects` — dungeon floating items + glass card on quest log
- `/about` — tavern floating items + glass card on all content
- `/contact` — questboard floating items + glass card on form + social
- `/projects/langfens-microservice` — dungeon floating items + glass card on content

Verify:
- Floating items bob at left/right edges, not overlapping center content
- Particles pulse and rise
- Glass card has visible blur effect (content slightly blurred behind)
- All backgrounds still visible through glass cards
- `pointer-events: none` works (can click through floating items)
- FloatingItems hidden on mobile (resize browser below 640px)

- [ ] **Step 4: Test reduced motion**

In browser DevTools → Rendering → check "Emulate CSS prefers-reduced-motion: reduce". All animations should stop.

- [ ] **Step 5: Commit any fixes**

If any issues found, fix and commit.

---

**Note on inline styles:** `FloatingItems` uses inline `style={{}}` for `box-shadow` pixel art, `animation`, `animationDelay`, and `zIndex` properties. `GlassCard` uses inline style for `WebkitBackdropFilter` and multi-value `boxShadow`. These cannot be expressed as single Tailwind utilities. This is an acknowledged exception consistent with existing `PageBackground` and `PixelSprites` components.
