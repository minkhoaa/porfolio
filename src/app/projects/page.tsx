import { Metadata } from "next";
import QuestLog from "@/components/QuestLog";

export const metadata: Metadata = {
  title: "Quest Log — KHOA.DEV",
  description: "All quests by Tu Minh Khoa — .NET, TypeScript, Java",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <QuestLog />
    </div>
  );
}
