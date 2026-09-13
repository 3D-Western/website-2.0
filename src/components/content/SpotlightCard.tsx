"use client";

import { Spotlight } from "@/types/content";
import Image from "next/image";

interface SpotlightCardProps {
  spotlight: Spotlight;
}

export function SpotlightCard({ spotlight }: SpotlightCardProps) {
  return (
    <div className="clip-corners-lg flex flex-col sm:flex-row overflow-hidden bg-grey-bg border border-b-grey">
      {/* Left — project photo */}
      <div className="relative w-full sm:w-80 shrink-0 min-h-[280px] sm:min-h-full bg-black-bg">
        <Image
          src={spotlight.image.url}
          alt={spotlight.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover opacity-85"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black-bg to-transparent px-5 pt-10 pb-5">
          <p className="text-base font-semibold text-primary-text">
            {spotlight.name}
          </p>
          <p className="text-[13px] text-secondary-text mt-0.5">
            {spotlight.program}
          </p>
        </div>
      </div>

      {/* Right — project info up top, quote right below it, tags pinned top-right */}
      <div className="flex flex-1 flex-col gap-4 px-6 py-6">
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow text-xs text-purple-light">Their project</p>
          <div className="flex shrink-0 gap-2">
            {spotlight.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block text-xs px-3 py-1 rounded-full gradient"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-base font-semibold text-primary-text mb-1">
            {spotlight.name}
          </p>
          <p className="text-[15px] leading-relaxed text-secondary-text sm:text-base">
            {spotlight.description}
          </p>
        </div>

        <blockquote className="text-base leading-relaxed text-primary-text italic border-l-2 border-purple-light pl-4">
          &quot;{spotlight.quote}&quot;
        </blockquote>
      </div>
    </div>
  );
}
