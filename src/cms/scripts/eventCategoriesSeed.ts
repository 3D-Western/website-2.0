import { Payload } from "payload";
import { sampleEventCategories } from "@/cms/static-data";

export const eventCategoriesSeed = async (payload: Payload) => {
  console.log("\n----- EVENT CATEGORIES -----");
  for (const category of sampleEventCategories) {
    await payload.create({
      collection: "event-categories",
      data: {
        ...category,
      },
    });
    console.log(`Seeded: ${category.name} ✓`);
  }
};
