import { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects — KHOA.DEV",
  description: "All projects by Tu Minh Khoa — .NET, TypeScript, Java",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ProjectsGrid />
    </div>
  );
}
