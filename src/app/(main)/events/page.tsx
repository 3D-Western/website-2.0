import type { Metadata } from "next";
import { HorizontalNav } from "@/components/HorizontalNav";
import { Footer } from "@/components/Footer";
import { EventsPage } from "@/components/pages/EventsPage";
import { api } from "@/lib/cms/api.server";
import { EventsProvider } from "@/context/EventContext";

export const metadata: Metadata = {
  title: "Events | 3D Western",
  description:
    "See what's happening at 3D Western — workshops, socials, meetings, and more, all in one calendar.",
};

export default async function Page() {
  const today = new Date();
  const [eventCategories, initialEvents] = await Promise.all([
    api.for("event-categories").getMany(),
    api.for("events").getByMonth?.(today),
  ]);
  return (
    <EventsProvider
      initialDate={today}
      initialEvents={initialEvents ?? []}
      allCategories={eventCategories}
    >
      <main className="min-h-screen flex flex-col">
        <HorizontalNav variant="dark" />
        <EventsPage />
        <Footer />
      </main>
    </EventsProvider>
  );
}
