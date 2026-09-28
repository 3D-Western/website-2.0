// Integration tests: checks that the blog listing page renders posts correctly,
// that filters and search narrow the list, and that links point to the right
// article pages.

import { vi } from "vitest";
import React from "react";

import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BlogGrid } from "@/components/content/BlogGrid";
import { BlogCard } from "@/components/content/BlogCard";
import type { BlogPost } from "@/types/content";

// ─── Mocks ────────────────────────────────────────────────────────────────────

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

// Framer Motion animations would time out in tests — replace with plain divs
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...rest
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...rest}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// ─── Test data ────────────────────────────────────────────────────────────────

const POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "getting-started",
    title: "Getting Started with 3D Printing",
    excerpt: "Your first print starts here.",
    date: "March 12, 2025",
    readingTime: 6,
    coverImage: { url: "/images/post1.jpg", alt: "3D printer" },
    author: {
      id: 1,
      name: "Jane Doe",
      avatar: { url: "/images/av1.jpg", alt: "Jane" },
    },
    tags: [
      { id: 1, title: "Tutorials" },
      { id: 2, title: "beginner" },
    ],
    content: {} as never,
  },
  {
    id: 2,
    slug: "resin-vs-fdm",
    title: "Resin vs FDM",
    excerpt: "A comparison of print technologies.",
    date: "April 1, 2025",
    readingTime: 8,
    coverImage: { url: "/images/post2.jpg", alt: "Resin printer" },
    author: {
      id: 2,
      name: "Alex Kim",
      avatar: { url: "/images/av2.jpg", alt: "Alex" },
    },
    tags: [
      { id: 3, title: "Guides" },
      { id: 4, title: "resin" },
    ],
    content: {} as never,
  },
  {
    id: 3,
    slug: "spring-showcase",
    title: "Club Recap: Spring Showcase",
    excerpt: "A look back at our biggest event.",
    date: "May 2, 2025",
    readingTime: 4,
    coverImage: { url: "/images/post3.jpg", alt: "Showcase" },
    author: {
      id: 3,
      name: "Sam Patel",
      avatar: { url: "/images/av3.jpg", alt: "Sam" },
    },
    tags: [
      { id: 5, title: "News" },
      { id: 6, title: "event" },
    ],
    content: {} as never,
  },
];

// ─── BlogGrid rendering ───────────────────────────────────────────────────────

describe("BlogGrid — rendering", () => {
  it("renders a card for every post passed in", () => {
    render(<BlogGrid posts={POSTS} />);
    expect(screen.getAllByTestId("blog-card")).toHaveLength(3);
  });

  it("renders post titles in the correct order", () => {
    render(<BlogGrid posts={POSTS} />);
    const cards = screen.getAllByTestId("blog-card");
    expect(
      within(cards[0]).getByText("Getting Started with 3D Printing"),
    ).toBeInTheDocument();
    expect(within(cards[1]).getByText("Resin vs FDM")).toBeInTheDocument();
    expect(
      within(cards[2]).getByText("Club Recap: Spring Showcase"),
    ).toBeInTheDocument();
  });

  it("shows skeleton placeholders when isLoading is true", () => {
    render(<BlogGrid posts={[]} isLoading skeletonCount={3} />);
    expect(screen.getAllByTestId("blog-card-skeleton")).toHaveLength(3);
    expect(screen.queryByTestId("blog-card")).not.toBeInTheDocument();
  });

  it("shows the empty-state message when there are no posts", () => {
    render(<BlogGrid posts={[]} />);
    expect(screen.getByText(/no posts match your search/i)).toBeInTheDocument();
  });

  it("shows a custom empty message when provided", () => {
    render(<BlogGrid posts={[]} emptyMessage="Nothing here yet." />);
    expect(screen.getByText("Nothing here yet.")).toBeInTheDocument();
  });

  it("marks the loading container as aria-busy", () => {
    const { container } = render(<BlogGrid posts={[]} isLoading />);
    expect(container.querySelector("[aria-busy='true']")).toBeInTheDocument();
  });
});

// ─── BlogCard → article navigation ───────────────────────────────────────────

describe("BlogCard — navigation links", () => {
  it("Read Post CTA links to /blogs/[slug]", () => {
    render(<BlogCard post={POSTS[0]} />);
    const cta = screen.getByRole("link", {
      name: /read post: getting started with 3d printing/i,
    });
    expect(cta).toHaveAttribute("href", "/blogs/getting-started");
  });

  it("title link also navigates to the correct article", () => {
    render(<BlogCard post={POSTS[0]} />);
    const titleLink = screen.getByRole("link", {
      name: "Getting Started with 3D Printing",
    });
    expect(titleLink).toHaveAttribute("href", "/blogs/getting-started");
  });

  it("each post in the grid links to its own article page", () => {
    render(<BlogGrid posts={POSTS} />);

    // Check all three Read Post links point to the right slugs
    const expectedHrefs = [
      "/blogs/getting-started",
      "/blogs/resin-vs-fdm",
      "/blogs/spring-showcase",
    ];

    POSTS.forEach((post, i) => {
      const link = screen.getByRole("link", {
        name: new RegExp(`read post: ${post.title}`, "i"),
      });
      expect(link).toHaveAttribute("href", expectedHrefs[i]);
    });
  });
});

// ─── Filtering logic (tested via filtered props passed to BlogGrid) ───────────
//
// The actual filter logic lives in BlogsPage (useState + useMemo).
// We test it here by simulating what BlogsPage does and verifying
// BlogGrid renders the right subset.

function filterPosts(posts: BlogPost[], category: string, search: string) {
  const q = search.toLowerCase().trim();
  return posts.filter((p) => {
    const matchesCategory =
      category === "All" || p.tags?.[0].title === category;
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.title.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });
}

describe("Blog listing — filter and search logic", () => {
  it("'All' category shows every post", () => {
    const result = filterPosts(POSTS, "All", "");
    expect(result).toHaveLength(3);
  });

  it("filtering by 'Tutorials' returns only tutorial posts", () => {
    const result = filterPosts(POSTS, "Tutorials", "");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Getting Started with 3D Printing");
  });

  it("filtering by 'News' returns only news posts", () => {
    const result = filterPosts(POSTS, "News", "");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Club Recap: Spring Showcase");
  });

  it("search by title narrows results", () => {
    const result = filterPosts(POSTS, "All", "resin");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("resin-vs-fdm");
  });

  it("search by excerpt narrows results", () => {
    const result = filterPosts(POSTS, "All", "biggest event");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("spring-showcase");
  });

  it("search by tag narrows results", () => {
    const result = filterPosts(POSTS, "All", "beginner");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("getting-started");
  });

  it("search with no matches returns an empty array", () => {
    const result = filterPosts(POSTS, "All", "zzznomatch");
    expect(result).toHaveLength(0);
  });

  it("combined category + search filter works", () => {
    // Guides category + search for 'resin'
    const result = filterPosts(POSTS, "Guides", "resin");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("resin-vs-fdm");
  });

  it("BlogGrid renders only the filtered subset", () => {
    const filtered = filterPosts(POSTS, "Tutorials", "");
    render(<BlogGrid posts={filtered} />);
    expect(screen.getAllByTestId("blog-card")).toHaveLength(1);
    expect(
      screen.getByText("Getting Started with 3D Printing"),
    ).toBeInTheDocument();
  });
});
