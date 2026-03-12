import { SocialLink } from "@/data/profile";

const icons: Record<SocialLink["platform"], string> = {
  github: "\uD83D\uDC19",
  linkedin: "\uD83D\uDCBC",
  email: "\uD83D\uDCE7",
  facebook: "\uD83D\uDCD8",
};

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
          className="flex items-center gap-3 border border-retro-brown/20 bg-retro-card/20 p-3 hover:border-retro-amber/40 hover:translate-x-1 transition-all group"
        >
          <span className="text-lg">{icons[link.platform]}</span>
          <div>
            <p className="font-pixel text-[10px] text-retro-tan group-hover:text-retro-amber transition-colors">
              {link.platform.toUpperCase()}
            </p>
            <p className="font-mono text-[10px] text-retro-brown">
              {link.label}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
