// Simple SEO helpers — pass the return value to Next.js generateMetadata().
// Usage:
//   export async function generateMetadata() { return blogIndexMeta(); }
//   export async function generateMetadata({ params }) {
//     const post = await getPost(params.slug);
//     return blogPostMeta(post);
//   }

import type { Metadata } from "next";
import type { BlogPost } from "@/types/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://3dwestern.ca";
const SITE_NAME = "3D Western";

/** Meta for the /blogs index page */
export function blogIndexMeta(): Metadata {
  const title = "Blog — 3D Western";
  const description =
    "Articles, tutorials, and club updates from the 3D Western community.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blogs`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** Meta for an individual /blogs/[slug] article */
export function blogPostMeta(post: BlogPost | null): Metadata {
  if (!post) return {};
  const title = `${post.title} — ${SITE_NAME}`;
  const description = post.excerpt ?? `Read "${post.title}" on the 3D Western blog.`;
  const url = `${SITE_URL}/blogs/${post.slug}`;
  const ogImage = post.coverImage?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date,
      ...(ogImage && {
        images: [{ url: ogImage, alt: post.coverImage?.alt ?? post.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    alternates: { canonical: url },
  };
}