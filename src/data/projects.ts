export interface Project {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  overview: string;
  tech: string[];
  language: "csharp" | "typescript" | "java";
  role: string;
  github: string;
  live?: string;
  screenshot?: string;
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    slug: "langfens-microservice",
    name: "Project Langfens Microservice",
    shortName: "LANGFENS MICRO",
    description: "Microservices architecture project with .NET",
    overview: "A microservices-based system built with .NET, demonstrating service decomposition, inter-service communication, and containerized deployment. Implements patterns like API Gateway, service discovery, and event-driven architecture.",
    tech: [".NET", "C#", "Docker", "RabbitMQ", "SQL Server"],
    language: "csharp",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/Project_Langfens_Microservice",
    featured: true,
    order: 1,
  },
  {
    slug: "peerzee",
    name: "Peerzee Fullstack",
    shortName: "PEERZEE",
    description: "Full-stack TypeScript application",
    overview: "A full-stack TypeScript application built with modern web technologies. Features server-side rendering, type-safe API layer, and responsive design.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    language: "typescript",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/peerzee-fullstack",
    featured: true,
    order: 2,
  },
  {
    slug: "clinic-api",
    name: "Clinic Management API",
    shortName: "CLINIC API",
    description: "RESTful API for clinic management system",
    overview: "A comprehensive clinic management API built with ASP.NET Core. Handles patient records, appointments, prescriptions, and billing with role-based access control.",
    tech: [".NET", "C#", "SQL Server", "Entity Framework"],
    language: "csharp",
    role: "Backend Developer",
    github: "https://github.com/minkhoaa/Clinic_Management_API",
    order: 3,
    featured: false,
  },
  {
    slug: "foodify",
    name: "Foodify Social Media Backend",
    shortName: "FOODIFY",
    description: "Backend for a food-themed social media platform",
    overview: "Social media backend focused on food sharing. Features user authentication, post CRUD, image handling, likes/comments, and feed algorithms.",
    tech: [".NET", "C#", "SQL Server", "REST API"],
    language: "csharp",
    role: "Backend Developer",
    github: "https://github.com/minkhoaa/Foodify-Social-Media-Backend",
    order: 4,
    featured: false,
  },
  {
    slug: "english-app",
    name: "English App Backend",
    shortName: "ENGLISH APP",
    description: "Backend for an English learning application",
    overview: "An English learning application backend providing vocabulary, grammar exercises, and progress tracking for language learners.",
    tech: [".NET", "C#", "SQL Server"],
    language: "csharp",
    role: "Backend Developer",
    github: "https://github.com/minkhoaa/EnglishApp-Backend",
    order: 5,
    featured: false,
  },
  {
    slug: "wpf-clinic",
    name: "QLPhongMachTu WPF",
    shortName: "WPF CLINIC",
    description: "Desktop clinic management application",
    overview: "A Windows desktop application built with WPF for clinic management. Features patient registration, appointment scheduling, and prescription management with a rich UI.",
    tech: ["C#", "WPF", ".NET", "SQL Server"],
    language: "csharp",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/QLPhongMachTu-WPF",
    order: 6,
    featured: false,
  },
  {
    slug: "library-management",
    name: "Library Management",
    shortName: "LIBRARY MGMT",
    description: "Library management system",
    overview: "A TypeScript-based library management system handling book cataloging, member management, borrowing/returning workflows, and overdue tracking.",
    tech: ["TypeScript", "React", "Node.js"],
    language: "typescript",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/LibraryManagement",
    order: 7,
    featured: false,
  },
  {
    slug: "clinic-app",
    name: "Clinic App Frontend",
    shortName: "CLINIC APP",
    description: "Frontend for clinic management system",
    overview: "A TypeScript frontend application companion to the Clinic Management API. Provides a responsive interface for managing clinic operations.",
    tech: ["TypeScript", "React"],
    language: "typescript",
    role: "Frontend Developer",
    github: "https://github.com/minkhoaa/ClinicApp",
    order: 8,
    featured: false,
  },
  {
    slug: "hr-management",
    name: "HR Management",
    shortName: "HR MGMT",
    description: "Human resources management system",
    overview: "A Java-based HR management system for employee records, payroll processing, leave management, and organizational structure.",
    tech: ["Java", "Spring Boot", "MySQL"],
    language: "java",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/HR-Management",
    order: 9,
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getProjectsByLanguage(language: Project["language"] | "all"): Project[] {
  if (language === "all") return [...projects].sort((a, b) => a.order - b.order);
  return projects.filter((p) => p.language === language).sort((a, b) => a.order - b.order);
}
