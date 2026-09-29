import { MenuItem } from "@/components/data/teamdata";
import {
  Event,
  BlogPost,
  Showcase,
  Sponsor,
  Author,
  Tag,
} from "@/types/content";
import {
  Event as PayloadEvent,
  Sponsor as PayloadSponsor,
  Blog as PayloadBlogPost,
  Project as PayloadShowcase,
  Author as PayloadAuthor,
  Tag as PayloadTag,
  TeamMember as PayloadTeamMember,
} from "../../../payload-types";

type DocType =
  | PayloadEvent
  | PayloadSponsor
  | PayloadAuthor
  | PayloadShowcase
  | PayloadBlogPost
  | PayloadTeamMember
  | PayloadTag;

type ResolvedBlogPost = Omit<PayloadBlogPost, "tags" | "author"> & {
  tags: PayloadTag[] | null;
  author: Author | null;
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
      date: formatDate(doc.schedule.date),
      startTime: formatTime(doc.schedule.startTime),
      endTime: formatTime(doc.schedule.endTime),
    },
    location: doc.location,
    url: doc.url ?? undefined,
    categories: doc.categories,
    recurrence: {
      isRecurring: doc.recurrence?.isRecurring ?? false,
      frequency: doc.recurrence?.frequency ?? undefined,
      interval: doc.recurrence?.interval ?? undefined,
      endsOn: doc.recurrence?.endsOn ?? undefined,
    },
    rsvp: {
      enabled: doc.rsvp?.enabled ?? false,
      capacity: doc.rsvp?.capacity ?? undefined,
      rsvpCount: doc.rsvp?.rsvpCount ?? 0,
    },
    status: doc.status,
  };
};

// transform an entire payload doc to event objects
export const transformEvents = (docs: PayloadEvent[]): Event[] => {
  return transformDocs(docs, transformEvent);
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
    excerpt: doc.excerpt,
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
    readingTime: doc.readingTime,
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
export const transformProject = (doc: PayloadShowcase): Showcase => {
  return {
    id: doc.id,
    title: doc.title,
    creator: doc.creator,
    image: doc.image,
    alt: doc.alt,
  };
};

// transform an entire payload doc to showcase objects
export const transformProjects = (docs: PayloadShowcase[]): Showcase[] => {
  return transformDocs(docs, transformProject);
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
