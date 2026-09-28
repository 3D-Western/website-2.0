import { Tag } from "@/types/content";
import { URLSearchParams } from "url";
import { cmsClient } from "../cmsClient";
import { transformTags } from "../transform";

// Fetches all tags from the CMS.
// If the CMS is disabled, MSW serves sample data
export const getTags = async (): Promise<Tag[]> => {
  // Fetch all tags from the CMS tags collection
  const res = await cmsClient.get("/api/tags");

  // Convert raw CMS documents into the app's Tag shape
  return transformTags(res.docs);
};

// Fetches only the tags matching the given list of numeric IDs.
export const getTagsByIds = async (ids: number[]): Promise<Tag[]> => {
  // Build query params for a CMS where filter: id must be in the provided list
  const params = new URLSearchParams();
  params.set("where[id][in]", ids.join(","));

  // Fetch matching tags from the CMS tags collection
  const res = await cmsClient.get(`/api/tags?${params}`);

  // Convert raw CMS documents into the app's Tag shape
  return transformTags(res.docs);
};
