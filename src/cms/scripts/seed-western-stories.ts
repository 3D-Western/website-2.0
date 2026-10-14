/**
 * Seed original summaries of three Western News stories. Does not fetch articles.
 * Run ONLY when ready, from the repository root:
 * pnpm exec tsx -r tsconfig-paths/register -r ./src/cms/scripts/env.ts src/cms/scripts/seed-western-stories.ts --apply
 *
 * Creates missing records only; never updates/deletes existing records.
 * Projects/blogs are incomplete drafts: connect images, author and categories
 * in Payload before publishing. General access currently has no published-only
 * read filter, so drafts should not be treated as private content.
 *
 * Spotlights have no draft support and require an image. Fill spotlightImage
 * with an existing spotlight-images ID to create one; otherwise it is skipped.
 * program/year describe the entrepreneurship program and cohort, not study year.
 * Quotes are short verbatim excerpts; all other copy is an original summary.
 */
import type { Payload, Where } from "payload";
import { makeRichText } from "../static-data/makeRichText";

type Story = {
  slug: string;
  project: string;
  name: string;
  contributors: string[];
  title: string;
  summary: string;
  date: string;
  source: string;
  sourceAuthor: string;
  tags: string[];
  quote: string;
  quoteSpeaker: string;
  spotlightImage: number | null;
};

const stories: Story[] = [
  {
    slug: "drago-boxing-dual-wrap-roller",
    project: "Drago Boxing",
    name: "Shane McCarthy",
    contributors: ["Shane McCarthy", "Luke Richardson"],
    title: "Drago Boxing: solving a boxer's everyday problem",
    summary:
      "Engineering graduate Shane McCarthy developed a device that rolls two boxing hand wraps together and hangs them to dry. With feedback from fighters and support from Morrissette Entrepreneurship, he refined the design through prototyping and prepared Drago Boxing for launch.",
    date: "2025-07-25T12:00:00.000Z",
    source:
      "https://news.westernu.ca/2025/07/boxer-entrepreneur-shane-mccarthy/",
    sourceAuthor: "Colleen MacDonald",
    tags: ["Entrepreneurship", "Product Design"],
    quote:
      "Almost everything I’ve updated in the design came from user feedback.",
    quoteSpeaker: "Shane McCarthy",
    spotlightImage: 3,
  },
  {
    slug: "sylvara-plant-care",
    project: "Sylvara",
    name: "Aakarsh Garg",
    contributors: [
      "Aakarsh Garg",
      "Arnav Jhajharia",
      "Aditya Dutta",
      "Shriradhya Bihani",
    ],
    title: "Sylvara: turning plant-care questions into a connected device",
    summary:
      "Computer science student Aakarsh Garg developed Sylvara to help gardeners understand their plants. Its sensors track moisture, light, temperature and humidity, with care guidance delivered through an app. Western's entrepreneurship programs helped him refine the product and build confidence as a founder.",
    date: "2025-11-12T12:00:00.000Z",
    source:
      "https://news.westernu.ca/2025/11/student-entrepreneurship-programs-launch-sylvara/",
    sourceAuthor: "Colleen MacDonald",
    tags: ["Entrepreneurship", "Connected Devices"],
    quote:
      "It was hard to find a name that resonated with me as much as Smart Plant does.",
    quoteSpeaker: "Aakarsh Garg",
    spotlightImage: 2,
  },
  {
    slug: "stableinsights-equine-care",
    project: "StableInsights",
    name: "Sydney Burns and Julia Piskunowicz",
    contributors: ["Sydney Burns", "Julia Piskunowicz"],
    title: "StableInsights: developing connected care for horses",
    summary:
      "Sydney Burns and Julia Piskunowicz co-founded StableInsights to develop a sensor-equipped horse blanket connected to a mobile app. Supported by Morrissette Entrepreneurship, they completed basic prototyping and sought research partners to advance a product intended to help owners monitor their horses remotely.",
    date: "2025-11-11T12:00:00.000Z",
    source: "https://news.westernu.ca/2025/11/student-startup-stableinsights/",
    sourceAuthor: "Keri Ferguson",
    tags: ["Entrepreneurship", "Connected Devices"],
    quote:
      "It was really validating to have that positive feedback from a panel of judges.",
    quoteSpeaker: "Sydney Burns",
    spotlightImage: 4,
  },
];

