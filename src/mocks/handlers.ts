import { http, HttpResponse } from "msw";
import { sampleTags } from "@/cms/static-data/tags";
import { sampleAuthors } from "@/cms/static-data/authors";
import { sampleBlogs } from "@/cms/static-data/blogs";
import { Author as PayloadAuthor } from "../../payload-types";
// MSW (Mock Service Worker) request handlers that intercept calls to the
// local Payload CMS API (http://localhost:3000/api/...) and respond with
// static sample data instead. Used for tests/dev so requests don't need a
// real running CMS server. Response shape mimics Payload's paginated
// "find" response format (docs, totalDocs, limit, page, totalPages).
export const handlers = [
  http.get("http://localhost:3000/api/tags", ({ request }) => {
    // Mock GET /api/tags
    // Supports Payload's "where[id][in]" query filter to return only tags
    // matching the given comma-separated list of IDs; otherwise returns all.
    const url = new URL(request.url);
    const idParam = url.searchParams.get("where[id][in]");

    let tags = sampleTags;

    // Filter by IDs if provided
    if (idParam) {
      const ids = idParam.split(",").map(Number);
      tags = sampleTags.filter((tag) => ids.includes(tag.id));
    }

    return HttpResponse.json({
      docs: tags,
      totalDocs: tags.length,
      limit: 10,
      page: 1,
      totalPages: 1,
    });
  }),

  // Get authors by IDs
  // Mock GET /api/authors — same "where[id][in]" filtering pattern as tags above
  http.get("http://localhost:3000/api/authors", ({ request }) => {
    const url = new URL(request.url);
    const idParam = url.searchParams.get("where[id][in]");

    let authors = sampleAuthors;

    // Filter by IDs if provided
    if (idParam) {
      const ids = idParam.split(",").map(Number);
      authors = sampleAuthors.filter((author) => ids.includes(author.id));
    }

    return HttpResponse.json({
      docs: authors,
      totalDocs: authors.length,
      limit: 10,
      page: 1,
      totalPages: 1,
    });
  }),

  // Mock GET /api/blogs
  // Supports two filters: exact slug match, or a list of IDs.
  // Also hydrates each blog by resolving its relationship fields
  // (tags, author) from raw IDs into full nested objects, similar to
  // how Payload would return populated relationships from a real query.
  http.get("http://localhost:3000/api/blogs", ({ request }) => {
    const url = new URL(request.url);
    const slugParam = url.searchParams.get("where[slug][equals]");

    let blogs = sampleBlogs;

    // Filter by slug
    if (slugParam) {
      blogs = sampleBlogs.filter((blog) => blog.slug === slugParam);
    }

    // Step 1: replace each blog's raw `tags` (array of tag IDs) with the
    // full matching Tag objects looked up from sampleTags
    let deepBlogs = blogs.map((blog) => ({
      ...blog,
      tags: (blog.tags as unknown as number[])
        ?.map((tagID) => sampleTags.find((sTag) => sTag.id === tagID))
        .filter((tag) => tag !== undefined),
    }));

    // Step 2: replace each blog's raw `author` (an author ID) with the
    // full matching Author object looked up from sampleAuthors
    deepBlogs = deepBlogs.map((blog) => ({
      ...blog,
      author: sampleAuthors.find(
        (author) => author.id === (blog.author as unknown as number),
      ) as PayloadAuthor,
    }));

    return HttpResponse.json({
      docs: deepBlogs,
      totalDocs: blogs.length,
      limit: 10,
      page: 1,
      totalPages: Math.ceil(blogs.length / 10),
    });
  }),
];
