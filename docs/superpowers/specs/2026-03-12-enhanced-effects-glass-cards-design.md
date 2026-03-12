# Enhanced Visual Effects & Glass Card Layout — Design Spec

## Goal

Add floating pixel art items and glowing particles throughout the portfolio, and wrap page content in semi-transparent glass cards. This builds on the existing PageBackground system (overworld/dungeon/tavern/questboard themes) to create a layered, immersive RPG atmosphere.

## Design Decisions

- **Effects intensity**: Balanced RPG — 3-4 pixel items + 5-8 particles per page, not overwhelming
- **Card style**: Glass Card — `backdrop-filter: blur(12px)`, semi-transparent, content visible through background effects
- **Item types**: Mix of pixel art items (box-shadow CSS) and small glowing particle squares
- **Movement**: Items bob in place at edges + existing sprites walk across + particles pulse/rise

## Architecture

### Rendering Layers (back to front)

```
-z-10  PageBackground (existing — stars, ground, torches, embers, papers, walking sprites)
z-[-5] FloatingItems (NEW — pixel items bobbing at edges + particles pulsing/rising)
z-0    ParallaxGrid (existing — background grid pattern)
z-auto GlassCard content wrapper (NEW — semi-transparent card with blur)
z-40   Nav (existing — has backdrop-blur-sm)
z-50   Scanlines + template flash (existing)
```

Note: Walking sprites (warrior/mage) render inside PageBackground's Overworld component, so they inherit the `-z-10` stacking context. FloatingItems at `z-[-5]` sits between PageBackground and ParallaxGrid.

### New Components

#### `src/components/effects/FloatingItems.tsx` — "use client"

Renders pixel art items and glowing particles. Accepts a `theme` prop to vary which items appear per page.

```typescript
interface FloatingItemsProps {
  theme: "overworld" | "dungeon" | "tavern" | "questboard";
}
```

**Pixel art items** — rendered via `box-shadow` on a 2px base element (same technique as PixelSprites):

| Item | Size (pixels) | Colors | Used on themes |
|------|--------------|--------|----------------|
| Sword | ~7x14 (2px scale) | amber blade, orange guard, brown handle | overworld, dungeon |
| Potion | ~5x10 (2px scale) | amber cork, orange liquid, brown bottle | overworld, tavern |
| Shield | ~9x10 (2px scale) | amber rim, orange face, brown base | dungeon, questboard |
| Scroll | ~7x10 (2px scale) | tan paper, brown edges, amber seal | tavern, questboard |
| Gem | ~9x10 (2px scale) | amber/orange facets, brown base | overworld, questboard |

Each page renders 3-4 items from this pool based on theme.

**Item positioning**:
- Items placed at left edge (3-8% from left) and right edge (88-97% from right)
- Vertical positions staggered: top quarter, middle, lower third
- Never overlap with center content area (15-85% horizontal)

**Item animation** — CSS keyframe `item-bob`:
```css
@keyframes item-bob {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(4deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
```
- Duration: 5-9s per item (staggered)
- `animation-timing-function: ease-in-out`
- `animation-delay`: staggered 0-3s per item

**Glowing particles**:
- 5-8 small squares (3-4px), all use `retro-amber` color (`#a78bfa`)
- Two behaviors:
  - **Pulse** (5 particles): fixed position, opacity oscillates 0.15→0.5, with `box-shadow` glow
  - **Rise** (3 particles): start from bottom, translateY upward over 8-12s, fade in/out
- Particles may appear across the full width (they are small and translucent enough to not interfere with content readability)

**Keyframes needed** (add to `globals.css`):
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

**Component root element**:
```tsx
<div className="fixed inset-0 pointer-events-none overflow-hidden hidden sm:block" style={{ zIndex: -5 }} aria-hidden="true">
```

Uses inline `style={{ zIndex: -5 }}` because `-z-5` is not a valid Tailwind utility (default scale is 0/10/20/30/40/50). Hidden on mobile (`hidden sm:block`) to reduce GPU load and avoid visual clutter on narrow viewports where items would overlap content.

**DOM budget**: Max 12 nodes per page (3 items + 5 pulse particles + 3 rise particles + 1 wrapper). Each item is a single `<div>` with `box-shadow` pixel art (no nesting), matching the PixelSprites pattern.

#### `src/components/effects/GlassCard.tsx` — Server Component (no "use client")

Simple wrapper component for page content.

```typescript
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}
```

**Styling** — use Tailwind classes where possible, inline style only for complex properties:

