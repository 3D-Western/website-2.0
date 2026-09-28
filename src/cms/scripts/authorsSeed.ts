import type { Payload } from "payload";
import { sampleAuthors } from "../static-data/authors";

export const authorsSeed = async (payload: Payload) => {
  for (const author of sampleAuthors) {
    await payload.create({
      collection: "authors",
      data: author,
    });
  }
};
