# Background Effects & Typography Redesign

## Goal

Add RPG-themed animated background effects to each page and replace the current pixel font (Press Start 2P) with Pixelify Sans for better readability and visual weight.

## Context

The portfolio uses an RPG Character Sheet theme with dark purple palette. Current state:
- Font `Press Start 2P` is thin and hard to read at small sizes (min 10px)
- Background is plain dark (`#0d0b14`) with only a pixel grid overlay and scanlines
- No per-page visual differentiation

## Design Decisions

- **Font**: Pixelify Sans (Google Fonts) replaces Press Start 2P. 4 weights: 400, 500, 600, 700.
- **Background approach**: Pure CSS animations (no JS runtime, no canvas). CSS sprite rendering via `box-shadow`.
- **Scope**: Each page gets a unique themed background. Sprites only on hero.
- **Intensity**: Subtle — 2-3 sprites, slow movement (30-60s cycles), low opacity ambient elements.

---

## Typography System

### Font Change

Load `Pixelify Sans` via `next/font/google` in `layout.tsx`, replacing `Press_Start_2P`:

```typescript
import { Pixelify_Sans } from "next/font/google";

const fontPixel = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixel",
  weight: ["400", "500", "600", "700"],
});
```

The CSS variable `--font-pixel` / `--font-family-pixel` stays the same — only the underlying font changes.

### Typography Scale

Responsive sizes for hero name (no downgrade from current responsive scale):

| Role | Before | After |
|------|--------|-------|
| Hero name | `text-4xl sm:text-5xl md:text-6xl` (36/48/60px) | `text-5xl sm:text-6xl md:text-7xl` weight 700 |
| Page heading | `text-lg` (18px) | `text-2xl` (24px) weight 700 |
| Section heading | `text-[10px]`-`text-[11px]` | `text-base` (16px) weight 600 |
| Card title | `text-base sm:text-lg` | `text-lg sm:text-xl` weight 600 |
| Labels/tags | `text-[10px]` | `text-xs` (12px) weight 500 |
| Buttons | `text-[11px]` | `text-sm` (14px) weight 600 |
| Nav links | `text-sm` font-mono | `text-sm` font-mono (unchanged) |
| Nav logo | `text-[11px]` font-pixel | `text-sm` weight 600 |

### Granular Font-Size Migration

All sub-14px font usages must be updated. Table covers every `text-[9px]`, `text-[10px]`, and `text-[11px]` instance.

**`text-[9px]` and `text-[10px]` migrations:**

| File | Current | Element | New Size |
|------|---------|---------|----------|
| `Hero.tsx` | `text-[10px] font-pixel` | CLASS label | `text-xs` weight 500 |
| `QuestCard.tsx` | `text-[9px] font-pixel` | STATUS/DIFFICULTY labels | `text-xs` weight 500 |
| `StatBar.tsx` | `text-[10px] font-pixel` | stat label | `text-xs` weight 500 |
| `Nav.tsx` | `text-[10px] font-pixel` | "K" logo square | `text-xs` weight 700 |
| `Nav.tsx` | `text-[10px] font-pixel` | mobile menu button | `text-xs` weight 500 |
| `about/page.tsx` | `text-[10px] font-pixel` | field labels (NAME, CLASS...) | `text-xs` weight 500 |
| `FilterTabs.tsx` | `text-[10px] font-mono` | filter buttons | `text-xs` font-mono (unchanged weight) |
| `Timeline.tsx` | `text-[10px] font-mono` | date range | `text-xs` font-mono (unchanged weight) |
| `ContactForm.tsx` | `text-[10px] font-mono` | form labels | `text-xs` font-mono (unchanged weight) |
| `ContactForm.tsx` | `text-[10px] font-mono` | error message | `text-xs` font-mono (unchanged weight) |
| `projects/[slug]/page.tsx` | `text-[10px] font-mono` | breadcrumb, VIEW SOURCE | `text-xs` font-mono (unchanged weight) |

**`text-[11px]` migrations (all `font-pixel` → `text-sm` weight 600):**

| File | Element |
|------|---------|
| `Nav.tsx` | "KHOA.DEV" logo text |
| `about/page.tsx` | section headings (BACKSTORY, STATS, ABILITIES, ADVENTURE LOG) |
| `QuestCard.tsx` | tech tag text (font-mono, stays `text-xs`) |
| `Timeline.tsx` | entry title |
| `ContactForm.tsx` | success text, button text |
| `Hero.tsx` | "QUEST LOG" button, "CHARACTER SHEET" button |
| `page.tsx` | "VIEW QUEST LOG" button |
| `contact/page.tsx` | "QUEST DETAILS", "CONNECT" section headings |
| `projects/[slug]/page.tsx` | "QUEST BRIEFING", "XP GAINED", "CLASS ROLE" headings |
| `projects/[slug]/page.tsx` | tech tag spans (font-mono, stays `text-xs`) |
| `not-found.tsx` | "RETURN TO BASE" button |

