"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { ArrowRight } from "lucide-react";
import ProjectCard from "../content/ProjectCard";
import { apiClient } from "@/lib/cms/api.client";
import { Project } from "@/types/content";
import { Button } from "../ui/button";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const projs = await apiClient.for("projects").getMany({ limit: 10 });
      setProjects(projs);
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col py-16">
      <div className="flex items-center justify-between mb-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold">Projects Showcase</h2>
        <Button size="pill" variant="gradient" asChild>
          <Link href="/projects">
            View all projects
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </Button>
      </div>

      {projects.length > 0 ? (
        <div className="relative py-2">
          {/* Edge fades, matching the Sponsors marquee */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-black-bg to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-black-bg to-transparent" />

          <Marquee autoFill direction="left" speed={40} pauseOnHover>
            {projects.map((project) => (
              <div key={project.id} className="mx-2">
                <ProjectCard project={project} />
              </div>
            ))}
          </Marquee>
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8">
          <Button
            className="w-fit m-auto"
            size="pill"
            variant="outlined"
            asChild
          >
            <Link href="/projects">
              No projects found, visit our projects page for more information.
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
