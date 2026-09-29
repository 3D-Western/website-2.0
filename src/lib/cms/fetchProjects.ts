import { cmsClient } from "./cmsClient";
import { transformProjects } from "./transform";
import { sampleProjects } from "@/cms/static-data/projects";
import { CMSEnabled } from "./utils";

export const getProjects = async () => {
  if (!CMSEnabled()) return sampleProjects;
  const result = await cmsClient.get("/api/projects");
  return transformProjects(result.docs);
};
