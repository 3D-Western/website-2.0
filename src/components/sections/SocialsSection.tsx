'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { koulen } from '@/lib/fonts';
import { instagramPosts } from '@/components/data/socials';
import { InstaPostCard } from '@/components/content/InstaPostCard';

// How many cards render on each side of the centered post.
// 2 on each side + 1 center = 5 visible cards, matching the design.
const SIDE_COUNT = 2;

// Horizontal distance (px) between each card's center point. Smaller =
// tighter overlap, larger = more spread out.
const CARD_SPACING = 190;

export function SocialsSection() {
	const [current, setCurrent] = useState(0);
	const total = instagramPosts.length;
	const hasEnoughForCarousel = total > 1;

	// Wraps an index into range so the carousel loops infinitely in both
	// directions instead of dead-ending at the first/last post.
	const wrap = useCallback((i: number) => ((i % total) + total) % total, [total]);

	const goTo = (index: number) => setCurrent(wrap(index));
	const prev = () => goTo(current - 1);
	const next = () => goTo(current + 1);

	// The offsets we render relative to the current center card, e.g.
	// [-2, -1, 0, 1, 2]. Offset 0 is always the centered/active post.
	const offsets = Array.from({ length: SIDE_COUNT * 2 + 1 }, (_, i) => i - SIDE_COUNT);

	return (
		<section className="py-16 bg-white overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-10">
					<p className="text-xs font-medium tracking-widest uppercase text-slate-400 mb-1">
						Follow along
					</p>
					<h2 className={`text-3xl sm:text-4xl ${koulen.className}`}>
						Socials
					</h2>
				</div>

				{/* Carousel viewport */}
				<div className="relative h-[400px] sm:h-[440px] flex items-center justify-center">
					{hasEnoughForCarousel && (
						<>
							{/* Arrow buttons sit on top of the outer cards, like the
							    reference design, rather than off to the side. */}
							<button
								onClick={prev}
								aria-label="Previous post"
								className="absolute left-0 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors duration-200 shadow-sm"
							>
								<ChevronLeft className="w-4 h-4" />
							</button>
							<button
								onClick={next}
								aria-label="Next post"
								className="absolute right-0 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors duration-200 shadow-sm"
							>
								<ChevronRight className="w-4 h-4" />
							</button>
						</>
					)}

					{offsets.map((offset) => {
						const index = wrap(current + offset);
						const post = instagramPosts[index];
						const isCenter = offset === 0;
						const distance = Math.abs(offset);

						// Scale + fade cards down the further they sit from center,
						// so the middle card reads as the "active" one — this is
						// what creates the coverflow look from the design.
						const scale = isCenter ? 1 : distance === 1 ? 0.8 : 0.62;
						const opacity = isCenter ? 1 : distance === 1 ? 0.85 : 0.55;

						// On small screens there isn't room for the two outermost
						// cards — hide them rather than letting them spill outside
						// the viewport with no way to reach them except the arrows.
						const hiddenOnMobile = distance === SIDE_COUNT;

						return (
							<motion.div
								key={post.id}
								className={`absolute ${hiddenOnMobile ? 'hidden sm:block' : ''} ${
									isCenter ? '' : 'cursor-pointer'
								}`}
								style={{ zIndex: SIDE_COUNT - distance }}
								animate={{ x: offset * CARD_SPACING, scale, opacity }}
								transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
								// Clicking a side card brings it to center, like a
								// physical coverflow — a nice bonus interaction on
								// top of the arrow buttons.
								onClick={() => !isCenter && goTo(index)}
							>
								<InstaPostCard post={post} active={isCenter} />
							</motion.div>
						);
					})}
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
									i === current ? 'w-5 h-2 bg-purple-500' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
								}`}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}