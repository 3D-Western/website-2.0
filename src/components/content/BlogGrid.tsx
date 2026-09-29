"use client";

// Wraps a list of BlogCard elements with animated entry and empty/loading states.
// Keeps layout concerns out of BlogsPage so it can be reused elsewhere
// (e.g. a "Related posts" section on the article page).

import { motion, AnimatePresence } from "framer-motion";
import { BlogCard, BlogCardSkeleton } from "./BlogCard";
import type { BlogPost } from "@/types/content";

interface BlogGridProps {
  posts: BlogPost[];
  /** Show skeleton placeholders instead of cards */
  isLoading?: boolean;
  /** How many skeletons to render while loading */
  skeletonCount?: number;
  /** Message shown when posts is empty and not loading */
  emptyMessage?: string;
}

export function BlogGrid({
  posts,
  isLoading = false,
  skeletonCount = 4,
  emptyMessage = "No posts match your search. Try a different keyword or category.",
}: BlogGridProps) {
  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-8"
        aria-busy="true"
        aria-label="Loading posts"
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-slate-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence mode="popLayout">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: 0.4,
              // Only stagger the first page; subsequent "load more" items appear instantly
              delay: index < 4 ? index * 0.08 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

