"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { Project, ProjectCategory } from "@/types/content";
import { usePaginatedCollection } from "@/hooks/usePaginatedCollection";
import { projectsApi } from "@/lib/cms/api.client";

type ProjectContextValue = {
  categories: ProjectCategory[];
  featured: Project[];
  filtered: Project[];
  search: string;
  category: string;
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  setSearch: (value: string) => void;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  loadMore: () => Promise<void>;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

type ProjectProviderProps = {
  initialProjects: Project[];
  featured: Project[];
  categories: ProjectCategory[];
  PAGE_SIZE: number;
  children: React.ReactNode;
};

export function ProjectProvider({
  initialProjects,
  featured,
  categories,
  PAGE_SIZE,
  children,
}: ProjectProviderProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { items, loading, hasMore, error, loadMore } = usePaginatedCollection(
    initialProjects,
    (args) => projectsApi.getMany(args),
    PAGE_SIZE,
  );

  const sorted = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
      ),
    [items],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return sorted.filter((p) => {
      const matchesCategory =
        category === "All" || p.categories.some((c) => c.name === category);
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.creator.toLowerCase().includes(q) ||
        p.contributors?.some((c) => c.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [sorted, search, category]);

  const value: ProjectContextValue = {
    categories,
    featured,
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

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx)
    throw new Error("useProjects must be used within a ProjectProvider");
  return ctx;
}
