import { describe, it, expect } from "vitest";
import { getAuthorsByIds } from "../fetchAuthors";

describe("getAuthorsByIds", () => {
  it("returns authors matching array of ids", async () => {
    const authors = await getAuthorsByIds([1, 2, 3]);
    expect(authors.length).toEqual(3);
    expect(authors[0]).toEqual({
      id: 1,
      name: "Jane Doe",
      avatar: {
        url: "/images/avatar.webp",
        alt: "Jane Doe",
      },
    });
  });
});
