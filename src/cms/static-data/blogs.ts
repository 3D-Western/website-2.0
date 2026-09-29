import { Blog } from "../../../payload-types";

type SampleBlogPost = Omit<Blog, "updatedAt" | "createdAt">;

export const sampleBlogs: SampleBlogPost[] = [
  {
    id: 1,
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 15",
    excerpt:
      "A practical walkthrough of the new features in Next.js 15 and how to migrate your existing projects.",
    author: 1,
    date: "2025-03-12T10:00:00.000Z",
    readingTime: 6,
    coverImage: {
      url: "/images/workshop3.webp",
      alt: "Code on a screen",
    },
    tags: [1],
    content: {
      root: {
        type: "root",
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Some text. Every property here is fully-typed",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            textFormat: 0,
            version: 1,
          },
        ],
      },
    },
  },
  {
    id: 2,
    slug: "intro-to-typescript-generics",
    title: "A Gentle Introduction to TypeScript Generics",
    excerpt:
      "Generics can feel intimidating at first. Here's a beginner-friendly breakdown with real examples.",
    author: 2,
    date: "2025-04-02T14:30:00.000Z",
    readingTime: 8,
    coverImage: {
      url: "/images/workshop1.webp",
      alt: "Laptop with code editor open",
    },
    tags: [2],
    content: {
      root: {
        type: "root",
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Generics let you write reusable, type-safe code without sacrificing flexibility.",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            textFormat: 0,
            version: 1,
          },
        ],
      },
    },
  },
  {
    id: 3,
    slug: "designing-accessible-forms",
    title: "Designing Accessible Forms That Don't Suck",
    excerpt:
      "Accessibility shouldn't be an afterthought. Practical tips for building forms everyone can use.",
    author: 3,
    date: "2025-04-20T09:15:00.000Z",
    readingTime: 5,
    coverImage: {
      url: "/images/workshop2.webp",
      alt: "Wireframe sketches of a form on paper",
    },
    tags: [3],
    content: {
      root: {
        type: "root",
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Good form design starts with clear labels, sensible error messages, and keyboard support.",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            textFormat: 0,
            version: 1,
          },
        ],
      },
    },
  },
  {
    id: 4,
    slug: "postgres-vs-mongo-for-cms",
    title: "Postgres vs Mongo: Picking a Database for Your CMS",
    excerpt:
      "We weighed the tradeoffs between relational and document databases before settling on Postgres.",
    author: 4,
    date: "2025-05-08T11:00:00.000Z",
    readingTime: 7,
    coverImage: {
      url: "/images/workshop3.webp",
      alt: "Database schema diagram on a whiteboard",
    },
    tags: [4],
    content: {
      root: {
        type: "root",
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Relational databases give you strong consistency guarantees, which mattered a lot for our content model.",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            textFormat: 0,
            version: 1,
          },
        ],
      },
    },
  },
  {
    id: 5,
    slug: "club-hackathon-recap",
    title: "Recap: Our Spring Hackathon Was a Blast",
    excerpt:
      "Over 40 students built 12 projects in 24 hours. Here's a look back at what we made.",
    author: 1,
    date: "2025-05-25T16:45:00.000Z",
    readingTime: 4,
    coverImage: {
      url: "/images/workshop1.webp",
      alt: "Students collaborating around laptops",
    },
    tags: [5],
    content: {
      root: {
        type: "root",
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "From late-night debugging to final demos, this year's hackathon brought out some incredible ideas.",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            textFormat: 0,
            version: 1,
          },
        ],
      },
    },
  },
];
