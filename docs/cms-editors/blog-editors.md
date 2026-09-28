# CMS Editor Guide

This guide is for content creators and editors managing blog posts in the Payload CMS.

## Accessing the Admin Panel

1. Navigate to `http://localhost:3000/admin`
2. Log in with your admin credentials
3. Click on **Blogs** in the left sidebar

## Creating a New Blog Post

1. Click the **Create New** button in the top right
2. Fill in the required fields:
   - **Title** — Post title (e.g., "Getting Started with Next.js 15")
   - **Slug** — URL-friendly identifier (auto-generated from title, but you can edit)
     - Example: `getting-started-with-nextjs`
     - Use hyphens, lowercase, no special characters
   - **Author** — Select from the dropdown (must have authors created first)
   - **Date** — Publication date (click calendar icon)
   - **Excerpt** — Short summary (1-2 sentences) shown in blog listing
   - **Reading Time** — Estimated read duration in minutes
   - **Cover Image** — Featured image for the post
     - URL: Direct link to the image
     - Alt Text: Description for accessibility
   - **Tags** — Select up to 5 tags (e.g., "Next.js", "React", "Web Dev")
   - **Content** — The full post body using the rich text editor

3. Click **Save** to save as draft

## Writing Content

The Content field uses a rich text editor with:

- **Bold** / _Italic_ / ~~Strikethrough~~
- Headings (H1, H2, H3, etc.)
- Lists (bullet points and numbered)
- Links (highlight text and add URL)
- Code blocks (for code snippets)
- Quotes

**Tips:**

- Use headings to structure your post
- Break up text with subheadings and lists
- Use code blocks for technical examples
- Keep paragraphs short and readable

## Saving & Publishing

### Save as Draft

- Click the **Save** button
- Status will show as "Draft"
- Only accessible via preview link or to authenticated users

### Publish

1. Click the **Save** button
2. At the top, change Status from **Draft** → **Published**
3. Click **Save** again
4. Post is now live on the blog

## Preview Before Publishing

1. Save your post as a draft
2. Click the **Preview** button (top right area)
3. A new tab opens showing exactly how the post looks
4. Share the preview URL with others for feedback

**Note:** Preview links expire and require authentication.

## Editing Published Posts

1. Find the post in the **Blogs** collection
2. Make your changes
3. Click **Save**
4. Changes are live immediately

## Tags

Tags help organize and categorize posts.

**To use tags:**

1. In the Tags field, click **Add**
2. Search and select up to 3 tags
3. Save the post

**Creating new tags:**

- Contact an admin to add new tags in the **Tags** collection

## Authors

Each post must have an author. Authors are managed separately.

**Current Authors:**

- Jane Doe
- Marcus Lee
- Priya Nair
- Sam Okafor
  (ALL SAMPLES)

**To add authors:**

- Ask an admin to create new authors in the **Authors** collection

## Common Issues

### "Slug must be unique"

- Each post needs a unique URL slug
- Rename it to something different (e.g., add a number or date)

### "Required field missing"

- Check: Title, Slug, Author, Date, Content
- All of these must be filled in

### Preview link not working

- Make sure you're logged in
- Preview links are user-specific
- Refresh the page and try again

### Post not appearing on blog

- Verify status is **Published** (not Draft)
- Check the publication date (must be today or in the past)
- Clear browser cache and refresh

## Best Practices

✅ **Do:**

- Write descriptive, helpful titles
- Use clear, SEO-friendly slugs
- Add an excerpt that summarizes the post
- Use 1-2 relevant tags
- Include a cover image
- Structure content with headings
- Proofread before publishing

❌ **Don't:**

- Use special characters in slugs
- Publish with blank required fields
- Use ALL CAPS titles
- Make excerpts longer than 2 sentences
- Leave the cover image alt text empty

## Getting Help

If you need help:

1. Check this guide first
2. Ask another editor
3. Contact the dev team

Happy writing! 🚀
