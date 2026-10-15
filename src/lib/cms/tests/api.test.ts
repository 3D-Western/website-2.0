import { describe, expect, expectTypeOf, it, vi } from "vitest";
import { buildApi } from "../api";

type Document = { id: number; title: string };
const transform = (docs: Document[]) => docs.map((doc) => doc.title);

const basicConfig = { slug: "basic", transform } as const;
const categoryConfig = {
  slug: "categorized",
  transform,
  categoryField: "categories.name",
} as const;
const datedConfig = {
  ...categoryConfig,
  slug: "dated",
  dateField: "schedule.startTime",
} as const;

describe("shared CMS API", () => {
  it("preserves transformed return types and collection-specific capabilities", () => {
    const fetch = async () => ({ docs: [] as Document[] });
    const basic = buildApi(basicConfig, fetch);
    const categorized = buildApi(categoryConfig, fetch);
    const dated = buildApi(datedConfig, fetch);

    expect(Object.keys(categorized)).toEqual(["getMany"]);
    expectTypeOf(basic.getMany).returns.toEqualTypeOf<Promise<string[]>>();
    expectTypeOf<keyof typeof basic>().toEqualTypeOf<"getMany">();
    expectTypeOf<keyof typeof categorized>().toEqualTypeOf<"getMany">();
    expectTypeOf<keyof typeof dated>().toEqualTypeOf<
      "getMany" | "getByDay" | "getByWeek" | "getByMonth"
    >();
    expectTypeOf<NonNullable<Parameters<typeof basic.getMany>[0]>>()
      .toEqualTypeOf<{ limit?: number; page?: number; ids?: number[] }>();
    expectTypeOf<keyof NonNullable<Parameters<typeof categorized.getMany>[0]>>()
      .toEqualTypeOf<"limit" | "page" | "ids" | "category">();
    expectTypeOf<keyof NonNullable<Parameters<typeof dated.getByDay>[1]>>()
      .toEqualTypeOf<"limit" | "page" | "ids" | "category">();
    expectTypeOf(dated.getByMonth).returns.toEqualTypeOf<Promise<string[]>>();
  });

  it("accepts omitted options and transforms fetched records", async () => {
    const fetch = vi.fn(async () => ({ docs: [{ id: 1, title: "Example" }] }));
    const api = buildApi(basicConfig, fetch);

    await expect(api.getMany()).resolves.toEqual(["Example"]);
    expect(fetch).toHaveBeenCalledWith("basic", "depth=2");
  });

  it("preserves filters and pagination when applying a date helper", async () => {
    const fetch = vi.fn<(slug: string, qs: string) => Promise<{ docs: Document[] }>>()
      .mockResolvedValue({ docs: [] });
    const api = buildApi(datedConfig, fetch);
    await api.getByDay(new Date(2025, 6, 25, 12), {
      category: "Workshop", ids: [1, 2], limit: 5, page: 2,
    });

    const [slug, query] = fetch.mock.calls[0];
    const params = new URLSearchParams(query);
    expect(slug).toBe("dated");
    expect(params.get("where[categories.name][in]")).toBe("Workshop");
    expect(params.get("where[id][in]")).toBe("1,2");
    expect(params.get("limit")).toBe("5");
    expect(params.get("page")).toBe("2");
    expect(params.get("depth")).toBe("2");
    expect(params.get("sort")).toBe("schedule.startTime");
    expect(params.get("where[schedule.startTime][greater_than_equal]"))
      .toBe(new Date(2025, 6, 25, 0, 0, 0, 0).toISOString());
    expect(params.get("where[schedule.startTime][less_than_equal]"))
      .toBe(new Date(2025, 6, 25, 23, 59, 59, 999).toISOString());
  });
});
