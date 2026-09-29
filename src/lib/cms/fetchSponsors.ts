import { cmsClient } from "./cmsClient";
import { transformSponsors } from "./transform";
import { sampleSponsors } from "@/cms/static-data/sponsors";
import { CMSEnabled } from "./utils";

export const getSponsors = async () => {
  if (!CMSEnabled()) return sampleSponsors;
  const result = await cmsClient.get("/api/sponsors");
  return transformSponsors(result.docs);
};
