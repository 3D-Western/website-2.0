# Payload Admin Panel Guide

This guide explains the Payload admin interface itself — navigation, the
document editor, and general concepts that apply across every collection
(Events, Projects, Blogs, etc.). For collection-specific instructions, see
`events-editors.md`, `projects-editors.md`, and so on.

## Accessing the Admin Panel

1. Navigate to `http://localhost:3000/admin`
2. Log in with your admin credentials
3. You'll land on the dashboard, with a sidebar listing every collection
   you have access to

## The Sidebar

The left sidebar lists every **collection** in the CMS — Events, Projects,
Blogs, and any others (Tags, Categories, Authors, etc.). Clicking a
collection name takes you to its **list view**, showing every document
(entry) that collection currently has.

Collections may be grouped or labeled differently than their internal
name

## The List View

This is what you see after clicking a collection in the sidebar:

- A table of every document in that collection, with a few key columns
  shown at a glance (usually a title-like field, status, and last
  updated date)
- A **Create New** button in the top right, to add a new document
- Search and filter controls to narrow down a long list
- Click any row to open that document

## The Document Editor

Opening (or creating) a document shows the editor — this is where you'll
spend most of your time.

- **Main area** — the primary fields for that document (title,
  description, rich text content, etc.)
- **Sidebar (right side)** — secondary fields the collection's
  configuration has chosen to keep visible without scrolling (often
  status, slug, publish date, or a featured toggle)
- **Save button** (top right) — saves your current changes
- **Status indicator** — for collections that support drafts, shows
  whether the current document is a Draft or Published

**Note:** Not every collection has a draft/publish distinction — some
collections publish changes immediately as soon as you save. Check the
collection-specific guide to know which applies.

## Drafts & Publishing (where supported)

For collections with draft support:

- Saving normally keeps a document as a **Draft** — visible only to
  logged-in users or via a preview link
- Changing **Status** to **Published** and saving again makes it live
  to everyone
- Some collections also **autosave** drafts a few seconds after you stop
  typing, so in-progress edits aren't lost if you navigate away

## Preview (where supported)

Some collections have a **Preview** button in the document editor,
opening a new tab that shows exactly how the document will look once
published — useful for reviewing a draft before making it live, or
sharing a link with someone else for feedback. Preview links require
you to be logged in.

## Relationship Fields

Many fields link to documents in another collection — for example, an
event's Categories field pulls from a separate Event Categories
collection, rather than letting you type a category freely. This keeps
values consistent across documents (no duplicate categories spelled
slightly differently) and means:

- You can only pick from options that already exist in that other
  collection
- If the option you need doesn't exist yet, an admin needs to add it to
  that collection first — you generally can't create it inline

## Media / Image Fields

Image fields typically ask for two pieces of information:

- **Src** — a direct link/path to the image
- **Alt** — a short text description of the image, used for
  accessibility (screen readers) and shown if the image fails to load

Always fill in Alt text, even briefly — leaving it blank affects
accessibility for real visitors, not just a formality for the CMS.

## Roles & Permissions

Not everyone logged into the admin panel can do the same things. Depending
on how a collection is configured, you may be able to create and edit
documents but not delete them, or only see published content versus
drafts. If an action seems to be missing or blocked, it's worth checking
with an admin rather than assuming something is broken.

## General Tips

- **Save often.** Even on collections without autosave, get in the habit
  of saving as you go rather than writing a long entry in one sitting.
- **Use the sidebar fields.** They're kept short and visible for a
  reason — they're usually the fields worth double-checking right before
  you save (status, slug, featured toggles).
- **Don't guess at relationship options.** If a category, tag, or author
  you need isn't in the dropdown, ask an admin to add it rather than
  picking the closest existing one.
- **Log out on shared computers.** The admin panel is tied to your
  account and session.

## Getting Help

If you need help:

1. Check this guide, or the collection-specific guide for what you're
   working on
2. Ask another editor
3. Contact the dev team
