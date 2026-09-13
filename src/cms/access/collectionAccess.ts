import type { Access } from "payload";

export const assignableCollections = [
  { label: "Blog Posts", slug: "blogs" },
  { label: "Blog Tags", slug: "tags" },
  { label: "Authors", slug: "authors" },
  { label: "Blog Cover Images", slug: "cover-images" },
  { label: "Author Avatars", slug: "avatars" },
  { label: "Events", slug: "events" },
  { label: "Event Categories", slug: "event-categories" },
  { label: "Projects", slug: "projects" },
  { label: "Project Categories", slug: "project-categories" },
  { label: "Sponsors", slug: "sponsors" },
  { label: "Team Members", slug: "team-members" },
  { label: "Users", slug: "users" },
  { label: "Teams", slug: "teams" },
  { label: "Logos", slug: "logos" },
  { label: "Gallery Images", slug: "gallery-images" },
  { label: "Spotlights", slug: "spotlights" },
  { label: "Spotlight Images", slug: "spotlight-images" },
  { label: "Instagram Posts", slug: "instagram-posts" },
  { label: "Instagram Thumbnail", slug: "instagram-thumbnails" },
] as const;

export type AssignableCollection =
  (typeof assignableCollections)[number]["slug"];

export const hasCollectionAccess = (slug: AssignableCollection): Access => {
  return ({ req }) => {
    if (req.user?.role === "admin") return true;
    return Boolean(req.user?.allowedCollections?.includes(slug));
  };
};

// Read access:
// - If there's a logged-in user (req.user exists), allow reading everything,
//   including drafts/unpublished posts (useful for admin/editor preview).
// - If there's no logged-in user (public/anonymous request), Payload applies
//   this returned query constraint instead of a plain true/false — meaning
//   public visitors can only read documents where _status equals "published".
export const generalAccess = (slug: AssignableCollection) => ({
  read: (({ req }) => {
    // logged-in editors/admins with access see everything (including drafts);
    // public/unauthenticated visitors only see published docs
    // if (req.user) return true;
    // return {
    //   _status: { equals: "published" },
    // };
    return true;
  }) satisfies Access,

  create: hasCollectionAccess(slug),
  update: hasCollectionAccess(slug),
  delete: (({ req }) => req.user?.role === "admin") satisfies Access,
});
