export interface SocialLink {
  platform: "github" | "linkedin" | "email" | "facebook" | "phone";
  url: string;
  label: string;
}

export interface ExperienceEntry {
  dateRange: string;
  title: string;
  description: string;
  current: boolean;
}

export interface EducationEntry {
  dateRange: string;
  institution: string;
  degree: string;
  gpa?: string;
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
  phone: string;
  available: boolean;
  socials: SocialLink[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: {
    category: string;
    items: string[];
  }[];
  stats: CharacterStat[];
  currentlyExploring: string[];
}

export const profile: Profile = {
  name: "TU MINH KHOA",
  role: "AI Engineer · Backend Developer",
  level: 4,
  bio: "Final-year Software Engineering student (UIT, expected May 2027). I build LLM systems end-to-end: RAG evaluation pipelines with independent LLM judges, LoRA adapters and Wav2Vec2 inference on CPU, agentic pipelines with LangGraph, and constraint optimization with Google OR-Tools.",
  location: "Ho Chi Minh City, Viet Nam",
  phone: "(+84) 378 643 548",
  available: true,
  socials: [
    { platform: "phone", url: "tel:0378643548", label: "(+84) 378 643 548" },
    { platform: "email", url: "mailto:tukhoa040505@gmail.com", label: "tukhoa040505@gmail.com" },
    { platform: "github", url: "https://github.com/minkhoaa", label: "github.com/minkhoaa" },
    { platform: "linkedin", url: "https://linkedin.com/in/min-khoaa", label: "linkedin.com/in/min-khoaa" },
    { platform: "facebook", url: "https://facebook.com/min.khoaaa", label: "facebook.com/min.khoaaa" },
  ],
  experience: [
    {
      dateRange: "Dec 2025 — Sep 2026",
      title: "AI Engineer (Internship → Part-Time) — TISOHA Software Solutions",
      description: "Enterprise Client Project (AI Logistics Dispatch Scheduler): Built pre-training data normalization pipelines structuring ~2GB raw logistics data for LLM fine-tuning. Implemented JSON-schema output validation for Google OR-Tools CP-SAT solver and Redis caching on inference paths to avoid redundant re-inference.",
      current: true,
    },
    {
      dateRange: "Feb 2025 — Present",
      title: "Fullstack & DevOps Intern — Morca Labs",
      description: "Building distributed microservices and managing CI/CD pipelines, Docker containerized deployments, and Linux server infrastructure.",
      current: true,
    },
    {
      dateRange: "Aug 2023",
      title: "Started Coding",
      description: "Began software engineering journey at VNUHCM-UIT focusing on C#, .NET, and distributed systems architecture.",
      current: false,
    },
  ],
  education: [
    {
      dateRange: "Aug 2023 — Expected May 2027",
      institution: "VNUHCM - University of Information Technology",
      degree: "Bachelor of Software Engineering",
      gpa: "3.5 / 4.0",
    },
  ],
  skills: [
    { category: "AI & MACHINE LEARNING", items: ["LLM Fine-tuning (LoRA/PEFT)", "RAG Architectures", "LangGraph", "Prompt Engineering", "Google OR-Tools (CP-SAT)", "faster-whisper", "Wav2Vec2 (PyTorch)"] },
    { category: "VECTOR & DATA SYSTEMS", items: ["Qdrant", "pgvector (HNSW)", "PostgreSQL", "Redis", "Pydantic v2", "Data Normalization"] },
    { category: "BACKEND & INFRASTRUCTURE", items: ["FastAPI", "ASP.NET Core (.NET 10)", "NestJS", "RabbitMQ", "Docker Compose", "Linux"] },
    { category: "LANGUAGES & EVALUATION", items: ["Python", "TypeScript", "C#", "k6", "Jest", "LLM-as-judge evaluation"] },
  ],
  stats: [
    { name: "AI SYSTEMS", value: 92 },
    { name: "BACKEND", value: 90 },
    { name: "VECTOR DB", value: 85 },
    { name: "DEVOPS", value: 70 },
  ],
  currentlyExploring: ["Agentic Workflows (LangGraph)", "Operations Research + LLMs", "LLM-as-Judge Evaluation", "Local Model Serving"],
};
