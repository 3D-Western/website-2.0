import { Payload } from "payload";
import { sampleEvents } from "@/cms/static-data/events";

export const eventSeed = async (payload: Payload) => {
  for (const event of sampleEvents) {
    await payload.create({
      collection: "events",
      data: {
        ...event,
      },
    });
    console.log(`Seeded: ${event.title}`);
  }
};
