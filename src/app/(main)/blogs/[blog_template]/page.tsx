import { getPostBySlug } from "@/lib/cms/fetchBySlug";
import { BlogPostPage } from "./BlogPostPage";
import { blogPostMeta } from "@/lib/blogMeta";
import { api } from "@/lib/cms/api.server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blog_template: string }>;
}) {
  const { blog_template } = await params;
  const post = await getPostBySlug(blog_template);
  return blogPostMeta(post);
}

const Blog = async ({
  params,
}: {
  params: Promise<{ blog_template: string }>;
}) => {
  const { blog_template } = await params;

  const post = await getPostBySlug(blog_template);
  const allPosts = await api.for("blogs").getMany();

  return <BlogPostPage post={post} slug={blog_template} allPosts={allPosts} />;
};

export default Blog;
