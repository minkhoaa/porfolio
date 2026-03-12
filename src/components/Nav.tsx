"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/contact", label: "CONTACT" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-retro-brown/20 bg-retro-dark/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-retro-amber flex items-center justify-center">
              <span className="font-pixel text-[10px] text-retro-dark">K</span>
            </div>
            <span className="font-pixel text-[9px] text-retro-amber group-hover:text-retro-orange transition-colors">
              KHOA.DEV
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-mono text-xs transition-colors ${
                    isActive
                      ? "text-retro-amber border-b-2 border-retro-amber pb-0.5"
                      : "text-retro-muted hover:text-retro-amber"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="https://github.com/minkhoaa" target="_blank" rel="noopener noreferrer" className="text-retro-muted hover:text-retro-amber text-xs font-mono transition-colors">GH</a>
            <a href="#" className="text-retro-muted hover:text-retro-amber text-xs font-mono transition-colors">LI</a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-retro-amber font-pixel text-xs p-2" aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? "✕" : "≡"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-retro-brown/20 bg-retro-dark/98">
          <div className="px-4 py-3 flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={`font-mono text-sm py-1 ${isActive ? "text-retro-amber" : "text-retro-muted"}`}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
