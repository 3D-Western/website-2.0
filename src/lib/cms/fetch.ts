export * from "./fetchSponsors";
export * from "./fetchTeam";
export * from "./fetchAuthors";
export * from "./fetchBySlug";

export interface BaseParams {
  limit?: number;
  page?: number;
}
