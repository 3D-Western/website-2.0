import { MenuItem } from "@/components/data/teamdata";
import {
  Event,
  BlogPost,
  Project,
  Sponsor,
  Author,
  Tag,
  ProjectCategory,
  EventCategory,
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
} from "../../../payload-types";

export type DocType =
  | PayloadEvent
  | PayloadSponsor
  | PayloadAuthor
  | PayloadProject
  | PayloadBlogPost
  | PayloadTeamMember
  | PayloadTag
  | PayloadPC;

type ResolvedBlogPost = Omit<PayloadBlogPost, "tags" | "author"> & {
  tags: PayloadTag[] | null;
  author: Author | null;
};

export type ResolvedProject = Omit<PayloadProject, "categories"> & {
  categories: ProjectCategory[] | null;
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
export const transformEvent = (doc: PayloadEvent): Event => {
  return {
    id: doc.id,
    title: doc.title,
    image: doc.image,
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
    status: doc.status,
  };
};

// transform an entire payload doc to event objects
export const transformEvents = (docs: PayloadEvent[]): Event[] => {
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
export const transformSponsor = (doc: PayloadSponsor): Sponsor => {
  return {
    id: doc.id,
    name: doc.name,
    logo: doc.logo,
    alt: doc.alt,
    website: doc.website || "",
  };
};

// transform an entire payload doc to sponsor objects
export const transformSponsors = (docs: PayloadSponsor[]): Sponsor[] => {
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
        ? {
            id: doc.author.id,
            name: doc.author.name,
            avatar: doc.author.avatar,
          }
        : doc.author, // fallback: unpopulated, just the raw ID
    date: formatDate(doc.date),
    readingTime: doc.readingTime || undefined,
    coverImage: doc.coverImage,
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

export const transformAuthor = (doc: PayloadAuthor): Author => {
  return {
    id: doc.id,
    name: doc.name,
    avatar: doc.avatar,
  };
};

export const transformAuthors = (docs: PayloadAuthor[]): Author[] => {
  return transformDocs(docs, transformAuthor);
};

// transform ONE payload doc object into a showcase object
export const transformProject = (doc: ResolvedProject): Project => {
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    creator: doc.creator,
    image: doc.image,
    contributors: doc.contributors || undefined,
    description: doc.description,
    galleryImages: doc.galleryImages || undefined,
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
export const transformTeamMember = (doc: PayloadTeamMember): MenuItem => {
  return {
    image: doc.image,
    name: doc.name,
    role: doc.role,
    description: doc.description || "",
    emoji: doc.emoji || "",
    linkedin: doc.linkedin || "",
    github: doc.github || "",
    website: doc.website || "",
  };
};

// transform an entire payload doc to team member objects
export const transformTeamMembers = (docs: PayloadTeamMember[]): MenuItem[] => {
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
