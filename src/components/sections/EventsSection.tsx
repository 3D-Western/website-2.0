// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { motion } from 'motion/react';
// import { koulen } from '@/lib/fonts';
// import { highlightEvents } from '@/components/archive/events';
// import { EventCard } from '../EventCard';
// import { EventModal } from '../EventModal';
// import { Event } from '@/components/archive/events';

// export function EventsSection() {
// 	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

// 	const openModal = (event: Event) => {
// 		setSelectedEvent(event);
// 	};

// 	const closeModal = () => {
// 		setSelectedEvent(null);
// 	};

// 	return (
// 		<section className="py-12 lg:py-20 bg-white">
// 			<div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
// 				<motion.div
// 					initial={{ opacity: 0, y: 30 }}
// 					whileInView={{ opacity: 1, y: 0 }}
// 					viewport={{ once: true, margin: "-100px" }}
// 					transition={{ duration: 0.6 }}
// 					className="text-center flex flex-col gap-2 mb-12"
// 				>
// 					<div className={`text-3xl lg:text-5xl xl:text-6xl font-bold py-4 ${koulen.className}`}>
// 						UPCOMING EVENTS
// 					</div>
// 				</motion.div>

// 				<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 mt-10">
// 					{highlightEvents.map((event, index) => (
// 						<motion.div
// 							key={event.id}
// 							initial={{ opacity: 0, y: 50 }}
// 							whileInView={{ opacity: 1, y: 0 }}
// 							viewport={{ once: true, margin: "-50px" }}
// 							transition={{ duration: 0.5, delay: index * 0.1 }}
// 						>
// 							<EventCard event={event} onCardClick={openModal} />
// 						</motion.div>
// 					))}
// 				</div>

// 				<motion.div
// 					initial={{ opacity: 0, scale: 0.9 }}
// 					whileInView={{ opacity: 1, scale: 1 }}
// 					viewport={{ once: true }}
// 					transition={{ duration: 0.5, delay: 0.3 }}
// 					className="text-center mt-12"
// 				>
// 					<Link
// 						href="/events"
// 						className="inline-block text-lg lg:text-xl underline-offset-4 transition-transform duration-300 hover:underline hover:scale-110"
// 					>
// 						View All Events
// 					</Link>
// 				</motion.div>
// 			</div>
// 			<EventModal event={selectedEvent} isOpen={!!selectedEvent} onClose={closeModal} />
// 		</section>
// 	);
// }

