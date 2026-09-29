'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import { Sponsor } from '@/components/data/sponsors';

interface SponsorCardProps {
	sponsor: Sponsor;
}

export function SponsorCard({ sponsor }: SponsorCardProps) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Link
					href={sponsor.website}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Visit ${sponsor.name}`}
					className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 rounded-2xl"
				>
					{/*
					  scale lives on the Card itself — NOT on a parent with overflow-hidden.
					  The Card has overflow-hidden for its own border-radius, but scale on
					  itself is fine; it's only clipped when a *parent* has overflow hidden.
					*/}
					<Card className="w-44 h-44 bg-white border-slate-200 shadow-sm hover:border-purple-300 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group">
						<CardContent className="p-0 w-full h-full flex items-center justify-center">
							{/* scale on the inner image container, not the card — no overflow parent issue */}
							<div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110">
								<Image
									src={sponsor.logo}
									alt={sponsor.alt}
									fill
									sizes="96px"
									className="object-contain"
								/>
							</div>
						</CardContent>
					</Card>
				</Link>
			</TooltipTrigger>
			<TooltipContent className="bg-zinc-900 border-purple-500/30 px-4 py-2">
				<p className="font-semibold text-white text-sm">{sponsor.name}</p>
			</TooltipContent>
		</Tooltip>
	);
}