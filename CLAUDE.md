# CLAUDE.md — Portfolio Project Rules

## Quick Reference

```bash
npm run dev          # Dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npx tsc --noEmit     # Type check (no output)
```

## Architecture

- **Framework:** Next.js 16 + React 19 + TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` in `globals.css`)
- **Animations:** Framer Motion + CSS keyframes
- **React Compiler:** Enabled via `babel-plugin-react-compiler`
- **Fonts:** Press Start 2P (headings) + JetBrains Mono (body)
- **Data:** Static TypeScript files (`src/data/projects.ts`, `src/data/profile.ts`)
- **Routing:** App Router with `generateStaticParams()` for dynamic routes

### File Structure

```
src/
├── app/              # Pages and API routes
│   ├── layout.tsx    # Root layout (Nav, Footer, fonts)
│   ├── template.tsx  # Page transition wrapper (Framer Motion)
│   └── globals.css   # Theme tokens, keyframes, effects
├── components/       # Reusable UI components
│   └── effects/      # Animation primitives (GlitchText, PixelParticles, etc.)
└── data/             # Static content (projects.ts, profile.ts)
```

### Import Alias

Use `@/` for all imports: `import { projects } from "@/data/projects"`.

---

## Design System & Color Palette

All colors are defined as Tailwind v4 `@theme` tokens in `globals.css`:

| Token              | Hex       | Usage                    |
|-------------------|-----------|--------------------------|
| `retro-amber`     | `#a78bfa` | Primary accent (violet)  |
| `retro-orange`    | `#8b5cf6` | Secondary accent         |
| `retro-brown`     | `#4c4472` | Borders, muted elements  |
| `retro-tan`       | `#e2e8f0` | Body text                |
| `retro-muted`     | `#94a3b8` | Secondary text           |
| `retro-dark`      | `#0d0b14` | Page background          |
| `retro-card`      | `#141024` | Card background          |

**Never use raw hex values.** Always reference tokens: `text-retro-amber`, `bg-retro-dark`, etc.

### Typography Rules

- **Pixel font (`font-pixel`):** Headings, labels, buttons. Min size: `text-[10px]`
- **Mono font (`font-mono`):** Body text, descriptions, code. Min size: `text-xs` (12px)
- Never use default sans-serif. Every text element must use `font-pixel` or `font-mono`.

---

## UI / Design Rules

### No Icons or Emoji in UI

- **Do not use emoji characters** as decorative elements, icons, or visual markers in any component.
- **Do not use icon libraries** (Lucide, Heroicons, FontAwesome, etc.) — they add visual noise and clash with the pixel aesthetic.
- Use **text labels**, **typographic symbols**, or **CSS-generated shapes** instead.
- The only acceptable visual elements are: text, borders, gradients, shadows, and CSS effects.

### No Noisy or Unprofessional Components

- **No tooltips, badges, or floating labels** unless strictly functional (form validation).
- **No loading spinners or skeleton screens** for static content — this site is statically generated.
- **No toast notifications or popups** — use inline status messages.
- **No carousels or sliders** — display all items in a grid or list.
- **No animated counters or number tickers** — display the number directly.
- **No "scroll to top" buttons** — let the user scroll naturally.
- **No decorative dividers with icons** — use simple `h-px bg-gradient-to-r` lines.

### Visual Hierarchy

- Use **font size and weight** to create hierarchy, not color variation or icons.
- Section headings: `font-pixel text-lg text-retro-amber` with a gradient divider line.
- Card content follows: title (large, `font-pixel`) → description (smaller, `font-mono`) → metadata (smallest, `font-mono`).
- Whitespace is the primary tool for grouping and separation — generous padding over decorative borders.

### Hover & Interactive States

- Hover effects must be **subtle**: border color shift + soft box-shadow glow.
- Standard glow: `hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]`.
- Standard border: `hover:border-retro-amber/50`.
- Transitions: `transition-all` or `transition-colors` — never instant state changes.

