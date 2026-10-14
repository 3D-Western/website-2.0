# 3D Western website

The 3D Western / 3DW Makerspace website for Western University's student-run makerspace community. It brings together makerspace information, equipment, projects, events, blog posts, team profiles, student spotlights, announcements, sponsors, and Instagram content.

The public site and Payload CMS run in the same Next.js application. PostgreSQL stores CMS records; uploaded media uses Supabase's S3-compatible storage.

## Stack

- Next.js 16 App Router, React 19, and TypeScript.
- Payload CMS 3.88 with the PostgreSQL adapter and Lexical rich-text editor.
- Tailwind CSS 4, Radix UI components, Motion, and Three.js / React Three Fiber.
- Vitest, Testing Library, and MSW for tests.
- pnpm for the commands in this guide. Dependency build permissions are configured in `pnpm-workspace.yaml`.

## Getting started

Use **Node.js 20.20.0 or newer**, as required by `package.json`, and install pnpm before continuing.

```bash
pnpm install
cp .env.example .env
```

Edit `.env` before starting. In particular, replace the example's literal `true or false` with exactly `true` or `false` for `NEXT_PUBLIC_CMS_ENABLED`.

Use `.env` for local setup: both Next.js and the repository's seed-script environment loader read it. Next.js also supports `.env.local`, but the seed scripts use `dotenv.config()` and do not automatically load that file. Avoid conflicting values across the two files.

### Frontend development with sample data

Set:

```dotenv
NEXT_PUBLIC_CMS_ENABLED=false
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Then start the app:

```bash
pnpm dev
```

Open [localhost:3000](http://localhost:3000). The development command binds to `0.0.0.0`, making it accessible on your local network as well.

Mock mode routes supported CMS reads through local resolvers in `src/mocks/handlers-direct.ts`, using fixtures in `src/cms/static-data/`. It does **not** use a browser MSW worker for these application reads; MSW is configured separately for tests. `/admin` redirects to `/` in this mode.

Mock coverage is incomplete: the current direct resolver map has no `/api/sponsors` entry, while `/explore` requests sponsors. That page can fail in mock mode until its resolver is added. The flag also does not disable every Payload API or the Instagram cron route; those still require a configured CMS. Treat this mode as a frontend fixture workflow, not a complete database-free CMS installation.

### Development with Payload

Set `NEXT_PUBLIC_CMS_ENABLED=true`, then supply database, secret, and storage values from the table below. Use a development database: starting Payload in development currently allows schema push.

```bash
pnpm dev
```

Open [localhost:3000/admin](http://localhost:3000/admin). For an existing database, obtain an account from an administrator. On a new database, use Payload's first-user setup and verify that the account has the `admin` role; the collection's configured role default is `editor`.

The switch is **`NEXT_PUBLIC_CMS_ENABLED`**, not `CMS_ENABLED`. Restart development after changing it. `NEXT_PUBLIC_*` values are included in client builds, so set them before a production build and rebuild when changing them.

## Environment variables

[`.env.example`](.env.example) lists the expected keys. Never commit real credentials.

| Variable                                   | Purpose                                                                                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_CMS_ENABLED`                  | `false` selects local mock resolvers; use `true` for the real CMS. Set it explicitly.                                                 |
| `NEXT_PUBLIC_BASE_URL`                     | Application origin used by client REST requests, media URL construction, and preview authentication; locally `http://localhost:3000`. |
| `CMS_DATABASE_URI`                         | PostgreSQL connection string for Payload.                                                                                             |
| `PAYLOAD_SECRET`                           | Secret used by Payload authentication; keep stable for the environment.                                                               |
| `PREVIEW_SECRET`                           | Shared secret for Payload's preview links and `/preview`.                                                                             |
| `S3_ENDPOINT`                              | Supabase S3-compatible storage endpoint.                                                                                              |
| `S3_REGION`                                | Region for the S3 client.                                                                                                             |
| `SUPABASE_BUCKET`                          | Bucket used for uploaded media.                                                                                                       |
| `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | S3 storage credentials; server-only.                                                                                                  |
| `INSTAGRAM_ACCESS_TOKEN`                   | Token used by the optional Instagram synchronization job.                                                                             |
| `CRON_SECRET`                              | Bearer token expected by the Instagram cron endpoint.                                                                                 |

## Pages and endpoints

| Path                                      | Purpose                                                                     |
| ----------------------------------------- | --------------------------------------------------------------------------- |
| `/`                                       | Landing page, makerspace/equipment information, latest content.             |
| `/about`                                  | Organization and team information.                                          |
| `/makerspace`                             | Makerspace information.                                                     |
| `/projects`, `/projects/[slug]`           | Project showcase and individual project pages.                              |
| `/blogs`, `/blogs/[slug]`                 | Blog listing and articles.                                                  |
| `/events`                                 | Events calendar.                                                            |
| `/explore`                                | Announcements, projects, student spotlights, Instagram posts, and sponsors. |
| `/admin`                                  | Payload administration.                                                     |
| `/api/[collection]`                       | Payload REST API.                                                           |
| `/api/graphql`, `/api/graphql-playground` | Payload GraphQL routes.                                                     |
| `/preview`                                | Authenticated draft-preview entry point.                                    |
| `/api/cron/update-instagram-posts`        | Instagram synchronization endpoint.                                         |

## Project structure

```text
payload.config.ts          Payload registration, database, editor, storage
payload-types.ts           Generated Payload document types
src/
  app/
    (main)/                Public pages and site layout
    (payload)/             Payload admin, REST, and GraphQL integration
    preview/               Draft-mode entry point
    api/cron/              Instagram sync route
  cms/
    collections/           Collection schemas and relationships
    access/                CMS roles and collection permissions
    scripts/               Seed and Instagram synchronization scripts
    static-data/           Local fixtures
  lib/cms/                 Shared fetch API, registry, transforms, overrides
    archive/               Older fetching implementations
    tests/                 CMS fetching tests
  components/
    pages/                 Page compositions
    sections/              Site sections
    content/               Content cards, galleries, calendars, etc.
    ui/                    Shared UI primitives
  context/                 Client-side context providers
  hooks/                   Pagination and other reusable hooks
  mocks/                   Direct mock resolvers and MSW test handlers
  types/content.ts         Frontend content types
  proxy.ts                 Mock-mode admin redirect
