import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-retro-brown/20 bg-retro-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-retro-brown">
            &copy; 2026 KHOA.DEV — Built with Next.js + Tailwind
          </p>
          <div className="flex items-center gap-4">
            {profile.socials.map((social) => (
              <a key={social.platform} href={social.url} target={social.platform !== "email" ? "_blank" : undefined} rel="noopener noreferrer" className="font-mono text-xs text-retro-muted hover:text-retro-amber transition-colors">
                {{ github: "GH", linkedin: "LI", email: "EM", facebook: "FB" }[social.platform]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
