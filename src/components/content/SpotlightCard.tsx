"use client";

import Image from "next/image";
import { Spotlight } from "@/components/data/spotlights";

interface SpotlightCardProps {
  spotlight: Spotlight;
}

export function SpotlightCard({ spotlight }: SpotlightCardProps) {
  return (
    // Not using Card component here — its built-in gap-6 and flex-col
    // fight the side-by-side image layout. Plain div gives full control.
    <div className="flex flex-col sm:flex-row overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
      {/* Left — project photo */}
      <div className="relative w-full sm:w-80 shrink-0 min-h-[280px] sm:min-h-full bg-slate-800">
        <Image
          src={spotlight.image}
          alt={spotlight.alt}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover opacity-85"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pt-10 pb-5">
          <p className="text-sm font-semibold text-white">{spotlight.name}</p>
          <p className="text-xs text-white/65 mt-0.5">{spotlight.program}</p>
        </div>
      </div>

      {/* Right — quote grows, project box is pinned to bottom */}
      <div className="flex flex-col flex-1">
        <div className="flex-1 flex items-center px-6 py-6">
          <blockquote className="text-base leading-relaxed text-slate-700 italic border-l-2 border-purple-300 pl-4">
            &quot;{spotlight.quote}&quot;
          </blockquote>
        </div>

        <div className="bg-slate-50 border-t border-slate-100 px-6 py-5">
          <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-2">
            Their project
          </p>
          <p className="text-sm font-semibold text-slate-800 mb-1">
            {spotlight.projectTitle}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            {spotlight.projectDescription}
          </p>
          <span className="mt-3 inline-block text-[11px] px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
            {spotlight.category}
          </span>
        </div>
      </div>
    </div>
  );
}

