import {
  transformEvents,
  transformBlogs,
  transformProjects,
  transformTags,
  transformProjectCategories,
  transformEventCategories,
} from "@/lib/cms/transform";

export type CollectionConfig<TDoc = any, TOut = any> = {
  slug: string;
  transform: (docs: TDoc[]) => TOut[];
  dateField?: string;
  categoryField?: string;
};

export type CollectionKey = keyof typeof collections;

// Collection config for generic fetch api
// Read docs in /docs/CMS-Collections-Guide.md
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
    categoryField: "categories.name",
  },
  tags: {
    slug: "tags",
    transform: transformTags,
  },
  "project-categories": {
    slug: "project-categories",
    transform: transformProjectCategories,
  },
  "event-categories": {
    slug: "event-categories",
    transform: transformEventCategories,
  },
} as const satisfies Record<string, CollectionConfig>;
