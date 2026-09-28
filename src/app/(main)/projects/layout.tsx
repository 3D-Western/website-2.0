import { ProjectProvider } from "@/context/ProjectContext";
import { api, projectsApi } from "@/lib/cms/api.server";

const LIMIT = 2;

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialProjects, featuredProjects, allCategories] = await Promise.all([
    api.for("projects").getMany({ limit: LIMIT, page: 1 }),
    projectsApi.getFeatured(),
    api.for("project-categories").getMany(),
  ]);
  return (
    <ProjectProvider
      initialProjects={initialProjects}
      categories={allCategories}
      featured={featuredProjects}
      PAGE_SIZE={LIMIT}
    >
      {children}
    </ProjectProvider>
  );
}
