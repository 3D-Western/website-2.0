'use client';

import { EventsPage } from '@/components/pages/EventsPage';
import { HorizontalNav } from '@/components/HorizontalNav';
import { Footer } from '@/components/Footer';

export default function Events() {
  return (
    <main className="min-h-screen flex flex-col">
      <HorizontalNav variant="dark" />
      <EventsPage />
      <Footer />
    </main>
  );
}

