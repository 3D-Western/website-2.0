'use client';

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Announcement } from '@/components/data/announcements';
import { UserCircle } from 'lucide-react';

interface AnnouncementCardProps {
	announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
	// Split body on newlines so multi-paragraph text renders correctly
	const paragraphs = announcement.body.split('\n\n').filter(Boolean);

	return (
		<Card className="bg-slate-100 border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
			<CardHeader>
				<CardTitle className="text-lg font-bold text-slate-900">
					{announcement.title}
				</CardTitle>
			</CardHeader>

			<CardContent className="flex-1">
				<div className="flex flex-col gap-3">
					{paragraphs.map((para, i) => (
						<p key={i} className="text-sm text-slate-600 leading-relaxed">
							{para}
						</p>
					))}
				</div>
			</CardContent>

			<CardFooter className="border-t border-slate-200 mt-auto flex items-center justify-between text-xs text-slate-500">
				<span className="flex items-center gap-1.5">
					<UserCircle className="w-5 h-5 text-slate-400" />
					By {announcement.author}
				</span>
				<span>{announcement.timestamp}</span>
			</CardFooter>
		</Card>
	);
}