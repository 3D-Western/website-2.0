import {
  Event,
  BlogPost,
  Project,
  Sponsor,
  Author,
  Tag,
  ProjectCategory,
  EventCategory,
  TeamMember,
  Spotlight,
  Announcement,
  InstagramPost,
} from "@/types/content";
import {
  Event as PayloadEvent,
  Sponsor as PayloadSponsor,
  Blog as PayloadBlogPost,
  Project as PayloadProject,
  Author as PayloadAuthor,
  Tag as PayloadTag,
  TeamMember as PayloadTeamMember,
  ProjectCategory as PayloadPC,
  EventCategory as PayloadEC,
  Avatar as PayloadAvatar,
  CoverImage as PayloadCI,
  GalleryImage as PayloadGI,
  Logo as PayloadLogo,
  Spotlight as PayloadSpotlight,
  SpotlightImage as PayloadSI,
  Announcement as PayloadAnnouncement,
  InstagramPost as PayloadInstagramPost,
  InstagramThumbnail as PayloadIT,
} from "../../../payload-types";

export type DocType =
  | PayloadEvent
  | PayloadSponsor
  | PayloadAuthor
  | PayloadProject
  | PayloadBlogPost
  | PayloadTeamMember
  | PayloadTag
  | PayloadPC
  | PayloadSpotlight
  | PayloadInstagramPost;

type ResolvedBlogPost = Omit<
  PayloadBlogPost,
  "tags" | "author" | "coverImage"
> & {
  tags: PayloadTag[] | null;
  author: Author | null;
  coverImage: PayloadCI;
};

export type ResolvedProject = Omit<
  PayloadProject,
  "categories" | "image" | "galleryImages"
> & {
  categories: ProjectCategory[] | null;
  image: PayloadCI;
  galleryImages: PayloadGI[];
};

export type ResolvedAuthor = Omit<PayloadAuthor, "avatar"> & {
  avatar: PayloadAvatar;
};

export type ResolvedTeamMember = Omit<PayloadTeamMember, "image"> & {
  image: PayloadAvatar;
};

export type ResolvedSponsor = Omit<PayloadSponsor, "logo"> & {
  logo: PayloadLogo;
};

export type ResolvedEvent = Omit<PayloadEvent, "image"> & {
  image: PayloadCI;
};

export type ResolvedSpotlight = Omit<PayloadSpotlight, "image"> & {
  image: PayloadSI;
};

export type ResolvedInstagramPost = Omit<
  PayloadInstagramPost,
  "postImage" | "avatar"
> & {
  postImage: PayloadIT;
  avatar: PayloadAvatar;
};

const BASE_URL = `${process.env.NEXT_PUBLIC_CMS_ENABLED === "true" ? process.env.NEXT_PUBLIC_BASE_URL : "/"}`;

const buildURL = (route: string | null = ""): string => {
  if (process.env.NEXT_PUBLIC_CMS_ENABLED === "false") return route ?? "";
  return `${BASE_URL}${route}`;
};

// Get the ordinal identifier for the day
const getOrdinal = (day: number) => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

