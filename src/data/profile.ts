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
    { platform: "email", url: "mailto:tukhoa040505@gmail.com", label: "tukhoa040505@gmail.com" },
    { platform: "facebook", url: "https://facebook.com/min.khoaaa", label: "facebook.com/min.khoaaa" },
  ],
  experience: [
    { dateRange: "Mar 2025 — Present", title: "Fullstack Developer (Part-time) — TISOHA Software Solutions", description: "Building and maintaining full-stack web applications with Next.js, TypeScript, and .NET. Responsible for end-to-end feature development, from UI implementation to API design and database integration.", current: true },
    { dateRange: "Feb 2025 — Present", title: "Fullstack Developer & DevOps Intern — Morca Labs", description: "Internship handling full-stack development and DevOps engineering. Building web applications and managing CI/CD pipelines, containerized deployments, and infrastructure.", current: true },
    { dateRange: "Dec 2024 — Feb 2025", title: "Fullstack Developer Intern — TISOHA Software Solutions", description: "Built PeerZee — a full-stack social discovery platform using Next.js, NestJS, PostgreSQL, and Redis. Implemented AI matchmaking with pgvector, real-time chat via Socket.IO, and WebRTC video dating rooms.", current: false },
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