**Exception**: `text-[11px] font-mono` entries (QuestCard tech tags, project detail tech tags) stay at `text-xs font-mono` — no weight change.

**Rule**: `font-mono` sizes stay at `text-xs` minimum (12px). `font-pixel` sizes increase to `text-xs` (12px) minimum. No `text-[9px]` or `text-[10px]` after migration. All `text-[11px] font-pixel` migrate to `text-sm` (14px).

---

## Background Effects

### Z-Index Stacking Order

Clear layer order from back to front:

```
-z-10   PageBackground (ambient effects: stars, torches, sprites) → z-index: -10
z-0     ParallaxGrid (existing, fixed, in layout.tsx) → z-index: 0
z-auto  Page content (relative, default stacking)
z-40    Nav (existing, fixed) → z-index: 40
z-50    Scanlines (existing, fixed ::after pseudo) → z-index: 50
z-50    Template flash overlay (existing, Framer Motion) → z-index: 50
```

`PageBackground` uses `z-index: -1` (behind ParallaxGrid) so it serves as the deepest ambient layer.

### Placement: Inside Each Page (not layout)

`PageBackground` is placed **inside each page component** as the first child. It will animate in/out with page transitions via `template.tsx` — this is **intentional**: the background theme should transition with the page content, creating a smooth theme switch between pages. A brief 0.3s fade between themes is desirable, not a bug.

Pattern:
```tsx
// Server component page — no "use client" needed
export default function AboutPage() {
  return (
    <div className="relative">
      <PageBackground theme="tavern" />
      {/* page content */}
    </div>
  );
}
```

`PageBackground` is a client component (`"use client"`) used as a child of server component pages. This follows the existing pattern (e.g., `QuestCard`, `Hero` are client components used inside server pages).

### Component Architecture

#### `PageBackground`

```typescript
// src/components/effects/PageBackground.tsx
"use client";

interface PageBackgroundProps {
  theme: "overworld" | "dungeon" | "tavern" | "questboard";
}
```

Renders a `div` with `fixed inset-0 pointer-events-none -z-10` (z-index: -10) containing theme-specific child elements. Each theme renders different ambient elements.

#### `PixelSprites`

```typescript
// src/components/effects/PixelSprites.tsx
"use client";
// Only rendered by PageBackground when theme="overworld"
```

Renders 2 CSS pixel characters. Each sprite is a `div` with `box-shadow` values defining pixel positions. Movement via `transform: translateX()` keyframes (GPU-composited, no layout reflow).

### Sprite Visual Descriptions

Sprites are 12x16 pixel art (simplified, not full 16x16). Each pixel is a 3px square via box-shadow.

**Warrior sprite**: Simple silhouette — purple hood (retro-amber), lighter face (retro-tan), body (retro-orange), legs (retro-brown). ~30 shadow entries.

**Mage sprite**: Pointed hat (retro-orange), face (retro-tan), robe (retro-amber), staff line (retro-brown). ~30 shadow entries.

The exact pixel data will be authored during implementation. The key constraint is using only the project color palette.

### Per-Page Themes

#### Home (`/`) — theme: `"overworld"`

