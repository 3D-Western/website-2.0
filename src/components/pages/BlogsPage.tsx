"use client";
import { BlogGrid } from "../content/BlogGrid";
import { useBlog } from "@/context/BlogContext";
import { FilterBar } from "../content/FilterBar";
import PageHeader from "../content/Header";
import { CollectionFooter } from "../content/CollectionFooter";

export function BlogsPage() {
  const {
    tags,
    filtered,
    search,
    loading,
    category,
    hasMore,
    error,
    setSearch,
    setCategory,
    loadMore,
  } = useBlog();

  return (
    <main className="min-h-screen pt-[88px]">
      {/* Header */}
      <PageHeader
        title="Blog"
        description="Articles, guides, and updates on technology"
      ></PageHeader>
      {/* Filter bar */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search projects..."
        category={category}
        onCategoryChange={setCategory}
        options={tags.map((tag) => ({
          name: tag.title,
          description: tag.description,
        }))}
        resultCount={filtered.length}
        resultLabel="post"
        includeAllOption
      />
      {/* Post list */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogGrid posts={filtered} />
          <CollectionFooter
            error={error}
            loading={loading}
            collection="blogs"
            hasMore={hasMore}
            onLoadMore={loadMore}
          ></CollectionFooter>
        </div>
      </section>
    </main>
  );
}
