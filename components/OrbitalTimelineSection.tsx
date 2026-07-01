"use client";

import { Calendar, Code, FileText, User, Clock } from "lucide-react";
import RadialOrbitalTimeline, { TimelineItem } from "@/components/ui/radial-orbital-timeline";

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI/UX design and system architecture.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 60,
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    icon: User,
    relatedIds: [3, 5],
    status: "pending",
    energy: 30,
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    icon: Clock,
    relatedIds: [4],
    status: "pending",
    energy: 10,
  },
];

export default function OrbitalTimelineSection() {
  return (
    <section id="timeline" className="relative w-full min-h-screen py-24 bg-[var(--color-primary)] overflow-hidden border-y border-[var(--color-border)]">
      
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-secondary-glow)] blur-[150px] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-12">
        <div className="text-center mb-4">
          <span className="text-[var(--color-secondary)] font-mono text-sm tracking-widest uppercase mb-4 block">
            Roadmap
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-display)] text-white mb-6">
            Orbital Execution
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Interact with our execution nodes to track Sciparser's progress. Click any node to expand its status and energy footprint.
          </p>
        </div>
      </div>

      <div className="h-[600px] w-full relative z-10">
        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </section>
  );
}
