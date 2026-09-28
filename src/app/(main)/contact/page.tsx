'use client';

import { ContactPage } from '@/components/pages/ContactPage';
import { HorizontalNav } from '@/components/HorizontalNav';
import { Footer } from '@/components/Footer';

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col">
      <HorizontalNav variant="dark" />
      <ContactPage />
      <Footer />
    </main>
  );
}

