export interface Announcement {
	id: string;
	title: string;
	body: string;
	author: string;
	timestamp: string;
}

export const announcements: Announcement[] = [
	{
		id: '1',
		title: 'New Cricut Machine in Now!',
		body: "We're excited to welcome the Cricut Joy Xtra Smart Cutting Machine to Makerspace 1. This versatile machine can cut, write, draw, and foil, making it perfect for stickers, labels, cards, iron-on designs, and more.\n\nStop by and give it a try on your next project!",
		author: 'Jane D.',
		timestamp: '7 hours ago',
	},
	{
		id: '2',
		title: 'Laser Cutter Maintenance Window',
		body: "The laser cutter in Makerspace 2 will be offline for scheduled maintenance this Friday from 10am–2pm. Please plan your projects accordingly.\n\nIt will be back up and fully calibrated by Friday afternoon.",
		author: 'Marcus T.',
		timestamp: '1 day ago',
	},
	{
		id: '3',
		title: 'Workshop: Intro to Arduino — This Thursday',
		body: "Join us this Thursday at 6pm for a beginner-friendly Arduino workshop. No experience needed — we'll cover the basics of microcontrollers, wiring, and writing your first sketch.\n\nSpots are limited, so sign up early at the front desk!",
		author: 'Priya K.',
		timestamp: '2 days ago',
	},
	{
		id: '4',
		title: '3D Printer Filament Restocked',
		body: "We've restocked PLA filament in black, white, grey, and translucent blue. The PETG supply is running low — if you need it for a project, grab it soon.\n\nRemember to log your filament usage in the sheet by the printer.",
		author: 'Jane D.',
		timestamp: '3 days ago',
	},
	{
		id: '5',
		title: 'New Member Orientation — Saturday 11am',
		body: "If you joined in the last month, don't miss the new member orientation this Saturday at 11am. We'll do a full tour of both makerspaces, go over safety protocols, and answer any questions you have.\n\nSee you there!",
		author: 'Alex R.',
		timestamp: '4 days ago',
	},
	{
		id: '6',
		title: 'Soldering Stations Upgraded',
		body: "We've replaced the old soldering irons with new temperature-controlled Hakko stations. These are a big upgrade — much more consistent heat and easier to use for fine work.\n\nPlease read the quick-start guide posted at each station before using.",
		author: 'Marcus T.',
		timestamp: '5 days ago',
	},
];