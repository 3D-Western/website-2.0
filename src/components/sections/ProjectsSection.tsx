"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { koulen } from "@/lib/fonts";
import { ArrowRight } from "lucide-react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProjectCard from "../content/ProjectCard";
import { apiClient } from "@/lib/cms/api.client";
import { Project } from "@/types/content";

const ProjectsSection = () => {
  let projects: Project[] = [];
  useEffect(() => {
    const fetchProjects = async () => {
      projects = await apiClient.for("projects").getMany({ limit: 10 });
    };
    fetchProjects;
  });

  const plugin = useRef(
    AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <div className="flex flex-col py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-10">
        <h2 className={`text-4xl font-bold ${koulen.className}`}>
          Projects Showcase
        </h2>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:gap-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded"
        >
          View all projects{" "}
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
      <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
        <CarouselContent className="-ml-4 min-h-70">
          {projects.map((project) => (
            <CarouselItem
              className="w-auto pl-4 h-64 basis-auto"
              key={project.id}
            >
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProjectsSection;
