import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-pixel text-3xl text-retro-amber">ERROR 404</h1>
        <p className="font-mono text-sm text-retro-brown mt-4">Page not found in this directory.</p>
        <Link href="/" className="inline-block mt-8 border-2 border-retro-amber px-6 py-3 font-pixel text-[11px] text-retro-amber hover:bg-retro-amber/10 transition-colors">
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}
