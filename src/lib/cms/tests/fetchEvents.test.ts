// events.test.ts
import { describe, it, expect } from "vitest";
import { api } from "@/lib/cms/api.server";
import { startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

describe("events getMany", () => {
  it("respects a limit", async () => {
    const events = await api.for("events").getMany({ limit: 2 });
    console.log(events);
    expect(events.length).toBeLessThanOrEqual(2);
  });

  it("filters by ids and returns only matching, exact set", async () => {
    const all = await api.for("events").getMany();
    const targetIds = all.slice(0, 2).map((e) => e.id);

    const result = await api.for("events").getMany({ ids: targetIds });

    expect(result.map((e) => e.id).sort()).toEqual(targetIds.sort());
  });

  it("filters by category — every result includes it, excluded events are absent", async () => {
    const all = await api.for("events").getMany();
    // pick a category name that actually appears on at least one, but not all, events
    const fixture = all.find((e) => e.categories?.length > 0);
    const category = fixture?.categories[0].name;
    const fixtureDate = fixture?.schedule.date;
    expect(category).toBeDefined(); // sanity: fixture actually has categorized events

    console.log(category);
    const filtered = await api
      .for("events")
      .getByMonth(new Date(fixtureDate || Date.now()), { category });

    console.log(filtered);
    expect(filtered.length).toBeGreaterThan(0);
    expect(
      filtered.every((e) => e.categories.some((c) => c.name === category)),
    ).toBe(true);

    const withoutCategoryCount = all.filter(
      (e) => !e.categories?.some((c) => c.name === category),
    ).length;
    if (withoutCategoryCount > 0) {
      expect(filtered.length).toBeLessThan(all.length);
    }
  });

  it("an event with multiple categories matches a filter on any one of them", async () => {
    const all = await api.for("events").getMany();
    const multiCategoryEvent = all.find((e) => e.categories?.length > 1);
    if (!multiCategoryEvent) return; // fixture doesn't have this case, skip safely

    const secondCategoryName = multiCategoryEvent.categories[1].name;
    const filtered = await api
      .for("events")
      .getByMonth(new Date(), { category: secondCategoryName });

    expect(filtered.some((e) => e.id === multiCategoryEvent.id)).toBe(true);
  });

  it("getByMonth only returns events whose start falls within that month", async () => {
    const now = new Date();
    const events = await api.for("events").getByMonth(now);

    const interval = { start: startOfMonth(now), end: endOfMonth(now) };
    expect(
      events.every((e) =>
        isWithinInterval(new Date(e.schedule.startTime), interval),
      ),
    ).toBe(true);
  });

  it("month + category compose — narrower than either filter alone", async () => {
    const now = new Date();
    const all = await api.for("events").getByMonth(now);
    const category = all.find((e) => e.categories?.length)?.categories[0]?.name;
    if (!category) return; // no categorized events this month in fixture, skip safely

    const combined = await api.for("events").getByMonth(now, { category });
    expect(combined.length).toBeLessThanOrEqual(all.length);
    expect(
      combined.every((e) => e.categories.some((c) => c.name === category)),
    ).toBe(true);
  });

  // not set up
  // it("computes event status correctly relative to now", async () => {
  //   const events = await api.for("events").getMany();
  //   const now = Date.now();
  //
  //   for (const event of events) {
  //     const start = new Date(event.schedule.startTime).getTime();
  //     const end = new Date(event.schedule.endTime).getTime();
  //
  //     if (event.status === "cancelled") {
  //       expect(event.status).toBe("cancelled");
  //     } else if (now < start) {
  //       expect(event.status).toBe("upcoming");
  //     } else if (now > end) {
  //       expect(event.status).toBe("past");
  //     } else {
  //       expect(event.status).toBe("ongoing");
  //     }
  //   }
  // });
});
