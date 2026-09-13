import type { CollectionConfig } from "payload";
import { generalAccess } from "../access/collectionAccess";

export const AVATAR_SLUG = "avatars";
export const Avatars: CollectionConfig = {
  slug: AVATAR_SLUG,
  access: generalAccess(AVATAR_SLUG),
  versions: {
    drafts: true,
  },
  admin: {
    group: "Media",
    useAsTitle: "author-name",
  },

  upload: {
    disableLocalStorage: true,
    imageSizes: [
      {
        name: "avatar",
        width: 300,
        height: 300,
        position: "center",
        fit: "cover",
      },
    ],
  },
  fields: [
    { name: "author-name", type: "text", required: true },
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};

export const COVERIMAGE_SLUG = "cover-images";

export const CoverImages: CollectionConfig = {
  slug: COVERIMAGE_SLUG,
  access: generalAccess(COVERIMAGE_SLUG),
  versions: {
    drafts: true,
  },
  admin: {
    group: "Media",
    useAsTitle: "blog-title",
  },
  upload: {
    disableLocalStorage: true,
    imageSizes: [
      {
        name: "cover-image",
        width: 500,
        height: 500,
        position: "center",
        fit: "cover",
      },
    ],
  },
  fields: [
    { name: "blog-title", type: "text", required: true },
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};

export const LOGO_SLUG = "logos";

export const Logos: CollectionConfig = {
  slug: LOGO_SLUG,
  access: generalAccess(LOGO_SLUG),
  versions: {
    drafts: true,
  },
  admin: {
    group: "Media",
    useAsTitle: "name",
  },
  upload: {
    disableLocalStorage: true,
    imageSizes: [
      {
        name: "logo",
        width: 300,
        height: 300,
        position: "center",
        fit: "cover",
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};

export const GALLERY_SLUG = "gallery-images";

export const GalleryImages: CollectionConfig = {
  slug: GALLERY_SLUG,
  access: generalAccess(GALLERY_SLUG),
  versions: {
    drafts: true,
  },
  admin: {
    group: "Media",
    useAsTitle: "name",
  },
  upload: {
    disableLocalStorage: true,
    imageSizes: [
      {
        name: "logo",
        width: 1000,
        height: 1000,
        position: "center",
        fit: "cover",
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};

export const SPOTLIGHTIMAGE_SLUG = "spotlight-images";

export const SporlightImages: CollectionConfig = {
  slug: SPOTLIGHTIMAGE_SLUG,
  access: generalAccess(SPOTLIGHTIMAGE_SLUG),
  versions: {
    drafts: true,
  },
  admin: {
    group: "Media",
    useAsTitle: "name",
  },
  upload: {
    disableLocalStorage: true,
    imageSizes: [
      {
        name: "spotlight-showcase",
        width: 1000,
        height: 1000,
        position: "center",
        fit: "cover",
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};

export const INSTATHUMBNAIL_SLUG = "instagram-thumbnails";

export const InstagramThumbnails: CollectionConfig = {
  slug: INSTATHUMBNAIL_SLUG,
  access: generalAccess(INSTATHUMBNAIL_SLUG),
  versions: {
    drafts: true,
  },
  admin: {
    group: "Instagram",
    useAsTitle: "id",
  },
  upload: {
    disableLocalStorage: true,
    imageSizes: [
      {
        name: "thumbnail",
        width: 1000,
        height: 1000,
        position: "center",
        fit: "cover",
      },
    ],
  },
  fields: [
    {
      name: "id",
      type: "number",
      required: true,
    },
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
