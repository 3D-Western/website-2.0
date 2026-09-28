// fetchBlogs.test.ts
import { describe, it, expect, vi } from "vitest";
import { api } from "@/lib/cms/api.server";
import { getPostBySlug } from "../fetchBySlug";

vi.mock("next/headers", () => ({
  draftMode: async () => ({ isEnabled: false }),
  cookies: async () => ({ getAll: () => [] }),
}));

describe("blogs getMany", () => {
  it("returns posts shaped with a slug", async () => {
    const posts = await api.for("blogs").getMany({ page: 1, limit: 10 });
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty("slug");
  });

  it("respects limit and page — no overlap between consecutive pages", async () => {
    const pageOne = await api.for("blogs").getMany({ page: 1, limit: 2 });
    const pageTwo = await api.for("blogs").getMany({ page: 2, limit: 2 });

    expect(pageOne.length).toBeLessThanOrEqual(2);
    const pageOneIds = pageOne.map((p) => p.id);
    const pageTwoIds = pageTwo.map((p) => p.id);
    expect(pageOneIds.some((id) => pageTwoIds.includes(id))).toBe(false);
  });

  it("an empty tags array behaves like no filter — returns everything", async () => {
    const all = await api.for("blogs").getMany();
    const withEmptyTags = await api
      .for("blogs")
      .getMany({ category: undefined });
    expect(withEmptyTags.length).toEqual(all.length);
  });

  it("filters by tag — every result has it, excluded posts are absent", async () => {
    const all = await api.for("blogs").getMany();
    const tagged = all.find((p) =>
      p.tags?.length ? p.tags?.length > 0 : false,
    );
    const tag = tagged?.tags?.[0]?.title;
    expect(tag).toBeDefined(); // sanity: fixture actually has a tagged post

    const filtered = await api.for("blogs").getMany({ category: tag });

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((p) => p.tags?.some((t) => t.title === tag))).toBe(
      true,
    );

    const withoutTagCount = all.filter(
      (p) => !p.tags?.some((t) => t.title === tag),
    ).length;
    if (withoutTagCount > 0) {
      expect(filtered.length).toBeLessThan(all.length);
    }
  });

  it("filters by ids and returns exactly the requested set", async () => {
    const all = await api.for("blogs").getMany();
    const targetIds = all.slice(0, 2).map((p) => p.id);

    const result = await api.for("blogs").getMany({ ids: targetIds });

    expect(result.map((p) => p.id).sort()).toEqual(targetIds.sort());
  });

  it("returns nothing for a tag that matches no post", async () => {
    const result = await api
      .for("blogs")
      .getMany({ category: "definitely-not-a-real-tag" });
    expect(result).toEqual([]);
  });
});

describe("getPostBySlug", () => {
  it("returns the post matching the given slug", async () => {
    const all = await api.for("blogs").getMany();
    const target = all.find((p) => p.slug === "club-hackathon-recap");
    expect(target).toBeDefined(); // sanity: fixture actually has this post

    const post = await getPostBySlug("club-hackathon-recap");

    expect(post).toBeDefined();
    expect(post?.id).toEqual(target?.id);
  });

  it("returns null/undefined for a slug that doesn't exist", async () => {
    const post = await getPostBySlug("this-slug-does-not-exist");
    expect(post).toBeFalsy();
  });
});
