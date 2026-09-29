import { cmsClient } from "./cmsClient";
import { transformAuthors } from "./transform";
import { sampleAuthors } from "@/cms/static-data/authors";
import { CMSEnabled } from "./utils";
import { Author } from "@/types/content";
import { URLSearchParams } from "url";

// Fetches authors matching the given list of numeric IDs from the CMS.
export const getAuthorsByIds = async (ids: number[]): Promise<Author[]> => {
  if (!CMSEnabled)
    return sampleAuthors.filter((author) => ids.includes(author.id));

  // Build query params for a CMS where filter: id must be in the provided list
  const params = new URLSearchParams();
  params.set("where[id][in]", ids.join(","));

  // Fetch matching tags from the CMS tags collection
  const res = await cmsClient.get(`/api/authors?${params.toString()}`);

  // Convert raw CMS documents into the app's Tag shape
  return transformAuthors(res.docs);
};
