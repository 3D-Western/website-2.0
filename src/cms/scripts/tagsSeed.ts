import { Payload } from "payload";
import { sampleTags } from "../static-data/tags";

export const tagsSeed = async (payload: Payload) => {
  for (const tag of sampleTags) {
    await payload.create({
      collection: "tags",
      data: tag,
    });
  }
};
