// api.client.ts
import { collections, CollectionKey } from "./collections";
import { buildApi } from "./api";
import { makeProjectsOverrides, ProjectsFetcher } from "./projects.overrides";
import { BASE_URL, cmsEnabledFallback } from "./utils";

// Get function for the client ONLY
// Fetches over REST API
export const clientGet = async (path: string) => {
  const fallback = await cmsEnabledFallback(path);
  if (fallback.status === "ok") return fallback.response;

  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`CMS request failed: ${res.status}`);
  return res.json();
};

export const apiClient = {
  for: <K extends CollectionKey>(key: K) =>
    buildApi(collections[key], (slug, qs) => clientGet(`/api/${slug}?${qs}`)),
};
export const projectsApi = {
  ...apiClient.for("projects"),
  ...makeProjectsOverrides(
    (slug, qs) =>
      clientGet(`/api/${slug}?${qs}`) as ReturnType<ProjectsFetcher>,
  ),
};
