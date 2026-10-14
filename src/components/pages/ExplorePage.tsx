import { AnnouncementsSection } from "@/components/sections/AnnouncementsSection";
import { StudentSection } from "../sections/StudentSection";
import ProjectsSection from "../sections/ProjectsSection";
import { SocialsSection } from "../sections/SocialsSection";
import { SponsorSection } from "../sections/SponsorSection";
import { ExploreHeader } from "../sections/ExploreHeader";
import { api } from "@/lib/cms/api.server";

export async function ExplorePage() {
  const [announcements, spotlights, posts, sponsors] = await Promise.all([
    api.for("announcements").getMany(),
    api.for("spotlights").getMany({}),
    api.for("instagram-posts").getMany(),
    api.for("sponsors").getMany(),
  ]);
  return (
    <main className="min-h-screen pt-[88px]">
      <ExploreHeader />
      <AnnouncementsSection announcements={announcements ?? []} />
      <ProjectsSection />
      <StudentSection spotlights={spotlights ?? []} />
      <SocialsSection posts={posts ?? []} />
      <SponsorSection sponsors={sponsors ?? []} />
    </main>
  );
}
