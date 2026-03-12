export interface SocialLink {
  platform: "github" | "linkedin" | "email" | "facebook";
  url: string;
  label: string;
}

export interface ExperienceEntry {
  dateRange: string;
  title: string;
  description: string;
  current: boolean;
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  location: string;
  available: boolean;
  avatar?: string;
  socials: SocialLink[];
  experience: ExperienceEntry[];
  skills: {
    category: string;
    items: string[];
  }[];
}

export const profile: Profile = {
  name: "TU MINH KHOA",
  role: ".NET Backend Developer",
  bio: "Passionate about building scalable backend systems and microservices. Experienced with .NET, TypeScript, and modern web technologies.",
  location: "Ho Chi Minh City, Vietnam",
  available: true,
  socials: [
    { platform: "github", url: "https://github.com/minkhoaa", label: "github.com/minkhoaa" },
    { platform: "linkedin", url: "#", label: "LinkedIn" },
    { platform: "email", url: "mailto:placeholder@email.com", label: "placeholder@email.com" },
    { platform: "facebook", url: "#", label: "Facebook" },
  ],
  experience: [
    { dateRange: "2023 — Present", title: "Backend Developer", description: "Building scalable .NET backend systems and microservices architecture.", current: true },
    { dateRange: "2023", title: "Started Coding", description: "Began programming journey with C# and .NET framework.", current: false },
  ],
  skills: [
    { category: "BACKEND", items: ["C#", ".NET", "ASP.NET", "SQL Server", "Docker"] },
    { category: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
    { category: "TOOLS", items: ["Git", "Docker", "Linux", "RabbitMQ", "Redis"] },
    { category: "OTHER", items: ["Java", "WPF", "Microservices"] },
  ],
};
