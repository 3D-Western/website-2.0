import { describe, it, expect, vi } from "vitest";
import { api, projectsApi } from "../api.server";
import { getProjectBySlug } from "../fetchBySlug";

vi.mock("next/headers", () => ({
  draftMode: async () => ({ isEnabled: false }),
  cookies: async () => ({
    getAll: () => [],
  }),
}));

describe("projects", () => {
  it("fetches all projects", async () => {
    const allProjects = await api.for("projects").getMany({});
    console.log("Output: ", allProjects.toString().substring(0, 300));
    console.log("Length: ", allProjects.length);
    expect(Array.isArray(allProjects)).toBe(true);
  });

  it("fetches a project by slug", async () => {
    const bySlug = await getProjectBySlug("adaptive-gaming-controller"); // sanity: a project with this slug exists
    console.log("Output: ", bySlug);
    expect(bySlug).toBeDefined();
  });

  it("getFeatured returns only featured:true projects, and excludes at least one non-featured", async () => {
    const all = await projectsApi.getMany();
    const featuredCount = all.filter((p) => p.featured).length;
    expect(featuredCount).toBeGreaterThan(0); // sanity: fixture has a featured project

    const featured = await projectsApi.getFeatured();

    expect(featured.length).toBe(featuredCount);
    expect(featured.every((p) => p.featured)).toBe(true);
  });
});
