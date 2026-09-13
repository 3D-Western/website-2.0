import type { CollectionConfig } from "payload";
import { generalAccess } from "../access/collectionAccess";

export const INSTAPOST_SLUG = "instagram-posts";
export const InstagramPosts: CollectionConfig = {
  slug: INSTAPOST_SLUG,
  access: generalAccess(INSTAPOST_SLUG),
  admin: {
    useAsTitle: "id",
    group: "Instagram",
  },
  fields: [
    { name: "id", type: "number", required: true },
    { name: "username", type: "text", required: true },
    {
      name: "avatar",
      type: "relationship",
      relationTo: "avatars",
    },
    {
      name: "postImage",
      type: "relationship",
      relationTo: "instagram-thumbnails",
    },
    { name: "caption", type: "text" },
    { name: "likes", type: "number" },
    { name: "permalink", type: "text", required: true },
  ],
};
