import { Payload } from "payload";
import { sampleProjectCategories } from "../static-data/";

export const projectCategorySeed = async (payload: Payload) => {
  for (const category of sampleProjectCategories) {
    await payload.create({
      collection: "project-categories",
      data: {
        ...category,
      },
    });
    console.log(`Seeded category: ${category.name}`);
  }
};
