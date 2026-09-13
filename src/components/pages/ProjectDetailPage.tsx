"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Users, Calendar, Code2, FileText } from "lucide-react";
import type { Project } from "@/types/content";
import { ProjectGallery } from "@/components/content/ProjectGallery";
import ProjectShowcaseCard from "@/components/content/ProjectShowcaseCard";
import { RelatedItemsSection } from "@/components/content/RelatedItemsSection";
import { formatLongDate } from "../utils";

type ProjectDetailPageProps = {
  project: Project | null;
  allProjects: Project[];
};

export function ProjectDetailPage({
  project,
  allProjects,
}: ProjectDetailPageProps) {
  if (!project) notFound();

  const contributors = project.contributors?.length
    ? project.contributors
    : [project.creator];

  const gallery = project.galleryImages?.length
    ? project.galleryImages
    : [project.image];

  const related = allProjects
    .filter(
      (p) =>
        p.id !== project.id &&
        project.categories?.some((c) =>
          p.categories.some((cat) => cat.name === c.name),
        ),
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-grey-bg py-25 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-purple-light hover:text-purple-light/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.categories.map((category) => (
              <span
                key={category.name}
                className="text-xs font-medium px-2.5 py-1 rounded-full gradient uppercase tracking-wide"
              >
                {category.name}
              </span>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight `}
          >
            {project.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-5 text-sm text-secondary-text">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">
                {contributors.join(", ")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={project.dateAdded}>
                {formatLongDate(project.dateAdded)}
              </time>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <div className="bg-black-bg">
        <div className="relative w-full aspect-21/9 max-h-[400px] overflow-hidden">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Body */}
      <section className="py-16 bg-grey-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-10"
          >
            <p className="text-lg text-secondary-text leading-relaxed">
              {project.description}
            </p>

            {(project.github || project.blogUrl) && (
              <div className="flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg  text-sm font-semibold  transition-colors focus-visible:outline-none btn"
                  >
                    <Code2 className="w-4 h-4" aria-hidden="true" />
                    View on GitHub
                  </a>
                )}
                {project.blogUrl && (
                  <Link
                    href={project.blogUrl}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg  text-sm font-semibold  transition-colors focus-visible:outline-none border border-primary-text/18 hover:bg-purple-light/6 hover:border-purple-light text-primary-text"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    Read the blog post
                  </Link>
                )}
              </div>
            )}

            <div>
              <h2 className={`text-2xl mb-4`}>Gallery</h2>
              <ProjectGallery images={gallery} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <RelatedItemsSection title="More Projects">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProjectShowcaseCard key={p.id} project={p} className="bg-grey-bg" />
            ))}
          </div>
        </RelatedItemsSection>
      )}
    </main>
  );
}
