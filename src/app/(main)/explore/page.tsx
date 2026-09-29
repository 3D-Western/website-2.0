import { ExplorePage } from '@/components/pages/ExplorePage';
import { HorizontalNav } from '@/components/HorizontalNav';
import { Footer } from '@/components/Footer';

export default function Blogs() {
  return (
    <main className="min-h-screen flex flex-col">
      <HorizontalNav variant="dark" />
      <ExplorePage />
      <Footer />
    </main>
  );
}