import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage";
import { getProjectBySlug } from "@/lib/cms/fetchBySlug";
import { api } from "@/lib/cms/api.server";

type Props = {
  params: Promise<{ project_template: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project_template } = await params;
  const project = await getProjectBySlug(project_template);

  if (!project) {
    return { title: "Project Not Found | 3D Western" };
  }

  return {
    title: `${project.title} | 3D Western Projects`,
    description: project.description,
  };
}

export default async function Page({ params }: Props) {
  const { project_template } = await params;
  const project = await getProjectBySlug(project_template);
  const allProjects = await api.for("projects").getMany();

  if (!project) notFound();

  return <ProjectDetailPage project={project} allProjects={allProjects} />;
}
