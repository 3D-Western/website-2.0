"use client";

import { koulen } from "@/lib/fonts";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Users, Calendar, Code2, FileText } from "lucide-react";
import type { Project } from "@/types/content";
import { ProjectGallery } from "@/components/content/ProjectGallery";
import ProjectShowcaseCard from "@/components/content/ProjectShowcaseCard";

type ProjectDetailPageProps = {
  project: Project | null;
  allProjects: Project[];
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.categories.map((category) => (
              <span
                key={category.name}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 uppercase tracking-wide"
              >
                {category.name}
              </span>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight ${koulen.className}`}
          >
            {project.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium text-foreground">
                {contributors.join(", ")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={project.dateAdded}>
                {formatDate(project.dateAdded)}
              </time>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <div className="bg-slate-100">
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
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-10"
          >
            <p className="text-lg text-slate-700 leading-relaxed">
              {project.description}
            </p>

            {(project.github || project.blogUrl) && (
              <div className="flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  >
                    <Code2 className="w-4 h-4" aria-hidden="true" />
                    View on GitHub
                  </a>
                )}
                {project.blogUrl && (
                  <Link
                    href={project.blogUrl}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-purple-50 text-purple-700 text-sm font-semibold hover:bg-purple-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    Read the blog post
                  </Link>
                )}
              </div>
            )}

            <div>
              <h2 className={`text-2xl mb-4 ${koulen.className}`}>Gallery</h2>
              <ProjectGallery images={gallery} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`text-2xl mb-8 ${koulen.className}`}>
              More Projects
            </h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {related.map((p) => (
                <ProjectShowcaseCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

