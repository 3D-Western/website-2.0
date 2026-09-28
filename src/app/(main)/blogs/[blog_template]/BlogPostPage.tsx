"use client";


import { koulen } from "@/lib/fonts";
import { motion } from "framer-motion";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import type { BlogPost } from "@/types/content";
import { notFound } from "next/navigation";

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
interface BlogPostPageProps {
  post: BlogPost | null;
  slug: string;
}

export function BlogPostPage({ post }: BlogPostPageProps) {
  if (!post) notFound();
  return (
    <main className="min-h-screen">
      {/* ── Header ── */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
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
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 uppercase tracking-wide"
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
            className={`text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight ${koulen.className}`}
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
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
                <span className="font-medium text-foreground">
                  {post.author.name}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time>{post.date}</time>
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
        <div className="bg-slate-100">
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
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 pb-10 border-b border-slate-200">
                {post.excerpt}
              </p>
            )}

            <article>
              <RichText data={post.content} />
            </article>
          </motion.div>
        </div>
      </section>
    </main>
  );
}