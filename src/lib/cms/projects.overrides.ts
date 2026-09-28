import { ResolvedProject, transformProjects } from "./transform";

export type ProjectsFetcher = (
  slug: string,
  qs: string,
) => Promise<{ docs: ResolvedProject[] }>;

export const makeProjectsOverrides = (fetch: ProjectsFetcher) => ({
  getFeatured: async (options?: { limit?: number }) => {
    const params = new URLSearchParams();
    params.set("where[featured][equals]", "true");
    if (options?.limit) params.set("limit", String(options.limit));
    const result = await fetch("projects", params.toString());
    return transformProjects(result.docs);
  },
});
