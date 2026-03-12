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
-z-10  PageBackground (existing — stars, ground, torches, embers, papers per theme)
-z-5   FloatingItems (NEW — pixel items bobbing at edges + particles pulsing/rising)
z-0    Walking sprites (existing — warrior/mage in PageBackground's Overworld)
z-auto GlassCard content wrapper (NEW — semi-transparent card with blur)
z-40   Nav (existing)
z-50   Scanlines + template flash (existing)
```

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
- 5-8 small squares (3-4px), color `retro-amber` or `retro-orange`
- Two behaviors:
  - **Pulse** (3-5 particles): fixed position, opacity oscillates 0.15→0.5, with `box-shadow` glow
  - **Rise** (2-3 particles): start from bottom, translateY upward over 8-12s, fade in/out
- Distributed across the full width, avoiding center content column

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
<div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden" aria-hidden="true">
```

**DOM budget**: Max 15 nodes per page (3-4 items + 5-8 particles + wrapper divs).

#### `src/components/effects/GlassCard.tsx` — Server Component (no "use client")

Simple wrapper component for page content.

```typescript
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}
```

**Styling**:
```css
background: rgba(167, 139, 250, 0.06);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(167, 139, 250, 0.15);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(167, 139, 250, 0.1);
```

No border-radius (follows project's sharp-corners design system).

**Note on inline styles**: The `backdrop-filter`, `box-shadow`, and `background` values are complex multi-value properties that cannot be expressed as single Tailwind utilities. These use inline `style={{}}`, consistent with the existing exemption for PageBackground and PixelSprites.

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
- **Max 15 DOM nodes** per FloatingItems instance
- **`pointer-events: none`** on FloatingItems root (click-through to content)
- **`aria-hidden="true"`** on FloatingItems root (decorative only)
- **`prefers-reduced-motion`** — handled by existing global wildcard rule
- **Inline styles exception** — acknowledged for box-shadow pixel art, backdrop-filter, complex gradients (same as PageBackground/PixelSprites)
- **Sharp corners** — no `border-radius` on GlassCard (design system rule)
- **Tailwind v4 `-z-5`** — use `z-[-5]` or inline `style={{ zIndex: -5 }}` if `-z-5` is not a valid Tailwind class. Alternatively, use a custom z-index value via inline style.

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
