"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { instagramPosts as samplePosts } from "@/components/data/socials";
import { InstaPostCard } from "@/components/content/InstaPostCard";
import { Button } from "../ui/button";
import { InstagramPost } from "@/types/content";

// How many cards render on each side of the centered post.
// 2 on each side + 1 center = 5 visible cards, matching the design.
const SIDE_COUNT = 2;

// Horizontal distance (px) between each card's center point. Smaller =
// tighter overlap, larger = more spread out.
const CARD_SPACING = 190;

interface SocialsSectionProps {
  posts: InstagramPost[];
}

export function SocialsSection({ posts }: SocialsSectionProps) {
  const instagramPosts: InstagramPost[] = posts ?? samplePosts;
  const [current, setCurrent] = useState(0);
  const total = instagramPosts.length;
  const hasEnoughForCarousel = total > 1;

  // Wraps an index into range so the carousel loops infinitely in both
  // directions instead of dead-ending at the first/last post.
  const wrap = useCallback(
    (i: number) => ((i % total) + total) % total,
    [total],
  );

  const goTo = (index: number) => setCurrent(index);
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // The offsets we render relative to the current center card, e.g.
  // [-2, -1, 0, 1, 2]. Offset 0 is always the centered/active post.
  const offsets = Array.from(
    { length: SIDE_COUNT * 2 + 1 },
    (_, i) => i - SIDE_COUNT,
  );

  return (
    <section className="py-16 bg-grey-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow text-xs text-secondary-text mb-1">
            Follow along
          </p>
          <h2 className={`text-3xl sm:text-4xl `}>Socials</h2>
        </div>

        {/* Carousel viewport */}
        <div className="relative h-[400px] sm:h-[440px] flex items-center justify-center">
          {hasEnoughForCarousel && (
            <>
              {/* Arrow buttons sit on top of the outer cards, like the
							    reference design, rather than off to the side. */}
              <Button
                size="icon"
                variant="outlined"
                onClick={prev}
                aria-label="Previous post"
                className="absolute left-0 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outlined"
                onClick={next}
                aria-label="Next post"
                className="absolute right-0 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
          {offsets.map((offset) => {
            const absoluteIndex = current + offset;
            const index = wrap(absoluteIndex);
            const post = instagramPosts[index];
            const isCenter = offset === 0;
            const distance = Math.abs(offset);

            const scale = isCenter ? 1 : distance === 1 ? 0.8 : 0.62;
            const opacity = isCenter ? 1 : distance === 1 ? 0.85 : 0.55;

            return (
              <motion.div
                key={absoluteIndex}
                className={`absolute ${
                  distance === SIDE_COUNT ? "hidden sm:block" : ""
                } ${isCenter ? "" : "cursor-pointer"}`}
                style={{ zIndex: SIDE_COUNT - distance }}
                animate={{
                  x: offset * CARD_SPACING,
                  scale,
                  opacity,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => !isCenter && goTo(index)}
              >
                <InstaPostCard post={post} active={isCenter} />
              </motion.div>
            );
          })}{" "}
        </div>

        {/* Dot indicators, consistent with StudentSection's slider */}
        {hasEnoughForCarousel && (
          <div className="flex justify-center gap-2 mt-6">
            {instagramPosts.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to post ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === wrap(current)
                    ? "w-5 h-2 bg-purple-light"
                    : "w-2 h-2 bg-primary-text/25 hover:bg-primary-text/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
