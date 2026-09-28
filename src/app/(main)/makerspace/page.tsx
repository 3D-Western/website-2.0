'use client';

import { MakerspacePage } from '@/components/pages/MakerspacePage';
import { HorizontalNav } from '@/components/HorizontalNav';
import { Footer } from '@/components/Footer';

export default function Makerspace() {
	return (
		<main className="min-h-screen flex flex-col">
			<HorizontalNav variant="dark" />
			<MakerspacePage />
			<Footer />
		</main>
	);
}

