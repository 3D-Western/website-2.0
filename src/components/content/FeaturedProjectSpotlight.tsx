"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Project } from "@/types/content";

type FeaturedProjectSpotlightProps = {
  project: Project;
};

export function FeaturedProjectSpotlight({
  project,
}: FeaturedProjectSpotlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-w-0"
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View featured project: ${project.title}`}
        className="group grid md:grid-cols-2 overflow-hidden rounded-2xl border-2 border-purple-light/40 bg-gradient-to-br from-black-bg to-purple-dark/10 text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
      >
        <div className="relative h-56 md:h-full min-h-70 overflow-hidden">
          <Image
            src={project.image.url}
            alt={project.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-4 p-6 sm:p-8">
          <h2 className="text-3xl! leading-tight wrap-break-word md:text-4xl!">
            {project.title}
          </h2>
          <p className="text-sm text-secondary-text line-clamp-2">
            {(project.contributors ?? [project.creator]).join(", ")}
          </p>
          <p className="min-h-[4.875em] text-pretty text-secondary-text leading-relaxed line-clamp-3">
            {project.description}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-purple-light group-hover:gap-2 transition-[gap]">
            View project{" "}
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
