import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { transformBlog, transformProject } from "./transform";
import { cmsEnabledFallback } from "./utils";

async function findBySlug(
  collection: "projects" | "blogs",
  slug: string,
  draft: boolean,
) {
  const params = new URLSearchParams({
    "where[slug][equals]": slug,
    depth: "2",
  });
  const fallback = await cmsEnabledFallback(
    `/api/${collection}?${params.toString()}`,
  );
  if (fallback.status === "ok" || fallback.status === "not-found")
    return fallback.response ?? [];

  const payload = await getPayload({ config });
  return payload.find({
    collection,
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    draft,
    overrideAccess: false,
  });
}

export const getProjectBySlug = async (slug: string) => {
  const dm = await draftMode();
  const result = await findBySlug("projects", slug, dm.isEnabled);
  return result.docs[0] ? transformProject(result.docs[0]) : null;
};

/**
 * Fetches a single blog post by its slug.
 *
 * Pulls from Payload's Local API when the CMS is enabled, otherwise looks up
 * the slug in local static sample data.
 *
 * @param slug - The unique slug identifying the blog post (used in the URL, e.g. /blog/my-post).
 *
 * @returns The transformed Blog object if found, otherwise null.
 *          Callers should treat `null` as "not found" and trigger a 404.
 */
export const getPostBySlug = async (slug: string) => {
  const result = await findBySlug("blogs", slug, false);
  return result.docs[0] ? transformBlog(result.docs[0]) : null;
};