### Cards & Containers

- Cards use `border border-retro-brown/25 bg-retro-card/30` as base.
- No rounded corners — all elements use sharp edges (`rounded-none` or default).
- No drop shadows for static layout — only glow effects on hover/focus.

### Layout

- Max content width: `max-w-6xl` with `px-4 sm:px-6 lg:px-8`.
- Grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for cards.
- Consistent gap: `gap-6` for card grids, `gap-4` for smaller items.

### Accessibility

- All interactive elements must have visible focus states.
- Respect `prefers-reduced-motion` — disable animations via media query (already in `globals.css`).
- Minimum contrast ratio for text on dark backgrounds — `retro-tan` on `retro-dark` meets WCAG AA.
- All links and buttons must have descriptive text (no "click here").

---

## Component Patterns

### Client vs Server Components

- **Default to Server Components** (no `"use client"` directive).
- Add `"use client"` only when using: `useState`, `useEffect`, `useRef`, event handlers, browser APIs, Framer Motion.
- Pages in `app/` should be Server Components. Extract client interactivity into separate components.

### Animation Components (`effects/`)

- `useScrollReveal` — IntersectionObserver-based reveal. Uses `requestAnimationFrame` for initial viewport check.
- `TypingAnimation` — Character-by-character typing. Uses `useRef` for index to handle React 19 strict mode.
- `GlitchText` — Random character replacement effect.
- `PixelParticles` — Canvas-based particle system (hero background only).
- `ParallaxGrid` — CSS grid with scroll-linked parallax.

**Rules for effects:**
- Never call `setState` synchronously inside `useEffect` — wrap in `requestAnimationFrame` or use refs.
- Always clean up timers, intervals, animation frames, and observers in effect cleanup.
- Always handle React 19 strict mode double-mount (use refs for mutable state, not useState).

### Data Pattern

- All content lives in `src/data/*.ts` as typed constants.
- Export both the data and helper functions (e.g., `getFeaturedProjects()`, `getProjectsByLanguage()`).
- Use TypeScript interfaces for all data shapes. Export interfaces for consumer components.

---

## Code Conventions

### TypeScript

- Strict mode enabled — no `any`, no `@ts-ignore`.
- Use `interface` for component props, `type` for unions and intersections.
- Export component props interfaces from the component file.

### Styling

- **Tailwind utility classes only** — no inline `style={{}}` except for dynamic values (animation delays).
- Keep class strings readable — break long `className` strings across lines.
- Use Tailwind opacity modifiers: `text-retro-amber/70`, `bg-retro-card/30`.
- No `@apply` in CSS — use utility classes in JSX.

### File Naming

- Components: `PascalCase.tsx` (e.g., `ProjectCard.tsx`)
- Hooks: `camelCase.ts` (e.g., `useScrollReveal.ts`)
- Data files: `camelCase.ts` (e.g., `projects.ts`)
- Pages: `page.tsx` inside route directories

### Imports

- Group imports: React/Next → external libs → local components → local data/utils
- Use `@/` alias for all project imports
- No default exports except for page components and React components

---

## Git & Workflow

- Commit messages: conventional format (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`)
- Verify before commit: `npx tsc --noEmit && npm run lint && npm run build`
- Do not commit `node_modules/`, `.next/`, `.env` files
- Keep commits atomic — one logical change per commit

---

## Do Not

- Add new dependencies without explicit approval
- Use emoji or icon libraries anywhere in the UI
- Create wrapper components for single-use cases
- Add comments for self-explanatory code
- Use `console.log` in production code (except API route handlers)
- Use CSS modules or styled-components — Tailwind only
- Add `rounded-*` classes — the design uses sharp corners everywhere
- Use synchronous `setState` inside `useEffect`
- Create new CSS keyframes without checking if one already exists in `globals.css`
- Add loading states or skeletons for static content
