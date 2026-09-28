// Unit tests for the BlogCard and BlogCardSkeleton components.
import { vi } from "vitest";
import React from "react";

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogCard, BlogCardSkeleton } from "@/components/content/BlogCard";
import type { BlogPost } from "@/types/content";

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

// ─── Test data ────────────────────────────────────────────────────────────────

const mockPost: BlogPost = {
  id: 1,
  slug: "test-post",
  title: "My First 3D Print",
  excerpt: "A short summary of the post.",
  date: "March 12, 2025",
  readingTime: 5,
  coverImage: {
    url: "/images/sampleBlog.jpg",
    alt: "A 3D printer",
  },
  author: {
    id: 1,
    name: "Jane Doe",
    avatar: { url: "/images/avatar.jpg", alt: "Jane Doe" },
  },
  tags: [
    { id: 1, title: "Tutorials" },
    { id: 2, title: "beginner" },
  ],
  content: {} as never, // not rendered by BlogCard
};

// A post with only the required fields (no optional ones)
const minimalPost: BlogPost = {
  id: 2,
  slug: "minimal-post",
  title: "Minimal Post",
  date: "April 1, 2025",
  author: {
    id: 2,
    name: "Alex Kim",
    avatar: { url: "/images/avatar2.jpg", alt: "Alex Kim" },
  },
  content: {} as never,
};

// ─── BlogCard tests ───────────────────────────────────────────────────────────

describe("BlogCard", () => {
  it("renders the post title", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("My First 3D Print")).toBeInTheDocument();
  });

  it("renders the excerpt when provided", () => {
    render(<BlogCard post={mockPost} />);
    expect(
      screen.getByText("A short summary of the post."),
    ).toBeInTheDocument();
  });

  it("shows fallback text when excerpt is missing", () => {
    render(<BlogCard post={minimalPost} />);
    expect(
      screen.getByText("Click to read more about the blog!"),
    ).toBeInTheDocument();
  });

  it("renders the date", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("March 12, 2025")).toBeInTheDocument();
  });

  it("renders reading time when provided", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("5 min")).toBeInTheDocument();
  });

  it("does not render reading time when omitted", () => {
    render(<BlogCard post={minimalPost} />);
    expect(screen.queryByText(/min/)).not.toBeInTheDocument();
  });

  it("renders the author name", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("renders the cover image with correct alt text", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByAltText("A 3D printer")).toBeInTheDocument();
  });

  it("falls back to sampleBlog.jpg when no coverImage is provided", () => {
    render(<BlogCard post={minimalPost} />);
    // Select the thumbnail specifically by its fallback alt text
    const thumbnail = screen.getByAltText("Blog Post");
    expect(thumbnail).toHaveAttribute("src", "/images/sampleBlog.jpg");
  });

  it("Read Post link points to the correct blog URL", () => {
    render(<BlogCard post={mockPost} />);
    const link = screen.getByRole("link", {
      name: /read post: my first 3d print/i,
    });
    expect(link).toHaveAttribute("href", "/blogs/test-post");
  });

  it("title link also points to the correct blog URL", () => {
    render(<BlogCard post={mockPost} />);
    const link = screen.getByRole("link", { name: "My First 3D Print" });
    expect(link).toHaveAttribute("href", "/blogs/test-post");
  });

  it("is wrapped in an <article> element", () => {
    const { container } = render(<BlogCard post={mockPost} />);
    expect(container.querySelector("article")).toBeInTheDocument();
  });

  it("has a data-testid for easy selection in E2E tests", () => {
    render(<BlogCard post={mockPost} />);
    expect(screen.getByTestId("blog-card")).toBeInTheDocument();
  });
});

// ─── BlogCardSkeleton tests ───────────────────────────────────────────────────

describe("BlogCardSkeleton", () => {
  it("renders a skeleton placeholder element", () => {
    render(<BlogCardSkeleton />);
    expect(screen.getByTestId("blog-card-skeleton")).toBeInTheDocument();
  });

  it("is hidden from screen readers (aria-hidden)", () => {
    render(<BlogCardSkeleton />);
    expect(screen.getByTestId("blog-card-skeleton")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("contains no links or headings (it is purely decorative)", () => {
    render(<BlogCardSkeleton />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
