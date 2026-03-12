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

export interface CharacterStat {
  name: string;
  value: number;
}

export interface Profile {
  name: string;
  role: string;
  level: number;
  bio: string;
  location: string;
  available: boolean;
  socials: SocialLink[];
  experience: ExperienceEntry[];
  skills: {
    category: string;
    items: string[];
  }[];
  stats: CharacterStat[];
}

export const profile: Profile = {
  name: "TU MINH KHOA",
  role: ".NET Backend Developer",
  level: 3,
  bio: "Passionate about building scalable backend systems and microservices. Started coding in 2023 with C# and .NET, quickly diving into distributed systems and modern web technologies. Experienced with full-stack development across .NET, TypeScript, and Java ecosystems. Currently focused on microservices architecture, containerization, and cloud-native patterns.",
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
  stats: [
    { name: "BACKEND", value: 90 },
    { name: "FRONTEND", value: 55 },
    { name: "DEVOPS", value: 65 },
    { name: "DATABASE", value: 75 },
  ],
};
