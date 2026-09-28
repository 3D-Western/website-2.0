import { describe, it, expect } from "vitest";
import { api } from "../api.server";

describe("project categories", () => {
  it("fetches all project categories", async () => {
    const allProjectCategories = await api.for("project-categories").getMany();
    console.log("Output: ", allProjectCategories.toString().substring(0, 300));
    console.log("Length: ", allProjectCategories.length);
    expect(Array.isArray(allProjectCategories)).toBe(true);
  });
});
