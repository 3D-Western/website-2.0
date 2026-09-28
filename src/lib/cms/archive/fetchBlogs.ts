import { cmsClient } from "../cmsClient";
import { BaseParams } from "../fetch";
import { transformBlogs } from "../transform";

/**
 * Fetches a paginated, filterable list of blog posts.
 *
 * Pulls from Payload's REST API when CMS_ENABLED=true, otherwise falls
 * back to local static sample data (no network/database calls made).
 *
 * Note: pagination is page-based (matching Payload's REST API).
 * Tag filtering happens client-side after the fetch
 *
 * @param limit    - Max number of posts to return per page. Omit for Payload's default (10).
 * @param page     - Which page of results to fetch (1-indexed, i.e. 1 = first page).
 * @param category - Filter posts by category. NOT YET IMPLEMENTED — accepted but unused.
 * @param tags     - Filter posts to only those containing at least one of the given tags.
 *
 * @returns Array of transformed Blog objects (typed, not raw Payload docs).
 */
export const getBlogPosts = async ({
  limit,
  page,
  tags,
}: BaseParams & { tags?: string[] }) => {
  // Build query string for Payload's REST API
  const params = new URLSearchParams();
  if (limit) params.set("limit", String(limit));
  if (page) params.set("page", String(page));
  params.set("depth", "1"); // populates author

  const result = await cmsClient.get(`/api/blogs?${params.toString()}`);

  // Convert raw Payload docs into Blog shape
  let filteredResult = transformBlogs(result.docs);

  // Client-side tag filter: keep posts that share at least one tag
  // with the requested list. Done here (not via Payload query) for simplicity.
  if (tags && tags.length > 0) {
    filteredResult = filteredResult.filter((blog) =>
      blog.tags?.some((t) => tags.includes(t.title)),
    );
  }

  return filteredResult;
};
