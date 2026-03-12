"use client";

type SpriteConfig = {
  shadow: string;
  animation: string;
  bottom: string;
};

// 3px scale pixel art characters
const SPRITES: Record<string, SpriteConfig> = {
  warrior: {
    shadow: `
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
    animation: "sprite-walk-right 45s linear infinite",
    bottom: "40px",
  },
  mage: {
    shadow: `
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
    animation: "sprite-walk-left 55s linear infinite",
    bottom: "40px",
  },
  archer: {
    shadow: `
      /* hood */
      3px 0 0 #4c4472, 6px 0 0 #4c4472, 9px 0 0 #4c4472,
      0px 3px 0 #4c4472, 3px 3px 0 #4c4472, 6px 3px 0 #4c4472, 9px 3px 0 #4c4472, 12px 3px 0 #4c4472,
      /* face */
      3px 6px 0 #e2e8f0, 6px 6px 0 #e2e8f0, 9px 6px 0 #e2e8f0,
      3px 9px 0 #e2e8f0, 6px 9px 0 #4c4472, 9px 9px 0 #e2e8f0,
      /* tunic */
      3px 12px 0 #4c4472, 6px 12px 0 #4c4472, 9px 12px 0 #4c4472,
      3px 15px 0 #4c4472, 6px 15px 0 #8b5cf6, 9px 15px 0 #4c4472,
      /* bow */
      15px 9px 0 #a78bfa, 15px 12px 0 #a78bfa, 15px 15px 0 #a78bfa,
      18px 6px 0 #4c4472, 18px 9px 0 #4c4472, 18px 18px 0 #4c4472, 18px 21px 0 #4c4472,
      /* belt */
      3px 18px 0 #a78bfa, 6px 18px 0 #a78bfa, 9px 18px 0 #a78bfa,
      /* legs */
      3px 21px 0 #4c4472, 9px 21px 0 #4c4472,
      3px 24px 0 #4c4472, 9px 24px 0 #4c4472
    `,
    animation: "sprite-walk-right 38s linear infinite",
    bottom: "40px",
  },
  rogue: {
    shadow: `
      /* mask/head */
      3px 0 0 #4c4472, 6px 0 0 #4c4472, 9px 0 0 #4c4472,
      3px 3px 0 #4c4472, 6px 3px 0 #4c4472, 9px 3px 0 #4c4472,
      /* face (half masked) */
      3px 6px 0 #4c4472, 6px 6px 0 #e2e8f0, 9px 6px 0 #e2e8f0,
      3px 9px 0 #4c4472, 6px 9px 0 #4c4472, 9px 9px 0 #e2e8f0,
      /* body - dark cloak */
      3px 12px 0 #4c4472, 6px 12px 0 #4c4472, 9px 12px 0 #4c4472,
      0px 15px 0 #4c4472, 3px 15px 0 #4c4472, 6px 15px 0 #4c4472, 9px 15px 0 #4c4472, 12px 15px 0 #4c4472,
      3px 18px 0 #4c4472, 6px 18px 0 #4c4472, 9px 18px 0 #4c4472,
      /* daggers */
      -3px 12px 0 #a78bfa, -3px 15px 0 #a78bfa, 15px 12px 0 #a78bfa, 15px 15px 0 #a78bfa,
      /* legs */
      3px 21px 0 #4c4472, 9px 21px 0 #4c4472,
      3px 24px 0 #4c4472, 9px 24px 0 #4c4472
    `,
    animation: "sprite-walk-left 42s linear infinite",
    bottom: "40px",
  },
  knight: {
    shadow: `
      /* helmet */
      3px 0 0 #a78bfa, 6px 0 0 #a78bfa, 9px 0 0 #a78bfa,
      0px 3px 0 #a78bfa, 3px 3px 0 #a78bfa, 6px 3px 0 #a78bfa, 9px 3px 0 #a78bfa, 12px 3px 0 #a78bfa,
      /* visor */
      3px 6px 0 #a78bfa, 6px 6px 0 #4c4472, 9px 6px 0 #4c4472,
      3px 9px 0 #a78bfa, 6px 9px 0 #a78bfa, 9px 9px 0 #a78bfa,
      /* armor */
      3px 12px 0 #a78bfa, 6px 12px 0 #8b5cf6, 9px 12px 0 #a78bfa,
      0px 15px 0 #a78bfa, 3px 15px 0 #a78bfa, 6px 15px 0 #a78bfa, 9px 15px 0 #a78bfa, 12px 15px 0 #a78bfa,
      3px 18px 0 #8b5cf6, 6px 18px 0 #a78bfa, 9px 18px 0 #8b5cf6,
      /* sword */
      15px 6px 0 #e2e8f0, 15px 9px 0 #e2e8f0, 15px 12px 0 #e2e8f0, 15px 15px 0 #a78bfa,
      /* shield */
      -3px 12px 0 #8b5cf6, -3px 15px 0 #8b5cf6, -6px 12px 0 #a78bfa, -6px 15px 0 #a78bfa,
      /* legs */
      3px 21px 0 #a78bfa, 9px 21px 0 #a78bfa,
      3px 24px 0 #a78bfa, 9px 24px 0 #a78bfa
    `,
    animation: "sprite-walk-right 50s linear infinite",
    bottom: "40px",
  },
  healer: {
    shadow: `
      /* hood */
      3px 0 0 #e2e8f0, 6px 0 0 #e2e8f0, 9px 0 0 #e2e8f0,
      0px 3px 0 #e2e8f0, 3px 3px 0 #e2e8f0, 6px 3px 0 #e2e8f0, 9px 3px 0 #e2e8f0, 12px 3px 0 #e2e8f0,
      /* face */
      3px 6px 0 #e2e8f0, 6px 6px 0 #e2e8f0, 9px 6px 0 #e2e8f0,
      3px 9px 0 #e2e8f0, 6px 9px 0 #4c4472, 9px 9px 0 #e2e8f0,
      /* robe - white with cross */
      3px 12px 0 #e2e8f0, 6px 12px 0 #a78bfa, 9px 12px 0 #e2e8f0,
      0px 15px 0 #e2e8f0, 3px 15px 0 #a78bfa, 6px 15px 0 #a78bfa, 9px 15px 0 #a78bfa, 12px 15px 0 #e2e8f0,
      3px 18px 0 #e2e8f0, 6px 18px 0 #a78bfa, 9px 18px 0 #e2e8f0,
      3px 21px 0 #e2e8f0, 6px 21px 0 #e2e8f0, 9px 21px 0 #e2e8f0,
      /* staff with orb */
      15px 0 0 #a78bfa, 15px 3px 0 #8b5cf6,
      15px 6px 0 #4c4472, 15px 9px 0 #4c4472, 15px 12px 0 #4c4472, 15px 15px 0 #4c4472,
      /* legs */
      3px 24px 0 #4c4472, 9px 24px 0 #4c4472
    `,
    animation: "sprite-walk-left 48s linear infinite",
    bottom: "40px",
  },
};

