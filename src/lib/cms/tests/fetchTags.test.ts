import { describe, it, expect } from "vitest";
import { getTags, getTagsByIds } from "../fetchTags";
import { sampleTags } from "@/cms/static-data/tags";

describe("getTags", () => {
  it("Gets all available tags", async () => {
    const tags = await getTags();

    expect(tags.length).toEqual(sampleTags.length);
  });
});

describe("getTagsByIds", () => {
  it("Returns tags which match the ids of the given array", async () => {
    const tags = await getTagsByIds([3, 4, 5, 6]);

    expect(tags.length).toEqual(3);
    expect(tags[0]).toEqual({
      id: 3,
      title: "Design",
      description: "UI/UX design and accessibility",
    });
  });
});
