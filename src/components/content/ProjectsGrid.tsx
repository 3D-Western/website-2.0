// components/content/ProjectGrid.tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { PackageSearch } from "lucide-react";
import ProjectShowcaseCard from "./ProjectShowcaseCard";
import type { Project } from "@/types/content";

interface ProjectGridProps {
  projects: Project[];
  emptyMessage?: string;
  onClearFilters?: () => void;
}

export function ProjectsGrid({
  projects,
  emptyMessage = "No projects match those filters. Try a different category or search term.",
  onClearFilters,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center text-center py-24 gap-4"
      >
        <PackageSearch
          className="w-10 h-10 text-slate-300"
          aria-hidden="true"
        />
        <p className="text-slate-500 max-w-sm">{emptyMessage}</p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-6 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            Clear filters
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <ProjectShowcaseCard key={project.id} project={project} />
        ))}
      </AnimatePresence>
    </div>
  );
}
