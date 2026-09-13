import { items as sampleTeamMembers } from "@/components/data/teamdata";
import { sampleTags } from "@/cms/static-data/tags";
import { sampleAuthors } from "@/cms/static-data/authors";
import { sampleBlogs } from "@/cms/static-data/blogs";
import { Author as PayloadAuthor } from "../../payload-types";
import { sampleProjectCategories } from "@/cms/static-data/projectCategories";
import { sampleProjects } from "@/cms/static-data/projects";
import { sampleEvents } from "@/cms/static-data/events";
import {
  sampleAnnouncements,
  sampleEventCategories,
  sampleSpotlights,
} from "@/cms/static-data";
import {
  sampleAvatars,
  sampleCoverImages,
  sampleGalleryImages,
} from "@/cms/static-data/media";
import { sampleInstagramPosts } from "@/cms/static-data/instagramPosts";

export interface ResponsePayload {
  docs: unknown[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

// Each function takes a URLSearchParams (or nothing) and returns the plain
// JSON-serializable payload. No HttpResponse, no Request/Response objects —
// those get wrapped on separately by the MSW handler and the direct-call path.

export function resolveTags(params: URLSearchParams): ResponsePayload {
  const idParam = params.get("where[id][in]");
  let tags = sampleTags;

  if (idParam) {
    const ids = idParam.split(",").map(Number);
    tags = sampleTags.filter((tag) => ids.includes(tag.id));
  }

  return {
    docs: tags,
    totalDocs: tags.length,
    limit: 10,
    page: 1,
    totalPages: 1,
  };
}

export function resolveAuthors(params: URLSearchParams): ResponsePayload {
  const idParam = params.get("where[id][in]");
  let authors = sampleAuthors;

  if (idParam) {
    const ids = idParam.split(",").map(Number);
    authors = sampleAuthors.filter((author) => ids.includes(author.id));
  }

  return {
    docs: authors,
    totalDocs: authors.length,
    limit: 10,
    page: 1,
    totalPages: 1,
  };
}

export function resolveBlogs(params: URLSearchParams): ResponsePayload {
  const slugParam = params.get("where[slug][equals]");
  const tagParam = params.get("where[tags.title][in]");
  const idsParam = params.get("where[id][in]");
  const limit = Number(params.get("limit")) || sampleBlogs.length;
  const page = Number(params.get("page")) || 1;

  let blogs = sampleBlogs;

  if (slugParam) {
    blogs = blogs.filter((blog) => blog.slug === slugParam);
  }
  if (idsParam) {
    const ids = idsParam.split(",");
    blogs = blogs.filter((blog) => ids.includes(String(blog.id)));
  }

  let deepBlogs = blogs.map((blog) => ({
    ...blog,
    tags: (blog.tags as unknown as number[])
      ?.map((tagID) => sampleTags.find((sTag) => sTag.id === tagID))
      .filter((tag): tag is (typeof sampleTags)[number] => tag !== undefined),
    author: {
      ...(sampleAuthors.find(
        (author) => author.id === (blog.author as unknown as number),
      ) as PayloadAuthor),
      avatar: sampleAvatars[0],
    },
    coverImage: sampleCoverImages[(blog.coverImage as unknown as number) - 1],
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

  return {
    docs,
    totalDocs,
    limit,
    page,
    totalPages: Math.ceil(totalDocs / limit),
    hasNextPage: startIndex + limit < totalDocs,
    hasPrevPage: page > 1,
  };
}

export function resolveProjectCategories(): ResponsePayload {
  return {
    docs: sampleProjectCategories,
    totalDocs: sampleProjectCategories.length,
    limit: 10,
    page: 1,
    totalPages: 1,
  };
}

export function resolveSpotlights(): ResponsePayload {
  const resolvedSpotlights = sampleSpotlights.map((spotlight) => ({
    ...spotlight,
    image: sampleCoverImages[(spotlight.image as unknown as number) - 1],
  }));

  return {
    docs: resolvedSpotlights,
    totalDocs: resolvedSpotlights.length,
    limit: 10,
    page: 1,
    totalPages: 1,
  };
}

export function resolveAnnouncements(): ResponsePayload {
  return {
    docs: sampleAnnouncements,
    totalDocs: sampleAnnouncements.length,
    limit: 10,
    page: 1,
    totalPages: 1,
  };
}

export function resolveEventCategories(): ResponsePayload {
  return {
    docs: sampleEventCategories,
    totalDocs: sampleEventCategories.length,
    limit: 10,
    page: 1,
    totalPages: 1,
  };
}

export function resolveProjects(params?: URLSearchParams): ResponsePayload {
  const slugParam = params?.get("where[slug][equals]");
  const featuredParam = params?.get("where[featured][equals]");
  const projects = sampleProjects;

  let deepProjects = projects.map((proj) => ({
    ...proj,
    categories: (proj.categories as unknown as number[])?.map((catID) =>
      sampleProjectCategories.find((sCat) => sCat.id === catID),
    ),
    image: sampleCoverImages[(proj.image as unknown as number) - 1],
    galleryImages: proj.galleryImages?.map(
      (img) => sampleGalleryImages[(img as unknown as number) - 1],
    ),
  }));

  if (slugParam) {
    deepProjects = deepProjects.filter((p) => p.slug === slugParam);
  }
  if (featuredParam === "true") {
    deepProjects = deepProjects.filter((p) => p.featured === true);
  }

  return {
    docs: deepProjects,
    totalDocs: projects.length,
    limit: 10,
    page: 1,
    totalPages: 1,
  };
}

export function resolveEvents(params: URLSearchParams): ResponsePayload {
  const categoryParam = params.get("where[categories.name][in]");
  const startParam = params.get(
    "where[schedule.startTime][greater_than_equal]",
  );
  const endParam = params.get("where[schedule.startTime][less_than_equal]");
  const idsParam = params.get("where[id][in]");
  const limit = Number(params.get("limit")) || sampleEvents.length;
  const page = Number(params.get("page")) || 1;

  const resolveRelationships = (event: (typeof sampleEvents)[number]) => ({
    ...event,
    categories: event.categories
      .map((id) => sampleEventCategories.find((c) => c.id === id))
      .filter((c): c is (typeof sampleEventCategories)[number] => Boolean(c)),
    image: sampleCoverImages[(event.image as unknown as number) - 1],
  });

  let events = sampleEvents.map(resolveRelationships);

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

  return {
    docs,
    totalDocs,
    limit,
    page,
    totalPages: Math.ceil(totalDocs / limit),
    hasNextPage: startIndex + limit < totalDocs,
    hasPrevPage: page > 1,
  };
}

// Wrap a plain string in the minimal Lexical editor state that
// @payloadcms/richtext-lexical's <RichText> can render.
function textToLexical(text: string) {
  return {
    root: {
      type: "root",
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: "paragraph",
          direction: "ltr" as const,
          format: "" as const,
          indent: 0,
          version: 1,
          textFormat: 0,
          children: text
            ? [
                {
                  type: "text",
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text,
                  version: 1,
                },
              ]
            : [],
        },
      ],
    },
  };
}

const isLeadershipRole = (role: string) =>
  role === "President" || role.startsWith("Chief");

export function resolveTeamMembers(params?: URLSearchParams) {
  const roleFilter = params?.get("where[role][equals]");

  const docs = sampleTeamMembers
    .filter((m) => {
      if (roleFilter === "leadership") return isLeadershipRole(m.role);
      if (roleFilter === "vice-president") return !isLeadershipRole(m.role);
      return true;
    })
    .map((m, i) => ({
      id: i + 1,
      // Old teamdata.ts stores a bare public path; new transform expects
      // a populated Avatar relation ({ url, alt }).
      image: { url: m.image, alt: m.name },
      name: m.name,
      role: m.role,
      team: "",
      bio: textToLexical(m.bio ?? m.description ?? ""),
      emoji: m.emoji,
      linkedin: m.linkedin,
      github: m.github,
      website: m.website,
    }));

  return {
    docs,
    totalDocs: docs.length,
    limit: 10,
    page: 1,
    totalPages: 1,
  };
}

export function resolveInstaPosts() {
  return {
    docs: sampleInstagramPosts,
    totalDocs: sampleInstagramPosts.length,
    limit: 10,
    page: 1,
    totalPages: 1,
  };
}