// format date into Month DD, YYYY
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = getOrdinal(date.getDate());
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export const formatTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${date.getHours() % 12}:${date.getMinutes()} ${ampm}`;
};

// Transform ONE payload doc object to an event object
export const transformEvent = (doc: ResolvedEvent): Event => {
  return {
    id: doc.id,
    title: doc.title,
    image: {
      src: buildURL(doc.image.url),
      alt: doc.image.alt,
    },
    description: doc.description,
    schedule: {
      date: doc.schedule.date,
      startTime: doc.schedule.startTime,
      endTime: doc.schedule.endTime,
    },
    location: doc.location,
    url: doc.url ?? undefined,
    categories: doc.categories as EventCategory[], // set up to always come back with categories, no raw IDs
    // recurrence: {
    //   isRecurring: doc.recurrence?.isRecurring ?? false,
    //   frequency: doc.recurrence?.frequency ?? undefined,
    //   interval: doc.recurrence?.interval ?? undefined,
    //   endsOn: doc.recurrence?.endsOn ?? undefined,
    // },
    // rsvp: {
    //   enabled: doc.rsvp?.enabled ?? false,
    //   capacity: doc.rsvp?.capacity ?? undefined,
    //   rsvpCount: doc.rsvp?.rsvpCount ?? 0,
    // },
    status: doc.eventStatus,
  };
};

// transform an entire payload doc to event objects
export const transformEvents = (docs: ResolvedEvent[]): Event[] => {
  return transformDocs(docs, transformEvent);
};

// transform a project category doc to project category data shape
export const transformEventCategory = (doc: PayloadEC): EventCategory => {
  return {
    id: doc.id,
    name: doc.name,
    description: doc.description,
  };
};

// transform a list of project category docs to project category data shapes
export const transformEventCategories = (
  docs: PayloadEC[],
): EventCategory[] => {
  return transformDocs(docs, transformEventCategory);
};

// transform ONE payload doc object to an event object
export const transformSponsor = (doc: ResolvedSponsor): Sponsor => {
  return {
    id: doc.id,
    name: doc.name,
    logo: {
      url: buildURL(doc.logo.url),
      alt: doc.logo.alt,
    },
    website: doc.website || "",
  };
};

// transform an entire payload doc to sponsor objects
export const transformSponsors = (docs: ResolvedSponsor[]): Sponsor[] => {
  return transformDocs(docs, transformSponsor);
};

// transform ONE payload doc object into a blog
export const transformBlog = (doc: ResolvedBlogPost): BlogPost => {
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt || undefined,
    // author may come back as just an ID (string/number) if not populated,
    // or as a full Author object if fetched with depth >= 1
    author:
      typeof doc.author === "object" && doc.author !== null
        ? transformAuthor(doc.author as ResolvedAuthor)
        : doc.author, // fallback: unpopulated, just the raw ID
    date: doc.date,
    readingTime: doc.readingTime || undefined,
    coverImage: {
      url: buildURL(doc.coverImage.url),
      alt: doc.coverImage.alt,
    },
    tags:
      doc.tags?.map((tag) => ({
        id: tag.id,
        title: tag.title,
        description: tag.description ?? undefined,
      })) ?? null,
    content: doc.content,
  };
};

// transform an entire payload doc to blog objects
export const transformBlogs = (docs: ResolvedBlogPost[]): BlogPost[] => {
  return transformDocs(docs, transformBlog);
};

export const transformAuthor = (doc: ResolvedAuthor): Author => {
  return {
    id: doc.id,
    name: doc.name,
    avatar: {
      url: buildURL(doc.avatar.url),
      alt: doc.avatar.alt,
    },
  };
};

export const transformAuthors = (docs: ResolvedAuthor[]): Author[] => {
  return transformDocs(docs, transformAuthor);
};

// transform ONE payload doc object into a showcase object
export const transformProject = (doc: ResolvedProject): Project => {
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    creator: doc.creator,
    image: {
      url: buildURL(doc.image.url),
      alt: doc.image.alt,
    },
    contributors: doc.contributors || undefined,
    description: doc.description,
    galleryImages: doc.galleryImages?.map((image) => ({
      url: buildURL(image.url),
      alt: image.alt,
    })),
    categories: doc.categories || [],
    dateAdded: doc.createdAt,
    featured: doc.featured || false,
    github: doc.github || undefined,
    blogUrl: doc.blogUrl || undefined,
  };
};

// transform an entire payload doc to showcase objects
export const transformProjects = (docs: ResolvedProject[]): Project[] => {
  return transformDocs(docs, transformProject);
};

// transform a project category doc to project category data shape
export const transformProjectCategory = (doc: PayloadPC): ProjectCategory => {
  return {
    id: doc.id,
    name: doc.name,
    description: doc.description,
  };
};

// transform a list of project category docs to project category data shapes
export const transformProjectCategories = (
  docs: PayloadPC[],
): ProjectCategory[] => {
  return transformDocs(docs, transformProjectCategory);
};

// transform ONE payload doc object into a team member object
export const transformTeamMember = (doc: ResolvedTeamMember): TeamMember => {
  return {
    image: {
      url: buildURL(doc.image?.url ?? ""),
      alt: doc.image?.alt ?? doc.name,
    },
    name: doc.name,
    role: doc.role,
    team: "",
    bio: doc.bio,
    emoji: doc.emoji || "",
    linkedin: doc.linkedin || "",
    github: doc.github || "",
    website: doc.website || "",
  };
};

// transform an entire payload doc to team member objects
export const transformTeamMembers = (
  docs: ResolvedTeamMember[],
): TeamMember[] => {
  return transformDocs(docs, transformTeamMember);
};

export const transformTag = (doc: PayloadTag): Tag => {
  return {
    id: doc.id,
    title: doc.title,
    description: doc.description ?? undefined,
  };
};

export const transformTags = (docs: PayloadTag[]): Tag[] => {
  return transformDocs(docs, transformTag);
};

// Transform an entire payload doc to a generic typed object
export const transformDocs = <D extends DocType, T>(
  docs: D[],
  transformItem: (doc: D) => T,
): T[] => {
  return docs?.map(transformItem);
};

// ---------- SPOTLIGHT TRANSFORMS --------
export const transformSpotlight = (doc: ResolvedSpotlight): Spotlight => {
  return {
    id: doc.id,
    name: doc.name,
    projectName: doc.projectName,
    description: doc.description,
    tags: doc.tags ?? [],
    image: {
      url: buildURL(doc.image.url),
      alt: doc.image.alt,
    },
    program: doc.program,
    year: doc.year,
    quote: doc.quote,
  };
};

export const transformSpotlights = (docs: ResolvedSpotlight[]): Spotlight[] =>
  transformDocs(docs, transformSpotlight);

// ---------- ANNOUNCEMENTS TRANSFORM ----------
export const transformAnnouncement = (
  doc: PayloadAnnouncement,
): Announcement => ({
  id: doc.id,
  title: doc.title,
  announcement: doc.announcement,
  createdAt: doc.createdAt,
});

export const transformAnnouncements = (
  docs: PayloadAnnouncement[],
): Announcement[] => transformDocs(docs, transformAnnouncement);

// ---------- INSTAGRAM POST TRANSFORMS ----------
export const transformInstagramPost = (
  doc: ResolvedInstagramPost,
): InstagramPost => ({
  id: doc.id.toString(),
  username: doc.username,
  avatar: doc.avatar
    ? {
        url: buildURL(doc.avatar?.url),
        alt: doc.avatar?.alt,
      }
    : undefined,
  image: doc.postImage
    ? {
        url: buildURL(doc.postImage?.url),
        alt: doc.postImage?.alt,
      }
    : undefined,
  caption: doc.caption ?? undefined,
  likes: doc.likes ?? undefined,
  permalink: doc.permalink,
});

export const transformInstagramPosts = (
  docs: ResolvedInstagramPost[],
): InstagramPost[] => transformDocs(docs, transformInstagramPost);
