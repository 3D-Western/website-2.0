import { BlogsPage } from "@/components/pages/BlogsPage";
import { HorizontalNav } from "@/components/HorizontalNav";
import { Footer } from "@/components/Footer";
import { blogIndexMeta } from "@/lib/blogMeta";

export function generateMetadata(): Metadata {
  return blogIndexMeta();
}
import { Metadata } from "next";

export default function Blogs() {
  return (
    <main className="min-h-screen flex flex-col">
      <HorizontalNav variant="dark" />
      <BlogsPage />
      <Footer />
    </main>
  );
}
