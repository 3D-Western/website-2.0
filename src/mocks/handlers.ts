import { http, HttpResponse } from "msw";
import * as resolvers from "./resolvers";

export const handlers = [
  http.get("http://localhost:3000/api/tags", ({ request }) =>
    HttpResponse.json(resolvers.resolveTags(new URL(request.url).searchParams)),
  ),
  http.get("http://localhost:3000/api/authors", ({ request }) =>
    HttpResponse.json(
      resolvers.resolveAuthors(new URL(request.url).searchParams),
    ),
  ),
  http.get("http://localhost:3000/api/blogs", ({ request }) =>
    HttpResponse.json(
      resolvers.resolveBlogs(new URL(request.url).searchParams),
    ),
  ),
  http.get("http://localhost:3000/api/project-categories", () =>
    HttpResponse.json(resolvers.resolveProjectCategories()),
  ),
  http.get("http://localhost:3000/api/projects", ({ request }) =>
    HttpResponse.json(
      resolvers.resolveProjects(new URL(request.url).searchParams),
    ),
  ),
  http.get("*/api/events", ({ request }) =>
    HttpResponse.json(
      resolvers.resolveEvents(new URL(request.url).searchParams),
    ),
  ),
  http.get("http://localhost:3000/api/team-members", () =>
    HttpResponse.json(resolvers.resolveTeamMembers()),
  ),
];
