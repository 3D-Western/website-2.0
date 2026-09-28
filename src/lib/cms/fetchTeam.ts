import { cmsClient } from "./cmsClient";
import { transformTeamMembers } from "./transform";

export const getTeamMembers = async () => {
  const result = await cmsClient.get("/api/team-members");
  return transformTeamMembers(result.docs);
};
