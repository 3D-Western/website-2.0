'use client';

import Image from 'next/image';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Camera } from 'lucide-react';
import type { InstagramPost } from '@/components/data/socials';
import { Card } from '@/components/ui/card';

interface InstaPostCardProps {
	post: InstagramPost;
	// Whether this card is the centered/active one in the carousel —
	// just bumps up the shadow a bit so it reads as "in focus".
	active?: boolean;
}

export function InstaPostCard({ post, active }: InstaPostCardProps) {
	return (
		<Card
			className={`w-56 sm:w-64 overflow-hidden bg-white border-slate-200 gap-0 select-none transition-shadow duration-300 ${
				active ? 'shadow-lg' : 'shadow-sm'
			}`}
		>
			{/* Header: avatar, username, follow link, "more" icon */}
			<div className="flex items-center justify-between px-3 py-2.5">
				<div className="flex items-center gap-2 min-w-0">
					<div className="relative w-7 h-7 rounded-full overflow-hidden bg-purple-100 shrink-0">
						{post.avatar ? (
							<Image src={post.avatar} alt={post.username} fill className="object-cover" sizes="28px" />
						) : (
							// No avatar on file yet — fall back to a monogram
							<div className="w-full h-full flex items-center justify-center text-[10px] font-semibold text-purple-600">
								{post.username.charAt(0).toUpperCase()}
							</div>
						)}
					</div>
					<span className="text-xs font-semibold truncate">{post.username}</span>
				</div>
				<div className="flex items-center gap-2 shrink-0">
					<a
						href={post.permalink}
						target="_blank"
						rel="noopener noreferrer"
						// Stop the click from bubbling up to the carousel's
						// "select this card" handler
						onClick={(e) => e.stopPropagation()}
						className="text-[10px] font-semibold text-purple-600 hover:text-purple-700"
					>
						Follow
					</a>
					<MoreHorizontal className="w-3.5 h-3.5 text-slate-400" />
				</div>
			</div>

			{/* Post image (square, like Instagram) */}
			<div className="relative aspect-square w-full bg-gradient-to-br from-amber-400 via-fuchsia-500 to-purple-600">
				{post.image ? (
					<Image
						src={post.image}
						alt={post.caption || 'Instagram post'}
						fill
						className="object-cover"
						sizes="(max-width: 640px) 224px, 256px"
					/>
				) : (
					// Placeholder shown until real Instagram media is wired up
					<div className="w-full h-full flex items-center justify-center">
						<Camera className="w-12 h-12 text-white/90" strokeWidth={1.5} />
					</div>
				)}
			</div>

			{/* Like / comment / share / save icons */}
			<div className="flex items-center justify-between px-3 pt-2.5">
				<div className="flex items-center gap-3">
					<Heart className="w-4 h-4 text-slate-700" />
					<MessageCircle className="w-4 h-4 text-slate-700" />
					<Send className="w-4 h-4 text-slate-700" />
				</div>
				<Bookmark className="w-4 h-4 text-slate-700" />
			</div>

			{/* Like count + caption */}
			<div className="px-3 pt-1.5 pb-3">
				<p className="text-xs font-semibold">{post.likes.toLocaleString()} likes</p>
				<p className="text-xs text-slate-600 truncate">
					<span className="font-semibold text-slate-800">{post.username} </span>
					{post.caption}
				</p>
			</div>
		</Card>
	);
}