```tsx
// Tailwind classes:
className="bg-retro-amber/[0.06] border border-retro-amber/15 backdrop-blur-xl"

// Inline style (only for multi-value box-shadow that can't be a single utility):
style={{
  WebkitBackdropFilter: "blur(12px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(167, 139, 250, 0.1)",
}}
```

No border-radius (follows project's sharp-corners design system).

**Note on Nav interaction**: Nav already uses `backdrop-blur-sm` (4px). When GlassCard scrolls behind Nav, there will be two blur layers. This is acceptable since the Nav blur is small (4px) and the overlap area is limited. On mobile, GlassCard uses a reduced blur (`backdrop-blur-md` instead of `backdrop-blur-xl`) to reduce GPU compositing load.

### Modified Files

#### Pages — Add FloatingItems + GlassCard

Each page gets:
1. `<FloatingItems theme="..." />` added alongside existing `<PageBackground>`
2. Content section(s) wrapped in `<GlassCard>`

| Page | FloatingItems theme | GlassCard wraps |
|------|-------------------|-----------------|
| `src/app/page.tsx` | overworld | Featured quests `<section>` (not Hero) |
| `src/app/about/page.tsx` | tavern | Entire content div (identity card through adventure log) |
| `src/app/projects/page.tsx` | dungeon | QuestLog wrapper div |
| `src/app/contact/page.tsx` | questboard | Content grid (form + social links) |
| `src/app/projects/[slug]/page.tsx` | dungeon | Content area (below breadcrumb, above prev/next nav) |

**Hero is NOT wrapped in GlassCard** — it should remain full-bleed with its existing styling.

#### `src/app/globals.css` — Add 3 new keyframes

Add `item-bob`, `particle-pulse`, `particle-rise` keyframes (listed above).

These are covered by the existing `@media (prefers-reduced-motion: reduce)` wildcard rule that targets `*, *::before, *::after`.

### TypeScript Interfaces

```typescript
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
```

### Per-Theme Item Configuration

```typescript
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
```

### Particle Configuration (same for all themes)

```typescript
const PULSE_PARTICLES = [
  { left: "15%", top: "12%", size: 3, duration: 3, delay: 0 },
  { right: "12%", top: "45%", size: 3, duration: 4, delay: 1 },
  { left: "20%", top: "75%", size: 3, duration: 3.5, delay: 0.5 },
  { right: "18%", top: "70%", size: 4, duration: 3, delay: 2 },
  { left: "12%", top: "35%", size: 3, duration: 4.5, delay: 1.5 },
];

const RISE_PARTICLES = [
  { left: "35%", duration: 10, delay: 0 },
  { left: "65%", duration: 12, delay: 4 },
  { left: "80%", duration: 9, delay: 7 },
];
```

## Constraints

- **No new npm dependencies** — pure CSS animations, box-shadow pixel art
- **No canvas or JS runtime animations** — CSS keyframes only
- **Max 12 DOM nodes** per FloatingItems instance (3 items + 5 pulse + 3 rise + 1 wrapper)
- **`pointer-events: none`** on FloatingItems root (click-through to content)
- **`aria-hidden="true"`** on FloatingItems root (decorative only)
- **`prefers-reduced-motion`** — handled by existing global wildcard rule
- **Inline styles exception** — acknowledged for box-shadow pixel art, complex box-shadow gradients (same as PageBackground/PixelSprites). GlassCard uses Tailwind classes where possible.
- **Sharp corners** — no `border-radius` on GlassCard (design system rule)
- **Z-index** — FloatingItems uses `style={{ zIndex: -5 }}` (not Tailwind class, since `-z-5` is not in default scale)
- **Mobile** — FloatingItems hidden below `sm` breakpoint (`hidden sm:block`). GlassCard uses `backdrop-blur-md` on mobile, `backdrop-blur-xl` on desktop.
- **Pixel art data** — box-shadow definitions for the 5 item types (sword, potion, shield, scroll, gem) must be designed during implementation, following the same 2px-scale technique used in PixelSprites.tsx.
- **`particle-rise` loop** — opacity is 0 at both 0% and 100% keyframes, so the snap-back to origin is invisible. This is acceptable.

## Files Summary

### New Files
- `src/components/effects/FloatingItems.tsx` — Pixel items + particles
- `src/components/effects/GlassCard.tsx` — Glass card wrapper

### Modified Files
- `src/app/globals.css` — 3 new keyframes
- `src/app/page.tsx` — Add FloatingItems + GlassCard
- `src/app/about/page.tsx` — Add FloatingItems + GlassCard
- `src/app/projects/page.tsx` — Add FloatingItems + GlassCard
- `src/app/contact/page.tsx` — Add FloatingItems + GlassCard
- `src/app/projects/[slug]/page.tsx` — Add FloatingItems + GlassCard
