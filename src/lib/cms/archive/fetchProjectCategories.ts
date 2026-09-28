import { ProjectCategory } from "@/types/content";
import { URLSearchParams } from "url";
import { cmsClient } from "../cmsClient";
import { transformProjectCategories } from "../transform";

// Get all project categories from CMS
export const getProjectCategories = async () => {
  const res = await cmsClient.get("/api/project-categories");

  return transformProjectCategories(res.docs);
};

// Get project categories from CMS if they match the IDs given
export const getProjectCategoriesByIds = async (
  ids: number[],
): Promise<ProjectCategory[]> => {
  // Build params to search by ID
  const params = new URLSearchParams();
  params.set("where[id][in]", ids.join(","));

  const res = await cmsClient.get(
    `/api/project-categories?${params.toString()}`,
  );

  return transformProjectCategories(res.docs);
};
