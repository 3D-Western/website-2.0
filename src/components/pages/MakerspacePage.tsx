'use client';

import { koulen } from '@/lib/fonts';
import { CalendarSection } from '@/components/sections/CalendarSection';
import { motion } from 'framer-motion';
import { DASHBOARD_TRAINING_URL } from '@/components/data/links';


export function MakerspacePage() {
	return (
		<main className="min-h-screen pt-[88px]">
			{/* Header */}
			<section className="bg-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
						className={`font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 ${koulen.className}`}
					>
						Accessing the Makerspaces
					</motion.h1>
					<motion.ul
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
						className="space-y-1"
					>
						<li>
							For Western students: Accessing the makerspace requires Level 1 training through your 3D Western account, which you can start{' '}
							<a href={DASHBOARD_TRAINING_URL} target="_blank" rel="noopener noreferrer" className="underline font-semibold">here</a>.
						</li>
						<li>
							Are you an organization looking to use the makerspace?{' '}
							<a href="mailto:contact@3dwestern.ca" className="underline font-semibold">Contact us</a>.
						</li>
					</motion.ul>

				</div>
			</section>

			<CalendarSection />
		</main>
	);
}