const categories = [
  {
    name: "Product Design",
    description:
      "Physical products developed through design, prototyping and user feedback.",
  },
  {
    name: "Connected Devices",
    description:
      "Devices that combine sensors and software to provide useful information.",
  },
];
const tags = [
  {
    title: "Entrepreneurship",
    description: "Stories about founders building new ventures.",
  },
  {
    title: "Student Innovation",
    description:
      "Ideas and products developed by students and recent graduates.",
  },
];

type SeedCollection =
  | "projects"
  | "blogs"
  | "spotlights"
  | "project-categories"
  | "tags";

async function exists(
  payload: Payload,
  collection: SeedCollection,
  where: Where,
) {
  const result = await payload.find({
    collection,
    where,
    // Include the latest drafts when checking for an existing record.
    draft: collection !== "spotlights",
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  if (result.docs.length)
    console.log(`Skipped existing ${collection}: ${result.docs[0].id}`);
  return result.docs.length > 0;
}

async function seed(payload: Payload) {
  for (const data of categories) {
    if (
      await exists(payload, "project-categories", {
        name: { equals: data.name },
      })
    )
      continue;
    await payload.create({
      collection: "project-categories",
      data: { ...data, _status: "published" },
      overrideAccess: true,
    });
    console.log(`Created project category: ${data.name}`);
  }
  for (const data of tags) {
    if (await exists(payload, "tags", { title: { equals: data.title } }))
      continue;
    await payload.create({
      collection: "tags",
      data: { ...data, _status: "published" },
      overrideAccess: true,
    });
    console.log(`Created blog tag: ${data.title}`);
  }

  for (const story of stories) {
    if (
      !(await exists(payload, "projects", { slug: { equals: story.slug } }))
    ) {
      await payload.create({
        collection: "projects",
        draft: true,
        overrideAccess: true,
        data: {
          title: story.project,
          slug: story.slug,
          creator: story.name,
          contributors: story.contributors,
          description: story.summary,
          blogUrl: story.source,
          image: undefined, // Add in Payload admin.
          galleryImages: [],
          categories: [],
          featured: false,
        },
      });
      console.log(`Created project draft: ${story.project}`);
    }
    if (!(await exists(payload, "blogs", { slug: { equals: story.slug } }))) {
      await payload.create({
        collection: "blogs",
        draft: true,
        overrideAccess: true,
        data: {
          title: story.title,
          slug: story.slug,
          date: story.date, // Source publication date, not a new reporting date.
          author: undefined, // Select your summary's author in Payload admin.
          coverImage: undefined,
          tags: [],
          content: makeRichText([
            story.summary,
            `Summary of reporting by ${story.sourceAuthor}, Western News, ${story.date.slice(0, 10)}. Describes the venture at the time of that report.`,
            `Read the original article: ${story.source}`,
          ]),
        },
      });
      console.log(`Created blog draft: ${story.title}`);
    }
    if (
      await exists(payload, "spotlights", {
        and: [
          { name: { equals: story.name } },
          { projectName: { equals: story.project } },
        ],
      })
    )
      continue;
    if (story.spotlightImage === null) {
      console.log(
        `Skipped spotlight ${story.project}: set spotlightImage to an existing spotlight-images ID first. Data is retained in this script.`,
      );
      continue;
    }
    // Validate the supplied media ID before creating a non-draft spotlight.
    await payload.findByID({
      collection: "spotlight-images",
      id: story.spotlightImage,
      depth: 0,
      overrideAccess: true,
    });
    await payload.create({
      collection: "spotlights",
      overrideAccess: true,
      data: {
        name: story.name,
        projectName: story.project,
        description: `${story.summary} Source: Western News (${story.date.slice(0, 10)}), ${story.source}`,
        tags: story.tags, // Plain text, not relationships to the tags collection.
        image: story.spotlightImage,
        program: "Entrepreneurial Summer Internship",
        year: 2025,
        quote: `${story.quote} — ${story.quoteSpeaker}`,
      },
    });
    console.log(`Created spotlight: ${story.project}`);
  }
}

async function main() {
  // Refuse accidental execution before importing config or connecting to the DB.
  if (!process.argv.includes("--apply")) {
    throw new Error(
      "No data written. Review this file, then explicitly pass --apply to seed.",
    );
  }
  const { getPayload } = await import("payload");
  const { default: config } = await import("../../../payload.config");
  const payload = await getPayload({ config });
  try {
    await seed(payload);
  } finally {
    await payload.destroy();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
