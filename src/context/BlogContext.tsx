// lib/context/BlogContext.tsx
"use client";

import {
  createContext,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { BlogPost, Tag } from "@/types/content";
import { apiClient } from "@/lib/cms/api.client";
import { usePaginatedCollection } from "@/hooks/usePaginatedCollection";

type BlogContextValue = {
  tags: Tag[];
  filtered: BlogPost[];
  search: string;
  category: string;
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  setSearch: (value: string) => void;
  setCategory: React.Dispatch<SetStateAction<string>>;
  loadMore: () => Promise<void>;
};

const BlogContext = createContext<BlogContextValue | null>(null);

type BlogProviderProps = {
  initialPosts: BlogPost[];
  tags: Tag[];
  PAGE_SIZE: number;
  children: React.ReactNode;
};

export function BlogProvider({
  initialPosts,
  tags,
  PAGE_SIZE,
  children,
}: BlogProviderProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { items, hasMore, loading, error, loadMore } = usePaginatedCollection(
    initialPosts,
    (args) => apiClient.for("blogs").getMany(args),
    PAGE_SIZE,
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return items.filter((p) => {
      const matchesCategory =
        category === "All" || p.tags?.some((tag) => tag.title === category);
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.title.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [items, search, category]);

  const value: BlogContextValue = {
    tags,
    filtered,
    search,
    category,
    loading,
    hasMore,
    error,
    setSearch,
    setCategory,
    loadMore,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlog() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error("useBlog must be used within a BlogProvider");
  return ctx;
}
