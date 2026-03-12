import { SocialLink } from "@/data/profile";

interface SocialLinksProps {
  links: SocialLink[];
}

export default function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target={link.platform !== "email" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="border border-retro-brown/20 bg-retro-card/20 p-3 hover:border-retro-amber/40 hover:translate-x-1 transition-all group"
        >
          <p className="font-pixel text-[10px] text-retro-tan group-hover:text-retro-amber transition-colors">
            {link.platform.toUpperCase()}
          </p>
          <p className="font-mono text-xs text-retro-brown mt-1">
            {link.label}
          </p>
        </a>
      ))}
    </div>
  );
}
