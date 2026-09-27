import { TrainingSection } from "../sections/TrainingSection";
import PageHeader from "../content/Header";
import { BigTextSection } from "../sections/BigTextSection";
import { AboutInfoSection } from "../sections/AboutInfoSection";
import { FAQSection } from "../sections/FAQSection";
import TeamSection from "../sections/TeamSection";
import { JoinTeamSection } from "../sections/JoinTeamSection";
import { MorrissetteSection } from "../sections/MorrissetteSection";

export function AboutPage() {
	return (
		<main className="min-h-screen pt-[88px]">
			<PageHeader
				title="About Us"
				description="Who we are, what we do, how you can join"
			></PageHeader>
			<BigTextSection />
			<AboutInfoSection />
			<TrainingSection />
			<TeamSection />
			<JoinTeamSection />
			<FAQSection />
			<MorrissetteSection />
		</main>
	);
}