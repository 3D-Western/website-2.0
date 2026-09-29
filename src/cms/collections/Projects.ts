import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "creator", type: "text", required: true },
    { name: "image", type: "text", required: true },
    { name: "alt", type: "text", required: true },
  ],
};
