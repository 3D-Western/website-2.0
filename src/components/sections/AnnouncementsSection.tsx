'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { koulen } from '@/lib/fonts';
import { announcements } from '@/components/data/announcements';
import { AnnouncementCard } from '@/components/content/AnnouncementCard';

const INITIAL_COUNT = 3;
const LOAD_MORE_COUNT = 3;

export function AnnouncementsSection() {
	const ref = useRef(null);
	const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});

	const y = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);

	const visibleAnnouncements = announcements.slice(0, visibleCount);
	const hasMore = visibleCount < announcements.length;

	return (
		<section ref={ref} className="relative overflow-hidden py-16">
			{/* Parallax background image */}
			<motion.div
				className="absolute inset-0 w-full h-[160%] -top-[30%]"
				style={{
					y,
					backgroundImage: "url('/images/smaker.jpg')",
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>

			{/* Dark overlay */}
			<div className="absolute inset-0 bg-black/60" />

			{/* Content on top */}
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section title */}
				<h2 className={`text-4xl font-bold text-white mb-10 ${koulen.className}`}>
					Announcements
				</h2>

				{/* Card grid */}
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{visibleAnnouncements.map((announcement, index) => (
						<motion.div
							key={announcement.id}
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.5,
								delay: index < INITIAL_COUNT ? index * 0.1 : 0,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="flex"
						>
							<AnnouncementCard announcement={announcement} />
						</motion.div>
					))}
				</div>

				{/* Show more / show less */}
				{hasMore && (
					<div className="flex justify-center mt-10">
						<button
							onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
							className="px-6 py-2.5 rounded-full border border-white/40 text-sm font-medium text-white hover:bg-white/10 transition-colors duration-200"
						>
							Show older announcements
						</button>
					</div>
				)}

				{!hasMore && announcements.length > INITIAL_COUNT && (
					<div className="flex justify-center mt-10">
						<button
							onClick={() => setVisibleCount(INITIAL_COUNT)}
							className="px-6 py-2.5 rounded-full border border-white/40 text-sm font-medium text-white hover:bg-white/10 transition-colors duration-200"
						>
							Show less
						</button>
					</div>
				)}
			</div>
		</section>
	);
}