- **Stars**: 8-12 `div` elements, `2px` squares, `position: absolute`, scattered across top 40% of viewport. `twinkle` animation with staggered delays.
- **Ground strip**: Single `div`, `40px` height at bottom, `repeating-linear-gradient` for pixel grass (green tint at low opacity).
- **Sprites**: 2 pixel characters via `PixelSprites` component. Warrior moves right (45s), Mage moves left (55s). Use `transform: translateX()` for GPU-composited movement.
- **Mobile**: Reduce to 6 stars, keep both sprites (they're small enough).

#### Quests (`/projects`) — theme: `"dungeon"`

- **Background gradient**: `linear-gradient(180deg, #0d0b14, #0a0812)` — darker, deeper purple.
- **Torches**: 2 `div` elements at left/right edges, ~20% from top. Each is a `4px x 8px` amber rectangle with `flicker` animation (box-shadow glow oscillation, 0.5s alternate). Colors: `#f59e0b` body, `#ef4444` glow.
- **Water drips**: 2 `div` elements, `2px` squares, `drip-fall` animation using `transform: translateY()`, 4s cycle. Color: `retro-amber` at 25% opacity.
- **Stone hint**: `repeating-linear-gradient(0deg, transparent 0px, transparent 30px, rgba(76,68,114,0.08) 30px, rgba(76,68,114,0.08) 31px)` on the background div.
- **Mobile**: Same elements, no changes needed (all absolute/fixed positioned).

#### Character (`/about`) — theme: `"tavern"`

- **Background gradient**: `linear-gradient(180deg, #0d0b14, #12091c)` — slightly warmer purple.
- **Torch**: 1 `div`, left edge at ~30% from top. Same flicker as dungeon but warmer glow (more amber, less red).
- **Embers**: 3 `div` elements, `2px` squares, starting near bottom. `ember-rise` animation: `transform: translateY(-100vh) translateX(20px)`, `opacity 1 → 0`, 6-8s cycle with staggered delays. Color: `#f59e0b` at 30% opacity.
- **Mobile**: Reduce to 2 embers.

#### Contact (`/contact`) — theme: `"questboard"`

- **Background gradient**: `linear-gradient(180deg, #0d0b14, #100c1a)` — subtle neutral-warm.
- **Quest papers**: 3 `div` elements positioned at right side of screen (right: 5%-15%, top: 15%-45%). Sizes: `20x24px`, `18x22px`, `22x20px`. Background: `rgba(226,232,240,0.04)` (retro-tan at very low opacity). Border: `1px solid rgba(76,68,114,0.15)`. `paper-sway` animation: `rotate(-1deg) → rotate(1deg)`, 3s cycle, staggered delays.
- **Mobile**: Reduce to 2 papers, shift right position to avoid content overlap.

### CSS Keyframes

All added to `globals.css`:

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

### Accessibility

All background effects already covered by existing `prefers-reduced-motion` rule in `globals.css` which targets `*, *::before, *::after`. No additional CSS rule needed — the existing media query handles all new animations.

### Performance

- Pure CSS animations — no JS animation loops
- Sprites use `transform: translateX()` (GPU composited, no layout reflow)
- `will-change: transform` on sprite elements only
- `pointer-events: none` on all background layers
- Low element count per page (max 15 DOM nodes for all effects)
- No image files — sprites rendered via `box-shadow`

---

## Files Changed

### New Files

| File | Purpose |
|------|---------|
| `src/components/effects/PageBackground.tsx` | Per-page themed background (client component) |
| `src/components/effects/PixelSprites.tsx` | CSS pixel sprite characters (client component, used by overworld theme) |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Replace `Press_Start_2P` import with `Pixelify_Sans`, add weights 400-700 |
| `src/app/globals.css` | Add 7 new keyframes (`twinkle`, `torch-flicker`, `drip-fall`, `ember-rise`, `paper-sway`, `sprite-walk-right`, `sprite-walk-left`) |
| `src/app/page.tsx` | Add `PageBackground theme="overworld"`, wrap content in `relative` div |
| `src/app/projects/page.tsx` | Add `PageBackground theme="dungeon"` |
| `src/app/about/page.tsx` | Add `PageBackground theme="tavern"`, update font sizes |
| `src/app/contact/page.tsx` | Add `PageBackground theme="questboard"`, update font sizes |
| `src/app/projects/[slug]/page.tsx` | Add `PageBackground theme="dungeon"`, update font sizes |
| `src/app/not-found.tsx` | Update font sizes |
| `src/components/Hero.tsx` | Update font sizes and weights per typography scale |
| `src/components/QuestCard.tsx` | Update font sizes (fix `text-[9px]` → `text-xs`) and weights |
| `src/components/QuestLog.tsx` | Update heading size |
| `src/components/Nav.tsx` | Update logo and menu font sizes/weights |
| `src/components/StatBar.tsx` | Update label font size |
| `src/components/ContactForm.tsx` | Update button font size/weight |
| `src/components/FilterTabs.tsx` | Update font sizes |
| `src/components/Footer.tsx` | No font changes (already `font-mono text-xs`) |
| `src/components/Timeline.tsx` | Update title font size/weight |
| `src/components/SocialLinks.tsx` | Update font size/weight |

### No New Dependencies

Pixelify Sans loaded via `next/font/google` (already available in Next.js). No npm install needed.

---

## Constraints

- No icon libraries or emoji — sprites are CSS-only pixel art via `box-shadow`
- No rounded corners on any element
- All animations respect `prefers-reduced-motion` (existing global media query)
- No canvas elements — CSS animations only
- Sprite pixel art uses project color palette only (`retro-amber`, `retro-orange`, `retro-brown`, `retro-tan`)
- **Exception**: Torch/fire effects use `#f59e0b` (amber) and `#ef4444` (red) — these are outside the retro palette but represent actual fire glow. Raw hex is acceptable in CSS keyframes since Tailwind tokens cannot be used there.
- Background layers use `pointer-events: none` and `-z-10` to stay behind all content
- `font-mono` minimum stays at `text-xs` (12px); `font-pixel` minimum increases to `text-xs` (12px)
- Mobile: reduce particle/star counts but keep all themes functional
