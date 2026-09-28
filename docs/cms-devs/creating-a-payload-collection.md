# Creating a Payload Collection

This is a from-scratch guide to defining a new collection in Payload for this project. It assumes no prior Payload knowledge. Once your collection exists, see `cms-collections-guide.md` for how to wire it into our app's fetching layer (`collections.ts`, `transform.ts`, overrides).

---

## Where collections live

Every collection is one file, under `src/cms/collections/`. It's registered in the main Payload config (`payload.config.ts`) by adding it to the `collections` array there — if you're adding a brand new collection (not editing an existing one), make sure it's added to that array or it won't show up anywhere.

## The skeleton

```ts
// src/cms/collections/Events.ts
import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "_status", "updatedAt"],
  },
  versions: {
    drafts: true,
  },
  fields: [
    // see below
  ],
  timestamps: true,
};
```

- **`slug`** — the collection's identifier. This becomes the REST path (`/api/{slug}`) and the key you'll use everywhere else (in `collections.ts`, in the admin UI URL, etc.). Pick this carefully — renaming it later means updating every reference across the app.
- **`admin.useAsTitle`** — which field's value shows as the document's "name" in the admin list view. Almost always your main text field (`title`, `name`).
- **`admin.defaultColumns`** — which fields show as columns in the admin list view by default. Purely cosmetic, editors can change this per-user in the UI anyway.
- **`timestamps: true`** — auto-adds `createdAt`/`updatedAt` fields. Leave this on unless you have a specific reason not to.

---

## Versions and drafts — read this before adding a `status` field

```ts
versions: {
  drafts: true,
},
```

Setting this **automatically injects a `_status` field** (`draft` / `published` / `changed`) into the collection — you do not need to add your own status field for editorial workflow. This is the single most common mistake to avoid: a hand-rolled `status: draft | published` field is redundant with `_status` and will create exactly the kind of confusion described in `cms-collections-guide.md` (multiple status-shaped fields on one collection, unclear which one governs what).

**Only add your own custom status field when it means something different from publish/draft** — for example, `Events` has an `eventStatus` field (`upcoming` / `ongoing` / `past` / `cancelled`) that's computed from dates and a cancellation flag. That's a _content_ status, not an _editorial_ status — genuinely different information, so it's a genuinely different field. `_status` still governs whether the document itself is published or a draft; `eventStatus` describes something about the event's real-world timing.

If you also want autosave (drafts save automatically as an editor types, without them clicking "save"):

```ts
versions: {
  drafts: {
    autosave: {
      interval: 5000, // milliseconds between autosaves
    },
  },
},
```

**Skip `versions` entirely** for collections that don't have a publish/draft lifecycle at all — internal lookup tables, settings, or a `Tags`/`Categories` collection that's just a flat list of options with no "draft" concept.

---

## Fields

Every field is an object with at minimum a `name` and a `type`. Fields go in the `fields: []` array, in the order they should appear in the admin UI.

### Common field types you'll use

```ts
fields: [
  {
    name: "title",
    type: "text",
    required: true,
  },
  {
    name: "description",
    type: "textarea",
  },
  {
    name: "slug",
    type: "text",
    unique: true,
    admin: {
      position: "sidebar",
    },
  },
  {
    name: "location",
    type: "text",
  },
  {
    name: "categories",
    type: "relationship",
    relationTo: "event-categories", // must match another collection's slug
    hasMany: true,
  },
];
```

- **`text`** / **`textarea`** — short vs. long free text.
- **`richText`** — formatted content (bold, links, lists) if you need a WYSIWYG editor.
- **`relationship`** — links to another collection. `relationTo` must be that collection's `slug`. `hasMany: true` allows multiple (e.g. an event can have several categories); leave it off/`false` for a single relation (e.g. one author per blog post).
- **`select`** — a dropdown of fixed options:

  ```ts
  {
    name: "frequency",
    type: "select",
    options: [
      { label: "Daily", value: "daily" },
      { label: "Weekly", value: "weekly" },
      { label: "Monthly", value: "monthly" },
    ],
  }
  ```

- **`array`** — a repeatable group of sub-fields (e.g. a list of FAQ question/answer pairs).
- **`group`** — nests several fields under one object key without needing another collection (this project uses this for `schedule: { date, startTime, endTime }` on Events, and `rsvp: { enabled, capacity, rsvpCount }`):

  ```ts
  {
    name: "schedule",
    type: "group",
    fields: [
      { name: "date", type: "date" },
      { name: "startTime", type: "date", admin: { date: { pickerAppearance: "timeOnly" } } },
      { name: "endTime", type: "date", admin: { date: { pickerAppearance: "timeOnly" } } },
    ],
  }
  ```

### `admin.position: "sidebar"`

Use this for short, at-a-glance fields you want visible without scrolling — a slug, a status toggle, a featured checkbox. Don't use it for long fields (rich text, descriptions) that need horizontal space to be usable; those stay in the main document area.

For more field options, **see Payload's official docs online**

---

## Access control

Access control decides who can read/create/update/delete documents. This is what governs whether an anonymous visitor sees only published content, and whether a logged-in editor sees drafts too:

```ts
access: {
  read: ({ req }) => {
    if (req.user) return true; // logged-in users (any authenticated user) see everything, including drafts
    return { _status: { equals: "published" } }; // anonymous visitors see published only
  },
  create: ({ req }) => Boolean(req.user),
  update: ({ req }) => Boolean(req.user),
  delete: ({ req }) => Boolean(req.user),
},
```

If you need finer-grained rules (e.g. only certain roles can publish, not just any logged-in user), that's a more advanced setup involving checking `req.user.role` inside these functions — worth a design conversation before building, rather than copying a role check from another project without confirming it matches how our users/roles are actually modeled.

**Why this matters for the fetching side:** our app's `getEventBySlug`/`getProjectBySlug` functions (see `cms-collections-guide.md`) rely on this exact access pattern — an authenticated request (cookie forwarded) can see drafts, an anonymous one cannot. If a new collection's `access.read` doesn't follow this shape, draft preview for that collection won't work the way it does for `events`/`projects`, and you'll hit the same "403 until I added the cookie" issue we ran into building this.

---

## Hooks (optional, only when you need computed/derived behavior)

Hooks let you run code at specific points in a document's lifecycle — most commonly `beforeValidate` or `beforeChange`, to auto-generate one field from another:

```ts
{
  name: "slug",
  type: "text",
  unique: true,
  hooks: {
    beforeValidate: [
      ({ value, data }) => value || data?.title?.toLowerCase().replace(/\s+/g, "-"),
    ],
  },
},
```

This example auto-fills `slug` from `title` if the editor didn't type one. Don't reach for hooks unless you have a concrete need — most collections won't require any.

---

## Checklist for a new collection

1. Create `src/cms/collections/{Name}.ts` following the skeleton above.
2. Add it to the `collections` array in `payload.config.ts`.
3. Decide: does this collection need `versions: { drafts: true }`? (Yes, unless it's a lookup table/settings collection with no publish lifecycle.)
4. Write your fields. Check whether an existing field's name/path will need to be referenced later as a `dateField` or `categoryField` in our app's `collections.ts` — if so, note the exact dot-path now (e.g. `schedule.startTime`, `tags.title`) so it's used consistently later; mismatches here are the most common cause of "filtering isn't working" bugs.
5. Set `access.read` to the published/draft pattern above, unless there's a specific reason this collection should behave differently.
6. Once the collection exists in Payload, move to `cms-collections-guide.md` to wire it into the app's fetch layer.
