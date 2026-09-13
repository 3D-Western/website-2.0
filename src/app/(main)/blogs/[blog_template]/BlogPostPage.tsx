"use client";

import { motion } from "framer-motion";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/types/content";
import { notFound } from "next/navigation";
import { formatShortDate } from "@/components/utils";
import { BlogGrid } from "@/components/content/BlogGrid";
import { RelatedItemsSection } from "@/components/content/RelatedItemsSection";

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
interface BlogPostPageProps {
  post: BlogPost | null;
  slug: string;
  allPosts?: BlogPost[];
}

export function BlogPostPage({ post, allPosts = [] }: BlogPostPageProps) {
  if (!post) notFound();

  const related = allPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        post.tags?.some((tag) => p.tags?.some((t) => t.id === tag.id)),
    )
    .slice(0, 3);
  return (
    <main className="min-h-screen">
      {/* ── Header ── */}
      <section className="bg-grey-bg py-25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm text-purple-light hover:text-purple-light/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag.id + tag.title}
                  className="text-xs font-medium px-2.5 py-1 rounded-full gradient uppercase tracking-wide"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight`}
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-5 text-sm text-secondary-text">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar && (
                  <Image
                    src={post.author.avatar.url}
                    alt={post.author.avatar.alt ?? post.author.name}
                    width={28}
                    height={28}
                    className="rounded-full object-cover ring-1 ring-purple-200"
                  />
                )}
                <span className="font-medium ">{post.author.name}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time>{formatShortDate(post.date)}</time>
            </div>

            {post.readingTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Cover image ── */}
      {post.coverImage && (
        <div className="bg-black-bg">
          <div className="relative w-full aspect-21/9 max-h-[400px] overflow-hidden">
            <Image
              src={post.coverImage.url ?? "#"}
              alt={post.coverImage.alt ?? post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <section className="py-16 bg-grey-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {post.excerpt && (
              <p className="text-xl text-primary-text leading-relaxed mb-10 pb-10 border-b border-b-grey">
                {post.excerpt}
              </p>
            )}

            <article>
              <RichText data={post.content} className="text-secondary-text" />
            </article>
          </motion.div>
        </div>
      </section>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <RelatedItemsSection title="More From The Blog">
          <BlogGrid posts={related} />
        </RelatedItemsSection>
      )}
    </main>
  );
}
