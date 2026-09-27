'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cuboid, Shield, Zap, Hammer, ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const fadeUp = {
	initial: { opacity: 0, y: 24 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, margin: '-60px' },
} as const;

const OWL_URL = "https://westernu.brightspace.com/d2l/le/discovery/view/course/151344";

const levelOne = {
	title: "Level 1: Makerspace Access",
	description:
		"General safety training required for all students before accessing either makerspace. Complete this first — every certification below builds on it.",
	duration: "30 minutes",
	icon: Shield,
	features: [
		"General safety protocols",
		"Space rules and guidelines",
		"Emergency procedures",
		"Basic tool awareness",
	],
};

const specializedTrainings = [
	{
		id: 2,
		title: "3D Printing Certification",
		description: "Learn to operate FDM and resin 3D printers independently",
		duration: "2 hours",
		icon: Cuboid,
		features: ["Printer operation", "Slicing software", "Material selection", "Troubleshooting"],
	},
	{
		id: 3,
		title: "Laser Cutting Certification",
		description: "Get certified to use our laser cutting equipment for your projects",
		duration: "1.5 hours",
		icon: Zap,
		features: ["Machine operation", "Material compatibility", "Design preparation", "Safety procedures"],
	},
	{
		id: 4,
		title: "Woodworking Tools Training",
		description: "Comprehensive training on table saws, band saws, and other power tools",
		duration: "3 hours",
		icon: Hammer,
		features: ["Power tool operation", "Safety equipment", "Measurement techniques", "Project planning"],
	},
];

const steps = ["Register on OWL", "Complete Level 1", "Choose Certification"];

function Chip({ children }: { children: React.ReactNode }) {
	return (
		<span className="rounded-full border border-primary-text/15 px-3 py-1 text-xs text-secondary-text">
			{children}
		</span>
	);
}

export function TrainingSection() {
	return (
		<section className="py-20 bg-grey-bg">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
					<h2 className="text-4xl mb-4">Training & Certification</h2>
					<p className="text-xl text-secondary-text max-w-2xl mx-auto">
						Complete required training to unlock access to our equipment and facilities
					</p>
				</motion.div>

				{/* Level 1 — the gate everyone needs */}
				<motion.div
					{...fadeUp}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="rounded-2xl border-2 border-purple-light/40 bg-gradient-to-br from-black-bg to-purple-dark/10 p-8 md:p-10 mb-4"
				>
					<div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center">
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-4">
								<div>
									<Badge className="mb-1 text-purple-light pl-0">REQUIRED</Badge>
									<h3 className="text-2xl">{levelOne.title}</h3>
								</div>
							</div>
							<p className="text-secondary-text max-w-xl">{levelOne.description}</p>
							<div className="flex flex-wrap items-center gap-2">
								<span className="text-sm text-purple-light">{levelOne.duration}</span>
							</div>
							<div className="flex flex-wrap gap-2">
								{levelOne.features.map((f) => (
									<Chip key={f}>{f}</Chip>
								))}
							</div>
						</div>
						<Button asChild variant="gradient" size="pill" className="gap-2 w-full md:w-auto">
							<Link href={OWL_URL} target="_blank" rel="noopener noreferrer">
								Register on OWL <ExternalLink size={16} />
							</Link>
						</Button>
					</div>
				</motion.div>

				<div className="flex items-center justify-center gap-2 text-secondary-text text-sm mb-8">
					<span>Then choose your track</span>
					<ArrowRight size={14} />
				</div>

				{/* Specialized certifications */}
				<div className="grid md:grid-cols-3 gap-6 mb-12">
					{specializedTrainings.map((training, i) => (
						<motion.div
							key={training.id}
							{...fadeUp}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="h-full"
						>
							<Card className="flex flex-col h-full hover:shadow-lg transition-shadow bg-black-bg border-b-grey">
								<CardHeader>
									<div className="flex items-start justify-between mb-4">
										<div className="w-12 h-12 bg-purple-dark/50 rounded-lg flex items-center justify-center">
											<training.icon size={24} className="text-purple-light" />
										</div>
										<Badge variant="secondary" className="text-purple-light">
											{training.duration}
										</Badge>
									</div>
									<CardTitle>{training.title}</CardTitle>
									<CardDescription className="text-secondary-text">{training.description}</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-col flex-1">
									<div className="flex flex-wrap gap-2 mb-6">
										{training.features.map((f) => (
											<Chip key={f}>{f}</Chip>
										))}
									</div>
									<Button asChild variant="outlined" size="pill" className="w-full gap-2 mt-auto">
										<Link href={OWL_URL} target="_blank" rel="noopener noreferrer">
											Register on OWL <ExternalLink size={16} />
										</Link>
									</Button>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>

				{/* Ready to get started — actual 3-step flow */}
				<motion.div {...fadeUp} transition={{ duration: 0.6 }} className="bg-black-bg rounded-2xl p-8 md:p-10 border-b-grey">
					<div className="text-center mb-8">
						<h3 className="text-2xl mb-3">
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-dark to-purple-light">
								Ready to Get Started?
							</span>
						</h3>
						<p className="text-secondary-text max-w-2xl mx-auto">All trainings are available on OWL.</p>
					</div>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3 mb-8">
						{steps.map((step, i) => (
							<div key={step} className="flex items-center gap-3">
								<div className="flex flex-col items-center gap-2 text-center w-36">
									<div className="w-9 h-9 rounded-full bg-purple-dark/50 flex items-center justify-center text-purple-light font-semibold">
										{i + 1}
									</div>
									<span className="text-sm text-primary-text text-nowrap">{step}</span>
								</div>
								{i < steps.length - 1 && (
									<ArrowRight className="text-primary-text/30 hidden sm:block" size={20} />
								)}
							</div>
						))}
					</div>
					<div className="flex justify-center">
						<Button asChild variant="gradient" size="pill" className="gap-2">
							<Link href="#" target="_blank" rel="noopener noreferrer">
								View Training Schedule <ExternalLink size={20} />
							</Link>
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
