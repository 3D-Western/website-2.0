// components/content/FilterBar.tsx
"use client";
import { Search, X } from "lucide-react";
import CategoryPill from "./CategoryPill";
import { useId } from "react";

type FilterOption = {
  name: string;
  description?: string;
};

type FilterBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  category: string;
  onCategoryChange: (value: string) => void;
  options: FilterOption[];
  resultCount: number;
  resultLabel: string; // singular form, e.g. "project" or "post"
  includeAllOption?: boolean; // default true
};

export function FilterBar({
  search,
  onSearchChange,
  searchPlaceholder,
  category,
  onCategoryChange,
  options,
  resultCount,
  resultLabel,
  includeAllOption = true,
}: FilterBarProps) {
  const searchId = useId();
  const pills = includeAllOption
    ? [{ name: "All", description: "All" }, ...options]
    : options;

  return (
    <section className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative w-full sm:w-72">
            <label htmlFor={searchId} className="sr-only">
              {searchPlaceholder}
            </label>
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id={searchId}
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            />
            {search && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div
            role="group"
            aria-label="Filter by category"
            className="flex flex-wrap gap-2"
          >
            {pills.map((opt) => (
              <CategoryPill
                key={opt.name}
                title={opt.name}
                handleCategory={onCategoryChange}
                category={category}
              ></CategoryPill>
            ))}
          </div>

          <span className="sm:ml-auto text-xs text-slate-400 whitespace-nowrap">
            {resultCount} {resultCount === 1 ? resultLabel : `${resultLabel}s`}
          </span>
        </div>
      </div>
    </section>
  );
}
