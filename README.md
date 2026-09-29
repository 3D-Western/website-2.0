# This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

## Moving to pnpm

If you have npm installed, run `npm install -g pnpm` or use corepack to install pnpm: `corepack enable`.
Then remove `node_modules` in your project and run `pnpm install`. Approve all build scripts with `pnpm approve-builds`.
Then run `pnpm dev` to start the server.

### pnpm commands

- add a package: `pnpm add <packagename>`, add `-D` flag for dev dependencies
- remove a package: `pnpm remove <packagename>`
- list packages: `pnpm list`

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CMS Setup (Payload)

### Prerequisites

- Node.js 18+
- A PostgreSQL database (Optional — can run without with `CMS_ENABLED=false`)

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```env
# Set to 'true' to use Payload CMS, 'false' to use mock data
CMS_ENABLED=true

# Required for Payload
PAYLOAD_SECRET=your-secret-key
CMS_BASE_URL=http://localhost:3000

# Optional — only needed if CMS_ENABLED=true
CMS_DATABASE_URI=postgres://user:password@localhost:5432/payload

# Preview mode
PREVIEW_SECRET=your-preview-secret
```

### Running with CMS Enabled

```bash
CMS_ENABLED=true pnpm dev
```

Payload admin panel will be available at `http://localhost:3000/admin`.

On first run you will be prompted to create an admin user.

#### Seeding the Database

The database has initial data. To reseed:

```bash
pnpm seedcms
```

This will seed:

- **Authors** — 4 sample authors
- **Tags** — 5 sample tags
- **Blogs** — 5 sample blog posts (linked to authors and tags)
  (so far)

### Running Without a Database (Local Development)

```bash
CMS_ENABLED=false pnpm dev
```

When `CMS_ENABLED=false`:

- ✅ MSW (Mock Service Worker) intercepts all CMS API calls
- ✅ Uses static sample data from `/src/cms/static-data/`
- ✅ No database required
- ✅ Admin panel is disabled and redirects to home
- ✅ Full frontend development without DB setup

#### Mock Data Structure

Mock data is organized in:

- `src/cms/static-data/blogs.ts` — Sample blog posts
- `src/cms/static-data/tags.ts` — Sample tags
- `src/cms/static-data/authors.ts` — Sample authors

All use numeric IDs that match the database structure for seamless switching between modes.

### Draft Preview Mode

Both CMS and mock modes support draft preview:

1. **Create a draft blog post** in the admin panel (or edit existing sample data)
2. **Click "Preview"** — generates a preview link
3. **Visit the preview link** — shows draft content (authenticated users only)

Preview URL format:
Draft mode requires:

- Valid `PREVIEW_SECRET` environment variable
- Authenticated user (via cookies)
- Draft blog with matching slug

### Collections

- **Blogs** — Blog posts with authors, tags, and draft support
- **Tags** — Content tags (max 5 per blog)
- **Authors** — Blog post authors
- **Users** — Payload authentication users
- **Events** — Club events
- **Projects** — Showcase projects
- **Team Members** — Team member profiles
- **Sponsors** — Sponsors

## Development Workflow

### With Database

```bash
CMS_ENABLED=true pnpm dev
```

- Full CMS functionality
- Admin panel at `/admin`
- Real database storage

### Without Database

```bash
CMS_ENABLED=false pnpm dev
```

- Mock data via MSW
- Admin panel disabled
- Perfect for frontend-only work or when DB isn't available

Switch between modes by changing `CMS_ENABLED` and restarting dev server.

## Learn More

To learn more about Next.js, check out the [Next.js Documentation](https://nextjs.org/docs).

For Payload CMS documentation, visit [payloadcms.com](https://payloadcms.com/docs).

## Deploy on Vercel

The easiest way to deploy is on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Make sure to set `CMS_ENABLED=true` and provide database credentials in your Vercel environment variables for production.
