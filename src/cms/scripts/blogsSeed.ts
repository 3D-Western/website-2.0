import { Payload } from "payload";
import { sampleBlogs } from "../static-data/blogs";
import { Blog } from "../../../payload-types";

export const blogsSeed = async (payload: Payload) => {
  for (const blog of sampleBlogs) {
    // Delete the existing post (if any) so we always seed fresh data
    const existing = await payload.find({
      collection: "blogs",
      where: { slug: { equals: blog.slug } },
    });
    for (const doc of existing.docs) {
      await payload.delete({ collection: "blogs", id: doc.id });
      console.log(`Deleted existing post: ${blog.slug}`);
    }

    await payload.create({
      collection: "blogs",
      data: {
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        author: blog.author,
        date: blog.date,
        readingTime: blog.readingTime,
        coverImage: blog.coverImage,
        tags: blog.tags,
        content: blog.content,
        _status: "published",
      } as Blog,
    });
    console.log(`Seeded: ${blog.slug}`);
  }
};
