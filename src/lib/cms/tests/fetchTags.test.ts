import { describe, it, expect } from "vitest";
import { api } from "@/lib/cms/api.server";

describe("tags getMany", () => {
  it("ids filter returns exactly the requested tags, no more, no less", async () => {
    const all = await api.for("tags").getMany();
    const sample = all.slice(0, 3).map((t) => t.id);

    const result = await api.for("tags").getMany({ ids: sample });

    expect(result.map((t) => t.id).sort()).toEqual(sample.sort());
  });

  it("returns no tags for ids that don't exist", async () => {
    const result = await api.for("tags").getMany({ ids: [-1] });
    expect(result).toEqual([]);
  });
});
