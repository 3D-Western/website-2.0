// Blogs collection
import type { CollectionConfig } from "payload";
import { generalAccess } from "../access/collectionAccess";

const BLOG_SLUG = "blogs";

export const Blogs: CollectionConfig = {
  slug: BLOG_SLUG,

  // Enables draft/published workflow for this collection.
  // Documents can be saved as drafts before being published, and autosave
  // will periodically persist draft changes automatically.
  versions: {
    drafts: {
      autosave: {
        interval: 1000,
      },
    },
  },
  admin: {
    group: "Written Content",
    // Builds the URL used for the "Preview" button in the Payload admin UI.
    // This lets an editor view a draft/unpublished blog on the live frontend
    // before it's published, by hitting a special /preview route that your
    // frontend app must implement (which then verifies previewSecret and
    // renders the given collection/slug in preview mode).
    preview: ({ slug }) => {
      const encodedParams = new URLSearchParams({
        slug: `${slug as string}`,
        collection: "blogs",
        path: `/blogs/${slug}`,
        // Shared secret so /preview can verify the request is legitimate
        // and not just anyone hitting the preview route
        previewSecret: process.env.PREVIEW_SECRET || "",
      });

      return `/preview?${encodedParams.toString()}`;
    },
  },
  access: generalAccess(BLOG_SLUG),
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "excerpt", type: "textarea" },
    // Relationship field: links to a document in the "authors" collection
    // rather than storing author data inline
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
      required: true,
    },
    { name: "date", type: "date", required: true },
    { name: "readingTime", type: "number" },
    {
      name: "coverImage",
      type: "relationship",
      relationTo: "cover-images",
      label: "Cover Image",
      required: true,
    },
    // Relationship field: can link to multiple documents in the "tags" collection.
    // maxRows caps how many tags can be attached to a single blog post at 3.
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      maxRows: 3,
    },
    { name: "content", type: "richText", required: true },
  ],
};
