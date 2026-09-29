'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Github, Globe } from 'lucide-react';
import { MenuItem } from '@/components/data/teamdata';

interface TeamMemberCardProps {
	member: MenuItem;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
	const linkedinHref = member.linkedin
		? member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`
		: null;
	const githubHref = member.github
		? member.github.startsWith('http') ? member.github : `https://${member.github}`
		: null;
	const websiteHref = member.website
		? member.website.startsWith('http') ? member.website : `https://${member.website}`
		: null;

	return (
		<div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
			{/* Portrait photo.
			    IMPORTANT: this used to be a fixed pixel height (h-[240px]) with
			    a width that changes per breakpoint/column-count. That meant the
			    box's width:height ratio was different at every screen size, so
			    object-cover had to zoom in by a different, unpredictable amount
			    each time — on narrow columns it zoomed in so far that half the
			    face got cropped off.
			    Using a fixed aspect-ratio instead means width and height always
			    scale together. The crop framing stays identical no matter how
			    wide or narrow the card ends up — it just gets bigger/smaller,
			    never more/less cropped. 4:5 is a standard portrait headshot
			    ratio; adjust if your source photos are a different shape. */}
			<div className="relative w-full aspect-[4/5] bg-slate-100 overflow-hidden shrink-0">
				<Image
					src={member.image}
					alt={member.name}
					fill
					sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 20vw"
					className="object-cover object-top"
				/>
			</div>

			{/* Compact body */}
			<div className="px-2.5 pt-2 pb-2.5 flex flex-col gap-0.5">
				<div className="flex items-center justify-between gap-1">
					<p className="text-xs font-semibold text-slate-900 truncate leading-snug">
						{member.name} {member.emoji && <span aria-hidden="true">{member.emoji}</span>}
					</p>
					<div className="flex gap-1 shrink-0">
						{linkedinHref && (
							<Link href={linkedinHref} target="_blank" rel="noopener noreferrer"
								aria-label={`${member.name} on LinkedIn`}
								className="w-5 h-5 flex items-center justify-center text-slate-300 hover:text-purple-600 transition-colors duration-200">
								<Linkedin className="w-2.5 h-2.5" />
							</Link>
						)}
						{githubHref && (
							<Link href={githubHref} target="_blank" rel="noopener noreferrer"
								aria-label={`${member.name} on GitHub`}
								className="w-5 h-5 flex items-center justify-center text-slate-300 hover:text-purple-600 transition-colors duration-200">
								<Github className="w-2.5 h-2.5" />
							</Link>
						)}
						{websiteHref && (
							<Link href={websiteHref} target="_blank" rel="noopener noreferrer"
								aria-label={`${member.name}'s website`}
								className="w-5 h-5 flex items-center justify-center text-slate-300 hover:text-purple-600 transition-colors duration-200">
								<Globe className="w-2.5 h-2.5" />
							</Link>
						)}
					</div>
				</div>
				<p className="text-[11px] font-medium text-purple-600 leading-snug">{member.role}</p>
				{member.description && (
					<p className="text-[11px] text-slate-400 leading-relaxed mt-0.5 line-clamp-2">
						{member.description}
					</p>
				)}
			</div>
		</div>
	);
}