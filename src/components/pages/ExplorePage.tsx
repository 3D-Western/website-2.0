'use client'; 
import { koulen } from "@/lib/fonts";
import { motion } from 'framer-motion';
import { AnnouncementsSection } from '@/components/sections/AnnouncementsSection';
import { StudentSection } from "../sections/StudentSection";
import ProjectsSection from "../sections/ProjectsSection";
import { TeamSection } from "../sections/TeamSection";
import { SocialsSection } from "../sections/SocialsSection";
import { SponsorSection } from "../sections/SponsorSection";


export function ExplorePage() {
	return (
		<main className="min-h-screen pt-[88px]">
			{/* Header */}
			<section className="bg-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
						className={`text-3xl sm:text-4xl lg:text-5xl mb-4 ${koulen.className}`}
					>
						Explore
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
						className="text-xl text-muted-foreground max-w-2xl"
					>
						Updates, projects, dev notes, and more
					</motion.p>
				</div>
			</section>
            <AnnouncementsSection />
			<ProjectsSection />
            <StudentSection />
			<TeamSection />
			<SocialsSection />
			<SponsorSection />
			
        </main>
    )
}