// api.client.ts
import { cmsClient } from "./cmsClient";
import { collections, CollectionKey } from "./collections";
import { buildApi } from "./api";
import { makeProjectsOverrides, ProjectsFetcher } from "./projects.overrides";

export const apiClient = {
  for: <K extends CollectionKey>(key: K) =>
    buildApi(collections[key], (slug, qs) =>
      cmsClient.clientGet(`/${slug}?${qs}`),
    ),
};
export const projectsApi = {
  ...apiClient.for("projects"),
  ...makeProjectsOverrides(
    (slug, qs) =>
      cmsClient.clientGet(`/api/${slug}?${qs}`) as ReturnType<ProjectsFetcher>,
  ),
};
