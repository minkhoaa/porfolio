import { Metadata } from "next";
import QuestLog from "@/components/QuestLog";
import PageBackground from "@/components/effects/PageBackground";
import FloatingItems from "@/components/effects/FloatingItems";
import GlassCard from "@/components/effects/GlassCard";

export const metadata: Metadata = {
  title: "Quest Log — KHOA.DEV",
  description: "All quests by Tu Minh Khoa — .NET, TypeScript, Java",
};

export default function ProjectsPage() {
  return (
    <div className="relative">
      <PageBackground theme="dungeon" />
      <FloatingItems theme="dungeon" />
      <GlassCard className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <QuestLog />
      </GlassCard>
    </div>
  );
}
