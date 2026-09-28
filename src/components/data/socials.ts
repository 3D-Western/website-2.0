// Data source for the Socials carousel.
//
// A NOTE ON REAL INSTAGRAM DATA:
// Instagram doesn't let a website pull posts with no auth — the old
// "Basic Display API" that used to make this easy was shut down by Meta
// in Dec 2024. The only official path now is the Instagram Graph API,
// which requires:
//   1. The club's Instagram account to be a Business/Creator account
//      linked to a Facebook Page.
//   2. A long-lived access token (expires every ~60 days, needs refreshing).
//   3. Server-side calls only — the token must never reach the browser.

export interface InstagramPost {
	id: string;
	username: string;
	avatar?: string; // profile picture URL, falls back to a monogram if omitted
	image?: string; // post photo URL, falls back to a placeholder graphic if omitted
	caption: string;
	likes: number;
	permalink: string; // link to the real post on instagram.com
}

export const instagramPosts: InstagramPost[] = [
	{
		id: '1',
		username: 'yourclub',
		caption: 'Late night in the shop before regionals #robotics #buildseason',
		likes: 214,
		permalink: 'https://instagram.com/yourclub',
	},
	{
		id: '2',
		username: 'yourclub',
		caption: 'Meet the drivetrain that took us to finals 🤖',
		likes: 341,
		permalink: 'https://instagram.com/yourclub',
	},
	{
		id: '3',
		username: 'yourclub',
		caption: 'New members, first weld. Welcome to the team!',
		likes: 189,
		permalink: 'https://instagram.com/yourclub',
	},
	{
		id: '4',
		username: 'yourclub',
		caption: 'Throwback to our very first competition run',
		likes: 276,
		permalink: 'https://instagram.com/yourclub',
	},
	{
		id: '5',
		username: 'yourclub',
		caption: 'CAD Sunday: reworking the intake for next season',
		likes: 158,
		permalink: 'https://instagram.com/yourclub',
	},
	{
		id: '6',
		username: 'yourclub',
		caption: 'Sponsor shoutout — thank you for keeping the lights on',
		likes: 202,
		permalink: 'https://instagram.com/yourclub',
	},
];