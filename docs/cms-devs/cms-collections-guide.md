# Adding & Editing CMS Collections to the fetching architecture

This is the reference for anyone adding a new Payload collection to the site, or changing how an existing one (`events`, `blogs`, `projects`, etc) is fetched. It covers the three files you'll touch, and — most importantly — **when to extend the shared system versus when to write a one-off override.**

If you only read one section, read [The Promotion Rule](#the-promotion-rule) before adding anything new.

---

## The three files

### 1. `collections.ts` — the registry

This is the single source of truth for what collections exist and what capabilities each one has. Every collection is one entry:

```ts
// src/lib/cms/collections.ts
export const collections = {
  events: {
    slug: "events",
    transform: transformEvents,
    dateField: "schedule.startTime",
    categoryField: "categories.name",
  },

  blogs: {
    slug: "blogs",
    transform: transformBlogs,
    categoryField: "tags.title",
  },

  projects: {
    slug: "projects",
    transform: transformProjects,
    categoryField: "categories.name"
  },
  ...
} as const;
```

- `slug` — the Payload collection's REST path (`/api/{slug}`).
- `transform` — see `transform.ts` below.
- `dateField` — **optional.** Only set this if the collection should support `getByDay` / `getByWeek` / `getByMonth` / range queries. It must be the exact dot-path Payload expects in a `where` clause (e.g. `schedule.startTime`, not `startTime`).
- `categoryField` — **optional.** Only set this if the collection should support filtering by a category-like field. Must match the exact relation/field path (e.g. `tags.title`, `categories.name`) — **this is the single most common source of "filtering isn't working" bugs.** If filtering silently returns everything (or nothing), the first thing to check is whether this string matches the real field path in the CMS response.

Adding a **date range** or **category filter** to a collection is just adding `dateField`/`categoryField` here — no other file needs to change. The generic API (`api.ts`) reads these to decide what methods (`getByMonth`, etc.) and options (`category`, `start`/`end`) are even valid to call for that collection, and TypeScript enforces it: calling `.getByMonth()` on a collection with no `dateField` is a compile error, not a runtime surprise.

### 2. `transform.ts` — shaping raw CMS docs into domain objects

Each collection has a `transform{Collection}` function that takes the raw Payload response docs and returns the typed shape the rest of the app uses (`Event`, `Blog`, `Project`, etc.).

**Rules for what belongs here:**

- ✅ Renaming/reshaping fields, resolving nested relation objects into a cleaner shape, computing a derived field (e.g. `status: "upcoming" | "past" | "cancelled"` from dates).
- ❌ **Never format a value for display here.** Dates, in particular, must stay as raw ISO strings (or real `Date` objects) — never `format(date, "MMMM do, yyyy")` or similar. If a date gets display-formatted in `transform.ts`, every downstream consumer that needs to compare, sort, or range-query that field breaks, often silently. Display formatting belongs in the component that renders it, at render time — never bake it into the data model.
- ❌ Don't put filtering or pagination logic here. `transform.ts` only reshapes docs that were already fetched; it doesn't decide which docs come back.

### 3. Overrides — for anything that doesn't fit the shared shape

Some queries are genuinely collection-specific and don't belong in the shared `dateField`/`categoryField` system — e.g. `projects`' geo-radius search, or a `featured: true` boolean filter. These live in a separate file, next to the collection they belong to:

```ts
// src/lib/cms/projects.overrides.ts
export const makeProjectsOverrides = (fetch: Fetcher) => ({
  getFeatured: async (options?: { limit?: number }) => {
    /* ... */
  },
});
```

These get merged onto the generic API for that collection only:

```ts
export const projectsApi = {
  ...api.for("projects"),
  ...makeProjectsOverrides(fetcher),
};
```

Other collections are completely unaffected by a collection's overrides — `projectsApi.getFeatured()` exists, `api.for("blogs")` has no idea it's there.

---

## The Promotion Rule

**Before adding a new field to `CollectionConfig` (a new shared capability, alongside `dateField`/`categoryField`), ask: does more than one collection actually need this right now?**

- **If only one collection needs it → write an override**, not a new shared field. See `projects.overrides.ts` for the pattern.
- **If two or more collections genuinely need the same kind of query → that's the signal to promote it** into a real capability on `CollectionConfig`, the same way `dateField`/`categoryField` work today.

### Why this rule exists

The shared generic API (`api.ts`) computes its typed options (`OptionsFor<C>`) and return shape (`Api<C>`) using conditional types keyed off what fields a collection's config declares. Every field added to `CollectionConfig` is evaluated for **every** collection, every time the code type-checks — even collections that will never use it. A handful of genuinely shared axes (date, category) is cheap and worth it. Speculatively generalizing a capability that only one collection needs:

- Slows down type-checking for every collection, for no benefit to most of them.
- Usually produces the wrong shared shape anyway — one real example isn't enough evidence to design a good general abstraction from. Wait for a second real use case before generalizing; you'll get the shape right with two data points, not one.
- Bloats `getMany`'s implementation with conditional branches only one collection ever exercises.

An override costs nothing to every other collection's types or query logic. That asymmetry is why the default should always be "write an override" unless you already have two concrete callers in hand.

---

## Common pitfalls (from real bugs hit building this)

- **Field-path mismatches between `categoryField`/`dateField` and the actual CMS response shape** are the most common bug. If a filter silently returns everything or nothing, check this first — log the actual query string being built and compare it against the real field path in a raw CMS/MSW response.
- **Relations (categories, tags, authors) come back as raw IDs unless resolved.** If a field like `categories` shows up as `[1, 2]` instead of `[{ name: "..." }]`, either the CMS request needs a higher `depth`, or (in MSW mocks) the handler needs to manually resolve IDs against the relevant sample data before any name-based filtering can work.
- **MSW handlers must actually read and apply `limit`, `page`, and `where[...]` params from the request URL.** A handler that always returns the full static array regardless of query params will make every pagination/filtering test look broken even when the real fetching code is correct — always verify against the mock handler's own logic before assuming a bug in `api.ts`.
- **Test dates should be pinned relative to the fixture data, not `new Date()`.** Static sample data lives at fixed dates; a test calling `getByMonth(new Date())` will quietly start failing (or returning empty) once real time drifts past the fixture's dates.

---

## Checklist for adding a new collection

1. Add an entry to `collections.ts`: `slug`, `transform`, and only the capability fields (`dateField`/`categoryField`) it genuinely needs.
2. Write `transform{Collection}` in `transform.ts` — reshape only, no display formatting.
3. If it needs a query the shared system doesn't cover, add an override file next to it — don't add a new shared field for a single collection (see [The Promotion Rule](#the-promotion-rule)).
4. Add an MSW handler for its `/api/{slug}` route that actually respects `limit`/`page`/`where[...]` params — copy the pattern from the `events` or `blogs` handler, don't write one from scratch.
5. Write tests that check _behavior_ (filters exclude/include the right items, pagination pages don't overlap) rather than hardcoded fixture counts, so they don't silently rot as fixture data changes.
