export interface Sponsor {
	id: string;
	name: string;
	logo: string;       // path under /public/images/sponsors/
	alt: string;
	website: string;    // full URL
}

export const sponsors: Sponsor[] = [
	{
		id: 'sponsor-1',
		name: 'Acme Studios',
		logo: '/logo.png',
		alt: 'Acme Studios logo',
		website: 'https://acmestudios.com',
	},
	{
		id: 'sponsor-2',
		name: 'Frontier Games',
		logo: '/logo.png',
		alt: 'Frontier Games logo',
		website: 'https://frontiergames.com',
	},
	{
		id: 'sponsor-3',
		name: 'RenderCo',
		logo: '/images/Instagram.svg',
		alt: 'RenderCo logo',
		website: 'https://renderco.io',
	},
	{
		id: 'sponsor-4',
		name: 'Dusty Trail VFX',
		logo: '/images/Linkedin.svg',
		alt: 'Dusty Trail VFX logo',
		website: 'https://dustytrailVFX.com',
	},
	{
		id: 'sponsor-5',
		name: 'Iron Ridge Tech',
		logo: '/logo.png',
		alt: 'Iron Ridge Tech logo',
		website: 'https://ironridgetech.com',
	},
	{
		id: 'sponsor-6',
		name: 'Sagebrush Digital',
		logo: '/images/Instagram.svg',
		alt: 'Sagebrush Digital logo',
		website: 'https://sagebrushdigital.com',
	},
];