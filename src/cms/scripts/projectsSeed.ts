import { Payload } from "payload";
import { sampleProjects } from "../static-data/projects";

export const projectsSeed = async (payload: Payload) => {
  for (const project of sampleProjects) {
    await payload.create({
      collection: "projects",
      data: {
        title: project.title,
        creator: project.creator,
        image: project.image,
        alt: project.alt,
      },
    });
  }
};
