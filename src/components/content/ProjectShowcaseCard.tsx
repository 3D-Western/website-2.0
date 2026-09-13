"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "../ui/utils";
import { Project } from "@/types/content";
import { formatShortDate } from "@/components/utils";

type ProjectShowcaseCardProps = {
  project: Project;
  className?: string;
};

const ProjectShowcaseCard = ({
  project,
  className,
}: ProjectShowcaseCardProps) => {
  const contributors = project.contributors?.length
    ? project.contributors
    : [project.creator];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="h-full min-w-0"
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View project: ${project.title}`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light rounded-xl"
      >
        <Card
          className={cn(
            "group relative flex h-full flex-col overflow-hidden rounded-xl border-b border-b-grey bg-black-bg shadow-sm hover:shadow-lg transition-shadow duration-300",
            className,
          )}
        >
          <div className="relative aspect-3/2 shrink-0 overflow-hidden">
            <Image
              src={project.image.url}
              alt={project.image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {project.categories.map((category) => (
              <span
                key={category.name}
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full gradient text-xs font-semibold uppercase tracking-wide backdrop-blur-sm"
              >
                {category.name}
              </span>
            ))}
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-3 p-5">
            <h3 className="min-h-[2.5em] text-xl! leading-tight wrap-break-word line-clamp-2">
              {project.title}
            </h3>

            <div className="flex min-w-0 items-center gap-1.5 text-sm text-secondary-text">
              <Users className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{contributors.join(", ")}</span>
            </div>

            <p className="min-h-[4.875em] text-sm text-pretty text-secondary-text leading-relaxed line-clamp-3">
              {project.description}
            </p>

            <time
              dateTime={project.dateAdded}
              className="text-xs text-secondary-text"
            >
              Added {formatShortDate(project.dateAdded)}
            </time>

            <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-purple-light group-hover:gap-2 transition-[gap]">
              Read more{" "}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProjectShowcaseCard;
