import { cmsClient } from "./cmsClient";
import { collections, CollectionKey } from "./collections";
import { buildApi } from "./api";
import { makeProjectsOverrides, ProjectsFetcher } from "./projects.overrides";

export const api = {
  for<K extends CollectionKey>(key: K) {
    return buildApi(collections[key], (slug, qs) =>
      cmsClient.get(`/api/${slug}?${qs}`),
    );
  },
};

export const projectsApi = {
  ...api.for("projects"),
  ...makeProjectsOverrides(
    (slug, qs) =>
      cmsClient.get(`/api/${slug}?${qs}`) as ReturnType<ProjectsFetcher>,
  ),
};
