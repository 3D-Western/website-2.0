import { BlogsPage } from "@/components/pages/BlogsPage";
import { HorizontalNav } from "@/components/HorizontalNav";
import { Footer } from "@/components/Footer";
import { getBlogPosts } from "@/lib/cms/fetchBlogs";
import { blogIndexMeta } from "@/lib/blogMeta";

export function generateMetadata() { return blogIndexMeta(); }
import { BlogPost, Tag } from "@/types/content";
import { getTags } from "@/lib/cms/fetchTags";

export default async function Blogs() {
  const posts: BlogPost[] = await getBlogPosts({
    page: 1,
    limit: 10000,
  });
  const tags: Tag[] = await getTags();

  return (
    <main className="min-h-screen flex flex-col">
      <HorizontalNav variant="dark" />
      <BlogsPage posts={posts} tags={tags} />
      <Footer />
    </main>
  );
}
