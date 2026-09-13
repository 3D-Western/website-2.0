import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

export type Image = {
  url: string;
  alt: string;
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

export type Avatar = Image & {};

export type Author = {
  id: number;
  name: string;
  avatar: Avatar;
};

export type CoverImage = Image & {};

export type Tag = {
  id: number;
  title: string;
  description?: string | undefined;
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
  coverImage?: CoverImage;
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
  id: number;
  name: string;
  description: string;
};

export type ProjectImage = {
  url: string;
  alt: string;
};

export type GalleryImage = Image & {};

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
  logo: Image;
  website?: string;
};

export interface TeamMember {
  image: Image;
  name: string;
  role: string;
  team: string;
  bio: DefaultTypedEditorState;
  emoji?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export type Spotlight = {
  id: number;
  name: string;
  projectName: string;
  description: string;
  tags: string[];
  image: Image;
  program: string;
  year: number;
  quote: string;
};

export type Announcement = {
  id: number;
  title: string;
  announcement: DefaultTypedEditorState;
  createdAt: string;
};

export interface InstagramPost {
  id: string;
  username: string;
  avatar?: Image; // profile picture URL, falls back to a monogram if omitted
  image?: Image; // post photo URL, falls back to a placeholder graphic if omitted
  caption?: string;
  likes?: number;
  permalink: string; // link to the real post on instagram.com
}
