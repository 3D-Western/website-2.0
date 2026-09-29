import { describe, it, expect } from "vitest";
import { getBlogPosts, getPostBySlug } from "./fetchBlogs";
import { sampleBlogs } from "@/cms/static-data/blogs";
import { vi } from "vitest";

vi.mock("next/headers", () => ({
  draftMode: async () => ({ isEnabled: false }),
}));

describe("getBlogPosts", () => {
  it("returns all blog posts", async () => {
    const posts = await getBlogPosts({
      page: 1,
      limit: 10,
    });
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty("slug");
  });
});

describe("getBlogPosts with empty tags", () => {
  it("Returns all blog posts", async () => {
    const posts = await getBlogPosts({
      page: 1,
      limit: 10,
      tags: [],
    });
    expect(posts.length).toEqual(sampleBlogs.length);
  });
});

describe("getBlogPosts with Community tag", () => {
  it("Returns all blogs with the given tag", async () => {
    const posts = await getBlogPosts({
      page: 1,
      limit: 10,
      tags: ["Community"],
    });
    expect(posts.length).toEqual(1);
    expect(posts[0].tags?.[0]).toHaveProperty("title", "Community");
  });
});

describe("getPostBySlug", () => {
  it("returns post matching slug", async () => {
    const post = await getPostBySlug("club-hackathon-recap");

    expect(post).toBeDefined();

    expect(post).toHaveProperty("id", 5);
  });
});
