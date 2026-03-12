import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-pixel text-7xl font-bold text-retro-amber/20 mb-4">404</p>
        <h1 className="font-pixel text-3xl font-bold text-retro-amber">QUEST NOT FOUND</h1>
        <p className="font-mono text-sm text-retro-brown mt-4">THE PATH YOU SEEK DOES NOT EXIST.</p>
        <Link href="/" className="inline-block mt-10 border-2 border-retro-amber px-8 py-3.5 font-pixel text-sm font-semibold text-retro-amber bg-retro-amber/5 hover:bg-retro-amber/15 transition-all duration-300 hover:shadow-[0_0_25px_rgba(167,139,250,0.15)]">
          RETURN TO BASE
        </Link>
      </div>
    </div>
  );
}
