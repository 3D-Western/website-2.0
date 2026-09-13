import { getPayload, type CollectionSlug } from "payload";
import config from "@payload-config";
import { collections, CollectionKey } from "./collections";
import { buildApi } from "./api";
import { makeProjectsOverrides, ProjectsFetcher } from "./projects.overrides";
import { makeTeamMemberOverrides } from "./teamMembers.overrides";
import { cmsEnabledFallback, whereFromSearchParams } from "./utils";

// Get function for the SERVER ONLY
// Fetches through Payloads Local API (Only available on the server)
export async function findDocs(slug: string, qs: string) {
  const fallback = await cmsEnabledFallback(`/api/${slug}?${qs}`);
  if (fallback.status === "ok" || fallback.status === "not-found")
    return fallback.response ?? [];

  const params = new URLSearchParams(qs);
  const payload = await getPayload({ config });
  return payload.find({
    collection: slug as CollectionSlug,
    where: whereFromSearchParams(params),
    limit: params.has("limit") ? Number(params.get("limit")) : undefined,
    page: params.has("page") ? Number(params.get("page")) : undefined,
    depth: params.has("depth") ? Number(params.get("depth")) : undefined,
    sort: params.get("sort") ?? undefined,
    draft: params.get("draft") === "true",
    overrideAccess: false,
  });
}

// General API
export const api = {
  for<K extends CollectionKey>(key: K) {
    return buildApi(collections[key], (slug, qs) => findDocs(slug, qs));
  },
};

// General API + Specific project fetches
export const projectsApi = {
  ...api.for("projects"),
  ...makeProjectsOverrides(
    (slug, qs) => findDocs(slug, qs) as ReturnType<ProjectsFetcher>,
  ),
};

// General API + Specific Team Member Fetches
export const teamMembersApi = {
  ...api.for("team-members"),
  ...makeTeamMemberOverrides((slug, qs) => findDocs(slug, qs)),
};
