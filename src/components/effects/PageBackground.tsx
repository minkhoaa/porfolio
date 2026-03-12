"use client";

import PixelSprites from "@/components/effects/PixelSprites";

interface PageBackgroundProps {
  theme: "overworld" | "dungeon" | "tavern" | "questboard";
}

function Stars() {
  const positions = [
    { left: "8%", top: "12%" },
    { left: "15%", top: "25%" },
    { left: "25%", top: "8%" },
    { left: "38%", top: "18%" },
    { left: "50%", top: "10%" },
    { left: "62%", top: "22%" },
    { left: "72%", top: "6%" },
    { left: "80%", top: "15%" },
    { left: "88%", top: "28%" },
    { left: "45%", top: "32%" },
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-retro-amber"
          style={{
            left: pos.left,
            top: pos.top,
            animation: `twinkle ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </>
  );
}

function PixelGround() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-10"
      style={{
        background: "repeating-linear-gradient(90deg, #1a1030 0px, #1a1030 8px, #150d28 8px, #150d28 16px)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: "repeating-linear-gradient(90deg, rgba(34,197,94,0.12) 0px, rgba(34,197,94,0.12) 4px, rgba(34,197,94,0.08) 4px, rgba(34,197,94,0.08) 8px)",
        }}
      />
    </div>
  );
}

function Torch({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div
      className={`absolute w-1 h-2 ${className ?? ""}`}
      style={{
        backgroundColor: "#f59e0b",
        animation: "torch-flicker 0.5s ease-in-out infinite alternate",
        animationDelay: delay ? `${delay}s` : undefined,
      }}
    />
  );
}

function Overworld() {
  return (
    <>
      <Stars />
      <PixelGround />
      <PixelSprites />
    </>
  );
}

function Dungeon() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: "#0a0812",
        backgroundImage: "linear-gradient(180deg, #0d0b14, #0a0812), repeating-linear-gradient(0deg, transparent 0px, transparent 30px, rgba(76,68,114,0.08) 30px, rgba(76,68,114,0.08) 31px)",
      }}
    >
      <Torch className="left-8 top-[20%]" />
      <Torch className="right-8 top-[20%]" delay={0.3} />
      {[1, 2].map((i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-retro-amber/25"
          style={{
            left: `${55 + i * 15}%`,
            top: "10%",
            animation: `drip-fall 4s ease-in infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
}

function Tavern() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(180deg, #0d0b14, #12091c)" }}
    >
      <Torch className="left-8 top-[30%]" />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px]"
          style={{
            backgroundColor: "rgba(245,158,11,0.3)",
            left: `${20 + i * 25}%`,
            bottom: "10%",
            animation: `ember-rise ${6 + i * 1}s ease-out infinite`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function QuestBoard() {
  const papers = [
    { right: "5%", top: "15%", w: 20, h: 24, delay: 0 },
    { right: "10%", top: "30%", w: 18, h: 22, delay: 1 },
    { right: "8%", top: "45%", w: 22, h: 20, delay: 0.5 },
  ];

  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(180deg, #0d0b14, #100c1a)" }}
    >
      {papers.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            right: p.right,
            top: p.top,
            width: `${p.w}px`,
            height: `${p.h}px`,
            backgroundColor: "rgba(226,232,240,0.04)",
            border: "1px solid rgba(76,68,114,0.15)",
            animation: `paper-sway 3s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function PageBackground({ theme }: PageBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {theme === "overworld" && <Overworld />}
      {theme === "dungeon" && <Dungeon />}
      {theme === "tavern" && <Tavern />}
      {theme === "questboard" && <QuestBoard />}
    </div>
  );
}
