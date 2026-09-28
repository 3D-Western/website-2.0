"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { koulen } from "@/lib/fonts";
import { Project } from "@/types/content";

type FeaturedProjectSpotlightProps = {
  project: Project;
  index: number;
};

export function FeaturedProjectSpotlight({
  project,
  index,
}: FeaturedProjectSpotlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View featured project: ${project.title}`}
        className="group grid md:grid-cols-2 bg-purple-950 text-white rounded-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
      >
        <div className="relative h-64 md:h-full min-h-[280px] overflow-hidden">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-8 flex flex-col justify-center gap-4">
          <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold">
            Featured Project
          </span>
          <h2
            className={`text-3xl md:text-4xl leading-tight ${koulen.className}`}
          >
            {project.title}
          </h2>
          <p className="text-sm text-purple-200">
            {(project.contributors ?? [project.creator]).join(", ")}
          </p>
          <p className="text-slate-300 leading-relaxed line-clamp-3">
            {project.description}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
            View project{" "}
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

