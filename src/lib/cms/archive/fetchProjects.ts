import { sampleProjects } from "@/cms/static-data/projects";
import { URLSearchParams } from "url";
import { cmsClient } from "../cmsClient";
import { BaseParams } from "../fetch";
import { transformProjects } from "../transform";
import { CMSEnabled } from "../utils";

export const getProjects = async ({
  limit,
  page,
  categories,
}: BaseParams & { categories?: string[] }) => {
  if (!CMSEnabled()) return sampleProjects;

  // build search params
  const params = new URLSearchParams();
  // nase filtering
  if (limit) params.set("limit", String(limit));
  if (page) params.set("page", String(page));
  params.set("depth", "1");

  // filter response by categories
  if (categories?.length)
    params.set("where[categories.name][in]", categories.join(","));

  // fetch result
  const result = await cmsClient.get("/api/projects");
  return transformProjects(result.docs);
};
export const getFeaturedProjects = async () => {
  const params = new URLSearchParams({
    "where[featured][equals]": "true",
    depth: "2",
  });

  const result = await cmsClient.get(`/api/projects?${params.toString()}`);
  return transformProjects(result.docs);
};
