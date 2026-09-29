"use client";
import { useRef } from "react";
import { koulen } from "@/lib/fonts";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProjectCard from "../content/ProjectCard";
import { projects } from "@/components/data/projects";

const ProjectsSection = () => {
  const plugin = useRef(
    AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <div className="flex flex-col py-16 px-4 sm:px-6 lg:px-8">
      <h2 className={`text-4xl font-bold mb-10 ${koulen.className}`}>
        Projects Showcase
      </h2>
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
