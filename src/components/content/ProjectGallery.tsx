"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectImage } from "@/types/content";

type ProjectGalleryProps = {
  images: ProjectImage[];
};

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogId = useId();
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setActiveIndex((current) => {
      if (current !== null) triggerRefs.current[current]?.focus();
      return null;
    });
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? i : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, close, showPrev, showNext]);

  if (images.length === 0) return null;

  return (
    <>
      <div
        role="list"
        aria-label="Project media gallery"
        className={`grid gap-3 ${
          images.length === 1 ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3"
        }`}
      >
        {images.map((image, i) => (
          <button
            key={image.src + i}
            ref={(el) => {
              triggerRefs.current[i] = el;
            }}
            onClick={() => setActiveIndex(i)}
            role="listitem"
            aria-label={`Open image ${i + 1} of ${images.length}: ${image.alt}`}
            className={`relative overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
              i === 0 && images.length > 2
                ? "col-span-2 row-span-2 aspect-video"
                : "aspect-square"
            }`}
          >
            <Image
              src={image.src}
              alt={`${image.alt} — image ${i + 1} of ${images.length}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${activeIndex + 1} of ${images.length}: ${images[activeIndex].alt}`}
            id={dialogId}
            className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4"
            onClick={close}
          >
            <button
              ref={closeButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close gallery"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <X className="w-5 h-5" />
            </button>

            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex].src}
                alt={`${images[activeIndex].alt} — image ${activeIndex + 1} of ${images.length}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {images.length > 1 && (
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/70">
                {activeIndex + 1} / {images.length}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
