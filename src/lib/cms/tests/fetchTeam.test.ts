import { describe, it, expect } from "vitest";
import { getTeamMembers } from "@/lib/cms/fetch";

describe("team members", () => {
  it("fetches all team members", async () => {
    const allTeamMembers = await getTeamMembers();
    console.log("Output: ", allTeamMembers.toString().substring(0, 300));
    console.log("Length: ", allTeamMembers.length);
    expect(Array.isArray(allTeamMembers)).toBe(true);
  });
});
