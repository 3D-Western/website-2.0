import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import type { CollectionConfig } from "./collections";

// type of the fetch method
export type Fetcher = (
  slug: string,
  qs: string,
) => Promise<{ docs: unknown[] }>;

type QueryOptions = {
  limit?: number;
  page?: number;
  ids?: number[];
  category?: string;
  start?: Date;
  end?: Date;
};

// Unsupported capabilities contribute unknown, which adds no intersection constraints.
// options for the api, passed to buildApi
type OptionsFor<C extends CollectionConfig> = {
  limit?: number;
  page?: number;
  ids?: number[];
} & (C["categoryField"] extends string ? { category?: string } : unknown) &
  (C["dateField"] extends string ? { start?: Date; end?: Date } : unknown);

// type of date helper methods, potentially empty if the collection has no date fields
type DateHelpers<C extends CollectionConfig> = C["dateField"] extends string
  ? {
      getByDay: (
        day: Date,
        o?: Omit<OptionsFor<C>, "start" | "end">,
      ) => Promise<ReturnType<C["transform"]>>;
      getByWeek: (
        day: Date,
        o?: Omit<OptionsFor<C>, "start" | "end">,
      ) => Promise<ReturnType<C["transform"]>>;
      getByMonth: (
        day: Date,
        o?: Omit<OptionsFor<C>, "start" | "end">,
      ) => Promise<ReturnType<C["transform"]>>;
    }
  : unknown;

// return type for the api that is built when buildApi is called
type Api<C extends CollectionConfig> = {
  getMany: (options?: OptionsFor<C>) => Promise<ReturnType<C["transform"]>>;
} & DateHelpers<C>;

function hasDateField<C extends CollectionConfig>(
  c: C,
): c is C & { dateField: string } {
  return typeof c.dateField === "string";
}
function hasCategoryField<C extends CollectionConfig>(
  c: C,
): c is C & { categoryField: string } {
  return typeof c.categoryField === "string";
}

export function buildApi<C extends CollectionConfig>(
  config: C,
  fetch: Fetcher,
): Api<C> {
  // Internally accept the complete option shape; Api<C> restricts callers to
  // the capabilities declared by their collection.
  const getMany = async (options: QueryOptions = {}) => {
    // set params for fetch
    const params = new URLSearchParams();
    const opts = options;

    if (opts.limit) params.set("limit", String(opts.limit));
    if (opts.page) params.set("page", String(opts.page));

    // filter by item IDs
    if (opts.ids) params.set("where[id][in]", opts.ids.join(","));

    // filter by category (if it exists on the collection)
    if (hasCategoryField(config) && opts.category) {
      params.set(`where[${config.categoryField}][in]`, String(opts.category));
    }

    // filter by date (if it exists on the collection)
    if (hasDateField(config) && opts.start && opts.end) {
      params.set(
        `where[${config.dateField}][greater_than_equal]`,
        opts.start.toISOString(),
      );
      params.set(
        `where[${config.dateField}][less_than_equal]`,
        opts.end.toISOString(),
      );
      params.set("sort", config.dateField);
    }

    // resolve relationship fields
    params.set("depth", "2");

    // fetch and return
    const result = await fetch(config.slug, params.toString());
    // Payload/REST responses are trusted to match this collection at depth 2.
    // This assertion describes that boundary; it is not runtime validation.
    return config.transform(result.docs as Parameters<C["transform"]>[0]);
  };

  // helper methods for getting by day for collections that have dates (events)
  const dateHelpers = hasDateField(config)
    ? {
        getByDay: (day: Date, o?: Omit<QueryOptions, "start" | "end">) =>
          getMany({ ...o, start: startOfDay(day), end: endOfDay(day) }),
        getByWeek: (day: Date, o?: Omit<QueryOptions, "start" | "end">) =>
          getMany({ ...o, start: startOfWeek(day), end: endOfWeek(day) }),
        getByMonth: (day: Date, o?: Omit<QueryOptions, "start" | "end">) =>
          getMany({ ...o, start: startOfMonth(day), end: endOfMonth(day) }),
      }
    : {};

  return { getMany, ...dateHelpers } as Api<C>;
}
