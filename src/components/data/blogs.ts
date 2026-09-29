export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Human-readable date e.g. "March 12, 2025" */
  date: string;
  /** ISO 8601 — used for <time dateTime> */
  publishedAt: string;
  readingTime?: number;
  image: string;
  alt: string;
  href: string;
  /** Used by the category filter pills on /blog */
  category: string;
  tags?: string[];
  author?: {
    name: string;
    /** Links to /team/[slug] — wire up when team pages exist */
    slug?: string;
    avatar?: { url: string; alt?: string };
  };
  coverImage?: {
    url: string;
    alt?: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-with-3d-printing",
    title: "Getting Started with 3D Printing",
    excerpt:
      "Everything you need to know to go from zero to your first successful print, including filament selection, slicer settings, and bed leveling tips.",
    date: "March 12, 2025",
    publishedAt: "2025-03-12T10:00:00Z",
    readingTime: 6,
    image:
      "/images/smaker.jpg",
    alt: "3D printer in action",
    href: "/blogs/getting-started-with-3d-printing",
    category: "Tutorials",
    tags: ["beginner", "FDM", "PLA"],
    author: {
      name: "Jane Doe",
      slug: "jane-doe",
      avatar: { url: "/images/execs/thomson.webp", alt: "Jane Doe" },
    },
    coverImage: {
      url: "/images/smaker.jpg",
      alt: "3D printer in action",
    },
  },
  {
    id: "2",
    slug: "resin-vs-fdm-which-is-right-for-you",
    title: "Resin vs FDM: Which Is Right for You?",
    excerpt:
      "A head-to-head comparison of SLA resin printers and FDM filament printers covering cost, detail quality, post-processing, and ideal use cases.",
    date: "April 1, 2025",
    publishedAt: "2025-04-01T09:00:00Z",
    readingTime: 8,
    image:
      "/images/smaker.jpg",
    alt: "Resin and FDM prints side by side",
    href: "/blogs/resin-vs-fdm-which-is-right-for-you",
    category: "Guides",
    tags: ["resin", "FDM", "comparison"],
    author: {
      name: "Alex Kim",
      slug: "alex-kim",
      avatar: { url: "/images/execs/thomson.webp", alt: "Alex Kim" },
    },
    coverImage: {
      url: "/images/smaker.jpg",
      alt: "Resin and FDM prints side by side",
    },
  },
  {
    id: "3",
    slug: "design-for-3d-print-in-fusion-360",
    title: "Design for 3D Print in Fusion 360",
    excerpt:
      "Learn the key principles of designing parts that actually print well — wall thickness, overhangs, tolerances, and how to add supports in Fusion 360.",
    date: "April 18, 2025",
    publishedAt: "2025-04-18T14:00:00Z",
    readingTime: 10,
    image:
      "/images/smaker.jpg",
    alt: "Fusion 360 CAD model on screen",
    href: "/blogs/design-for-3d-print-in-fusion-360",
    category: "Tutorials",
    tags: ["CAD", "Fusion 360", "design"],
    author: {
      name: "Maria Santos",
      slug: "maria-santos",
      avatar: { url: "/images/execs/thomson.webp", alt: "Maria Santos" },
    },
    coverImage: {
      url: "/images/smaker.jpg",
      alt: "Fusion 360 CAD model on screen",
    },
  },
  {
    id: "4",
    slug: "club-recap-spring-showcase-2025",
    title: "Club Recap: Spring Showcase 2025",
    excerpt:
      "A look back at our biggest showcase yet — over 40 members, 80+ projects, and a whole lot of PLA dust. See the highlights and award winners.",
    date: "May 2, 2025",
    publishedAt: "2025-05-02T16:00:00Z",
    readingTime: 4,
    image:
      "/images/smaker.jpg",
    alt: "Students at a 3D printing showcase",
    href: "/blogs/club-recap-spring-showcase-2025",
    category: "News",
    tags: ["showcase", "event", "recap"],
    author: {
      name: "Sam Patel",
      slug: "sam-patel",
      avatar: { url: "/images/execs/thomson.webp", alt: "Sam Patel" },
    },
    coverImage: {
      url: "/images/smaker.jpg",
      alt: "Students at a 3D printing showcase",
    },
  },
  {
    id: "5",
    slug: "slicer-settings-that-actually-matter",
    title: "The Slicer Settings That Actually Matter",
    excerpt:
      "Most guides overwhelm you with every setting. This one covers only the six that have the biggest impact on print quality, speed, and reliability.",
    date: "May 20, 2025",
    publishedAt: "2025-05-20T11:00:00Z",
    readingTime: 7,
    image:
      "/images/smaker.jpg",
    alt: "Slicer software on a laptop",
    href: "/blogs/slicer-settings-that-actually-matter",
    category: "Guides",
    tags: ["slicer", "Cura", "settings"],
    author: {
      name: "Jane Doe",
      slug: "jane-doe",
      avatar: { url: "/images/execs/thomson.webp", alt: "Jane Doe" },
    },
    coverImage: {
      url: "/images/smaker.jpg",
      alt: "Slicer software on a laptop",
    },
  },
  {
    id: "6",
    slug: "intro-to-multi-material-printing",
    title: "Intro to Multi-Material Printing",
    excerpt:
      "Multi-filament systems like the Bambu AMS open up a new world of colour and material combos. Here is what you need to know before diving in.",
    date: "June 5, 2025",
    publishedAt: "2025-06-05T09:30:00Z",
    readingTime: 9,
    image:
      "/images/smaker.jpg",
    alt: "Multi-colour 3D printed model",
    href: "/blogs/intro-to-multi-material-printing",
    category: "Tutorials",
    tags: ["multi-material", "Bambu", "AMS"],
    author: {
      name: "Alex Kim",
      slug: "alex-kim",
      avatar: { url: "/images/execs/thomson.webp", alt: "Alex Kim" },
    },
    coverImage: {
      url: "/images/smaker.jpg",
      alt: "Multi-colour 3D printed model",
    },
  },
];

/** All unique categories for the filter pills — derived from the post data */
export const ALL_CATEGORIES = [
  "All",
  ...Array.from(new Set(blogPosts.map((p) => p.category))).sort(),
] as const;

export type Category = (typeof ALL_CATEGORIES)[number];