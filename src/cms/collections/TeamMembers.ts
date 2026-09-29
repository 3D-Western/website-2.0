import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  access: {
    read: () => true,
  },
  fields: [
    { name: "image", type: "text", required: true },
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "emoji", type: "text" },
    { name: "linkedin", type: "text" },
    { name: "github", type: "text" },
    { name: "website", type: "text" },
  ],
};