// Each theme gets 2-3 walking sprites at different vertical positions
const THEME_SPRITES: Record<string, { name: string; bottom: string; delay: number }[]> = {
  overworld: [
    { name: "warrior", bottom: "40px", delay: 0 },
    { name: "mage", bottom: "40px", delay: 8 },
    { name: "archer", bottom: "44px", delay: 20 },
  ],
  dungeon: [
    { name: "knight", bottom: "40px", delay: 0 },
    { name: "rogue", bottom: "40px", delay: 12 },
  ],
  tavern: [
    { name: "healer", bottom: "40px", delay: 0 },
    { name: "warrior", bottom: "40px", delay: 15 },
    { name: "mage", bottom: "44px", delay: 6 },
  ],
  questboard: [
    { name: "archer", bottom: "40px", delay: 0 },
    { name: "knight", bottom: "40px", delay: 10 },
  ],
};

interface PixelSpritesProps {
  theme?: "overworld" | "dungeon" | "tavern" | "questboard";
}

export default function PixelSprites({ theme = "overworld" }: PixelSpritesProps) {
  const sprites = THEME_SPRITES[theme] ?? THEME_SPRITES.overworld;

  return (
    <>
      {sprites.map((s, i) => {
        const config = SPRITES[s.name];
        return (
          <div
            key={`sprite-${i}`}
            className="absolute w-[3px] h-[3px] will-change-transform"
            style={{
              bottom: s.bottom,
              imageRendering: "pixelated",
              boxShadow: config.shadow,
              animation: config.animation,
              animationDelay: `${s.delay}s`,
            }}
          />
        );
      })}
    </>
  );
}
