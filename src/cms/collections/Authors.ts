import type { CollectionConfig } from "payload";

export const Authors: CollectionConfig = {
  slug: "authors",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "avatar",
      type: "group",
      fields: [
        { name: "url", type: "text", required: true },
        { name: "alt", type: "text", required: true },
      ],
    },
  ],
};
