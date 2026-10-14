"use client";

import Marquee from "react-fast-marquee";
import { SponsorCard } from "@/components/content/SponsorCard";
import { Sponsor } from "@/types/content";

interface SponsorSectionProps {
  sponsors: Sponsor[];
}

export function SponsorSection({ sponsors }: SponsorSectionProps) {
  return (
    <section className="py-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="eyebrow text-xs text-secondary-text mb-1">
          Made possible by
        </p>
        <h2 className={`text-3xl sm:text-4xl`}>Our Sponsors</h2>
      </div>

      {/*
			  Mask wrapper: position relative + two pseudo-element overlays fade the edges.
			  This avoids overflow entirely — the fade is painted on top, not clipped underneath.
			  No overflow property means the vertical scale-110 on the logo is never clipped.
			*/}
      <div className="relative py-6">
        {/* Left fade overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-black-bg to-transparent" />
        {/* Right fade overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-black-bg to-transparent" />

        <Marquee autoFill direction="left" speed={25} pauseOnHover>
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="mx-4">
              <SponsorCard sponsor={sponsor} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
