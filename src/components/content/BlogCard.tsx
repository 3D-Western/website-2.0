"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { BlogPost } from "@/types/content";

interface BlogCardProps {
  post: BlogPost;
}

// ---------------------------------------------------------------------------
// Loaded card
// ---------------------------------------------------------------------------

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article
      data-testid="blog-card"
      className="group flex flex-col sm:flex-row bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      {/* Thumbnail */}
      <Link
        href={`/blogs/${post.slug}`}
        className="relative block w-full sm:w-72 shrink-0 min-h-[220px] sm:min-h-0 overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={post.coverImage?.url ?? "/images/sampleBlog.jpg"}
          alt={post.coverImage?.alt ?? "Blog Post"}
          fill
          sizes="(max-width: 640px) 100vw, 288px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className=" flex flex-col w-full justify-center gap-3 p-6">
        {/* Category + date + reading time */}
        <div className="flex flex-wrap items-center gap-3">
          {post.tags?.map((tag) => {
            return (
              <span
                key={tag.id + tag.title}
                className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600"
              >
                {tag.title}
              </span>
            );
          })}

          <span className="text-xs text-slate-400">{post.date}</span>
          {post.readingTime && (
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              {post.readingTime} min
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold leading-tight text-slate-900">
          <Link
            href={`/blogs/${post.slug}`}
            className="hover:text-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {post.excerpt ? post.excerpt : "Click to read more about the blog!"}
        </p>

        {/* Author + CTA */}
        <div className="flex items-center justify-between mt-1">
          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.avatar && (
                <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-slate-200 shrink-0">
                  <Image
                    src={post.author.avatar.url}
                    alt={post.author.avatar.alt ?? post.author.name}
                    fill
                    sizes="5vw"
                    className="object-cover"
                  />
                </div>
              )}
              {/* connect to teams page */}
              {/* {post.author.slug ? ( */}
              {/*   <Link */}
              {/*     href={`/team/${post.author.slug}`} */}
              {/*     className="text-xs font-medium text-slate-700 hover:text-slate-500 transition-colors" */}
              {/*   > */}
              {/*     {post.author.name} */}
              {/*   </Link> */}
              {/* ) : ( */}
              {/*   <span className="text-xs font-medium text-slate-700"> */}
              {/*     {post.author.name} */}
              {/*   </span> */}
              {/* )} */}
              <span className="text-xs font-medium text-slate-700">
                {post.author.name}
              </span>
            </div>
          )}

          <Link
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-2 text-slate-800 hover:text-slate-600 transition-colors ml-auto"
            aria-label={`Read post: ${post.title}`}
          >
            Read Post
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Skeleton — shown while posts are loading (e.g. future CMS fetch)
// ---------------------------------------------------------------------------

export function BlogCardSkeleton() {
  return (
    <div
      data-testid="blog-card-skeleton"
      className="flex flex-col sm:flex-row bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden animate-pulse"
      aria-hidden="true"
    >
      {/* Thumbnail placeholder */}
      <div className="w-full sm:w-72 shrink-0 min-h-[220px] sm:min-h-0 bg-slate-200" />

      {/* Content placeholder */}
      <div className="flex flex-col justify-center gap-4 p-6 w-full">
        <div className="flex gap-3">
          <div className="h-5 w-20 rounded-full bg-slate-200" />
          <div className="h-5 w-24 rounded bg-slate-100" />
        </div>
        <div className="space-y-2">
          <div className="h-6 w-3/4 rounded bg-slate-200" />
          <div className="h-6 w-1/2 rounded bg-slate-200" />
        </div>
        <div className="space-y-1.5">
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-2/3 rounded bg-slate-100" />
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-200" />
            <div className="h-4 w-20 rounded bg-slate-100" />
          </div>
          <div className="h-4 w-20 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
