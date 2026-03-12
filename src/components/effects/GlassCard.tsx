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
