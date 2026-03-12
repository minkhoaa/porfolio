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
  role: "Software Engineering Student · Fullstack Developer",
  level: 3,
  bio: "I build backend systems with a focus on microservices, system architecture, and clean service design. I work primarily with C# and .NET, and occasionally with NestJS and Java.",
  location: "Ho Chi Minh City, Viet Nam",
  available: true,
  socials: [
    { platform: "github", url: "https://github.com/minkhoaa", label: "github.com/minkhoaa" },
    { platform: "linkedin", url: "https://linkedin.com/in/min-khoaa", label: "linkedin.com/in/min-khoaa" },
    { platform: "email", url: "mailto:placeholder@email.com", label: "placeholder@email.com" },
    { platform: "facebook", url: "https://facebook.com/min.khoaaa", label: "facebook.com/min.khoaaa" },
  ],
  experience: [
    { dateRange: "Mar 2025 — Present", title: "Fullstack Developer (Part-time) — TISOHA Software Solutions", description: "Continuing as a part-time fullstack developer, building end-to-end web applications.", current: true },
    { dateRange: "Dec 2024 — Feb 2025", title: "Fullstack Developer Intern — TISOHA Software Solutions", description: "Internship developing full-stack features across frontend and backend systems.", current: false },
    { dateRange: "Aug 2023", title: "Started Coding", description: "Began programming journey with C# and .NET framework.", current: false },
  ],
  skills: [
    { category: "BACKEND", items: ["C#", ".NET", "ASP.NET", "NestJS", "SQL Server"] },
    { category: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
    { category: "TOOLS", items: ["Git", "Docker", "Linux", "RabbitMQ", "SQL Server"] },
    { category: "OTHER", items: ["Java", "Spring Boot", "WPF", "Microservices"] },
  ],
  stats: [
    { name: "BACKEND", value: 90 },
    { name: "FRONTEND", value: 55 },
    { name: "DEVOPS", value: 65 },
    { name: "DATABASE", value: 75 },
  ],
};
