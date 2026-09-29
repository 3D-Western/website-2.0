import { getPostBySlug } from "@/lib/cms/fetchBlogs";
import { BlogPostPage } from "./BlogPostPage";
import { blogPostMeta } from "@/lib/blogMeta";

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

  return <BlogPostPage post={post} slug={blog_template} />;
};

export default Blog;