public/                    Static images, icons, and other assets
docs/                      CMS developer and editor guides
```

### How CMS data reaches the UI

1. Collection schemas in `src/cms/collections/` are registered in `payload.config.ts`.
2. `src/lib/cms/collections.ts` registers the collections exposed through the shared frontend API, their transforms, and supported filter/date fields. It is separate from Payload's full collection registry.
3. Server components use `api.server.ts` (Payload Local API); client components use `api.client.ts` (REST). Both check the local mock fallback first.
4. `api.ts` builds shared querying/pagination methods. Collection-specific methods live in `projects.overrides.ts` and `teamMembers.overrides.ts`.
5. `transform.ts` converts CMS documents into the types in `src/types/content.ts`. Individual blog/project lookups live in `fetchBySlug.ts`.

Use this shared layer for new features. See the [CMS fetching guide](docs/cms-devs/cms-collections-guide.md) for when to extend the registry versus add a collection-specific override.

## Payload collections and editing

There are 20 application collections:

| Group               | Collections                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| Written Content     | `blogs`, `projects`, `events`, `spotlights`, `announcements`                |
| People              | `authors`, `team-members`, `teams`, `sponsors`                              |
| Categorization      | `tags` (labelled Blog Categories), `project-categories`, `event-categories` |
| Media               | `avatars`, `cover-images`, `logos`, `gallery-images`, `spotlight-images`    |
| Instagram           | `instagram-posts`, `instagram-thumbnails`                                   |
| General Collections | `users`                                                                     |

The [collection architecture diagram](docs/cms-devs/payload-collections-architecture.md) shows the relationships. The TypeScript collection definitions are the source of truth when older documentation differs.

Projects have a short plain-text `description` and a separate **required** rich-text `content` field. Blogs also use rich-text `content`. Rich text is stored as Lexical JSON, not Markdown strings. Existing project drafts need their content filled before publishing.

The six upload collections (the Media group plus `instagram-thumbnails`) disable local file storage and use the configured S3 bucket. Reusable media and category records are selected through relationship fields. Blogs allow up to three tags; events and projects allow up to three categories.

### Permissions, drafts, and preview

Most collections share `generalAccess`: public reads, create/update for admins or users assigned that collection, and admin-only deletes. Users have separate account access rules; announcements do not use the shared access helper. Editing a collection does not automatically grant editing access to its related media collections.

Drafts are enabled for most collections, including media. `users`, `announcements`, `spotlights`, and `instagram-posts` do not configure drafts. Blogs autosave every second; projects every five seconds.

The shared read access function currently returns `true` and does not enforce a published-only filter. Do not assume drafts are private simply because draft support is enabled.

Blog and project admin configurations generate `/preview` links. That route checks `PREVIEW_SECRET` and the Payload login cookie before enabling Next.js draft mode. **Project detail fetching honors draft mode; blog detail fetching currently passes `draft: false`.** Mock mode does not provide an authenticated Payload preview workflow.

## Database schema changes

The current Postgres adapter configuration does not set `push: false`. The installed adapter pushes schema changes during development, but not in production. This explains why adding a field can modify a development database on Payload initialization.

Schema changes and content conversion are different operations. Adding a nullable rich-text field can leave existing rows empty; converting an existing text field to rich text requires preserving the text in Lexical JSON. Versioned collections also have history tables that must be considered.

For a migration-based deployment, generate and review a migration, then apply it to the intended database:

```bash
pnpm exec payload migrate:create
pnpm exec payload migrate
```

No migration files are currently checked into this repository. Establish a baseline against the existing database before adopting migrations; do not assume a first generated migration can be applied unchanged to a database already managed by schema push. Production deployment must explicitly arrange migration execution; `pnpm build` and `pnpm start` do not include it.

After collection changes, regenerate Payload types:

```bash
pnpm exec payload generate:types
```

Update frontend types, transforms, fixtures, and renderers as needed. Read [Creating a Payload Collection](docs/cms-devs/creating-a-payload-collection.md) before extending the schema.

If schema push fails while adding a foreign key to a versions table, check for historical relationships pointing to deleted records. Restarting does not repair orphaned references; repair the affected data so the constraint can be installed.

## Commands and data scripts

| Command                  | Behavior                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `pnpm dev`               | Starts Next.js development on `0.0.0.0`.                                                   |
| `pnpm build`             | Builds the application for production.                                                     |
| `pnpm start`             | Serves an existing production build.                                                       |
| `pnpm lint`              | Runs ESLint.                                                                               |
| `pnpm test`              | Starts Vitest; use `pnpm exec vitest run` for a single run.                                |
| `pnpm exec tsc --noEmit` | Checks TypeScript without emitting application code.                                       |
| `pnpm seedcms`           | Runs the legacy static-data seed; skips each collection that already contains any records. |
| `pnpm seed1 --apply`     | Runs the Western News story seed; skips matching existing records.                         |

**Seeding is optional, not a normal setup step.** These scripts connect directly to the database in your environment, regardless of the frontend mock flag. Review their source and target database before running them.

The legacy seed covers teams, team members, categories, events, sponsors, authors, tags, blogs, projects, spotlights, and announcements. It does not upload media. Its fixtures contain fixed relationship IDs, so it is not a complete bootstrap for an empty database and may fail against the current schema or missing media records.

The Western News seed creates three project drafts, three blog drafts, two project categories, and two blog tags. It leaves image/author/category relationships unassigned and does not fill the new project `content` field. Spotlight data is included, but creation is skipped until image IDs are supplied in the script. Without `--apply`, the script refuses to connect and write.

Tests use jsdom, Testing Library, and MSW with setup in `vitest.config.ts`, `src/mocks/setupTests.ts`, and `src/test/setup.ts`. Test results should be checked when changing fetching, transforms, or component behavior; a production build is a separate check and can require configured services.

## Instagram synchronization and deployment

[`vercel.json`](vercel.json) declares a daily cron schedule (`0 0 * * *`) for `/api/cron/update-instagram-posts`. The route expects `Authorization: Bearer <CRON_SECRET>` and uses `INSTAGRAM_ACCESS_TOKEN` to fetch profile/media data and write CMS records and uploads.

The current implementation needs review before relying on it as unattended synchronization: write and cleanup calls are not awaited, Instagram IDs are shortened to five characters, and the thumbnail cleanup loop targets `instagram-posts`. A successful route response does not establish that all writes finished. The cron is not gated by `NEXT_PUBLIC_CMS_ENABLED`.

For a production server, configure the CMS database, storage, secrets, and public origin before building:

```bash
pnpm build
pnpm start
```

This application uses server-rendered pages, Payload APIs, authentication, and database access; it is not configured as a static export. Provision the schema separately and ensure database/storage are reachable from the deployment. Review `images.remotePatterns` in `next.config.ts` when changing media hosts; allowed image paths must match the URLs produced by the application.

## Further documentation

- [Payload collection architecture and diagram](docs/cms-devs/payload-collections-architecture.md)
- [Creating a Payload collection](docs/cms-devs/creating-a-payload-collection.md)
- [CMS fetching architecture](docs/cms-devs/cms-collections-guide.md)
- [Payload editor overview](docs/cms-editors/_payload-editors.md)
- [Blog editor guide](docs/cms-editors/blog-editors.md)
- [Project editor guide](docs/cms-editors/project-editors.md)
- [Event editor guide](docs/cms-editors/event-editors.md)

For changes involving Next.js, follow [`AGENTS.md`](AGENTS.md) and consult the documentation shipped with the installed version in `node_modules/next/dist/docs/`.
