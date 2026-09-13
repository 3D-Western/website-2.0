import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import { postgresAdapter } from "@payloadcms/db-postgres";

import { s3Storage } from "@payloadcms/storage-s3";
import {
  Blogs,
  Sponsors,
  Events,
  TeamMembers,
  Projects,
  Authors,
  Users,
  ProjectCategories,
  EventCategories,
  Avatars,
  CoverImages,
  Teams,
  Logos,
  GalleryImages,
  SporlightImages,
  Spotlights,
  Announcements,
  Tags,
  InstagramThumbnails,
} from "@/cms/collections";
import { InstagramPosts } from "@/cms/collections/InstagramPost";

export default buildConfig({
  editor: lexicalEditor({}),
  collections: [
    Users,
    Avatars,
    CoverImages,
    Logos,
    GalleryImages,
    SporlightImages,
    Blogs,
    Tags,
    Projects,
    TeamMembers,
    Events,
    Sponsors,
    Authors,
    ProjectCategories,
    EventCategories,
    Teams,
    Spotlights,
    Announcements,
    InstagramPosts,
    InstagramThumbnails,
  ],

  plugins: [
    s3Storage({
      collections: {
        logos: true,
        avatars: true,
        "cover-images": true,
        "gallery-images": true,
        "spotlight-images": true,
        "instagram-thumbnails": true,
      },
      bucket: process.env.SUPABASE_BUCKET ?? "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT, // Supabase's S3-compatible endpoint
        forcePathStyle: true, // required for Supabase
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.CMS_DATABASE_URI,
    },
    push: false,
  }),
  routes: {
    admin: "/admin",
  },
  sharp,
});
