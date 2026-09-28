import { BlogProvider } from "@/context/BlogContext";
import { api } from "@/lib/cms/api.server";

const LIMIT = 10;

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, tags] = await Promise.all([
    api.for("blogs").getMany({ limit: LIMIT, page: 1 }),
    api.for("tags").getMany(),
  ]);
  return (
    <BlogProvider initialPosts={posts} tags={tags} PAGE_SIZE={LIMIT}>
      {children}
    </BlogProvider>
  );
}
