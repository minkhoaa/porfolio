"use client";

function WarriorSprite() {
  // 12x16 pixel warrior using box-shadow, each pixel is 3px
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
