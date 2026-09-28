import { Payload } from "payload";
import { sampleSponsors } from "../static-data/sponsors";

export const sponsorsSeed = async (payload: Payload) => {
  for (const sponsor of sampleSponsors) {
    await payload.create({
      collection: "sponsors",
      data: {
        name: sponsor.name,
        logo: sponsor.logo,
        alt: sponsor.alt,
        website: sponsor.website || "",
      },
    });
  }
};
