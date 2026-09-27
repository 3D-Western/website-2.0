'use client';

import Image from "next/image";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { PenTool, Boxes, Cog, FlaskConical, Sparkles } from "lucide-react";

const processSteps = [
	{ label: "Concept", icon: PenTool },
	{ label: "Prototype", icon: Boxes },
	{ label: "Fabricate", icon: Cog },
	{ label: "Test", icon: FlaskConical },
];

const equipment = [
	"3D Printers",
	"Laser Cutters",
	"Water Jet Cutters",
	"Cricut Machines",
	"Sewing Machines",
	"Soldering Stations",
];

export function AboutInfoSection() {
	return (
		<section className="w-full py-20">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24">
				{/* What We Do */}
				<div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="relative aspect-4/3 clip-corners overflow-hidden"
					>
						<Image
							src="/images/vision.jpg"
							alt="Students prototyping in the makerspace"
							fill
							className="object-cover"
						/>
					</motion.div>
					<div className="flex flex-col gap-5">
						<h2>What We Do</h2>
						<p className="text-primary-text/80 text-lg">
							Whether you&apos;re building your first project or developing a
							polished prototype, our team provides guidance, training, and a
							place to experiment.
						</p>
						<p className="text-primary-text/80">
							Across both facilities, we support every step of the creation
							process, from concept sketching and rapid prototyping to
							manufacturing fabrication, testing, and idea validation. Walk
							into the Sabourin Makerspace for woodworking, or submit a job
							through our dashboard (coming soon!) for 3D prints, CNC, laser,
							and water jet cutting.
						</p>
						<div className="flex flex-wrap items-center gap-2 mt-2">
							{processSteps.map((step, i) => {
								const Icon = step.icon;
								return (
									<div key={step.label} className="flex items-center gap-2">
										<div className="flex items-center gap-1.5 rounded-full border border-primary-text/15 px-3 py-1.5 text-sm text-primary-text/80">
											<Icon className="size-3.5 text-purple-light" strokeWidth={1.75} />
											{step.label}
										</div>
										{i < processSteps.length - 1 && (
											<span className="text-primary-text/30">→</span>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Our Equipment */}
				<div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
					<div className="order-2 md:order-1 flex flex-col gap-5">
						<h2>Our Equipment</h2>
						<p className="text-primary-text/80 text-lg">
							We provide a diverse suite of equipment for creational use.
						</p>
						<p className="text-primary-text/80">
							Students can access our equipment in the Sabourin Makerspace
							after completing Level 1 training, with a growing
							inventory of digital fabrication and woodworking tools.
						</p>
						<div className="flex flex-wrap gap-2 mt-2">
							{equipment.map((item) => (
								<span
									key={item}
									className="rounded-full border border-primary-text/15 px-3 py-1.5 text-sm text-primary-text/80"
								>
									{item}
								</span>
							))}
						</div>
					</div>
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="order-1 md:order-2 relative aspect-4/3 clip-corners overflow-hidden"
					>
						<Image
							src="/images/equipment.jpg"
							alt="Sabourin makerspace equipment"
							fill
							className="object-cover"
						/>
					</motion.div>
				</div>

				{/* Our Vision */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto"
				>
					{/* <Badge className="text-primary-text">
						<Sparkles className="size-3.5 mr-1" />
						Free to join
					</Badge> */}
					<h2>Our Vision</h2>
					<p className="text-primary-text/80 text-lg">
						As 3DW expands, our events and dashboard will become the central
						portal for accessing services, workshops, equipment bookings, and
						club activities for students, entrepreneurs, creators, and
						innovators alike.
					</p>
					<p className="text-primary-text/80 text-lg">
						We&apos;re building a community here at Western where anyone can
						create, learn, and innovate, no experience required, and
						completely free of charge.
					</p>
				</motion.div>
			</div>
		</section>
	);
}