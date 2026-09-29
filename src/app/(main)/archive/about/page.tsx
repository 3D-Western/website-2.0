import { AboutPage } from '@/components/archive/pages/AboutPage';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function About() {
	return (
		<main className="min-h-screen flex flex-col">
			<Navigation />
			<AboutPage />
			<Footer />
		</main>
	);
}

