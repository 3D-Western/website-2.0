import { http, HttpResponse } from "msw";

import { items as sampleTeamMembers } from "@/components/data/teamdata";
import { sampleTags } from "@/cms/static-data/tags";
import { sampleAuthors } from "@/cms/static-data/authors";
import { sampleBlogs } from "@/cms/static-data/blogs";
import { Author as PayloadAuthor } from "../../payload-types";
import { sampleProjectCategories } from "@/cms/static-data/projectCategories";
import { sampleProjects } from "@/cms/static-data/projects";
import { sampleEvents } from "@/cms/static-data/events";
import { sampleEventCategories } from "@/cms/static-data";

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
  // Mock GET /api/project-categories
  http.get("http://localhost:3000/api/blogs", ({ request }) => {
    const url = new URL(request.url);
    const slugParam = url.searchParams.get("where[slug][equals]");
    const tagParam = url.searchParams.get("where[tags.title][in]"); // confirm this matches your categoryField config
    const idsParam = url.searchParams.get("where[id][in]");
    const limit = Number(url.searchParams.get("limit")) || sampleBlogs.length;
    const page = Number(url.searchParams.get("page")) || 1;

    let blogs = sampleBlogs;

    if (slugParam) {
      blogs = blogs.filter((blog) => blog.slug === slugParam);
    }

    if (idsParam) {
      const ids = idsParam.split(",");
      blogs = blogs.filter((blog) => ids.includes(String(blog.id)));
    }

    // Resolve tags (IDs -> full Tag objects) and author (ID -> full Author
    // object) BEFORE tag-name filtering, since the filter needs `tag.title`.
    let deepBlogs = blogs.map((blog) => ({
      ...blog,
      tags: (blog.tags as unknown as number[])
        ?.map((tagID) => sampleTags.find((sTag) => sTag.id === tagID))
        .filter((tag): tag is (typeof sampleTags)[number] => tag !== undefined),
      author: sampleAuthors.find(
        (author) => author.id === (blog.author as unknown as number),
      ) as PayloadAuthor,
    }));

    if (tagParam) {
      const tagTitles = tagParam.split(",");
      deepBlogs = deepBlogs.filter((blog) =>
        blog.tags?.some((t) => tagTitles.includes(t.title)),
      );
    }

    const totalDocs = deepBlogs.length;
    const startIndex = (page - 1) * limit;
    const docs = deepBlogs.slice(startIndex, startIndex + limit);

    return HttpResponse.json({
      docs,
      totalDocs,
      limit,
      page,
      totalPages: Math.ceil(totalDocs / limit),
      hasNextPage: startIndex + limit < totalDocs,
      hasPrevPage: page > 1,
    });
  }),

  //
  http.get("http://localhost:3000/api/project-categories", () => {
    return HttpResponse.json({
      docs: sampleProjectCategories,
      totalDocs: sampleProjectCategories.length,
      limit: 10,
      page: 1,
      totalPages: 1,
    });
  }),

  // Mock GET /api/projects
  // Supports "where[slug][equals]" and "where[featured][equals]" filters
  http.get("http://localhost:3000/api/projects", ({ request }) => {
    const url = new URL(request.url);
    const slugParam = url.searchParams.get("where[slug][equals]");
    const featuredParam = url.searchParams.get("where[featured][equals]");

    let projects = sampleProjects;

    if (slugParam) {
      projects = sampleProjects.filter((p) => p.slug === slugParam);
    }
    if (featuredParam === "true") {
      projects = sampleProjects.filter((p) => p.featured === true);
    }

    return HttpResponse.json({
      docs: projects,
      totalDocs: projects.length,
      limit: 10,
      page: 1,
      totalPages: 1,
    });
  }),

  // Mock GET /api/events
  // Supports "where[categories][in]" and date-range filtering via
  // "where[schedule.startTime][greater_than_equal/less_than_equal]"

  http.get("*/api/events", ({ request }) => {
    const url = new URL(request.url);
    const categoryParam = url.searchParams.get("where[categories.name][in]");
    const startParam = url.searchParams.get(
      "where[schedule.startTime][greater_than_equal]",
    );
    const endParam = url.searchParams.get(
      "where[schedule.startTime][less_than_equal]",
    );
    const idsParam = url.searchParams.get("where[id][in]");
    const limit = Number(url.searchParams.get("limit")) || sampleEvents.length;
    const page = Number(url.searchParams.get("page")) || 1;

    // Resolve category IDs -> full EventCategory objects, same as Payload would at depth >= 1
    const resolveCategories = (event: (typeof sampleEvents)[number]) => ({
      ...event,
      categories: event.categories
        .map((id) => sampleEventCategories.find((c) => c.id === id))
        .filter((c): c is (typeof sampleEventCategories)[number] => Boolean(c)),
    });

    let events = sampleEvents.map(resolveCategories);

    if (idsParam) {
      const ids = idsParam.split(",");
      events = events.filter((e) => ids.includes(String(e.id)));
    }

    if (categoryParam) {
      const categoryNames = categoryParam.split(",");
      events = events.filter((event) =>
        event.categories.some((c) => categoryNames.includes(c.name)),
      );
    }

    if (startParam || endParam) {
      const start = startParam ? new Date(startParam) : null;
      const end = endParam ? new Date(endParam) : null;
      events = events.filter((event) => {
        const eventStart = new Date(event.schedule.startTime);
        if (start && eventStart < start) return false;
        if (end && eventStart > end) return false;
        return true;
      });
    }

    const totalDocs = events.length;
    const startIndex = (page - 1) * limit;
    const docs = events.slice(startIndex, startIndex + limit);

    return HttpResponse.json({
      docs,
      totalDocs,
      limit,
      page,
      totalPages: Math.ceil(totalDocs / limit),
      hasNextPage: startIndex + limit < totalDocs,
      hasPrevPage: page > 1,
    });
  }),

  // Mock GET /api/team-members
  http.get("http://localhost:3000/api/team-members", () => {
    return HttpResponse.json({
      docs: sampleTeamMembers,
      totalDocs: sampleTeamMembers.length,
      limit: 10,
      page: 1,
      totalPages: 1,
    });
  }),
];
