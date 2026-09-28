import type { CollectionConfig } from "payload";
import { URLSearchParams } from "url";

export const Projects: CollectionConfig = {
  slug: "projects",
  versions: {
    drafts: {
      autosave: {
        interval: 5000,
      },
    },
  },
  admin: {
    preview: ({ slug }) => {
      const encodedParams = new URLSearchParams({
        slug: `${slug as string}`,
        collection: "projects",
        path: `/projects/${slug}`,
        previewSecret: process.env.PREVIEW_SECRET || "",
      });

      return `/preview?${encodedParams.toString()}`;
    },
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return {
        _status: { equals: "published" },
      };
    },
    create: ({ req }) => Boolean(req.user), // any logged-in user (editor or admin) can create
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === "admin", // only admins can delete
  },

  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true },
    { name: "creator", type: "text", required: true },
    {
      name: "contributors",
      type: "text",
      hasMany: true,
      label: "All Contributors (Including Creator)",
    },
    { name: "description", type: "text", required: true },
    {
      name: "image",
      type: "group",
      fields: [
        { name: "src", type: "text", required: true },
        { name: "alt", type: "text", required: true },
      ],
      required: true,
    },
    {
      name: "galleryImages",
      type: "array",
      label: "Image Gallery Items",
      fields: [
        { name: "src", type: "text", required: true },
        { name: "alt", type: "text", required: true },
      ],
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "project-categories",
      required: true,
      hasMany: true,
      maxRows: 3,
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Featured",
      defaultValue: false,
    },
    { name: "github", type: "text" },
    { name: "blogUrl", type: "text" },
  ],
};
