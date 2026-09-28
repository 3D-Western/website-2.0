import { draftMode } from "next/headers";
import { cmsClient } from "./cmsClient";
import { transformBlog, transformProject } from "./transform";

export const getProjectBySlug = async (slug: string) => {
  const dm = await draftMode();

  // build search params to match by slug
  const params = new URLSearchParams();
  params.set("where[slug][equals]", slug);
  params.set("depth", "2");

  if (dm.isEnabled) {
    params.set("draft", "true");
  }

  const result = await cmsClient.get(`/api/projects?${params.toString()}`);

  return result.docs[0] ? transformProject(result.docs[0]) : null;
};

/**
 * Fetches a single blog post by its slug.
 *
 * Pulls from Payload's REST API when CMS_ENABLED=true, otherwise looks up
 * the slug in local static sample data.
 *
 * @param slug - The unique slug identifying the blog post (used in the URL, e.g. /blog/my-post).
 *
 * @returns The transformed Blog object if found, otherwise null.
 *          Callers should treat `null` as "not found" and trigger a 404.
 */
export const getPostBySlug = async (slug: string) => {
  const dm = await draftMode();

  const params = new URLSearchParams({
    "where[slug][equals]": slug,
    depth: "2",
  });

  if (dm.isEnabled) {
    // params.set("draft", "true");
  }

  const result = await cmsClient.get(`/api/blogs?${params}`);
  return result.docs[0] ? transformBlog(result.docs[0]) : null;
};
