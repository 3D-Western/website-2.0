import {
  transformEvents,
  transformBlogs,
  transformProjects,
  transformTags,
  transformProjectCategories,
  transformEventCategories,
  transformAuthors,
  transformSponsors,
  transformTeamMembers,
  transformSpotlights,
  transformAnnouncements,
  transformInstagramPosts,
} from "@/lib/cms/transform";

// The registry accepts transforms with different document types. `never` is
// only the input constraint; each entry retains its concrete transform signature.
export type CollectionConfig<TDoc = never, TOut = unknown> = {
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
  authors: {
    slug: "authors",
    transform: transformAuthors,
  },
  sponsors: {
    slug: "sponsors",
    transform: transformSponsors,
  },
  "team-members": {
    slug: "team-members",
    transform: transformTeamMembers,
  },
  spotlights: {
    slug: "spotlights",
    transform: transformSpotlights,
  },
  announcements: {
    slug: "announcements",
    transform: transformAnnouncements,
  },
  "instagram-posts": {
    slug: "instagram-posts",
    transform: transformInstagramPosts,
  },
} as const satisfies Record<string, CollectionConfig>;
