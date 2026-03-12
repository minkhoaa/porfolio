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
