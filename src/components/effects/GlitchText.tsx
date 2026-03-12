"use client";

import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
}

export default function GlitchText({ text, className = "", as: Tag = "span" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tag
      className={`${className} ${isGlitching ? "animate-[glitch_0.3s_ease-in-out]" : ""}`}
      style={{ textShadow: "2px 2px var(--color-retro-brown), -1px -1px var(--color-retro-orange)" }}
    >
      {text}
    </Tag>
  );
}
