export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

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
  difficulty: DifficultyLevel;
}

export const projects: Project[] = [
  {
    slug: "langfens-microservice",
    name: "Langfens — IELTS Preparation Platform",
    shortName: "LANGFENS",
    description: "IELTS prep platform with AI grading and 12+ microservices",
    overview: "A comprehensive IELTS preparation platform with instant AI evaluation for Writing and Speaking. Built as 12+ microservices with .NET 8/9, featuring a YARP API Gateway, event-driven architecture via RabbitMQ, and full-text dictionary search with Elasticsearch. Includes a GPT-4o powered grading engine that scores writing in under 30 seconds, a Whisper-based speech-to-text pipeline for speaking evaluation, a spaced repetition vocabulary system (SM2 algorithm), and gamification with XP, streaks, and leaderboards. The platform also runs a local LLM chatbot (Qwen 2.5 via Ollama) for 24/7 student support.",
    tech: [".NET 8/9", "C#", "PostgreSQL", "Redis", "RabbitMQ", "Elasticsearch", "Docker", "OpenAI GPT-4o", "Whisper"],
    language: "csharp",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/Project_Langfens_Microservice",
    featured: true,
    order: 1,
    difficulty: 5,
  },
  {
    slug: "peerzee",
    name: "PeerZee — Social Discovery Platform",
    shortName: "PEERZEE",
    description: "Social discovery platform with AI matchmaking and real-time chat",
    overview: "A full-stack social discovery platform combining AI-powered matchmaking, real-time messaging, video dating, and community features. The backend (NestJS 11) uses vector similarity search via pgvector and Google Gemini embeddings to rank user compatibility, while Socket.IO powers real-time chat with typing indicators, read receipts, and voice message transcription via a Whisper.cpp sidecar with CUDA GPU support. Features include a Tinder-style swipe deck with Redis-backed match state, WebRTC video dating rooms with AI-generated conversation topics and live translation, a Wingman AI agent that suggests ice-breakers and reviews bios, a community feed with threaded comments, Spotify music taste sync, and a full gamification engine with quests and achievements.",
    tech: ["Next.js 16", "NestJS 11", "TypeScript", "PostgreSQL", "pgvector", "Redis", "Socket.IO", "WebRTC", "Google Gemini", "Whisper.cpp", "Docker", "Nginx"],
    language: "typescript",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/peerzee-fullstack",
    featured: true,
    order: 2,
    difficulty: 4,
  },
  {
    slug: "clinic-api",
    name: "Clinic Management API",
    shortName: "CLINIC API",
    description: "Healthcare management API with VNPAY payment integration",
    overview: "A production-ready healthcare management API built with .NET 8 and domain-driven architecture. Covers the full clinic workflow: patient registration, appointment scheduling with conflict resolution, clinical documentation with specialized dental tooth records and odontograms, integrated billing with VNPAY payment gateway (credit cards, QR codes, mobile banking), and pharmacy inventory management with low-stock alerts. Features role-based access control (Admin/Doctor/Receptionist/Patient), full audit trails for regulatory compliance, and a modular monolith design that can scale to microservices when needed.",
    tech: [".NET 8", "C#", "PostgreSQL", "Entity Framework", "Docker", "JWT", "VNPAY"],
    language: "csharp",
    role: "Backend Developer",
    github: "https://github.com/minkhoaa/Clinic_Management_API",
    order: 3,
    featured: false,
    difficulty: 3,
  },
  {
    slug: "foodify",
    name: "Foodify — Social Media Backend",
    shortName: "FOODIFY",
    description: "Food-focused social media API with recipe sharing and notifications",
    overview: "A RESTful backend API for a food-focused social media platform built with ASP.NET Core 8. Users can share recipes with ingredient lists and calorie tracking, follow other cooks, like/comment/share/save/report posts, and receive real-time notifications for social interactions. Features JWT authentication with OTP-based email verification, cloud image storage via Cloudinary, Redis distributed caching for performance, an ingredient library with admin controls, and a full social graph with follow/unfollow and user feeds. Deployed on Azure App Service with GitHub Actions CI/CD.",
    tech: [".NET 8", "C#", "PostgreSQL", "Redis", "Cloudinary", "Docker", "Azure"],
    language: "csharp",
    role: "Backend Developer",
    github: "https://github.com/minkhoaa/Foodify-Social-Media-Backend",
    order: 4,
    featured: false,
    difficulty: 3,
  },
  {
    slug: "english-app",
    name: "EnglishApp — Learning Platform Backend",
    shortName: "ENGLISH APP",
    description: "English learning API with AI writing evaluation and IELTS mock exams",
    overview: "A RESTful API backend for an English learning platform built with ASP.NET Core 8. Provides structured lesson content with a hierarchical curriculum model (Categories → Lessons → Contents), vocabulary flashcard decks, multiple-choice exercises with automatic grading, and full IELTS-style mock exams with scored results. Features AI-powered IELTS Writing Task 2 evaluation via OpenRouter (DeepSeek model) that scores against the four official IELTS criteria. Authentication supports JWT Bearer tokens, Google and Facebook OAuth 2.0, and OTP-based email verification. Media uploads are handled through Cloudinary.",
    tech: [".NET 8", "C#", "PostgreSQL", "OpenRouter AI", "Cloudinary", "Docker", "OAuth 2.0"],
    language: "csharp",
    role: "Backend Developer",
    github: "https://github.com/minkhoaa/EnglishApp-Backend",
    order: 5,
    featured: false,
    difficulty: 2,
  },
  {
    slug: "wpf-clinic",
    name: "QLPhongMachTu — Desktop Clinic Management",
    shortName: "WPF CLINIC",
    description: "Windows desktop app for private clinic operations",
    overview: "A Windows desktop application built with WPF and the MVVM pattern for managing a private medical clinic. Covers the full operational workflow: patient registration, appointment scheduling with confirmation and no-show tracking, medical diagnosis recording with prescribed medicines, medicine inventory management, invoice generation with PDF export (iTextSharp/iText7), and staff management. Features a dashboard with revenue charts (LiveCharts), Material Design UI theming, role-based authentication (admin/staff), and an automated database setup installer.",
    tech: ["C#", "WPF", ".NET Framework", "SQL Server", "Entity Framework 6", "LiveCharts", "iTextSharp"],
    language: "csharp",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/QLPhongMachTu-WPF",
    order: 6,
    featured: false,
    difficulty: 3,
  },
  {
    slug: "library-management",
    name: "SmartLib — Library Management System",
    shortName: "SMARTLIB",
    description: "Full-stack library ERP with .NET 8 API and React 19 frontend",
    overview: "A full-stack library management system combining a .NET 8 Web API backend with a React 19 + TypeScript frontend. Functions as a miniaturized ERP for libraries: smart book cataloging with a 3-level hierarchy (Title → Book → Copy), automated borrowing/returning with real-time validation and auto fine calculation, and business intelligence reports on borrowing trends and category analytics. Features role-based access control (Admin/Librarian/Staff/Reader), JWT + Google OAuth 2.0 authentication, a real-time chat system backed by MongoDB for reader-librarian communication, book reviews and ratings, Cloudinary CDN for media storage, and interactive data visualizations with Recharts.",
    tech: [".NET 8", "C#", "React 19", "TypeScript", "PostgreSQL", "MongoDB", "Cloudinary", "Docker"],
    language: "typescript",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/LibraryManagement",
    order: 7,
    featured: false,
    difficulty: 3,
  },
  {
    slug: "clinic-app",
    name: "ClinicApp — Mobile Patient Portal",
    shortName: "CLINIC APP",
    description: "Cross-platform mobile app for clinic appointment management",
    overview: "A cross-platform mobile application built with Expo SDK 54 and React Native for clinic appointment management. Patients can register, browse available services and time slots, book appointments with real-time status tracking (pending/confirmed/completed/cancelled), access full medical history including diagnoses, prescriptions, and file attachments, and manage their health profile with emergency contacts, insurance, and allergy records. Features JWT-based authentication with secure token storage (Expo SecureStore), post-visit rating and review system, smooth animations with React Native Reanimated 4, and automatic dark/light mode support.",
    tech: ["React Native", "Expo SDK 54", "TypeScript", "Axios", "Reanimated 4"],
    language: "typescript",
    role: "Frontend Developer",
    github: "https://github.com/minkhoaa/ClinicApp",
    order: 8,
    featured: false,
    difficulty: 2,
  },
  {
    slug: "hr-management",
    name: "HR Management System",
    shortName: "HR MGMT",
    description: "Employee lifecycle management API with payroll and recruitment",
    overview: "A RESTful backend API built with Java 17 and Spring Boot 3.4 for managing the full employee lifecycle. Covers recruitment (job postings, candidate tracking, one-click acceptance), onboarding with labor contracts, daily attendance clock-in/clock-out, automatic monthly payroll calculation based on attendance and salary grades, insurance policy management, and performance evaluations. Features a resignation workflow with manager approval, Google OAuth 2.0 social login, JWT authentication with Spring Security, profile image uploads via Cloudinary, and full OpenAPI documentation. Containerized with Docker using a multi-stage build on Alpine JRE.",
    tech: ["Java 17", "Spring Boot 3.4", "PostgreSQL", "Spring Security", "JWT", "OAuth 2.0", "Cloudinary", "Docker"],
    language: "java",
    role: "Full-stack Developer",
    github: "https://github.com/minkhoaa/HR-Management",
    order: 9,
    featured: false,
    difficulty: 4,
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
