import * as resolvers from "./resolvers";

type Resolver = (params: URLSearchParams) => resolvers.ResponsePayload;

// Maps CMS pathnames to their resolver function. Resolvers that don't need
// query params (e.g. resolveProjectCategories) just ignore the arg.
const routeResolvers: Record<string, Resolver> = {
  "/api/tags": resolvers.resolveTags,
  "/api/authors": resolvers.resolveAuthors,
  "/api/blogs": resolvers.resolveBlogs,
  "/api/project-categories": () => resolvers.resolveProjectCategories(),
  "/api/projects": resolvers.resolveProjects,
  "/api/events": resolvers.resolveEvents,
  "/api/event-categories": () => resolvers.resolveEventCategories(),
  "/api/team-members": resolvers.resolveTeamMembers,
  "/api/spotlights": () => resolvers.resolveSpotlights(),
  "/api/announcements": () => resolvers.resolveAnnouncements(),
  "/api/instagram-posts": () => resolvers.resolveInstaPosts(),
};

export async function getMockResponse(path: string, options: RequestInit = {}) {
  const url = new URL(path, "http://localhost:3000"); // dummy base, only path/query matter
  const resolver = routeResolvers[url.pathname];

  if (!resolver) {
    return new Response(
      JSON.stringify({ error: `No mock for ${url.pathname}` }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const data = resolver(url.searchParams);
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
