import { describe, it, expect } from "vitest";
import { getSponsors } from "@/lib/cms/fetch";

describe("sponsors", () => {
  it("fetches all sponsors", async () => {
    const allSponsors = await getSponsors();
    console.log("Output: ", allSponsors.toString().substring(0, 300));
    console.log("Length: ", allSponsors.length);
    expect(Array.isArray(allSponsors)).toBe(true);
  });
});
