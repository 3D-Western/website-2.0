import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

export type Tag = {
  id: number;
  title: string;
  description?: string | undefined;
};

export type Author = {
  id: number;
  name: string;
  avatar: {
    url: string;
    alt: string;
  };
};

export type EventCategory = {
  id: number;
  name: string;
  description: string;
};

export type Event = {
  id: number;
  title: string;
  description: string;
  schedule: {
    date: string;
    startTime: string;
    endTime: string;
  };
  location: string;
  image: {
    src: string;
    alt: string;
  };
  url?: string;
  categories: EventCategory[];
  recurrence?: {
    isRecurring: boolean;
    frequency?: "daily" | "weekly" | "monthly" | "yearly";
    interval?: number;
    endsOn?: string;
  };
  rsvp?: {
    enabled: boolean;
    capacity?: number;
    rsvpCount: number;
  };
  status: "upcoming" | "ongoing" | "past" | "cancelled";
};

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  /** One-sentence summary shown below the title and used in meta tags */
  excerpt?: string;
  /** ISO 8601 date string — Payload stores this as a date field */
  date: string;
  /** Minutes to read — derive this in a Payload beforeChange hook */
  readingTime?: number;
  /** Hero image — Payload upload field */
  coverImage?: {
    url: string | null;
    alt?: string | null;
  } | null;
  /** Relationship field pointing at an Authors collection */
  author: Author | null;
  /** Array of plain strings — Payload array or select field */
  tags?: Tag[] | null;
  /** The main article body.
   * richText type from payload, read docs for more info
   * Includes all DEFAULT features offered by payload
   * https://payloadcms.com/docs/rich-text/official-features
   * */
  content: DefaultTypedEditorState;
};

export type ProjectCategory = {
  name: string;
  description: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  creator: string;
  contributors?: string[];
  description: string;
  image: ProjectImage;
  galleryImages?: ProjectImage[];
  categories: ProjectCategory[];
  dateAdded: string; // ISO date, e.g. "2025-11-15"
  featured?: boolean;
  github?: string;
  blogUrl?: string;
};

export type Sponsor = {
  id: number;
  name: string;
  logo: string;
  alt: string;
  website?: string;
};
